import { rm, writeFile } from 'fs/promises';
import { join, resolve } from 'path';
import { randomUUID } from 'crypto';
import { tmpdir } from 'os';

import { strFinder } from './tool/str-finder/index.js';
import { cmd } from './tool/cmd/index.js';

export class Printer {
    /**
     * Gets all available printers installed locally in this device.
     */
    static async all(): Promise<Printer[]> {
        const patt = /^[^\s\\\/#\?'"]+/gi;
        const cmd1 = await cmd('lpstat', [ '-a' ]);
        const names = cmd1
            .split(/\n+/gi)
            .map(x => {
                const res = x.match(patt);
                if (!res) {
                    throw new Error('Incompatible command result.');
                } else {
                    return res[0];
                }
            });

        const cmd2 = await cmd('lpstat', [ '-v' ]);
        const resp = cmd2
            .split(/\n+/gi)
            .map(x => {
                const name = names.find(y => x.search(y) >= 0);
                if (name) {
                    const at = strFinder(x, name);
                    if (!at) {
                        return undefined;
                    }

                    const path = x
                        .slice(at.end + 1)
                        .replace(/^:\s+/gi, '');

                    return new Printer(name, path);
                } else {
                    return undefined;
                }
            })
            .filter((x: any) => x != null);

        return resp as Printer[];
    }

    /**
     * 
     * @param predicate A function to filter 
     * @returns 
     */
    static async find(
        predicate: (x: Printer, i: number) => boolean
    ): Promise<Printer | undefined> {
        const all = await Printer.all();
        return all.find(predicate);
    }

    static async some(
        predicate: (x: Printer, i: number) => boolean
    ): Promise<boolean> {
        const all = await Printer.all();
        return all.some(predicate);
    }

    readonly name: string;
    readonly path: string;

    private constructor(name: string, path: string) {
        this.name = name;
        this.path = path;

        Object.defineProperty(this, 'name', { writable: false });
        Object.defineProperty(this, 'path', { writable: false });
    }

    async print(path: string): Promise<void>;
    async print(buffer: Buffer): Promise<void>;
    async print(arg: string | Buffer): Promise<void> {
        if (typeof arg === 'string') {
            // Prints a file
            const path = resolve(arg);
            await cmd('lp', [ '-d', this.name, path ]);
        } else {
            try {
                const temp = tmpdir();
                const name = 'cups-printer-' + randomUUID();
                const path = join(temp, name);
                
                // Generate a temporal file
                await writeFile(path, arg);
                await cmd('lp', [ '-d', this.name, path ]);
                await rm(path, { force: true });
            } catch (err) {
                throw err
            }
        }
    }
}