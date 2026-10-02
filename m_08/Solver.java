import java.util.ArrayList;
import java.util.List;

import edu.princeton.cs.algs4.In;
import edu.princeton.cs.algs4.MinPQ;
import edu.princeton.cs.algs4.StdOut;

public class Solver {
    private boolean solvable;
    private SearchNode goalNode;

    private class SearchNode implements Comparable<SearchNode> {
        private Board board;
        private int movesTotal;
        private SearchNode prevNode;
        private int manhatten;
        @Override
        public int compareTo(SearchNode that) {
            return Integer.compare(this.getManhatten(), that.getManhatten());
        }

        SearchNode(Board board, int movesTotal, SearchNode prevNode) {
            this.board = board;
            this.movesTotal = movesTotal;
            this.prevNode = prevNode;
            this.manhatten = movesTotal + board.manhattan();
        }

        Board getBoard() {
            return this.board;
        }

        int getMovesTotal() {
            return this.movesTotal;
        }

        private int getManhatten() {
            return this.manhatten;
        }

        Board getPrevBoard() {
            if (this.prevNode == null) {
                return null;
            }
            return this.prevNode.getBoard();
        }
    }
    // find a solution to the initial board (using the A* algorithm)
    public Solver(Board initial) {
        if (initial == null) {
            throw new IllegalArgumentException();
        }
        this.solvable = false;
        this.goalNode = null;
        
        Board twin = initial.twin();

        MinPQ<SearchNode> pq = new MinPQ<>();
        pq.insert(new SearchNode(initial, 0, null));

        MinPQ<SearchNode> pqtwin = new MinPQ<>();
        pqtwin.insert(new SearchNode(twin, 0, null));

        boolean found = false;
        while (!found) {
            if (pq.isEmpty()) {
                break;
            }

            SearchNode min = pq.delMin();
            if (min.getBoard().isGoal()) {
                this.goalNode = min;
                found = true;
                this.solvable = true;
                break;
            }

            if (pqtwin.isEmpty()) {
                break;
            }

            SearchNode mintwin = pqtwin.delMin();
            if (mintwin.getBoard().isGoal()) {
                found = true;
                this.solvable = false;
                break;
            }

            Board prevBoard = min.getPrevBoard();
            min.getBoard().neighbors().forEach((neighbor) -> {
                
                if (prevBoard == null || !prevBoard.equals(neighbor))  {
                    pq.insert(new SearchNode(neighbor, min.getMovesTotal() + 1, min));
                }
            });

            Board prevTwinBoard = mintwin.getPrevBoard();
            mintwin.getBoard().neighbors().forEach((neighbor) -> {
                
                if (prevTwinBoard == null || !prevTwinBoard.equals(neighbor))  {
                    pqtwin.insert(new SearchNode(neighbor, mintwin.getMovesTotal() + 1, mintwin));
                }
            });
        }   
    }   

    // is the initial board solvable? (see below)
    public boolean isSolvable() {
        return this.solvable;
    }

    // min number of moves to solve initial board; -1 if unsolvable
    public int moves() {
        if (!isSolvable()) {
            return -1;
        }
        return this.goalNode.getMovesTotal();
    }

    // sequence of boards in a shortest solution; null if unsolvable
    public Iterable<Board> solution() {
        if (!isSolvable()) {
            return null;
        }

        SearchNode initial = this.goalNode;
        List<Board> boards = new ArrayList<>();
        while (initial.prevNode != null) {
            boards.add(initial.getBoard());
            initial = initial.prevNode;
        }

        boards.add(initial.getBoard());
        
        int left = 0;
        int right = boards.size() - 1;
        while (left < right) {
            Board tmp = boards.get(left);
            boards.set(left, boards.get(right));
            boards.set(right, tmp);
            left++;
            right--;
        }

        return boards;
    }

    // test client (see below) 
    public static void main(String[] args) {
        System.out.println("Hello World");
        // create initial board from file
        In in = new In(args[0]);
        int n = in.readInt();
        int[][] tiles = new int[n][n];
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                tiles[i][j] = in.readInt();
        Board initial = new Board(tiles);

        // solve the puzzle
        Solver solver = new Solver(initial);

        // print solution to standard output
        if (!solver.isSolvable())
            StdOut.println("No solution possible");
        else {
            StdOut.println("Minimum number of moves = " + solver.moves());
            for (Board board : solver.solution())
                StdOut.println(board);
        }
    }
}