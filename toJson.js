import fs from 'fs';
import path from 'path';

// Define the root path
const ROOT_PATH = process.cwd();

export async function exportToJson(data, outputPath) {
  const fullPath = path.join(ROOT_PATH, outputPath);
  try {
    await fs.promises.writeFile(fullPath, data, 'utf-8');
    console.log(`Data successfully written to ${fullPath}`);
  } catch (error) {
    console.error('Error writing JSON file:', error);
    throw error;
  }
}