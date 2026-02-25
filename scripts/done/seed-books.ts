import postgres from 'postgres';
import * as dotenv from 'dotenv';
import { curriculumData } from '../../src/lib/reading-data.js';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  console.error('Missing DATABASE_URL in .env.local');
  process.exit(1);
}

const sql = postgres(dbUrl, { ssl: 'require' });

async function migrate() {
  console.log('Starting migration and seed process...');

  try {
    // 1. Run migration SQL
    console.log('Applying schema changes...');
    const migrationPath = path.resolve(__dirname, '../database/migrations/00008_create_books_table.sql');
    const migrationSql = fs.readFileSync(migrationPath, 'utf8');

    // Split SQL by semicolon and execute parts (basic way to handle multiple statements)
    // However, postgres-js can execute multiple statements if they are not parameterized
    await sql.unsafe(migrationSql);
    console.log('Schema changes applied.');

    // 2. Prepare data
    const booksToInsert = [];
    for (const persona of curriculumData) {
      for (let mIdx = 0; mIdx < persona.modules.length; mIdx++) {
        const module = persona.modules[mIdx];
        for (let bIdx = 0; bIdx < module.books.length; bIdx++) {
          const book = module.books[bIdx];
          booksToInsert.push({
            title: book.t,
            author: book.a,
            why: book.w,
            persona_id: persona.id,
            module_index: mIdx,
            order_index: bIdx
          });
        }
      }
    }

    console.log(`Prepared ${booksToInsert.length} books for insertion.`);

    // 3. Insert data (Upsert)
    // Using postgres-js helper for bulk insert
    await sql`
      insert into public.books ${sql(booksToInsert, 'title', 'author', 'why', 'persona_id', 'module_index', 'order_index')
      }
      on conflict (title, author, persona_id, module_index) 
      do update set 
        why = excluded.why,
        order_index = excluded.order_index,
        updated_at = now()
    `;

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

migrate();
