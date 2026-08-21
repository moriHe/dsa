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

/*
2) Conunt of inversions
A inversion in an array a[0] is a pair of entries a[i] and a[j], where i < j and a[i] > a[j]. 
Design a linearairthmetic algorithm (O n log n) for an array to count the number of inversions.
*/
function merge(arr: number[], left: number, mid: number, right: number): number {
    let count = 0;
    const n1 = mid - left + 1;
    const n2 = right - mid;

    const L = new Array(n1);
    const R = new Array(n2);

    for (let i = 0; i < n1; i++) {
        L[i] = arr[left + i];
    }
    for (let j = 0; j < n2; j++) {
        R[j] = arr[mid + 1 + j]
    }

    let i = 0, j = 0;
    let k = left;

    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            count = count + n1 - i;
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }

    return count;
}
function mergeSort(arr: number[], left: number, right: number): number {
    if (left >= right) {
        return 0;
    }

    const mid = Math.floor(left + (right - left) / 2);
    let countLeft = mergeSort(arr, left, mid);
    let countRight = mergeSort(arr, mid + 1, right);
    let finalCount = merge(arr, left, mid, right);
    return countLeft + countRight + finalCount;
}

/*
3) Shuffling a linked list
Take a simple linked list with n elements and shuffle the elements evenly at random.
Your algorithm should use a logarithmic (or constant) amount of additional memory and run in time
proportional to n log n in the worst case
*/

type ListNode<T> = {
    value: T;
    next: ListNode<T> | null;
}

function mergeEx3<T>(left: ListNode<T> | null, amountLeft: number, right: ListNode<T> | null, amountRight: number): ListNode<T> | null {
    if (left === null) {
        return right;
    } else if (right === null) {
        return left;
    }
    let firstNode: ListNode<T> | null = null;
    let current: ListNode<T> | null = null;
    let currentRight: ListNode<T> | null = right;
    let currentLeft: ListNode<T> | null = left;

    while ((amountLeft + amountRight) !== 0) {
        const leftChance = amountLeft / (amountLeft + amountRight);
        const takeLeft = Math.random() < leftChance;
        const winner = takeLeft ? currentLeft : currentRight;
        if (firstNode === null) {
            firstNode = winner;
            current = winner;

            if (takeLeft && currentLeft) {
                currentLeft = currentLeft.next;
                amountLeft--;
            } else if (currentRight) {
                currentRight = currentRight.next;
                amountRight--;
            }
        } else if (current) {
            if (takeLeft && currentLeft) {
                currentLeft = currentLeft.next;
                amountLeft--;
            } else if (currentRight) {
                currentRight = currentRight.next;
                amountRight--;
            }
            current.next = winner;
            current = winner;
        } else {
            console.log(current)
            console.log("Error somewhere")
        }
        


    }
    return firstNode;
}

function shuffleLinkedList<T>(node: ListNode<T>, elements: number): ListNode<T> | null {
    if (elements === 1) {
        return node;
    }

    const mid = Math.floor(elements / 2);
    const isEven = elements % 2 === 0;

    let prevNode: ListNode<T> | null = null;
    let currentNode: ListNode<T> | null = node;
    for (let i = 0; i < mid; i++) {
        prevNode = currentNode;
        currentNode = currentNode.next;
        if (i === (mid - 1) && currentNode) {
            prevNode.next = null;
        }

        if (currentNode === null) {
            console.log("Error in the for loop, index=" + i);

            return currentNode;
        }

    }

    const left = shuffleLinkedList(node, mid);
    const right = shuffleLinkedList(currentNode, (isEven ? mid : (mid + 1)));

    return mergeEx3(left, mid, right, (isEven ? mid : mid + 1));
}

const testList: ListNode<number> = {
  value: 7,
  next: {
    value: 2,
    next: {
      value: 11,
      next: {
        value: 4,
        next: {
          value: 13,
          next: {
            value: 1,
            next: {
              value: 9,
              next: {
                value: 5,
                next: {
                  value: 12,
                  next: {
                    value: 3,
                    next: {
                      value: 8,
                      next: {
                        value: 6,
                        next: {
                          value: 10,
                          next: null,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

let shuffled = shuffleLinkedList(testList, 13);
console.log(shuffled)
while (shuffled && shuffled.next) {
    console.log(shuffled.next)
    shuffled = shuffled?.next;
}
console.log(shuffled);