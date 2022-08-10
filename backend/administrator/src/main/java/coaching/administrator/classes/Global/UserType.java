package coaching.administrator.classes.Global;

public enum UserType {
    SUPER_ADMIN("SUPER_ADMIN"), COACHING_ADMIN("COACHING_ADMIN"), STUDENT("STUDENT"), TEACHER("TEACHER");

    String name;

    private UserType(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}