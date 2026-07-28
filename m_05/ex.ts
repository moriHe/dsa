/*
1) Intersection of two sets
Given two arrays, `a[]` and `b[]`, each containing `n` distinct 2D points in the plane, 
design a sub-quadratic algorithm to count the number of points contained in both array `a[]` and array `b[]`.
*/
type Point = [number, number];

function less(p: Point, q: Point): boolean {

    if (p[0] < q[0]) {
        return true;
    }
    if (p[0] > q[0]) {
        return false;
    }
    if (p[1] < q[1]) {
        return true;
    }
    if (p[1] > q[1]) {
        return false;
    }

    return false;
}

function exch(arr: Point[], j: number, k: number) {
    let temp = arr[j];
    arr[j] = arr[k];
    arr[k] = temp;
}

function shellSort(arr: Point[], i: number, h: number) {
    for (let j = i; j >= h && less(arr[j], arr[j-h]); j -= h) {
        exch(arr, j, j - h);
    }
}

function intersect(a: Point[], b: Point[]) {
    if (a.length !== b.length) {
        return;
    }
    let N = a.length;
    let h = 1;
    while (h < (a.length / 3)) {
        h = 3 * h + 1;
    }

    while (h >= 1) {
        for (let i = h; i < N; i++) {
            shellSort(a, i, h);
            shellSort(b, i, h);
        }
        h = Math.floor(h / 3);
    }

    let response = 0;
    let i = 0;
    let j = 0;
    while ((i < N && j < N)) {
        if (less(a[i], b[j])) i++;
        else if (less(b[j], a[i])) j++;
        else {
            response++;
            i++;
            j++;
        }
    }

    return response;
}

/*
2) Permutation
Design a sub-quadratic algorithm to determine whether two integer arrays of size n are permutations of each other—that is, 
whether they contain exactly the same entries, though possibly in a different order.
*/
function lessEx2(p: number, q: number): boolean {

    if (p < q) {
        return true;
    }
    if (p > q) {
        return false;
    }

    return false;
}

function exchEx2(arr: number[], j: number, k: number) {
    let temp = arr[j];
    arr[j] = arr[k];
    arr[k] = temp;
}

function shellSortEx2(arr: number[], i: number, h: number) {
    for (let j = i; j >= h && lessEx2(arr[j], arr[j-h]); j -= h) {
        exchEx2(arr, j, j - h);
    }
}
function permutation(a: number[], b: number[]): boolean {
    if (a?.length !== b?.length) {
        return false;
    }

    let N = a.length;
    let h = 1;
    while (h < (a.length / 3)) {
        h = 3 * h + 1;
    }

    while (h >= 1) {
        for (let i = h; i < N; i++) {
            shellSortEx2(a, i, h);
            shellSortEx2(b, i, h);
        }
        h = Math.floor(h / 3);
    }

    for (let i = 0; i < a.length; i++) {
        if (lessEx2(a[i], b[i]) || lessEx2(b[i], a[i])) {
            return false;
        }
    }
    return true;
}
/*
3) Dutch National Flag
Consider a series of n buckets, each containing a red, white, or blue pebble, and sort them by color. The permitted operations are:
- swap(i,j): Swap the pebble in bucket i with the pebble in bucket j.
- color(i): Determine the color of the stone in the bucket i

The performance requirements are as follows:
- At most n calls to color()
- At most n calls to swap()
- Constant additional space
*/
enum Color {
    RED,        // left
    WHITE,      // mid
    BLUE        // right
}

function swap(arr: Color[], i: number, j: number) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function dutchNationalFlag(arr: Color[]) {
    let low = 0;
    let mid = 0;
    let high = arr.length - 1;
    
    while (mid <= high) {
        if (arr[mid] === Color.RED) {
            swap(arr, low, mid);
            low++;
            mid++;
        } else if (arr[mid] === Color.WHITE) {
            mid++;
        } else if (arr[mid] === Color.BLUE) {
            swap(arr, mid, high);
            high--;
        }
    }
}