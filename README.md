# CUPS Printer

A package to print documents using __CUPS Printer Server__ in Linux. It's an __ESM__ package written in [typescript](https://www.npmjs.com/package/typescript), using [ava](https://www.npmjs.com/package/ava) as testing library.

## Installation

In your project, just type:
```bash
npm i --save cups-printer
```

## How to use

Fow now, this package only gets printers and use these devices to print documents.

```ts
import { Printer } from 'cups-printer';
import { readFile } from 'fs/promises';

// Getting all printers installed in CUPS.
const all = await Printer.all();

// Finding directly a particular printer using a delegate.
const obj = await Printer.find(x => x.name.startsWith('EPSON'));

// Printing a PDF file...
await obj.print('document.pdf');

// ...or printing a buffer.
const byte = await readFile('document.pdf');
await obj.print(byte);
```

## Typescript configuration

This package is an __ECMAScript module__, so the recommended configuration is settled using this in mind. Remember put in your `package.json`:
```json
{
    "type": "module"
}
```

The `tsconfig.json` minimum recomended configuration is:
```json
{
    "compilerOptions": {
        "target": "ES2022",
        "module": "ES2022",

        "outDir": "./dist",
        "rootDir": "./src",

        "strict": true,
        "moduleResolution": "node"
    }
}
```
