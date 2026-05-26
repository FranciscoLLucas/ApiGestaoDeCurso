package com.api.alunos.service;

import com.api.alunos.model.Gestor;
import com.api.alunos.repository.GestorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GestorService {

    private final GestorRepository gestorRepository;

    public Gestor salvar(Gestor gestor) {
        return gestorRepository.save(gestor);
    }

    public List<Gestor> listarTodos() {
        return gestorRepository.findAll();
    }

    public Gestor buscarPorId(Long id) {
        return gestorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Gestor não encontrado!"));
    }
}