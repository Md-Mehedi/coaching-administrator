package coaching.administrator.classes.Global;

public class Global {

    public static final String BASE_PATH = "http://localhost:7982";
    public static final String FRONTEND_PATH = "http://localhost:3000";

    public static void colorPrint(Object str) {
        System.out.println("\033[31m" + str + "\033[0m");
    }
}
