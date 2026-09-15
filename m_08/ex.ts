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


/**
 * 3) Taxicab numbers
 * A taxicab number is an integer that can be expressed as the sum of two cubes of positive integers in 
 * two different ways: a³ + b³ = c³ + d³. For example, 1729 is the smallest taxicab number:
 * 9³ + 10³ = 1³ + 12³. Design an algorithm to find all taxicab numbers with a, b, c and d less than n.
 * - Version 1: Use time proportional to n² log n and space proporional to n².
 * - Version 2: Use time proportional to n² log n and space proportional to n.
 */

type El = {
    sum: number,
    a: number,
    b: number
}

type ABCD = {
    a: number,
    b: number,
    c: number,
    d: number
}

function merge(arr: El[], left: number, mid: number, right: number) {
    const n1 = mid - left + 1
    const n2 = right - mid

    const L = new Array<El>(n1)
    const R = new Array<El>(n2)

    for (let i = 0; i < n1; i++) {
        L[i] = arr[left + i]
    }

    for (let j = 0; j < n2; j++) {
        R[j] = arr[mid + 1 + j]
    }

    let i = 0, j = 0
    let k = left
    while (i < n1 && j < n2) {
        if (L[i].sum <= R[j].sum) {
            arr[k] = L[i]
            i++
        } else {
            arr[k] = R[j]
            j++
        }
        k++
    }

    while (i < n1) {
        arr[k] = L[i]
        i++
        k++
    }

    while (j < n2) {
        arr[k] = R[j]
        j++
        k++
    }
}

function mergeSort(arr: El[], left: number, right: number) {
    if (left >= right) {
        return;
    }
    const mid = Math.floor(left + (right - left) / 2)
    mergeSort(arr, left, mid)
    mergeSort(arr, mid + 1, right)
    merge(arr, left, mid, right)
}

function taxicabNumbersV1(n: number): ABCD[] {
    let els: El[] = []
    for (let i = 1; i < n-1; i++) {
        for (let j = i + 1; j < n; j++) {
            els.push({
                sum: i*i*i + j*j*j,
                a: i,
                b: j
            })
        }
    }
    
    mergeSort(els, 0, els.length - 1)

    let resp: ABCD[] = []
    let candidate: El = els[0]
    let found = false
    for (let i = 1; i < els.length; i++) {
        if (candidate.sum === els[i].sum) {
            if (found)
                continue
            found = true
            resp.push({
                a: candidate.a,
                b: candidate.b,
                c: els[i].a,
                d: els[i].b
            })
        } else {
            candidate = els[i]
            found = false
        }
    }
    return resp;
}

function bubbleUp(arr: El[]) {
    let childIndex = arr.length - 1
    let parentIndex = Math.floor((childIndex - 1) / 2)
    while (true) {
        if (childIndex === 0)
            break

        if (arr[childIndex].sum < arr[parentIndex].sum) {
            let tmp = arr[childIndex]
            arr[childIndex] = arr[parentIndex]
            arr[parentIndex] = tmp
            childIndex = parentIndex
            parentIndex =  Math.floor((childIndex - 1) / 2)
        } else {
            break
        }

    }
}

function bubbleDown(arr: El[]) {
    let parentIndex = 0


    while (true) {
        let childIndexLeft = 2 * parentIndex + 1
        let childIndexRight = 2 * parentIndex + 2
        if (childIndexLeft > arr.length - 1) {
            break
        }
        if (childIndexRight > arr.length - 1) {
            if (arr[parentIndex].sum <= arr[childIndexLeft].sum) {
                break
            } else {
                let tmp = arr[childIndexLeft]
                arr[childIndexLeft] = arr[parentIndex]
                arr[parentIndex] = tmp
                parentIndex = childIndexLeft
                continue
            } 
        }

        if (arr[parentIndex].sum <= arr[childIndexLeft].sum && arr[parentIndex].sum <= arr[childIndexRight].sum) {
            break;
        }

        if (arr[childIndexLeft] <= arr[childIndexRight]) {
            let tmp = arr[childIndexLeft]
            arr[childIndexLeft] = arr[parentIndex]
            arr[parentIndex] = tmp
            parentIndex = childIndexLeft
        } else {
            let tmp = arr[childIndexRight]
            arr[childIndexRight] = arr[parentIndex]
            arr[parentIndex] = tmp
            parentIndex = childIndexRight
        }

    }
}

function taxicabNumbersV2(n: number) {
    let els: El[] = []
    for (let i = 1; i < n; i++) {
        let j = i+1
        els.push({
            sum: i*i*i + j*j*j,
            a: i,
            b: j
        })
    }

    let end = false
    let resp: ABCD[] = []
    let currentSum = 0
    while (!end) {
        if (els.length === 1) {
            break
        }
        if (els[0].sum === currentSum) {
            let tmp = els[0]
            els[0] = els[els.length - 1]
            let nextA = tmp.a + 1
            let nextB = tmp.b + 1
            if (nextA < n - 2) {
                els[els.length - 1] = {
                    sum: nextA * nextA * nextA + nextB * nextB * nextB,
                    a: nextA,
                    b: nextB
                }
            }

            bubbleUp(els)
        }

        if (els[0].sum === els[1].sum) {
            resp.push({
                a: els[0].a,
                b: els[0].b,
                c: els[1].a,
                d: els[1].b
            })
        }
    }
}