import { test, expect } from 'vitest';
import { binarySearch } from './binary-search.ts';

test('binarySearch finds element in sorted array', () => {
  const arr = [10, 20, 30, 40, 50];
  const compareFn = (idx) => {
    if (arr[idx] === 30) return 0;
    return arr[idx] < 30 ? 1 : -1;
  };
  expect(binarySearch(compareFn, arr.length)).toBe(2);
});

test('binarySearch returns correct index for first element', () => {
  const arr = [10, 20, 30, 40, 50];
  const compareFn = (idx) => {
    if (arr[idx] === 10) return 0;
    return arr[idx] < 10 ? 1 : -1;
  };
  expect(binarySearch(compareFn, arr.length)).toBe(0);
});

test('binarySearch returns correct index for last element', () => {
  const arr = [10, 20, 30, 40, 50];
  const compareFn = (idx) => {
    if (arr[idx] === 50) return 0;
    return arr[idx] < 50 ? 1 : -1;
  };
  expect(binarySearch(compareFn, arr.length)).toBe(4);
});

test('binarySearch handles element not found', () => {
  const arr = [10, 20, 30, 40, 50];
  const compareFn = (idx) => {
    if (arr[idx] === 25) return 0;
    return arr[idx] < 25 ? 1 : -1;
  };
  expect(binarySearch(compareFn, arr.length)).toBe(-1);
});

test('binarySearch works with a single element array (found)', () => {
  const arr = [100];
  const compareFn = (idx) => {
    if (arr[idx] === 100) return 0;
    return arr[idx] < 100 ? 1 : -1;
  };
  expect(binarySearch(compareFn, arr.length)).toBe(0);
});

test('binarySearch works with a single element array (not found)', () => {
  const arr = [100];
  const compareFn = (idx) => {
    if (arr[idx] === 50) return 0;
    return arr[idx] < 50 ? 1 : -1;
  };
  expect(binarySearch(compareFn, arr.length)).toBe(-1);
});

test('binarySearch handles empty search space (length 0)', () => {
  const arr = [];
  const compareFn = () => 0;
  expect(binarySearch(compareFn, 0)).toBe(-1);
});

test('binarySearch uses startIdx correctly', () => {
  const arr = [5, 10, 15, 20, 25, 30, 35];
  const compareFn = (idx) => {
    if (arr[idx] === 25) return 0;
    return arr[idx] < 25 ? 1 : -1;
  };
  expect(binarySearch(compareFn, 4, 3)).toBe(4);
});

test('binarySearch returns -1 if target is smaller than all elements', () => {
  const arr = [10, 20, 30];
  const compareFn = (idx) => {
    if (arr[idx] === 5) return 0;
    return arr[idx] < 5 ? 1 : -1;
  };
  expect(binarySearch(compareFn, arr.length)).toBe(-1);
});

test('binarySearch returns -1 if target is larger than all elements', () => {
  const arr = [10, 20, 30];
  const compareFn = (idx) => {
    if (arr[idx] === 35) return 0;
    return arr[idx] < 35 ? 1 : -1;
  };
  expect(binarySearch(compareFn, arr.length)).toBe(-1);
});