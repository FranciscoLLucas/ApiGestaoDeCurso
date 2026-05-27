# Sistema de Gestão Escolar 🎓

Projeto Full-Stack desenvolvido como trabalho acadêmico para o gerenciamento de cursos, gestores e matrículas de alunos. O sistema possui regras de negócio estritas (como o vínculo de um aluno a apenas um curso por vez) e uma interface 100% responsiva.

---

## 🛠️ Tecnologias Utilizadas

### Back-End
* **Java 17** & **Spring Boot 4.x**
* **Spring Data JPA** (Persistência e ORM com Hibernate)
* **Spring Web** (Construção de APIs RESTful)
* **MySQL Driver** (Conector do banco de dados)
* **Flyway Migration** (Controle de versão do banco de dados)
* **Lombok** (Redução de código boilerplate)
* **Validation** (Validação de dados com Bean Validation)

### Front-End
* **React** & **Vite**
* **React Router Dom** (Gerenciamento de rotas e navegação)
* **Axios** (Cliente HTTP para consumo da API)
* **CSS3 & Flexbox/Grid** (Estilização avançada e design responsivo)

### Banco de Dados
* **MySQL 8.0**

---

## 📊 Diagrama do Banco de Dados (DER)

O diagrama abaixo representa o Modelo Entidade-Relacionamento Lógico do sistema utilizando a notação *Crow's Foot* (Pé de Galinha).

![Diagrama Entidade-Relacionamento do Sistema](img/der.png)

### Regras de Cardinalidade:
* **Gestor ➡️ Curso (1:N):** Um gestor pode gerenciar múltiplos cursos, mas cada curso possui um único gestor responsável.
* **Curso ➡️ Aluno (1:N):** Um curso pode ter vários alunos matriculados. Um aluno só pode estar vinculado a **um curso por vez** (Regra de Negócio).

---

## 🛣️ Rotas da API Documentadas

A API roda por padrão em `http://localhost:8080` e todos os endpoints utilizam o prefixo `/api`.

### 👥 Gestores (`/api/gestores`)
* `POST /api/gestores` - Cadastra um novo gestor administrativo.
* `GET /api/gestores` - Retorna a lista de todos os gestores.

### 📚 Cursos (`/api/cursos`)
* `POST /api/cursos/gestor/{gestorId}` - Cria um curso vinculando-o obrigatoriamente a um gestor existente.
* `GET /api/cursos` - Lista todos os cursos cadastrados (usado no Dashboard).
* `GET /api/cursos/{id}` - Busca os detalhes de um curso específico junto com a **lista de todos os alunos matriculados**.
* `DELETE /api/cursos/{id}` - Exclui um curso do sistema.

### 🧑‍🎓 Alunos (`/api/alunos`)
* `POST /api/alunos` - Cadastra um aluno na base de dados (inicialmente sem curso).
* `GET /api/alunos` - Lista todos os alunos cadastrados no sistema.
* `PUT /api/alunos/{matricula}/matricular/{cursoId}` - Realiza a matrícula do aluno em um curso. *Valida se o aluno já possui curso ativo.*
* `PUT /api/alunos/{matricula}/desvincular` - Remove o aluno do curso atual (atualiza o vínculo para `NULL`).

---

## 🚀 Instruções de Instalação e Execução

### 🎯 Pré-requisitos
Antes de começar, você precisará ter instalado em sua máquina:
* **Java JDK 17** ou superior.
* **Node.js** (versão 18 ou superior).
* **MySQL Server 8.0**.
* Uma IDE de sua escolha (recomendado: **IntelliJ IDEA** ou **VS Code**).

---

### 1️⃣ Configuração do Banco de Dados (MySQL)
1. Abra o seu **MySQL Workbench** (ou terminal MySQL).
2. Execute o comando para criar o schema vazio:
   ```sql
   CREATE DATABASE gestao_cursos;
   ```
3. *Não é necessário criar tabelas manualmente.* O **Flyway** criará e versionará toda a estrutura automaticamente assim que o Back-End for iniciado.

---

### 2️⃣ Execução do Back-End (Spring Boot)
1. Navegue até a pasta do projeto do Back-End.
2. Localize o arquivo `src/main/resources/application.properties` e ajuste as credenciais do seu banco de dados local:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/gestao_cursos
   spring.datasource.username=SEU_USUARIO
   spring.datasource.password=SUA_SENHA
   spring.jpa.hibernate.ddl-auto=validate
   ```
3. Execute o projeto através da sua IDE ou utilizando o terminal na raiz do projeto Java:
   * **Se usar Gradle:** `./gradlew bootRun` (Linux/Mac) ou `gradlew.bat bootRun` (Windows).
   * **Se usar Maven:** `./mvnw spring-boot:run`.
4. A API estará ativa em `http://localhost:8080`.

---

### 3️⃣ Execução do Front-End (React + Vite)
1. Abra um terminal separado na pasta raiz do seu projeto Front-End (`front-cursos`).
2. Instale as dependências necessárias do Node:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento local:
   ```bash
   npm run dev
   ```
4. O terminal exibirá um link (geralmente `http://localhost:5173`). Abra este endereço no seu navegador de preferência.

---

## 📐 Estrutura Arquitetural do Projeto

O projeto adota o padrão de separação de responsabilidades (SOLID e Clean Code), dividido em camadas limpas:
* **Model (`model`):** Contém as entidades JPA mapeadas diretamente para as tabelas relacionais do MySQL, controladas com validação Bean e anotações Lombok.
* **Repository (`repository`):** Interfaces que estendem o `JpaRepository`, fornecendo operações de CRUD automáticas sem vazamento de consultas SQL brutas na lógica de negócio.
* **Service (`service`):** Concentra as regras de negócio essenciais e o gerenciamento transacional (`@Transactional`).
* **Controller (`controller`):** Camada de exposição HTTP REST, mapeando verbos e parâmetros de forma limpa.
* **Config (`config`):** Centraliza políticas de segurança globais como o compartilhamento de recursos de origens cruzadas (CORS Config) para permitir a conexão fluida do React.