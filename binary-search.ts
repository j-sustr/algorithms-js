

export function binarySearch(compareFn: (idx: any) => number, length: number, startIdx = 0) {
    let left = startIdx;
    let right = startIdx + length;
    let compareResult = 0;
    
    while (left < right) {
        let currentIdx = (right - left) >> 1;
        let compareResult = compareFn(currentIdx);

        if (compareResult === 0) {
            return currentIdx;
        } else if (compareResult > 0) {
            left = currentIdx;
        } else {
            right = currentIdx;
        }
    }

    return compareResult;
}