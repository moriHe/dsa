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

/**
 * 2) Randomized priority queue
 * Describe how to add the methods sample() and delRandom() to our binary heap implementation.
 * The two methods return a key that is chosen uniformly at random among the remaining keys,
 * with the latter method also removing that key. The sample() method should take
 * constant time; the delRandom() method should take logarithmic time. Do not worry about resizing
 * the underlying array.
 */

class PriorityQueue {
    heap: number[]
    freeidx: number

    constructor() {
        this.heap = []
        this.freeidx = 0
    }

    insert(x: number) {
        this.heap[this.freeidx] = x
        this.freeidx++
        this.bubbleUp(this.freeidx - 1)

    }

    bubbleUp(childIndex: number) {
        let parentIndex = Math.floor((childIndex - 1) / 2)
        while (true) {
            if (childIndex === 0)
                break

            if (this.heap[childIndex] < this.heap[parentIndex]) {
                let tmp = this.heap[childIndex]
                this.heap[childIndex] = this.heap[parentIndex]
                this.heap[parentIndex] = tmp
                childIndex = parentIndex
                parentIndex =  Math.floor((childIndex - 1) / 2)
            } else {
                break
            }

        }
    }

    bubbleDown(parentIndex: number) {
        while (true) {
            let childIndexLeft = 2 * parentIndex + 1
            let childIndexRight = 2 * parentIndex + 2
            if (childIndexLeft > this.freeidx - 1) {
                break
            }

            if (childIndexRight > this.freeidx - 1) {
                if (this.heap[childIndexLeft] < this.heap[parentIndex]) {
                    let tmp = this.heap[childIndexLeft]
                    this.heap[childIndexLeft] = this.heap[parentIndex]
                    this.heap[parentIndex] = tmp
                }

                break;
            }

            if (this.heap[parentIndex] <= this.heap[childIndexLeft] && this.heap[parentIndex] <= this.heap[childIndexRight]) {
                break;
            }
            
            if (this.heap[childIndexLeft] <= this.heap[childIndexRight]) {
                let tmp = this.heap[childIndexLeft]
                this.heap[childIndexLeft] = this.heap[parentIndex]
                this.heap[parentIndex] = tmp
                parentIndex = childIndexLeft
            } else {
                let tmp = this.heap[childIndexRight]
                this.heap[childIndexRight] = this.heap[parentIndex]
                this.heap[parentIndex] = tmp
                parentIndex = childIndexRight
            }
        }
    }

    getRandomIndex() {
        return Math.floor(Math.random() * this.freeidx)
    }

    sample() {
        return this.heap[this.getRandomIndex()]
    }

    delRandom() {
        let randomIndex = this.getRandomIndex()
        let resp = this.heap[randomIndex]
        this.heap[randomIndex] = this.heap[this.freeidx - 1]
        this.freeidx--
        if (randomIndex < this.freeidx) {
            this.bubbleUp(randomIndex)
            this.bubbleDown(randomIndex)
        }
        return resp
    }
}