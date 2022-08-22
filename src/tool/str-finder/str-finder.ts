import { StrFinderResult } from './str-finder-result.js';

export function strFinder(
    target: string,
    pattern: string
): StrFinderResult | undefined {
    if (target.length < pattern.length) {
        // Target is shortest than pattern
        return undefined;
    } else if (pattern.length === 0) {
        // Empty pattern
        return undefined;
    }

    for (let i = 0; i < target.length; i++) {
        if (target[i] === pattern[0]) {
            const ref = target.slice(i, i + pattern.length);
            if (ref === pattern) {
                return {
                    prefix: target.slice(0, i),
                    init: i,
                    end: pattern.length + i - 1
                };
            }
        }
    }

    return undefined;
}