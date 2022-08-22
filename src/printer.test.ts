import test from 'ava';
import { readFile } from 'fs/promises';
import { Printer } from './printer.js';

test('Get all printers', async t => {
    const res = await Printer.all();
    const err = res.some(x => !(x instanceof Printer));
    t.false(err);
});

test('Find a printer', async t => {
    const obj = await Printer.find(x => x.name.startsWith('EPSON'));
    t.true(obj != null);
});

test('Print a voucher (using path)', async t => {
    const obj = await Printer.find(x => x.name.startsWith('EPSON'));
    if (obj) {
        await obj.print('test.pdf');
        t.pass();
    } else {
        t.fail();
    }
});

test('Print a voucher (using buffer)', async t => {
    const obj = await Printer.find(x => x.name.startsWith('EPSON'));
    if (obj) {
        const byte = await readFile('test.pdf');
        await obj.print(byte);
        t.pass();
    } else {
        t.fail();
    }
});
