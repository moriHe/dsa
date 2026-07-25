import java.util.Iterator;
import java.util.NoSuchElementException;

public class Deque<Item> implements Iterable<Item> {
    private class DequeIterator implements Iterator<Item> {
        Node current;
        DequeIterator(Node first) {
            this.current = first;
        }
        public boolean hasNext() {
            return this.current != null;
        }

        public Item next() {
            if (!hasNext()) {
                throw new NoSuchElementException("No more nodes in list");
            }
            Item item = this.current.item;
            this.current = this.current.next;
            return item;
        }

        public void remove() {
            throw new UnsupportedOperationException("Method remove is not supported.");
        }
    }

    private class Node {
        Node(Item it) {
            this.item = it;
            this.next = null;
            this.prev = null;
        }
        Item item;
        Node next;
        Node prev;
    }
    private Node first;
    private Node last;
    private int size;
    // construct an empty deque
    public Deque() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    // is the deque empty?
    public boolean isEmpty() {
        return this.first == null;
    }

    // return the number of items on the deque
    public int size() {
        return this.size;
    }

    // add the item to the front
    public void addFirst(Item item) {
        if (item == null) {
            throw new IllegalArgumentException("addFirst called with null value");
        }
        Node newNode = new Node(item);

        if (this.first == null) {
            this.first = newNode;
            this.last = newNode;
        } else {
            newNode.next = this.first;
            this.first.prev = newNode;
            this.first = newNode;
        }

        size++;
    }

    // add the item to the back
    public void addLast(Item item) {
        if (item == null) {
            throw new IllegalArgumentException("addLast called with null value");
        }

        Node newNode = new Node(item);

        if (this.last == null) {
            this.first = newNode;
            this.last = newNode;
        } else {
            newNode.prev = this.last;
            this.last.next = newNode;
            this.last = newNode;
        }

        size++;
    }

    // remove and return the item from the front
    public Item removeFirst() {
        if (this.first == null) {
            throw new NoSuchElementException("no item on pos first.");
        }
        Node oldFirst = this.first;

        this.first = oldFirst.next;
        if (this.first != null) {
            this.first.prev = null;
        } else {
            this.last = null;
        }
        size--;
        return oldFirst.item;
    }

    // remove and return the item from the back
    public Item removeLast() {
        if (last == null) {
            throw new NoSuchElementException("no item on pos last");
        }
        
        Node oldLast = this.last;
        this.last = oldLast.prev;
        if (this.last != null) {
            this.last.next = null;
        } else {
            this.first = null;
        }
        size--;
        return oldLast.item;
    }

    // return an iterator over items in order from front to back
    public Iterator<Item> iterator() {
        return new DequeIterator(this.first);
    }

    // unit testing (required)
    public static void main(String[] args) {
        Deque<Integer> deque = new Deque<>();
        deque.addFirst(1);
        deque.addFirst(2);
        deque.addLast(3);
        deque.addLast(4);
        Integer item = deque.removeFirst();
        System.out.println("The current fist item in the list ist: " + item);
        item = deque.removeLast();
        System.out.println("The current last item in the list is: " + item);
        int size = deque.size();
        boolean isEmpty = deque.isEmpty();
        System.out.println("The deque is currently " + (isEmpty ? "empty" : "not empty") + ". The size is "+ size);

        Iterator<Integer> it = deque.iterator();
        while (it.hasNext()) {
            System.out.println(it.next());
        }


    }

}