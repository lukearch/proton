export type File = {
    path: string;
    cwd: string;
    content?: string;
};
export declare function createFiles(files: File[]): void;
