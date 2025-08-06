import { assertEquals } from "jsr:@std/assert";
import { binarySearch } from "./binary_search.ts";

Deno.test("binarySearch finds element in sorted array", () => {
  const arr = [10, 20, 30, 40, 50];
  const compareFn = (idx: number) => {
    if (arr[idx] === 30) return 0;
    return arr[idx] < 30 ? 1 : -1;
  };
  assertEquals(binarySearch(compareFn, arr.length), 2);
});

Deno.test("binarySearch returns correct index for first element", () => {
  const arr = [10, 20, 30, 40, 50];
  const compareFn = (idx: number) => {
    if (arr[idx] === 10) return 0;
    return arr[idx] < 10 ? 1 : -1;
  };
  assertEquals(binarySearch(compareFn, arr.length), 0);
});

Deno.test("binarySearch returns correct index for last element", () => {
  const arr = [10, 20, 30, 40, 50];
  const compareFn = (idx: number) => {
    if (arr[idx] === 50) return 0;
    return arr[idx] < 50 ? 1 : -1;
  };
  assertEquals(binarySearch(compareFn, arr.length), 4);
});

Deno.test("binarySearch handles element not found", () => {
  const arr = [10, 20, 30, 40, 50];
  const compareFn = (idx: number) => {
    if (arr[idx] === 25) return 0;
    return arr[idx] < 25 ? 1 : -1;
  };
  assertEquals(binarySearch(compareFn, arr.length), -1); // Assuming -1 or similar for not found
});

Deno.test("binarySearch works with a single element array (found)", () => {
  const arr = [100];
  const compareFn = (idx: number) => {
    if (arr[idx] === 100) return 0;
    return arr[idx] < 100 ? 1 : -1;
  };
  assertEquals(binarySearch(compareFn, arr.length), 0);
});

Deno.test("binarySearch works with a single element array (not found)", () => {
  const arr = [100];
  const compareFn = (idx: number) => {
    if (arr[idx] === 50) return 0;
    return arr[idx] < 50 ? 1 : -1;
  };
  assertEquals(binarySearch(compareFn, arr.length), -1);
});

Deno.test("binarySearch handles empty search space (length 0)", () => {
  const arr: number[] = [];
  const compareFn = (_idx: number) => 0; // This won't be called
  assertEquals(binarySearch(compareFn, 0), -1);
});

Deno.test("binarySearch uses startIdx correctly", () => {
  const arr = [5, 10, 15, 20, 25, 30, 35];
  // Search for 25 starting from index 3 (which is value 20)
  const compareFn = (idx: number) => {
    if (arr[idx] === 25) return 0;
    return arr[idx] < 25 ? 1 : -1;
  };
  assertEquals(binarySearch(compareFn, 4, 3), 4); // Search in [20, 25, 30, 35]
});

Deno.test("binarySearch returns -1 if target is smaller than all elements", () => {
  const arr = [10, 20, 30];
  const compareFn = (idx: number) => {
    if (arr[idx] === 5) return 0;
    return arr[idx] < 5 ? 1 : -1;
  };
  assertEquals(binarySearch(compareFn, arr.length), -1);
});

Deno.test("binarySearch returns -1 if target is larger than all elements", () => {
  const arr = [10, 20, 30];
  const compareFn = (idx: number) => {
    if (arr[idx] === 35) return 0;
    return arr[idx] < 35 ? 1 : -1;
  };
  assertEquals(binarySearch(compareFn, arr.length), -1);
});