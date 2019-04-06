package com.control.controlapi.model;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;
import lombok.NoArgsConstructor;
/**
 * Despesa
 */
@Entity
@Data
@NoArgsConstructor
public class Despesa {
    @Id @GeneratedValue
    private Long id;
    private String descricao;
    private long valor;    
    private LocalDate data;        
}