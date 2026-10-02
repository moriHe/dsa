/**
 * 1) Java autoboxing and equals()
 * Consider two double e values a and b and their corresponding Double e values x and y.
 * - Find values such that (a==b) is true but x equals s(y) is false.
 * - Find values such that (a==b) is false but x equals s(y) is true.
 * 
 */

public class ExEquals {
    
    private double a;
    private double b;

    public ExEquals(double a, double b) {
        this.a = a;
        this.b = b;
    }
    
    public void setEquals(double a, double b) {
        this.a = a;
        this.b = b;
    }

    public void checkEquals() {
        Double x = this.a;
        Double y = this.b;
        System.out.println("a == b is " + (this.a == this.b));
        System.out.println("s(x) == s(y) is " + x.equals(y));
    }

    public static void main(String[] args) {
        ExEquals eq = new ExEquals(0.0, 0.0);
        eq.checkEquals();
        eq.setEquals(-0.0, +0.0);
        eq.checkEquals();
        eq.setEquals(Double.NaN, Double.NaN);
        eq.checkEquals();
    }
}
