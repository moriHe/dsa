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

    bubbleUpMinHeap() {
        let childIndex = this.minHeap.length - 1
        let parentIndex = Math.floor((childIndex - 1) / 2)
        while (true) {
            if (childIndex === 0) {
                return
            }
            if (this.minHeap[childIndex] >= this.minHeap[parentIndex]) {
                return;
            }
            let tmp = this.minHeap[childIndex]
            this.minHeap[childIndex] = this.minHeap[parentIndex]
            this.minHeap[parentIndex] = tmp
            childIndex = parentIndex
            parentIndex = Math.floor((childIndex - 1) / 2)
        }
    }

    bubbleDownMinHeap() {
        let parentIndex = 0
        let childIndexLeft = parentIndex * 2 + 1
        let childIndexRight = parentIndex * 2 + 2
        while (true) {
            if (childIndexLeft >= this.minHeap.length) {
                return
            }

            if (childIndexRight >= this.minHeap.length) {
                if (this.minHeap[parentIndex] <= this.minHeap[childIndexLeft]) {
                    return
                }
                let tmp = this.minHeap[parentIndex]
                this.minHeap[parentIndex] = this.minHeap[childIndexLeft]
                this.minHeap[childIndexLeft] = tmp
                return
            }
            if (this.minHeap[parentIndex] <= this.minHeap[childIndexLeft] && this.minHeap[parentIndex] <= this.minHeap[childIndexRight]) {
                return
            }
            if (this.minHeap[childIndexLeft] <= this.minHeap[childIndexRight]) {
                let tmp = this.minHeap[parentIndex]
                this.minHeap[parentIndex] = this.minHeap[childIndexLeft]
                this.minHeap[childIndexLeft] = tmp
                parentIndex = childIndexLeft
            } else {
                let tmp = this.minHeap[parentIndex]
                this.minHeap[parentIndex] = this.minHeap[childIndexRight]
                this.minHeap[childIndexRight] = tmp
                parentIndex = childIndexRight
            }
            childIndexLeft = parentIndex * 2 + 1
            childIndexRight = parentIndex * 2 + 2

        }
    }

    bubbleUpMaxHeap() {
        let childIndex = this.maxHeap.length - 1
        let parentIndex = Math.floor((childIndex - 1) / 2)
        while (true) {
            if (childIndex === 0) {
                return
            }
            if (this.maxHeap[childIndex] <= this.maxHeap[parentIndex]) {
                return;
            }
            let tmp = this.maxHeap[childIndex]
            this.maxHeap[childIndex] = this.maxHeap[parentIndex]
            this.maxHeap[parentIndex] = tmp
            childIndex = parentIndex
            parentIndex = Math.floor((childIndex - 1) / 2)
        }
    }

    bubbleDownMaxHeap() {
        let parentIndex = 0
        let childIndexLeft = parentIndex * 2 + 1
        let childIndexRight = parentIndex * 2 + 2
        while (true) {
            if (childIndexLeft >= this.maxHeap.length) {
                return
            }

            if (childIndexRight >= this.maxHeap.length) {
                if (this.maxHeap[parentIndex] >= this.maxHeap[childIndexLeft]) {
                    return
                }
                let tmp = this.maxHeap[parentIndex]
                this.maxHeap[parentIndex] = this.maxHeap[childIndexLeft]
                this.maxHeap[childIndexLeft] = tmp
                return
            }
            if (this.maxHeap[parentIndex] >= this.maxHeap[childIndexLeft] && this.maxHeap[parentIndex] >= this.maxHeap[childIndexRight]) {
                return
            }
            if (this.maxHeap[childIndexLeft] >= this.maxHeap[childIndexRight]) {
                let tmp = this.maxHeap[parentIndex]
                this.maxHeap[parentIndex] = this.maxHeap[childIndexLeft]
                this.maxHeap[childIndexLeft] = tmp
                parentIndex = childIndexLeft
            } else {
                let tmp = this.maxHeap[parentIndex]
                this.maxHeap[parentIndex] = this.maxHeap[childIndexRight]
                this.maxHeap[childIndexRight] = tmp
                parentIndex = childIndexRight
            }
            childIndexLeft = parentIndex * 2 + 1
            childIndexRight = parentIndex * 2 + 2

        }
    }

    rebalance() {
        if (this.minHeap.length > this.maxHeap.length) {
            this.maxHeap[this.maxHeap.length] = this.minHeap[0]
            this.bubbleUpMaxHeap()
            this.minHeap[0] = this.minHeap[this.minHeap.length - 1]
            this.minHeap.pop()
            this.bubbleDownMinHeap()
        } else if (this.maxHeap.length > this.minHeap.length + 1) {
            this.minHeap[this.minHeap.length] = this.maxHeap[0]
            this.bubbleUpMinHeap()
            this.maxHeap[0] = this.maxHeap[this.maxHeap.length - 1]
            this.maxHeap.pop()
            this.bubbleDownMaxHeap()
        }
    }

    insert(x: number) {
        if (this.minHeap.length === 0 && this.maxHeap.length === 0) {
            this.maxHeap[0] = x;
            return;
        }

        let maxHeap = this.median();
        if (x > maxHeap) {
            this.minHeap[this.minHeap.length] = x;
            this.bubbleUpMinHeap()
        } else { // x <= maxHeap
            this.maxHeap[this.maxHeap.length] = x;
            this.bubbleUpMaxHeap()
        }

        this.rebalance()
    }

    median(): number {
        return this.maxHeap[0]
    }

    removeMedian(): number {
        let median = this.maxHeap[0]
        this.maxHeap[0] = this.maxHeap[this.maxHeap.length - 1]
        this.maxHeap.pop()
        this.bubbleDownMaxHeap()
        this.rebalance()
        return median
    }

}

const dm = new DynamicMedian()

dm.insert(5)
console.log("expected: 5, median:", dm.median()) // 5

dm.insert(10)
console.log("expected: 5, median:", dm.median()) // 5

dm.insert(3)
console.log("expected: 5, median:", dm.median()) // 5

dm.insert(8)
console.log("expected: 5, median:", dm.median()) // 5

dm.insert(1)
console.log("expected: 5, median:", dm.median()) // 5

dm.insert(7)
console.log("expected: 5, median:", dm.median()) // 5


console.log("expected: 5, removed:", dm.removeMedian()) // 5
console.log("expected: 7, new median:", dm.median())    // 7

console.log("expected: 7, removed:", dm.removeMedian()) // 7
console.log("expected: 3, new median:", dm.median())    // 3