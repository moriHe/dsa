import java.util.Arrays;

public class BruteCollinearPoints {
   private int nls = 0;
   private LineSegment[] segments = new LineSegment[2];


   private void addSegment(Point p, Point q) {
      if (nls == segments.length) {
         LineSegment[] cpy = new LineSegment[this.segments.length * 2];
         for (int i = 0; i < segments.length; i++) {
            cpy[i] = this.segments[i];
         }
         this.segments = cpy;
      }

      this.segments[nls] = new LineSegment(p, q);
      nls++;
   }

   public BruteCollinearPoints(Point[] points) {
      // finds all line segments containing 4 points
      if (points == null) {
         throw new IllegalArgumentException();
      }      

      Point[] copy = new Point[points.length];
      for (int i = 0; i < points.length; i++) {
         if (points[i] == null) throw new IllegalArgumentException();
         copy[i] = points[i];
      }
      Arrays.sort(copy);
      for (int i = 0; i < copy.length - 1; i++) {
         if (copy[i].compareTo(copy[i+1]) == 0) {
            throw new IllegalArgumentException();
         }
      }
      for (int i = 0; i < points.length; i++) {
         Point currI = points[i];
         for (int j = i+1; j < points.length; j++) {
            Point currJ = points[j];
            for (int k = j+1; k < points.length; k++) {
               Point currK = points[k];
               for (int l = k+1; l < points.length; l++) {
                  Point currL = points[l];
                  double slopeIJ = currI.slopeTo(currJ);
                  double slopeIK = currI.slopeTo(currK);
                  double slopeIL = currI.slopeTo(currL);
                     if (slopeIJ == slopeIK && slopeIJ == slopeIL) {
                        Point min = currI;
                        Point max = currI;
                        int ijcompare = currI.compareTo(currJ);
                        // Cant be == since we check for this before  the loop
                        if (ijcompare > 0) min = currJ;
                        else max = currJ;
                        
                        int minkcompare = min.compareTo(currK);
                        int maxkcompare = max.compareTo(currK);
                        if (minkcompare > 0) min = currK;
                        if (maxkcompare < 0) max = currK;

                        int minlcompare = min.compareTo(currL);
                        int maxlcompare = max.compareTo(currL);
                        if (minlcompare > 0) min = currL;
                        if (maxlcompare < 0) max = currL;
                        addSegment(min, max);
                     }
               }
            }         
         }
      }
   }
   public int numberOfSegments() {
    // the number of line segments
    return nls;
   }
   public LineSegment[] segments() {
    // the line segments
    LineSegment[] res = new LineSegment[nls];
    for (int i = 0; i < nls; i++) {
      res[i] = this.segments[i];
    }
    return res;
   }
}