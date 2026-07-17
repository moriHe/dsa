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