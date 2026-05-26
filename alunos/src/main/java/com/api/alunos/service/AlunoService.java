package com.api.alunos.service;

import com.api.alunos.model.Aluno;
import com.api.alunos.model.Curso;
import com.api.alunos.repository.AlunoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AlunoService {

    private final AlunoRepository alunoRepository;
    private final CursoService cursoService;

    public Aluno salvar(Aluno aluno) {
        return alunoRepository.save(aluno);
    }

    public List<Aluno> listarTodos() {
        return alunoRepository.findAll();
    }

    @Transactional
    public Aluno matricular(Long matricula, Long cursoId) {
        Aluno aluno = alunoRepository.findById(matricula)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado!"));

        if (aluno.getCurso() != null) {
            throw new RuntimeException("Operação negada: O aluno já está matriculado em um curso!");
        }

        Curso curso = cursoService.buscarPorId(cursoId);
        aluno.setCurso(curso);

        return alunoRepository.save(aluno);
    }
    @Transactional
    public Aluno desvincular(Long matricula) {
        Aluno aluno = alunoRepository.findById(matricula)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado!"));

        aluno.setCurso(null); // Remove o vínculo com o curso
        return alunoRepository.save(aluno);
    }
}