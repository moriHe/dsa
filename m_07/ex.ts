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

function less(a: number, b: number): boolean {
    return a < b;
}

function exch(arr: number[], a: number, b: number) {
    let tmp = arr[a];
    arr[a] = arr[b];
    arr[b] = tmp;
}

function placePivot(arr: number[], pivot: number, lo: number, hi: number): number {
       for (let i = lo; i <= hi; i++) {
            if (arr[i] === pivot) {
                let tmp = arr[lo];
                arr[lo] = arr[i];
                arr[i] = tmp;
                break;
            }
       }

        let i = lo+1;
        let j = hi;
       while (true) {
            while (less(arr[i], pivot)) {
                if (i === hi) break;
                i++;
            }
            while (less(pivot, arr[j])) {
                if (j === lo) break;
                j--;
            }

            if (i >= j) break;
            exch(arr, i, j)
       }
       exch(arr, lo, j);
       return j;
}


function quickSort(arr: number[], lo: number, hi: number, pivotIdx: number, pivotArr: number[]) {
    if ((hi - lo) <= 0) {
        return;
    }


    let matchIdx = placePivot(arr, pivotArr[pivotIdx], lo, hi)
    if (matchIdx !== null) {
        placePivot(pivotArr, arr[matchIdx], lo, hi)
        if (matchIdx > lo)        
            quickSort(arr, lo, matchIdx - 1, lo, pivotArr)
        if (matchIdx < hi)
            quickSort(arr, matchIdx + 1, hi, matchIdx+1, pivotArr)
    
    }
}

function nutsAndBolts(nuts: number[], bolts: number[]): number[] {
    fisherYates(nuts);
    fisherYates(bolts);


    quickSort(nuts, 0, nuts.length - 1, 0, bolts)

    return [];
}


/**
 * 2) Selection from two sorted arrays
 * Given two sorted arrays a[] and b[], with lengths n1 and n2, 
 * and an integer 0 ≤ k < n1 + n2, design an algorithm to find a 
 * key of rank k. The order of growth of the worst-case running time 
 * of your algorithm should be log n, where n = n1 + n2.
    * Version 1: n1 = n2 (arrays of equal length) and k = n / 2 (median).
    * Version 2: k = n / 2 (median).
    * Version 3: no restrictions.
 */

function v1(a: number[], b: number[], alo: number, ahi: number, blo: number, bhi: number): number {
    let range = ahi - alo

    if (range === 1) {
        return Math.min(
            Math.max(a[ahi], b[blo]),
            Math.max(b[bhi], a[alo])
        );
    }

    let offset = range % 2 === 0 ? 0 : 1;
    let amid = alo + Math.floor(range / 2); // 3 + 0
    let bmid = blo + Math.floor(range / 2); // 0 + 0
    if (a[amid] < b[bmid]) {
        return v1(a, b, amid, ahi, blo, bmid+offset)
    } else if (a[amid] > b[bmid]) {
        return v1(a, b, alo, amid+offset, bmid, bhi)
    }
    
    return a[amid]
}

function v2(a: number[], b: number[]): number {
    let k = a.length + b.length
    
    return 0;
}

console.log(v2([0,1,2,3,4], [5,6,7,8,9,10,11,12,13]))
// 0,1,2,3,4,5,6,7