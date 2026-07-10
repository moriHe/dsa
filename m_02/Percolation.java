import edu.princeton.cs.algs4.WeightedQuickUnionUF;

public class Percolation {
    private boolean[] openSites;
    private final int n;
    private WeightedQuickUnionUF uf;
    private WeightedQuickUnionUF uFull;
    private final int virtualTop;
    private final int virtualBottom;
    private int openCount;
    // creates n-by-n grid, with all sites initially blocked
    public Percolation(int n) {
        if (n <= 0) {
            throw new IllegalArgumentException("n is smaller or equal to 0");
        }
        this.n = n;
        this.openSites = new boolean[n*n];
        this.uf = new WeightedQuickUnionUF(n * n + 2);
        this.uFull = new WeightedQuickUnionUF(n * n + 1);
        this.virtualTop = n * n;
        this.virtualBottom = n * n + 1;
        this.openCount = 0;
    }

    private int getIndex(int row, int col) {
        return (row - 1) * n + (col - 1);
    }

    private boolean isOutOfBounce(int p) {
        if (p < 1 || p > n) {
            return true;
        }

        return false;
    }
    // opens the site (row, col) if it is not open already
    public void open(int row, int col) {
        if (isOutOfBounce(col) || isOutOfBounce(row)) {
            throw new IllegalArgumentException("col or row out of bounce");
        }

        if (isOpen(row, col)) {
            return;
        }
        int i = getIndex(row, col);
        this.openSites[i] = true;
        this.openCount++;
        if (row == 1) {
            this.uf.union(i, this.virtualTop);
            this.uFull.union(i, this.virtualTop);
        } 
        
        if (row == n) {
            this.uf.union(i, this.virtualBottom);
        } 

        if (row < n && isOpen(row + 1, col)) {
            int bottom = getIndex(row + 1, col);
            uf.union(i, bottom);
            uFull.union(i, bottom);
        }

        if (row > 1 &&  isOpen(row - 1, col)) {
            int top = getIndex(row - 1, col);
            uf.union(i, top);
            uFull.union(i, top);
        }

        if (col < n &&  isOpen(row, col + 1)) {
            int right = getIndex(row, col + 1);
            uf.union(i, right);
            uFull.union(i, right);
        }

        if (col > 1 && isOpen(row, col - 1)) {
            int left = getIndex(row, col - 1);
            uf.union(i, left);
            uFull.union(i, left);
        }
    }

    // is the site (row, col) open?
    public boolean isOpen(int row, int col) {
        if (isOutOfBounce(col) || isOutOfBounce(row)) {
            throw new IllegalArgumentException("col or row out of bounce");
        }
        
        return openSites[getIndex(row, col)];
    }

    // is the site (row, col) full?
    public boolean isFull(int row, int col) {
        if (isOutOfBounce(col) || isOutOfBounce(row)) {
            throw new IllegalArgumentException("col or row out of bounce");
        }
        
        return isOpen(row, col) && this.uFull.find(getIndex(row, col)) == uFull.find(virtualTop);
    }

    // returns the number of open sites
    public int numberOfOpenSites() {
        return openCount;
    }

    // does the system percolate?
    public boolean percolates() {
        return uf.find(this.virtualBottom) == uf.find(this.virtualTop);
    }

    // test client (optional)
    public static void main(String[] args) {
        int n = 3;
        Percolation perc = new Percolation(n);

        perc.open(1,1);
        perc.open(2,1);
        perc.open(3,1);

        if (perc.percolates()) {
            System.out.println("System percolates. Success!");
        } else {
            System.out.println("System does not percolate. Fail!");
        }

        System.out.println("(1,2) == full? " + perc.isFull(1,2));
    }
}
