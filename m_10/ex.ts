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