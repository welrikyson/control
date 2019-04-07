package com.control.controlapi.service;

import java.util.Date;
import java.util.List;

import com.control.controlapi.model.Despesa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 * DespesaRepository
 */
@RepositoryRestResource
@CrossOrigin(origins="http://localhost:4200")
public interface DespesaRepository extends JpaRepository<Despesa, Long>{
    List<Despesa> findAllByData(@Param("data") @DateTimeFormat(pattern="yyyy-MM-dd")Date data); 
    List<Despesa> findAllByDataBetween(@Param("dataStart") @DateTimeFormat(pattern="yyyy-MM-dd")Date dataStart,@Param("dataEnd") @DateTimeFormat(pattern="yyyy-MM-dd")Date dataEnd); 

}