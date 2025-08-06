export interface SegmentTreeNode {
  childNodeCount: number;
  childNodeAt(index: number): SegmentTreeNode;
  includesTarget(): boolean;
}

export function* findTargetSegment(root: SegmentTreeNode) {
  if (!root.includesTarget()) {
    return;
  }

  let node = root;
  let parentNode: SegmentTreeNode | null = null;
  let childNodeCount = node.childNodeCount;
  let childNodeWithTargetIndex = -1;

  for (let level = 0; childNodeCount > 0; level++) {
    childNodeWithTargetIndex = -1;

    for (let i = 0; i < childNodeCount; i++) {
      if (node.childNodeAt(i).includesTarget()) {
        if (childNodeWithTargetIndex !== -1) {
          throw new Error("more than one child includes target", {
            cause: {
              level,
            },
          });
        }

        childNodeWithTargetIndex = i;
      }
    }

    if (childNodeWithTargetIndex === -1) {
      return;
    }

    yield childNodeWithTargetIndex;

    parentNode = node;
    node = node.childNodeAt(childNodeWithTargetIndex);
    childNodeCount = node.childNodeCount;
  }
}
