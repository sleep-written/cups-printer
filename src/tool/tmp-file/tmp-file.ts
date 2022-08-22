import { access, writeFile } from 'fs/promises';
import { randomUUID } from 'crypto';
import { tmpdir } from 'os';
import { join } from 'path';

export async function tmpFile(data: Buffer, prefix?: string, ext?: string): Promise<string> {
    while (true) {
        // Build path
        let name = (prefix ?? '') + randomUUID();
        if (typeof ext === 'string') {
            name += '.';
            name += ext.replace(/^\./gi, '');
        }

        const path = join(tmpdir(), name);

        try {
            // Check existence
            await access(path);
        } catch {
            // Write file
            await writeFile(path, data);
            return path;
        }
    }
}
