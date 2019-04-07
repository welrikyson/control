package com.control.controlapi.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

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
    @Temporal(TemporalType.DATE)  
    private Date data;
    @Lob
    private byte[] comprovante;  
    private TipoDespesa tipoDespesa;     
}