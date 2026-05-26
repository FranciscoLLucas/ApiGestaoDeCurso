CREATE TABLE gestores (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          nome VARCHAR(100) NOT NULL,
                          email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE cursos (
                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        nome VARCHAR(100) NOT NULL,
                        local VARCHAR(100) NOT NULL,
                        horas INT NOT NULL,
                        professor VARCHAR(100) NOT NULL,
                        gestor_id BIGINT NOT NULL,
                        CONSTRAINT fk_curso_gestor FOREIGN KEY (gestor_id) REFERENCES gestores(id) ON DELETE RESTRICT
);

CREATE TABLE alunos (
                        matricula BIGINT AUTO_INCREMENT PRIMARY KEY,
                        nome VARCHAR(100) NOT NULL,
                        email VARCHAR(100) NOT NULL UNIQUE,
                        curso_id BIGINT,
                        CONSTRAINT fk_aluno_curso FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE SET NULL
);