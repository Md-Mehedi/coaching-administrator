package coaching.administrator.classes.Global;

public class APIMessage {
  private boolean success;
  private String message;

  public APIMessage() {
    success = true;
    message = "";
  }

  public APIMessage(boolean success, String message) {
    this.success = success;
    this.message = message;
  }

  public boolean isSuccess() {
    return success;
  }

  public void setSuccess(boolean success) {
    this.success = success;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }
}
