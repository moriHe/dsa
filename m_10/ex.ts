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

class GeneralizedQueue {
    root: QNode | null;
    constructor() {
        this.root = null;
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
        let parent = newNode.parent!;
        let grandparent = newNode.parent.parent!
        let uncle = grandparent.left === parent ? grandparent.right : grandparent.left;

        // Cases new
        // 1) parent left child, leaf left child -> right rotation
        // 2) parent right child, leaf right child -> left rotation
        // 3) parent left child, leaf right child -> left right rotation
        // 4) parent right child, leaf left child -> right left rotation
        // https://www.youtube.com/watch?v=IuG3WSaDumc

        // Important. The grandparent has to pay 
        if (child === parent.left) {
            if (grandparent.left === parent) {
                // 1) right rotation
            } else {
                // 4) right left rotation
            }
        } else {
            if (grandparent.left === parent) {
                // 3) left right rotation
            } else {
                // 2) left rotation
            }
        }
        // Cases
        // 1) parent and uncle are red: Make great parent red, make parent and uncle black
        if (parent.color === red && uncle?.color === red) {
            if (grandparent.parent != null) grandparent.color = red;
            parent.color = black;
            uncle.color = black;
        }
        // 2) child red right, parent red, uncle black: left rotation. child is now parent, parent is left child, left child is right child. Then 3
        if (parent.right === child && parent.color === red && (uncle?.color === black || uncle === null)) {
            child.left = parent;
        }
        // 3) child red left, parent red. parent gets black. grandparent gets red. parent new grandparent.
        // grandparent right child parent. parent's child new left child. grandparent right child still grandparent right child. 
        // parent right child new grandparent left child

    }

    remove() {
        // remove front
    }

    getItemAtPos() {
        // return ith item
    }

    removeAtPos() {
        // remove ith item
    }


}

const gq = new GeneralizedQueue();