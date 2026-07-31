/*
1. Merge with a smaller auxiliary array
Assuming that the subarray a[0] to a[n-1] is sorted as well as the subarray a[n] to a[2*n-1].
How can you merge the two subarrays, so that a[0] to a[2*n-1] is sorted via an auxiliary array of length
n instead of 2n?
*/
function mergeWithOneAuxArray(sortedArray: number[]) {
    let n = Math.floor(sortedArray.length / 2);
    let aux = sortedArray.slice(0, n);

    let p = n;
    let q = 0;
    let i = 0;
    while (i < sortedArray.length) {
        if (p === sortedArray.length) {
            sortedArray[i] = aux[q];
            i++;
            q++;
            continue;
        } else if (q === aux.length) {
            sortedArray[i] = sortedArray[p];
            i++;
            p++;
            continue;
        } else if (sortedArray[p] <= aux[q]) {
            sortedArray[i] = sortedArray[p];
            i++;
            p++;
            continue;
        } else if (sortedArray[p] > aux[q]) {
            sortedArray[i] = aux[q];
            i++;
            q++;
            continue;
        }
    }
}