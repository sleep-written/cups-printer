import test from 'ava';
import { cmd } from './cmd.js';

test('exec: "echo hello world"', async t => {
    const msg = await cmd('echo', [ 'hello', 'world' ]);
    t.is(msg, 'hello world');
});

test('exec: "echo ñññ"', async t => {
    const msg = await cmd('echo', [ 'ñññ' ]);
    t.is(msg, 'ñññ');
});

test('exec: "node -v"', async t => {
    const msg = await cmd('node', [ '-v' ]);
    t.is(msg, process.version);
});

test('exec: "mkdir -ñññ"', async t => {
    try {
        await cmd('mkdir', [ '-ñññ' ], { encoding: 'utf-8' });
        throw new Error('JjajajJA');
    } catch (err: any) {
        const msg = (err?.message ?? '') as string;
        t.true(msg.startsWith('mkdir: invalid option'));
    }
});