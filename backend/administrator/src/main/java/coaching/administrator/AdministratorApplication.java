package coaching.administrator;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// @SpringBootApplication(exclude = { DataSourceAutoConfiguration.class })
@SpringBootApplication()
public class AdministratorApplication {

	public static void main(String[] args) {
		SpringApplication.run(AdministratorApplication.class, args);
		System.out.println("\033[31minside Hello Coaching Administrator\033[0m");
	}
}