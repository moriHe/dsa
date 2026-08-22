import java.util.Arrays;

public class BruteCollinearPoints {
   LineSegment[] segments = new LineSegment[2];



   public BruteCollinearPoints(Point[] points) {
      // finds all line segments containing 4 points
      if (points == null) {
         throw new IllegalArgumentException();
      }      

      Point[] copy = new Point[points.length];
      for (int i = 0; i < points.length; i++) {
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
                     }
               }
            }         
         }
      }
   }
   public int numberOfSegments() {
    // the number of line segments
    return 0;
   }
   public LineSegment[] segments() {
    // the line segments
    return null;
   }
}