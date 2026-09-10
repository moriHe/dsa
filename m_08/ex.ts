/**
 * 1) Dynamic median
 * Design a data type that supports insert in logarithmic time, find-the-median in constant time, 
 * and remove-the-median in logarithmic time. If the number of keys in the data type is even, 
 * find/remove the lower median.
 */

class DynamicMedian {
    maxHeap: number[]
    minHeap: number[]
    constructor() {
        this.maxHeap = []
        this.minHeap = []
    }

    insert(x: number) {
        /**
         * 1) compare x with maxHeap[0] (median)
         * 2) if bigger, put it in minHeap[minHeap.length], bubble up. minHeap[0] is the smallest element in minHeap
         * 3) if equal or smaller, put it in maxHeap[maxHeap.length], bubble up. maxHeap[0] is the biggest element in maxHeap
         * 4) if minHeap is larger than maxHeap, put minHeap[0] at end of maxHeap bubble up
         * 5) if maxHeap is > minHeap + 1, put maxHeap[0] at end of minHeap bubble up
         */
    }

    median(): number {
        return this.maxHeap[0]
    }

    removeMedian() {
        /**
         * 1) swap maxHeap[0] with last element
         * 2) remove last element, store it for return
         * 3) sink down maxHeap[0]
         * 4) rebalance if needed
         */
    }

}