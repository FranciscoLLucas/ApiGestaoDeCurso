package com.api.alunos.controller;

import com.api.alunos.model.Gestor;
import com.api.alunos.service.GestorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gestores")
@RequiredArgsConstructor
public class GestorController {

    private final GestorService gestorService;

    @PostMapping
    public ResponseEntity<Gestor> cadastrar(@Valid @RequestBody Gestor gestor) {
        Gestor novoGestor = gestorService.salvar(gestor);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoGestor);
    }

    @GetMapping
    public ResponseEntity<List<Gestor>> listar() {
        return ResponseEntity.ok(gestorService.listarTodos());
    }
}