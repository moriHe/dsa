/** 1) See ExEquals.java */



/**
 * 2) Check if a binary tree is BST
 * Given a binary tree where each Node contains a key, determine whether it is a binary search tree.
 * Use extra space proportional to the height of the tree.
 */

type N = {key: number, left: N | null, right: N | null}

function createNode(key: number, left: N | null = null, right: N | null = null): N {
    return {
        key,left,right
    }
}

function isBst(node: N | null, upperBound: number |null, lowerBound: number | null): boolean {
    if (node == null) return true;

    if (upperBound && node.key > upperBound) return false;
    if (lowerBound && node.key < lowerBound) return false;

    return isBst(node.left, node.key, lowerBound) && isBst(node.right, upperBound, node.key);
}

const t1 = createNode(
    10,
    createNode(5, createNode(2), createNode(7)),
    createNode(15, createNode(12), createNode(20))
);
console.log(isBst(t1, null, null))


/**
 * 3) Inorder traversal with constant extra space
 * Design an algorithm to perfoarm an inorder traversal of a binary search tree using
 * only a constant amount of extra space.
 */