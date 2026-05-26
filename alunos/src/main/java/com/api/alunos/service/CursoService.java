package com.api.alunos.service;

import com.api.alunos.model.Curso;
import com.api.alunos.model.Gestor;
import com.api.alunos.repository.CursoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CursoService {

    private final CursoRepository cursoRepository;
    private final GestorService gestorService;

    public Curso salvar(Curso curso, Long gestorId) {
        Gestor gestor = gestorService.buscarPorId(gestorId);
        curso.setGestor(gestor);
        return cursoRepository.save(curso);
    }

    public List<Curso> listarTodos() {
        return cursoRepository.findAll();
    }

    public Curso buscarPorId(Long id) {
        return cursoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Curso não encontrado!"));
    }
    public void excluir(Long id) {
        cursoRepository.deleteById(id);
    }
}