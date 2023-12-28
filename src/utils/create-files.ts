import { writeFile } from 'fs-extra';
import { join } from 'path';

export type File = {
  path: string;
  cwd: string;
  content?: string;
};

export function createFiles(files: File[]) {
  files.forEach((file) => {
    writeFile(join(file.cwd, file.path), file.content || '', 'utf8', (err) => {
      if (err) {
        throw err;
      }
    });
  });
}
