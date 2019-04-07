package com.control.controlapi;

import java.time.LocalDate;
import java.util.stream.Stream;

import com.control.controlapi.model.Despesa;
import com.control.controlapi.service.DespesaRepository;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @Bean
    ApplicationRunner init(DespesaRepository repository) {
        return args -> {
            Stream.of("Material", "Agua", "Luz", "Telefone").forEach(name -> {
                Despesa despesa = new Despesa();
                despesa.setData(LocalDate.now());
                despesa.setValor(100);
                despesa.setDescricao(name);
                repository.save(despesa);
            });
            repository.findAll().forEach(System.out::println);
        };
    }
}
