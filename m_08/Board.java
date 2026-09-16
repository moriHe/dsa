/* Configure Classpath add m_08 / others Add Source root um package zu umgehen */
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
        return 0;
    }

    // number of tiles out of place
    public int hamming() {
        return 0;
    }

    // sum of Manhattan distances between tiles and goal
    public int manhattan() {
        return 0;
    }

    // is this board the goal board?
    public boolean isGoal() {
        return false;
    }

    // does this board equal y?
    public boolean equals(Object y) {
        return false;
    }

    // all neighboring boards
    public Iterable<Board> neighbors() {
        return null;
    }

    // a board that is obtained by exchanging any pair of tiles
    public Board twin() {
        return null;
    }

    // unit testing (not graded)
    public static void main(String[] args) {
        Board board = new Board(new int[][]{
            {1, 2, 3},
            {4, 5, 6},
            {7, 0, 8}
        });

        System.out.println(board.toString());
    }

}