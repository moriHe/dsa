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
        int rand = (int)(Math.random() * this.size);
        Item val = this.array[rand];
        this.size--;
        this.array[rand] = this.array[size];
        this.array[size] = null;
        if (array.length > minCapacity && this.size <= this.array.length / 4) {
            Item[] newArray = (Item[]) new Object[this.array.length / 2];
            for (int i = 0; i < this.size; i++) {
                newArray[i] = this.array[i];
            }
            this.array = newArray;
        }
        return val;
    }

    // return a random item (but do not remove it)
    public Item sample() {
        if (isEmpty()) {
            throw new NoSuchElementException();
        }
        
        int rand = (int)(Math.random() * this.size);
        return this.array[rand];
    }

    // return an independent iterator over items in random order
    public Iterator<Item> iterator() {
        return new IteratorImpl(this.array, this.size);
    }

    // unit testing (required)
    public static void main(String[] args) {
        RandomizedQueue<Integer> queue = new RandomizedQueue<Integer>();
        queue.enqueue(1);
        queue.enqueue(3);
        queue.enqueue(5);
        queue.enqueue(7);
        queue.enqueue(9);
        System.out.println("The queue has " + queue.size() + " elements. It is " + (queue.isEmpty() ? "empty" : "not empty" ) + ".");
        Integer item = queue.dequeue();
        System.out.println("Removed " + item + " at random.");
        item = queue.sample();
        System.out.println("Sampling a number: " + item);
        Iterator<Integer> it = queue.iterator();
        while (it.hasNext()) {
            System.out.println(it.next());
        }
    }

    private class IteratorImpl implements Iterator<Item> {
        Item[] array;
        int idx = 0;
        IteratorImpl(Item[] orgArr, int size) {
            this.array = (Item[]) new Object[size];
            for (int i = 0; i < size; i++) {
                this.array[i] = orgArr[i];
            }
            for (int i = size - 1; i > 0; i--) {
                int range = i - 0 + 1;
                int rand = (int)(Math.random() * range);
                Item left = this.array[i];
                Item right = this.array[rand];
                this.array[i] = right;
                this.array[rand] = left;
            }
        }

        public boolean hasNext() {
            return idx < array.length;
        }

        public Item next() {
            if (!hasNext()) {
                throw new NoSuchElementException("No more nodes in list");
            }
            Item val = this.array[idx];
            idx++;
            return val;
        }

        public void remove() {
            throw new UnsupportedOperationException("Method remove is not supported.");
        }
    }
}