export interface SegmentTreeNode<T> {
  value: T;
  childNodeCount: number;
  childNodeAt(index: number): SegmentTreeNode<T>;
  includesTarget(): boolean;
}

export function* segmentTreeSearch<T>(
  root: SegmentTreeNode<T>
): Iterable<SegmentTreeNode<T>> {
  let node = root;
  let parentNode: SegmentTreeNode<T> | null = null;
  let childNodeWithTarget: SegmentTreeNode<T> | null = null;
  let childNodeCount = node.childNodeCount;

  for (let level = 0; childNodeCount > 0; level++) {
    childNodeWithTarget = null;

    for (let i = 0; i < childNodeCount; i++) {
      if (node.childNodeAt(i).includesTarget()) {
        if (childNodeWithTarget) {
          throw new Error("more than one child includes target", {
            cause: {
              level,
            },
          });
        }
        
        childNodeWithTarget = node;
      }
    }

    if (!childNodeWithTarget) {
      return;
    }

    yield childNodeWithTarget;

    parentNode = node;
    node = childNodeWithTarget;
    childNodeCount = node.childNodeCount;
  }
}
