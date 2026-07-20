// 1)
// Find all unique triples in an array of ints that sum up to a specific target 
// Should be O(n²)

function threeSum(arr: number[], target: number): number[][] {
    const sorted = arr.sort((a,b) => a - b);
    const results: number[][] = []
    for (let i = 0; i < sorted.length; i++) {
        if (i > 0 && sorted[i] == sorted[i - 1]) {
            continue;
        }

        let left = i + 1;
        let right = sorted.length - 1;
        
        while (left < right) {
            const sum = sorted[i] + sorted[left] + sorted[right];

            if (sum === target) {
                results.push([sorted[i], sorted[left], sorted[right]])
                left++;
                right--;

                while (left < right && sorted[left] === sorted[left - 1]) left++;
                while (left < right && sorted[right] === sorted[right + 1]) right--;
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }

        }

    }
    return results;
}

// 2)
// Does a number exist in a bitonic array
function hasNumberInBitonicArray(arr: number[], num: number): boolean {
    let low = 0;
    let high = arr.length - 1;
    // [8, 10, 5, 3, 1] -> low = 0, high = 4, mid = 2
    // 5 -> 3 ? else block high = mid = 2
    // low = 0 < high = 2
    // mid = 1
    // 10 -> 5 ? else block high = mid = 1
    // mid = 0
    // 8 -> 10 ? low = 0 + 1
    // low = high end
    while (low < high) {
        let mid = Math.floor((low + high) / 2);
        if (arr[mid] < arr[mid + 1]) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }

    let floor = 0;
    let peak = low;

    while (floor <= peak) {
        let mid = Math.floor((floor + peak) / 2);
        if (arr[mid] === num) return true;
        if (arr[mid] < num) {
            floor = mid + 1;
        } else {
            peak = mid - 1;
        }
    }

    floor = low + 1;
    peak = arr.length - 1;

    while (floor <= peak) {
        let mid = Math.floor((floor + peak) / 2);
        if (arr[mid] === num) return true;
        if (arr[mid] > num) {
            floor = mid + 1;
        } else {
            peak = mid - 1;
        }
    }

    return false;
}

// 3)
// Version 0: 1 egg, <= T throws

function burstEgg(s: number): boolean {
    return Math.random() < 0.5;
}
function linearSearch(n: number): number {
    let currentStory = 0;
    for (currentStory = 1; currentStory <= n; currentStory++) {
        if (burstEgg(currentStory)) {
            return currentStory;
        }
    }

    return n;
}

// Version 1: 1 lg n eggs, ~ 1 lg n throws
// low is in this version and 2^k-1 in version 2
function divideConquer(low = 1, high: number): number {
    while (low < high) {
        let mid = Math.floor((low + high) / 2);
        if (burstEgg(mid)) {
            high = mid;
        } else {
            low = mid + 1;
        }
    }

    return low;
}

// Version 2: lg T eggs, ~ 2 lg T throws
function findRange(n: number): [number, number] {
    let low = 1;
    let high = 1;
    while (!burstEgg(high)) {
        low = high;
        high = high * 2;
        if (high > n) {
            high = n;
            break;
        }
    }
    return [low, high];
}
function expoSearch(n: number): number {
    let [low, high] = findRange(n);
    return divideConquer(low, high);
}

// Version 3: 2 eggs, ~ 2 square root of n throws
function squareRootDecomp(n: number): number {
    const k = Math.floor(Math.sqrt(n));
    let lastSafeFloor = 0;
    let currentFloor = 0;
    while (currentFloor < n) {
        currentFloor += k;

        if (burstEgg(currentFloor)) {
            for (let i = lastSafeFloor + 1; i < currentFloor; i++) {
                if (burstEgg(i)) {
                    return i;
                }
            }
            return currentFloor;
        }

        lastSafeFloor = currentFloor;
    }

    for (let i = lastSafeFloor + 1; i <= n; i++) {
        if (burstEgg(i)) {
            return i;
        }
    }

    return n;
}

// Version 4: 2 eggs, throws <= c square root T
function adaptiveSearch(n: number): number {
    let k = 0
    let totalFloors = 0;
    while (totalFloors < n) {
        k++;
        totalFloors +=k;
    }

    let currentFloor = 0;

    while (k > 0) {
        let nextFloor = currentFloor + k;
        
        if (nextFloor > n) {
            nextFloor = n;
        }

        if (burstEgg(nextFloor)) {
            break;
        }

        currentFloor = nextFloor;
        k--;
    }

    for (let f = currentFloor + 1; f <= n; f++) {
        if (burstEgg(f)) {
            return f;
        }
    }

    return -1;
}