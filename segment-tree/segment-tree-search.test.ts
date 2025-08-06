import { describe, it, expect, vi } from 'vitest';
import { findTargetSegment, SegmentTreeNode } from './segment-tree-search'; // Adjust the import path as needed

class MockSegmentTreeNode implements SegmentTreeNode {
  value: string;
  children: MockSegmentTreeNode[];
  targetIncluded: boolean;

  constructor(value: string, children: MockSegmentTreeNode[] = [], includesTarget: boolean = false) {
    this.value = value;
    this.children = children;
    this.targetIncluded = includesTarget;
  }

  get childNodeCount(): number {
    return this.children.length;
  }

  childNodeAt(index: number): SegmentTreeNode {
    if (index < 0 || index >= this.children.length) {
      throw new Error(`Index out of bounds: ${index}`);
    }
    return this.children[index];
  }

  includesTarget(): boolean {
    return this.targetIncluded;
  }
}

describe('segmentTreeSearch', () => {
  // Test case 1: Basic search - target found at first level
  it('should yield the correct path when target is found at the first level', () => {
    const child1 = new MockSegmentTreeNode('child1', [], false);
    const child2 = new MockSegmentTreeNode('child2', [], true); // This child includes the target
    const child3 = new MockSegmentTreeNode('child3', [], false);
    const root = new MockSegmentTreeNode('root', [child1, child2, child3], false);

    const result = [...findTargetSegment(root)];
    expect(result).toEqual([1]); // Expecting index 1 (child2)
  });

  // Test case 2: Target found at a deeper level
  it('should yield the correct path when target is found at a deeper level', () => {
    const grandChild1 = new MockSegmentTreeNode('grandChild1', [], false);
    const grandChild2 = new MockSegmentTreeNode('grandChild2', [], true); // Target here
    const grandChild3 = new MockSegmentTreeNode('grandChild3', [], false);

    const child1 = new MockSegmentTreeNode('child1', [], false);
    const child2 = new MockSegmentTreeNode('child2', [grandChild1, grandChild2, grandChild3], false);
    child2.targetIncluded = true; // Mark child2 as including target to guide search down this path
    const child3 = new MockSegmentTreeNode('child3', [], false);

    const root = new MockSegmentTreeNode('root', [child1, child2, child3], false);

    const result = [...findTargetSegment(root)];
    expect(result).toEqual([1, 1]); // Expecting index 1 (child2), then index 1 (grandChild2)
  });

  // Test case 3: No target found in the tree
  it('should yield nothing if no target is found in the tree', () => {
    const child1 = new MockSegmentTreeNode('child1', [], false);
    const child2 = new MockSegmentTreeNode('child2', [], false);
    const root = new MockSegmentTreeNode('root', [child1, child2], false);

    const result = [...findTargetSegment(root)];
    expect(result).toEqual([]);
  });

  // Test case 4: Error when more than one child includes the target at the same level
  it('should throw an error if more than one child includes the target at the same level', () => {
    const child1 = new MockSegmentTreeNode('child1', [], true);
    const child2 = new MockSegmentTreeNode('child2', [], true); // Both child1 and child2 include target
    const root = new MockSegmentTreeNode('root', [child1, child2], false);

    expect(() => [...findTargetSegment(root)]).toThrowError('more than one child includes target');
  });

  // Test case 5: Empty tree (root has no children)
  it('should yield nothing if the root node has no children', () => {
    const root = new MockSegmentTreeNode('root', [], false);
    const result = [...findTargetSegment(root)];
    expect(result).toEqual([]);
  });

  // Test case 6: Target at root, but root has no children
  it('should yield nothing if the root includes target but has no children', () => {
    const root = new MockSegmentTreeNode('root', [], true); // Root itself includes target
    const result = [...findTargetSegment(root)];
    expect(result).toEqual([]); // The generator only yields child indices
  });

  // Test case 7: Complex path with multiple levels
  it('should yield the correct path for a complex multi-level tree', () => {
    const n3c1 = new MockSegmentTreeNode('n3c1', [], false);
    const n3c2 = new MockSegmentTreeNode('n3c2', [], true); // Target
    const n3c3 = new MockSegmentTreeNode('n3c3', [], false);

    const n2c1 = new MockSegmentTreeNode('n2c1', [], false);
    const n2c2 = new MockSegmentTreeNode('n2c2', [n3c1, n3c2, n3c3], true); // Mark as target path
    const n2c3 = new MockSegmentTreeNode('n2c3', [], false);

    const n1c1 = new MockSegmentTreeNode('n1c1', [], false);
    const n1c2 = new MockSegmentTreeNode('n1c2', [n2c1, n2c2, n2c3], true); // Mark as target path
    const n1c3 = new MockSegmentTreeNode('n1c3', [], false);

    const root = new MockSegmentTreeNode('root', [n1c1, n1c2, n1c3], false);

    const result = [...findTargetSegment(root)];
    expect(result).toEqual([1, 1, 1]);
  });

  // Test case 8: Target is the only child
  it('should yield the correct index when the target is the only child', () => {
    const child1 = new MockSegmentTreeNode('child1', [], true);
    const root = new MockSegmentTreeNode('root', [child1], false);

    const result = [...findTargetSegment(root)];
    expect(result).toEqual([0]);
  });

  // Test case 9: ChildNodeAt is called correctly
  it('should call childNodeAt with correct indices', () => {
    const child1 = new MockSegmentTreeNode('child1', [], false);
    const child2 = new MockSegmentTreeNode('child2', [], true);
    const child3 = new MockSegmentTreeNode('child3', [], false);
    const root = new MockSegmentTreeNode('root', [child1, child2, child3], false);

    const childNodeAtSpy = vi.spyOn(root, 'childNodeAt');
    const child2IncludesTargetSpy = vi.spyOn(child2, 'includesTarget');

    [...findTargetSegment(root)];

    expect(childNodeAtSpy).toHaveBeenCalledWith(0);
    expect(childNodeAtSpy).toHaveBeenCalledWith(1);
    expect(childNodeAtSpy).toHaveBeenCalledWith(2);
    expect(child2IncludesTargetSpy).toHaveBeenCalledOnce();

    childNodeAtSpy.mockRestore();
    child2IncludesTargetSpy.mockRestore();
  });
});
