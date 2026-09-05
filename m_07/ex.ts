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

function v12and3(a: number[], b: number[], k: number, baseAIndex: number, baseBIndex: number): number {
    // k = index of searched element in combined array
    // k + 1 = nth element of the array
    // eg k = 3 -> search for ab[3] which is the 4th element
    let n = k+1
    let nleft = Math.floor(n / 2)
    let nleftindex = nleft - 1
    let nright = n - nleft
    let nrightindex = nright - 1

    if (k === 0) {
        console.log(baseAIndex, baseBIndex)
        if (baseAIndex > a.length - 1) return b[baseBIndex]
        if (baseBIndex > b.length - 1) return a[baseAIndex]
        return Math.min(a[baseAIndex], b[baseBIndex])
    }

    console.log("Before")
    console.log(baseAIndex, nleftindex, baseBIndex, nrightindex)
    if (baseAIndex > a.length - 1) {
        return b[baseBIndex + k]
    } else if (baseBIndex > b.length - 1) {
        return a[baseAIndex + k]
    }
    if((baseAIndex + nleftindex) > a.length - 1) {
        console.log("x")
        console.log(nleft, a.length, baseAIndex)
        let tmp = nleft - (a.length - baseAIndex)
        nleft = tmp
        nright = nright + tmp
        nleftindex = nleft - 1
        nrightindex = nright - 1
        console.log("xx")
        
    } else if ((baseBIndex + nrightindex) > b.length - 1) {
        console.log("y")
        let tmp = nright - (b.length - baseBIndex)
        nright = tmp
        nleft = nleft + tmp
        nleftindex = nleft - 1
        nrightindex = nright - 1
    }
    console.log("After")
    console.log(baseAIndex, nleftindex, baseBIndex, nrightindex)
    if (a[baseAIndex + nleftindex] < b[baseBIndex + nrightindex]) {
        baseAIndex = baseAIndex + nleft
        n = n - nleft
        k = n - 1
        
        return v12and3(a, b, k, baseAIndex, baseBIndex)
    } else if (a[baseAIndex + nleftindex] > b[baseBIndex + nrightindex]) {
        baseBIndex = baseBIndex + nright
        n = n - nright
        k = n - 1
        return v12and3(a, b, k, baseAIndex, baseBIndex)
    } else {
        console.log("Here")
        console.log(baseAIndex, nleftindex)
        return a[baseAIndex+nleftindex]
    }

}
// console.log(v12and3([0,1,5,7,9], [2,6,8,10,11,12,13,14,15], 7, 0, 0))

/**
 * 3) Decimal Dominants
 * Design an algorithm for an array of n keys that finds all values that occure more than n / 10 times.
 * The expected running time of your algorithm should be linear
 */

function decimalDominants(arr: number[], k: number): number[] {
    let threshold = Math.floor(arr.length / k)
    let candidates: Record<string, number> = {}
    let nc = 0
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] in candidates) {
            candidates[arr[i]] = candidates[arr[i]] + 1
            continue
        }
        if (nc < threshold) {
            candidates[arr[i]] = 1

            nc++
            continue
        }
        for (const key in candidates) {
            let v = candidates[key] - 1
            if (v === 0) {
                delete candidates[key]
                nc--
            } else {
                candidates[key] = v
            }
        }

    }
    let result: number[] = []
    let secondRound: Record<string,number> = {}
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] in candidates) {
            if (!(arr[i] in secondRound)) {
                secondRound[arr[i]] = 0
            }
            secondRound[arr[i]] = secondRound[arr[i]] + 1
        }
    }
    for (const key in secondRound) {
        if (secondRound[key] > threshold) {
            result.push(parseInt(key))
        }
    }
    return result
}

decimalDominants([
    1,1,1,1,1,1,1,1,1,1,1,
    2,2,2,2,2,2,2,2,2,2,2,
    3,3,3,3,3,3,3,3,3,3,
    4,4,4,4,4,
    5,5,5,5,5,5,5,5,
    6,6,6,6,
    7,7,7,7,7,7,7,7,7,7,7,7,
    8,8,8,8,8,8,
    9,9,9,9,9,9,
], 10)