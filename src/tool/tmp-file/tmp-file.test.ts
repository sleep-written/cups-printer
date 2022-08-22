import test from 'ava';
import { access, rm } from 'fs/promises';

import { tmpFile } from './tmp-file.js';

test.serial('Generate 10 files', async t => {
    for (let i = 0; i < 10; i++) {
        const byte = Buffer.from('');
        const path = await tmpFile(byte, 'ava-test-');
        await access(path);
        t.pass();

        await rm(path);
        try {
            await access(path);
            t.fail();
        } catch {
            t.pass();
        }
    }

    t.pass();
});