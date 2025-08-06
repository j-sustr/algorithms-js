

export function binarySearch(compareFn: (idx: any) => number, length: number) {
    let prevLeft = -1;
    let left = 0;
    let right = length;
    let compareResult = 0;
    
    while (left < right) {
        let currentIdx = (right + left) >> 1;
        let compareResult = compareFn(currentIdx);

        if (compareResult === 0) {
            return currentIdx;
        } else if (compareResult > 0) {
            if (left === prevLeft) {
                // The target value is not there
                return currentIdx;
            }
            prevLeft = left;
            left = currentIdx;
        } else {
            right = currentIdx;
        }
    }

    if (left === 0) {
        return -1;
    }
    return compareResult;
}