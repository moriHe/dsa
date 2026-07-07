import edu.princeton.cs.algs4.StdRandom;
import edu.princeton.cs.algs4.StdStats;
import edu.princeton.cs.algs4.WeightedQuickUnionUF;

public class Percolation {
    private boolean[] openSites;
    private final int n;
    WeightedQuickUnionUF uf;
    private final int virtualTop;
    private final int virtualBottom;

    // creates n-by-n grid, with all sites initially blocked
    public Percolation(int n) {
        if (n <= 0) {
            throw new IllegalArgumentException("n is smaller or equal to 0");
        }
        this.n = n;
        this.openSites = new boolean[n*n];
        this.uf = new WeightedQuickUnionUF(n * n + 2);
        this.virtualTop = n * n;
        this.virtualBottom = n * n + 1;
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
    public void open(int row, int col) throws IllegalArgumentException {
        if (isOutOfBounce(col) || isOutOfBounce(row)) {
            throw new IllegalArgumentException("col or row out of bounce");
        }

        int i = getIndex(row, col);
        this.openSites[i] = true;
        if (row == 1) {
            this.uf.union(i, this.virtualTop);
        } 
        
        if (row == n) {
            this.uf.union(i, this.virtualBottom);
        }

        // TODO: Check left right top bottom are isOpen and union in that case
    }

    // is the site (row, col) open?
    public boolean isOpen(int row, int col) {
        if (isOutOfBounce(col) || isOutOfBounce(row)) {
            throw new IllegalArgumentException("col or row out of bounce");
        }
        // TODO: Implement
        return true;
    }

    // is the site (row, col) full?
    public boolean isFull(int row, int col) {
        if (isOutOfBounce(col) || isOutOfBounce(row)) {
            throw new IllegalArgumentException("col or row out of bounce");
        }
        // TODO: Implement
        return true;
    }

    // returns the number of open sites
    public int numberOfOpenSites() {
        // TODO: Implement
        return 0;
    }

    // does the system percolate?
    public boolean percolates() {
        // TODO: Implement
        return true;
    }

    // test client (optional)
    public static void main(String[] args) {
        // TODO: Implement
    }
}
