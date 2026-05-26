package com.api.alunos.controller;

import com.api.alunos.model.Aluno;
import com.api.alunos.service.AlunoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alunos")
@RequiredArgsConstructor
public class AlunoController {

    private final AlunoService alunoService;

    @PostMapping
    public ResponseEntity<Aluno> cadastrar(@Valid @RequestBody Aluno aluno) {
        Aluno novoAluno = alunoService.salvar(aluno);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoAluno);
    }

    @GetMapping
    public ResponseEntity<List<Aluno>> listar() {
        return ResponseEntity.ok(alunoService.listarTodos());
    }

    @PutMapping("/{matricula}/matricular/{cursoId}")
    public ResponseEntity<Aluno> matricular(@PathVariable Long matricula, @PathVariable Long cursoId) {
        Aluno alunoMatriculado = alunoService.matricular(matricula, cursoId);
        return ResponseEntity.ok(alunoMatriculado);
    }
    @PutMapping("/{matricula}/desvincular")
    public ResponseEntity<Aluno> desvincular(@PathVariable Long matricula) {
        Aluno alunoDesvinculado = alunoService.desvincular(matricula);
        return ResponseEntity.ok(alunoDesvinculado);
    }
}