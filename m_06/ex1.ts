/*
1. Merge with a smaller auxiliary array
Assuming that the subarray a[0] to a[n-1] is sorted as well as the subarray a[n] to a[2*n-1].
How can you merge the two subarrays, so that a[0] to a[2*n-1] is sorted via an auxiliary array of length
n instead of 2n?
*/
function mergeWithOneAuxArray(sortedArray: number[]) {
    let n = Math.floor(sortedArray.length / 2);
    let aux = sortedArray.slice(n);

    let p = 0;
    let q = 0;
    while (p < sortedArray.length) {
        if (p >= n) {
            sortedArray[p] = aux[q];
            p++;
            q++;
        }
    }
}