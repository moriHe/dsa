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

// TODO: Slice ersetzen mit lo/hi indexing
function v1(a: number[], b: number[]): number {
    if (a.length === 1) {
        if (a[0] <= b[0]) return b[0]
        else return a[0]
    }
    let mid = Math.floor(a.length / 2);
    let offset = a.length % 2 === 0 ? mid : mid + 1;
    if (a[mid] < b[mid]) {
        return v1(a.slice(mid), b.slice(0, offset))
    } else if (a[mid] > b[mid]) {
        return v1(a.slice(0, offset), b.slice(mid))
    }
    
    return a[mid]
}
console.log(v1([0, 1, 2, 3, 4], [5, 6, 7, 8, 9]))
