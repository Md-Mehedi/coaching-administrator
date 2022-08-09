package coaching.administrator.classes.Global;

public enum PersonType {
    SUPER_ADMIN("SUPERADMIN"), ADMIN("ADMIN"), STUDENT("STUDENT"), TEACHER("TEACHER");

    String name;

    private PersonType(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}