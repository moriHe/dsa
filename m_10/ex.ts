/**
 * 1) Red-black BST with no extra memory
 * Describe how to save the memory for storing the color information
 * when implementing a red-black BST
 * A: If the platform has an 8 byte alignment requirement, then the addresses stored in the left/right pointers are a multiple of 8 and thereby end with '000'. 
 * We can use the least significant bit here and change it to our needs. A 0 represents a black node
 * '000', a 1 represents a red node '001'. When we want to use the address of left or right, we would need to mask it to make it valid again. Eg
 * '111001' AND '111000' would restore the correct address '111000'.
 */

/**
 * 2) Document search
 * Design an alogrithm that takes a sequence of n document words and a sequence of m
 * query words and find the shortest interval in which the m query words appear in the document 
 * in the order given. The length of the internal is the number of words in that interval.
 */

function docSearch(seqw: string[], quew: string[]): number | null {
    let intervals: number[] = [];
    let sptr = 0;
    let qptr = 0;
    let currinterval = 0;
    let start = 0;
    let end = 0;
    let leftright = true;
    while (sptr <= seqw.length) {
        if (qptr === quew.length) {
            end = sptr - 1;
            currinterval = 0;
            qptr--;
            sptr--;
            leftright = false;
        }

        if (qptr === -1) {
            start = sptr + 1;
            intervals.push(end - start + 1);
            currinterval = 0;
            qptr++;
            sptr = start + 1;
            leftright = true;
        }
        if (seqw[sptr] === quew[qptr]) {
            leftright ? qptr++ : qptr--;
        }

        currinterval++;
        leftright ? sptr++ : sptr--;
    }
    console.log(intervals)
    return intervals.length ? Math.min(...intervals) : null;
}
/*
const dc = ["A", "D", "W", "W", "B", "A", "C", "B", "C"];
const query = ["A", "B", "C"];

docSearch(dc, query);
*/

/**
 * 3) Generalized queue
 * Design a generalized queue data type that supports all of the following operations in logarithmic
 * time (or better) in the worst case.
 * - Create an empty data structure
 * - Append an item to the end of the queue
 * - Remove an item from the front of the queue
 * - Return the ith item in the queue
 * - Remove the ith item in the queue
 */

type QNode = {
    value: number;
    left: QNode | null;
    right: QNode | null;
    parent: QNode | null;
    color: 0 | 1;           // 0 black, 1 red
    size: number;
}

const red = 1
const black = 0

enum BRANCH_CASE {
    LL,
    LR,
    RR,
    RL,
    XX
}

function getBranchCase(root: QNode, child: QNode): BRANCH_CASE {
    if (root.right && root.right.right === child) return BRANCH_CASE.RR
    if (root.right && root.right.left === child) return BRANCH_CASE.RL
    if (root.left && root.left.left === child) return BRANCH_CASE.LL
    if (root.left && root.left.right === child) return BRANCH_CASE.LR
    return BRANCH_CASE.XX;
}

class GeneralizedQueue {
    root: QNode | null;
    constructor() {
        this.root = null;
    }

    private updateSize(node: QNode) {
        node.size = 1
            + (node.left?.size ?? 0)
            + (node.right?.size ?? 0);
    }

    private rotateLeft(root: QNode) {
        let p = root.parent;
        let r = root.right!;

        root.right = r.left;
        if (r.left !== null) r.left.parent = root;

        r.parent = p;
        root.parent = r;
        r.left = root;

        if (p !== null) {
            p.left === root ? p.left = r : p.right = r
        } else {
            this.root = r;
        }

        this.updateSize(root);
        this.updateSize(r);

    }

    private rotateRight(root: QNode) {
        let p = root.parent;
        let l = root.left!;

        root.left = l.right;
        if (l.right !== null) l.right.parent = root;

        l.parent = p;
        root.parent = l;
        l.right = root;

        if (p !== null) {
            p.left === root ? p.left = l : p.right = l;
        } else {
            this.root = l;
        }

        
        this.updateSize(root);
        this.updateSize(l);
    }

    append(value: number) {
        let newNode: QNode = {
            value,
            left: null,
            right: null,
            parent: null,
            color: black,
            size: 1
        }
        if (this.root === null) {
            this.root = newNode;
            return;
        }

        let curr: QNode | null = this.root;
        while (true) {
            curr.size = curr.size + 1;
            if (curr.right === null) break;
            curr = curr?.right;
        }

        curr.right = newNode;
        newNode.color = red;
        newNode.parent = curr;

        if (newNode.parent.color === black)
            return;

        let child = newNode;
        while (true) {
            let parent = child.parent!;
            let grandparent = child.parent!.parent!
            let uncle = grandparent.left === parent ? grandparent.right : grandparent.left;
            if (child.color === red && parent.color === red) {
                if (uncle?.color === red) {
                    uncle.color = black;
                    parent.color = black;
                    grandparent.color = red;

                    child = grandparent;
                    continue;
                } else {
                    let bcase: BRANCH_CASE = getBranchCase(grandparent, child);

                    if (bcase === BRANCH_CASE.RR) {
                        // Linksrotation am Großelternknoten
                        this.rotateLeft(grandparent) 
                    }
                    else if (bcase === BRANCH_CASE.RL) {
                        // Rechtsrotation am Elternknoten, dann Linksrotation am Großelternknoten
                        this.rotateRight(parent)
                        this.rotateLeft(grandparent)
                    } 
                    else if (bcase === BRANCH_CASE.LL) {
                        // Rechtsrotation am Großelternknoten
                        this.rotateRight(grandparent)
                    }
                    else if (bcase === BRANCH_CASE.LR) {
                        // Linksrotation am Elternknoten, dann Rechtsrotation am Großelternknoten
                        this.rotateLeft(parent)
                        this.rotateRight(grandparent)
                    }

                    if (bcase === BRANCH_CASE.RR || bcase === BRANCH_CASE.LL) {
                        parent.color = black
                    } else {
                        child.color = black;
                    }

                    grandparent.color = red;
                    break;
                }
            } else {
                break;
            }
        }

        if (this.root !== null) {
            this.root.color = black;
        }

    }

    remove(): QNode | null {
        // remove front
        let firstEl: QNode | null = this.getItemAtPos(0);
        if (firstEl === null) return null;

        if (this.root?.size === 1) {
            this.root = null;
            return firstEl;
        }

        let parent: QNode | null = firstEl.parent!
        if (firstEl.color === red) {
            parent.left === firstEl ? parent.left = null : parent.right = null;
            while(parent) {
                parent.size = parent.size - 1;
                parent = parent.parent;
            }
            firstEl.parent = null;
            return firstEl;
        }

        if (firstEl.color === black && firstEl.right !== null && firstEl.right.color === red) {
            let child = firstEl.right;
            parent.left = child;
            child.parent = parent;
            child.color = black;
            while (parent) {
                parent.size = parent.size - 1;
                parent = parent.parent;
            }
            firstEl.right = null;
            firstEl.parent = null;
            return firstEl;
        }

        // Black node gets removed
        let sibling = parent.right;
        let nearSibChild = sibling?.left;
        let farSibChild = sibling?.right;
        // Case 1 sibiling is red

        // Case 2 sibling is black, both children are black

        // Case 3 sibling is black, near child is red, far child is black

        // Case 4 sibling is black, near child is black, far child is red
    }

    getItemAtPos(i: number): QNode | null {
        // return ith item
        if (this.root === null || i < 0 || i >= this.root.size) return null;
        // remove front
        let curr: QNode | null = this.root
        while (curr !== null) {
            let leftSize = curr.left?.size ?? 0;
            if (i < leftSize) {
                curr = curr.left;
                continue;
            }

            if (i === leftSize) break;
            if (i > leftSize) {
                curr = curr.right;
                i = i - leftSize - 1;
            }
        }

        return curr;
    }

    removeAtPos() {
        // remove ith item
    }


}

const gq = new GeneralizedQueue();