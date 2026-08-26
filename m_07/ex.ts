/**
 * 1) Nuts and Bolts.
 *
 * A disorganized carpenter has a mixed pile of n nuts and n bolts.
 * The goal is to find the corresponding pairs of nuts and bolts.
 *
 * Each nut fits exactly one bolt, and each bolt fits exactly one nut.
 * By fitting a nut and a bolt together, the carpenter can determine
 * which one is larger, but cannot compare two nuts or two bolts directly.
 *
 * Design an algorithm for this problem that uses at most a number of
 * comparisons proportional to n log n (probabilistically).
 */

function fisherYates(arr: number[]) {
    if (!arr) {
        return null;
    }
        for (let i = 0; i < arr.length; i++) {
        let j = Math.floor(Math.random() * (arr.length - i) + i);
        let temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
}

function nutsAndBolts(nuts: number[], bolts: number[]) {
    fisherYates(nuts);
    fisherYates(bolts);


    let lo = 0;
    let hi = bolts.length - 1;
    let lt = lo;
    let gt = hi;
    let i = lo;
    while (i < gt) {
        if (bolts[i] < nuts[0]) {

        }
    }
}