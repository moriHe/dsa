/* Configure Classpath add m_08 / others Add Source root um package zu umgehen */

import java.util.ArrayList;
import java.util.List;

public class Board {
    private int[][] tiles;
    private int n;
    // create a board from an n-by-n array of tiles,
    // where tiles[row][col] = tile at (row, col)
    public Board(int[][] tiles) {
        this.tiles = tiles;
        this.n = tiles.length;
    }
                                           
    // string representation of this board
    public String toString() {
        String resp = String.valueOf(this.n) + "\n";
        for (int i = 0; i < tiles.length; i++) {
            for (int j = 0; j < tiles[i].length; j++) {
                resp += String.valueOf(tiles[i][j]);
                if (j < tiles[j].length - 1) {
                    resp += " ";
                }
            }
            if (i < tiles[i].length - 1) {
                resp += "\n";
            }
        }
        return resp;
    }

    // board dimension n
    public int dimension() {
        return this.n;
    }

    // number of tiles out of place
    public int hamming() {
        int nwrong = 0;
        for (int i = 0; i < this.tiles.length; i++) {
            for (int j = 0; j < this.tiles[i].length; j++) {
                int correct = i * n + j + 1;
                if (i == n - 1 && j == n - 1) {
                    correct = 0;
                }

                if (this.tiles[i][j] != correct) {
                    nwrong++;
                }
            }
        }
        return nwrong;
    }

    // sum of Manhattan distances between tiles and goal
    public int manhattan() {
        int distancesum = 0;
        for (int i = 0; i < this.tiles.length; i++) {
            for (int j = 0; j < this.tiles[i].length; j++) {
                if (this.tiles[i][j] != 0) {
                    int goalRow = (this.tiles[i][j] - 1) / n;
                    int goalCol = (this.tiles[i][j] - 1) % n;
                    distancesum += Math.abs(i - goalRow);
                    distancesum += Math.abs(j - goalCol);
                }
            }
        }
        return distancesum;
    }

    // is this board the goal board?
    public boolean isGoal() {
        return hamming() == 0;
    }

    // does this board equal y?
    public boolean equals(Object y) {
        if (!(y instanceof Board)) {
            return false;
        }
        Board that = (Board) y;
        if (this.dimension() != that.dimension()) {
            return false;
        }

        for (int i = 0; i < this.tiles.length; i++) {
            for (int j = 0; j < this.tiles[i].length; j++) {
                if (this.tiles[i][j] != that.tiles[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }

    private Board getCopyBoard() {
        int[][] copy = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                copy[i][j] = this.tiles[i][j];
            }
        }
        return new Board(copy);
    }

    // all neighboring boards
    public Iterable<Board> neighbors() {
        List<Board> neighbors = new ArrayList<>();
        int row = 0;
        int col = 0;
        for (int i = 0; i < this.tiles.length; i++) {
            for (int j = 0; j < this.tiles[i].length; j++) {
                if (this.tiles[i][j] == 0) {
                    row = i;
                    col = j;
                    break;
                }
            }
        }

        int topRow = row - 1;
        int bottomRow = row + 1;
        int leftCol = col - 1;
        int rightCol = col + 1;

        if (topRow >= 0) {
            Board c1 = getCopyBoard();
            c1.tiles[row][col] = c1.tiles[topRow][col];
            c1.tiles[topRow][col] = 0;
            neighbors.add(c1);
        }

        if (bottomRow < n) {
            Board c2 = getCopyBoard();
            c2.tiles[row][col] = c2.tiles[bottomRow][col];
            c2.tiles[bottomRow][col] = 0;
            neighbors.add(c2);
        }

        if (leftCol >= 0) {
            Board c3 = getCopyBoard();
            c3.tiles[row][col] = c3.tiles[row][leftCol];
            c3.tiles[row][leftCol] = 0;
            neighbors.add(c3);
        } 

        if (rightCol < n) {
            Board c4 = getCopyBoard();
            c4.tiles[row][col] = c4.tiles[row][rightCol];
            c4.tiles[row][rightCol] = 0;
            neighbors.add(c4);
        }

        return neighbors;
    }

    // a board that is obtained by exchanging any pair of tiles
    public Board twin() {
        Board copy = getCopyBoard();
        boolean foundA = false;
        boolean foundB = false;
        int rowA = 0;
        int colA = 0;
        int rowB = 0;
        int colB = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (this.tiles[i][j] != 0 && foundA) {
                    rowB = i;
                    colB = j;
                    foundB = true;
                    break;
                }

                if (this.tiles[i][j] != 0) {
                    rowA = i;
                    colA = j;
                    foundA = true;
                    continue;
                }
            }
            if (foundB) {
                break;
            }
        }

        int tmp = copy.tiles[rowA][colA];
        copy.tiles[rowA][colA] = copy.tiles[rowB][colB];
        copy.tiles[rowB][colB] = tmp;
        return copy;
    }

    // unit testing (not graded)
    public static void main(String[] args) {
        Board board = new Board(new int[][]{
            {1, 2, 3},
            {4, 5, 6},
            {7, 0, 8}
        });

        System.out.println("=== Board ===");
        System.out.println(board);

        System.out.println("=== dimension() ===");
        System.out.println(board.dimension());

        System.out.println("=== hamming() ===");
        System.out.println(board.hamming());

        System.out.println("=== manhattan() ===");
        System.out.println(board.manhattan());

        System.out.println("=== isGoal() ===");
        System.out.println(board.isGoal());

        System.out.println("=== equals() ===");
        Board sameBoard = new Board(new int[][]{
            {1, 2, 3},
            {4, 5, 6},
            {7, 0, 8}
        });

        Board differentBoard = new Board(new int[][]{
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 0}
        });

        System.out.println("board == sameBoard: " + (board == sameBoard));
        System.out.println("board.equals(sameBoard): " + board.equals(sameBoard));
        System.out.println("board.equals(differentBoard): " + board.equals(differentBoard));

        System.out.println("=== neighbors() ===");
        for (Board neighbor : board.neighbors()) {
            System.out.println(neighbor);
            System.out.println();
        }

        System.out.println("=== twin() ===");
        Board twin = board.twin();
        System.out.println(twin);

        System.out.println("=== Original nach twin() ===");
        System.out.println(board);
    }

}