import edu.princeton.cs.algs4.StdIn;
import edu.princeton.cs.algs4.StdOut;
import edu.princeton.cs.algs4.StdRandom;

// javac -cp "lib/*" -d bin RandomWord.java
// java -cp "bin:lib/*" RandomWord
public class RandomWord {
    public static void main(String[] args) {
        int i = 0;
        String winner = "";
        while (!StdIn.isEmpty()) {
            String word = StdIn.readString();
            i++;
            if (StdRandom.bernoulli(1.0 / i)) {
                winner = word;
            }
        }
        if (winner.isEmpty()) {
            StdOut.println("No args, no winner.");
        } else {
            StdOut.println(winner);
        }
    }
}
