import test from 'ava';
import { strFinder } from './str-finder.js';

test('target: "hello world", pattern: "world"', t => {
    const res = strFinder('hello world', 'world');
    t.deepEqual(res, {
        prefix: 'hello ',
        init: 6,
        end: 10
    });
});

test('target: "aaxxcc", pattern: "xx"', t => {
    const res = strFinder('aaxxcc', 'xx');
    t.deepEqual(res, {
        prefix: 'aa',
        init: 2,
        end: 3
    });
});

test('target: "aaxxcc", pattern: "aa"', t => {
    const res = strFinder('aaxxcc', 'aa');
    t.deepEqual(res, {
        prefix: '',
        init: 0,
        end: 1
    });
});
