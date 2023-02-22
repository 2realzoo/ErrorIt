package com.errorit.erroritoverflow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class ErroritoverflowApplication {

	public static void main(String[] args) {
		SpringApplication.run(ErroritoverflowApplication.class, args);
	}

}
