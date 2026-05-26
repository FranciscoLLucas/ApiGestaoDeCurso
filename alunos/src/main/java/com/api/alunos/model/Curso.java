package com.api.alunos.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Table(name = "cursos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O nome do curso é obrigatório")
    @Column(nullable = false, length = 100)
    private String nome;

    @NotBlank(message = "O local das aulas é obrigatório")
    @Column(nullable = false, length = 100)
    private String local;

    @NotNull(message = "A carga horária é obrigatória")
    @Column(nullable = false)
    private Integer horas;

    @NotBlank(message = "O nome do professor é obrigatório")
    @Column(nullable = false, length = 100)
    private String professor;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "gestor_id", nullable = false)
    private Gestor gestor;

    @OneToMany(mappedBy = "curso")
    private List<Aluno> alunos;
}