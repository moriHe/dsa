import java.util.Arrays;

public class FastCollinearPoints {
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
   // Should be n² log n running time in the worst case
   // Should use space proportional to n plus found line segments
   // Should return the max line segment of 4 or more
   public FastCollinearPoints(Point[] points) {
      // finds all line segments containing 4 or more points
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
         Point curr = points[i];
         double currSlope = Double.NEGATIVE_INFINITY;
         int count = 0;
         Arrays.sort(copy, curr.slopeOrder());
         for (int j = 0; j < copy.length; j++) {
            if (curr.slopeTo(copy[j]) == Double.NEGATIVE_INFINITY) {
               count = 0;
               currSlope = Double.NEGATIVE_INFINITY;
               continue;
            }

            if (curr.slopeTo(copy[j]) == currSlope) {
               count++;
            } else {
               if (count >= 3) {
                  Point min = curr;
                  Point max = curr;
                  boolean isvalid = true;
                  for (int k = j-1; k >= j-count; k--) {
                     // TODO curr.compareTo(copy[k]);
                     int mincompare = min.compareTo(copy[k]);
                     int maxcompare = max.compareTo(copy[k]);
                     if (maxcompare < 0) max = copy[k];
                     if (mincompare > 0) {
                        // skip since curr is not min and would be a duplicate
                        isvalid = false;
                        break;
                     }
                  }
                  if (isvalid) {
                     addSegment(min, max);
                  }
               }
               currSlope = curr.slopeTo(copy[j]);
               count = 1;
            }

         }
                        if (count >= 3) {
                  Point min = curr;
                  Point max = curr;
                  boolean isvalid = true;
                  for (int k = copy.length-1; k >= copy.length-count; k--) {
                     // TODO curr.compareTo(copy[k]);
                     int mincompare = min.compareTo(copy[k]);
                     int maxcompare = max.compareTo(copy[k]);
                     if (maxcompare < 0) max = copy[k];
                     if (mincompare > 0) {
                        // skip since curr is not min and would be a duplicate
                        isvalid = false;
                        break;
                     }
                  }
                  if (isvalid) {
                     addSegment(min, max);
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