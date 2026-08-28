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

function placePivot(arr: number[], pivot: number, lo: number, hi: number) {
        let i = lo;
        let j = hi;
        let isHigh = false;
                    console.log("***")
        let matchIdx: number | null = null;
        // TODO: Problem right now is that I remember the match idx, although the place I find the match to the pivot
        // has a high chance of not being the correct partitioning position.
        // The challenge now is to find the matchidx and move it left/right if there is a higher/smaller number coming and remember that
        // shift
        while (true) {
            while (less(arr[i], pivot)) {
                if (i === hi) {
                    if (arr[i] === pivot) matchIdx = i;
                    break;
                }
                i++;
            }
            if (arr[i] > pivot && matchIdx !== null) {
                let tmp = arr[i];
                arr[i] = arr[matchIdx]
                arr[matchIdx] = tmp;
                matchIdx = i;
            }
            while (less(pivot, arr[j])) {
                if (j === lo) {
                    if (arr[j] === pivot) matchIdx = j;
                    break;
                }
                j--;
            }
            if (i <= j) break;
            if (arr[i] === pivot) {
                matchIdx = i;
                console.log("i="+i)
                i++;
            } else if (arr[j] === pivot) {
                matchIdx = j;
                console.log("j="+j)
                j--;
            } else {
                exch(arr, i, j);
            }
        }
        console.log("matchidx="+matchIdx)
                    console.log("***")
    
    return matchIdx;
}
/*
function placePivot(arr: number[], pivot: number, lo: number, hi: number) {
        let i = lo;
        let j = hi;
        let isHigh = false;
        while (true) {
            while (less(arr[i], pivot)) {
                if (i === hi) break;
                i++;
            }

            while (less(pivot, arr[j])) {
                if (j == lo) break;
                j--;
            }
            if (i >= j) break;

            if (arr[i] === pivot) {
                let tmp = arr[i];
                arr[i] = arr[lo];
                arr[lo] = tmp;
                if (i === lo) i++;
                if (i === hi) break;
            } else if (arr[j] === pivot) {
                let tmp = arr[j];
                arr[j] = arr[hi];
                arr[hi] = tmp;
                isHigh = true;
                if (j === hi) j--;
                if (j === lo) break;
            } else {
                exch(arr, i, j);
            }

    }
    console.log("ishigh="+isHigh+", hi="+hi+", lo="+lo+", j="+j)
    exch(arr, isHigh ? hi : lo, j)
    return j;
}
    */

function quickSort(arr: number[], lo: number, hi: number, pivotIdx: number, pivotArr: number[]) {
    if ((hi - lo) <= 0) {
        return;
    }


    let matchIdx = placePivot(arr, pivotArr[pivotIdx], lo, hi)
    if (matchIdx !== null) {
        let tmp = pivotArr[pivotIdx];
        pivotArr[pivotIdx] = pivotArr[matchIdx]
        pivotArr[matchIdx] = tmp;
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
    console.log("nuts : " + nuts)
    console.log("bolts: " + bolts)

    quickSort(nuts, 0, nuts.length - 1, 0, bolts)
    console.log("nuts : " + nuts)
    console.log("bolts: " + bolts)
    return [];
}

nutsAndBolts([1,5,3,2,7,8], [1,5,3,2,7,8])