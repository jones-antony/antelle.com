import { rm } from 'node:fs/promises';
import { join } from 'node:path';

const devOutputPath = join(process.cwd(), 'dist', 'dev');

await rm(devOutputPath, { force: true, recursive: true });

console.log('Removed development-only output from dist/dev');
