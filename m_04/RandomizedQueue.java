import java.util.Iterator;
import java.util.NoSuchElementException;

public class RandomizedQueue<Item> implements Iterable<Item> {
    private Item[] array;
    private int minCapacity;
    private int size;
    // construct an empty randomized queue
    public RandomizedQueue() {
        this.array = (Item[]) new Object[1];
        this.size = 0;
        this.minCapacity = 1;
    }

    // is the randomized queue empty?
    public boolean isEmpty() {
        return this.size == 0;
    }

    // return the number of items on the randomized queue
    public int size() {
        return this.size;
    }

    // add the item
    public void enqueue(Item item) {
        if (item == null) {
            throw new IllegalArgumentException();
        }

        if (this.size == this.array.length) {
            Item[] newArray = (Item[]) new Object[this.array.length * 2];
            for (int i = 0; i < this.array.length; i++) {
                newArray[i] = this.array[i];
            }
            this.array = newArray;
        }

        this.array[size] = item;
        size++;
    }

    // remove and return a random item
    public Item dequeue() {
        if (isEmpty()) {
            throw new NoSuchElementException();
        }
        // Remove at random
        // Take last element of array and put it in the empty spot, decrease size
        // array.length > minCapacity && size <= array.length / 4 -> half capacity of array

        return null;
    }

    // return a random item (but do not remove it)
    public Item sample() {
        if (isEmpty()) {
            throw new NoSuchElementException();
        }
        return null;
    }

    // return an independent iterator over items in random order
    public Iterator<Item> iterator() {
        return null;
    }

    // unit testing (required)
    public static void main(String[] args) {
    }

    private class Node {
        Item item;
        Node next;
        Node prev;
        Node(Item item) {
            this.item = item;
            this.next = null;
            this.prev = null;
        }
    }

    private class IteratorImpl implements Iterator<Item> {
        Item current;
        IteratorImpl(Item item) {
            this.current = item;
        }

        public boolean hasNext() {
            return this.current != null;
        }

        public Item next() {
            if (!hasNext()) {
                throw new NoSuchElementException("No more nodes in list");
            }
            return null;
        }

        public void remove() {
            throw new UnsupportedOperationException("Method remove is not supported.");
        }
    }
}