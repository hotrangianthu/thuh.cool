import { curriculumData } from '../../src/lib/reading-data.js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function escapeSql(str: string) {
    if (!str) return 'NULL';
    return `'${str.replace(/'/g, "''")}'`;
}

async function generate() {
    console.log('Generating seed SQL...');

    const values: string[] = [];

    for (const persona of curriculumData) {
        for (let mIdx = 0; mIdx < persona.modules.length; mIdx++) {
            const module = persona.modules[mIdx];
            for (let bIdx = 0; bIdx < module.books.length; bIdx++) {
                const book = module.books[bIdx];
                values.push(`(${escapeSql(book.t)}, ${escapeSql(book.a)}, ${escapeSql(book.w)}, ${escapeSql(persona.id)}, ${mIdx}, ${bIdx})`);
            }
        }
    }

    const sql = `-- Seed data for books
INSERT INTO public.books (title, author, why, persona_id, module_index, order_index)
VALUES 
${values.join(',\n')}
ON CONFLICT (title, author, persona_id, module_index) 
DO UPDATE SET 
  why = EXCLUDED.why,
  order_index = EXCLUDED.order_index,
  updated_at = now();
`;

    const outputPath = path.resolve(__dirname, '../database/migrations/00009_seed_books_data.sql');
    fs.writeFileSync(outputPath, sql);
    console.log(`Generated ${values.length} books in ${outputPath}`);
}

generate();
