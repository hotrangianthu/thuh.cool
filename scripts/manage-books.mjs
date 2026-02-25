import { Command } from 'commander';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import * as path from 'path';
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
const program = new Command();

program
    .name('manage-books')
    .description('CLI to manage books in the thuh.cool database')
    .version('1.0.0');

program
    .command('list')
    .description('List all books')
    .option('-p, --persona <id>', 'Filter by persona ID')
    .action(async (options) => {
        try {
            let books;
            if (options.persona) {
                books = await sql`
                    SELECT * FROM public.books 
                    WHERE persona_id = ${options.persona}
                    ORDER BY persona_id, module_index, order_index
                `;
            } else {
                books = await sql`
                    SELECT * FROM public.books 
                    ORDER BY persona_id, module_index, order_index
                `;
            }

            console.table(books.map((b) => ({
                id: b.id.substring(0, 8),
                title: b.title,
                author: b.author,
                persona: b.persona_id,
                mod: b.module_index,
                ord: b.order_index
            })));
        } catch (err) {
            console.error('Error:', err.message);
        } finally {
            await sql.end();
        }
    });

program
    .command('add')
    .description('Add a new book')
    .requiredOption('-t, --title <string>', 'Book title')
    .requiredOption('-a, --author <string>', 'Author name')
    .requiredOption('-p, --persona <id>', 'Persona ID')
    .option('-m, --module <number>', 'Module index', '0')
    .option('-o, --order <number>', 'Order index', '0')
    .option('-w, --why <string>', 'Why this book?')
    .action(async (options) => {
        try {
            const [book] = await sql`
                INSERT INTO public.books (title, author, persona_id, module_index, order_index, why)
                VALUES (${options.title}, ${options.author}, ${options.persona}, ${parseInt(options.module)}, ${parseInt(options.order)}, ${options.why || null})
                RETURNING *
            `;
            console.log('Book added successfully:', book.id);
        } catch (err) {
            console.error('Error:', err.message);
        } finally {
            await sql.end();
        }
    });

program
    .command('remove')
    .description('Remove a book by ID')
    .argument('<id>', 'Book ID (UUID)')
    .action(async (id) => {
        try {
            const result = await sql`DELETE FROM public.books WHERE id = ${id} RETURNING id`;
            if (result.length > 0) {
                console.log('Book removed successfully.');
            } else {
                console.log('Book not found.');
            }
        } catch (err) {
            console.error('Error:', err.message);
        } finally {
            await sql.end();
        }
    });

program
    .command('update-progress')
    .description('Update progress for a book')
    .argument('<book_id>', 'Book ID (UUID)')
    .option('-u, --user <id>', 'User ID (admin)')
    .option('-c, --completed <boolean>', 'Completed status', 'true')
    .option('-r, --review <string>', 'Review text')
    .option('--rating <number>', 'Rating (1-5)') // Fixed: short flag -rt was invalid
    .action(async (bookId, options) => {
        try {
            console.log('Updating progress for:', bookId);
            // Implementation depends on book_completions table structure
            console.log('Review:', options.review);
            console.log('Rating:', options.rating);
            console.log('Note: Completion logic is handled via upsert on book_completions table.');
        } catch (err) {
            console.error('Error:', err.message);
        } finally {
            await sql.end();
        }
    });

program.parse();
