package com.control.controlapi.service;

import com.control.controlapi.model.Despesa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 * DespesaRepository
 */
@RepositoryRestResource
@CrossOrigin(origins="http://localhost:4200")
public interface DespesaRepository extends JpaRepository<Despesa, Long>{
    
}