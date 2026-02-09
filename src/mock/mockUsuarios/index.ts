export const data = {
  // Dados existentes (mantidos para compatibilidade)
  "perfis": [
    {
      "id": 1,
      "nome": "João Silva",
      "email": "joao@escola.com",
      "telefone": "11999999999",
      "dataNascimento": "2012-05-10",
      "tempoRegistro": "2024-02-10",
      "status": "ativo",
      "ultimoAcesso": "2026-02-01",
      "role": "ALUNO",
      "senha": "senha123"
    },
    {
      "id": 2,
      "nome": "Carlos Souza",
      "email": "carlos@escola.com",
      "telefone": "11977777777",
      "tempoRegistro": "2020-08-15",
      "status": "ativo",
      "ultimoAcesso": "2026-02-01",
      "role": "PROFESSOR",
      "senha": "senha123"
    },
    {
      "id": 3,
      "nome": "Maria Silva",
      "email": "maria@gmail.com",
      "telefone": "11988888888",
      "tempoRegistro": "2024-02-10",
      "status": "ativo",
      "ultimoAcesso": "2026-02-01",
      "role": "RESPONSAVEL",
      "senha": "senha123"
    },
    {
      "id": 4,
      "nome": "Ana Gestora",
      "email": "ana@escola.com",
      "tempoRegistro": "2019-01-05",
      "status": "ativo",
      "ultimoAcesso": "2026-02-01",
      "role": "GESTOR",
      "senha": "senha123"
    }
  ],
  "usuarios": {
    "students": [
      {
        "id": 1,
        "nome": "João Silva",
        "ra": "RA2024001",
        "perfilId": 1,
        "turmaId": 1,
        "responsaveis": [1],
        "saude": {
          "doencas": ["asma"],
          "alergias": ["amendoim"],
          "medicacoes": ["bombinha"],
          "observacoes": "Evitar esforço excessivo"
        },
        "historicoEscolar": [
          {
            "anoLetivo": 2023,
            "turma": "5º Ano B",
            "situacao": "Aprovado",
            "mediaFinal": 8.5
          }
        ]
      }
    ],
    "responsible": [
      {
        "id": 1,
        "nome": "Maria Silva",
        "perfilId": 3,
        "tipo": "Mae",
        "alunos": [1],
        "permissoes": [
          "VER_NOTAS",
          "VER_ATIVIDADES",
          "VER_CALENDARIO",
          "VER_VIDEOAULAS"
        ]
      }
    ],
    "teachers": [
      {
        "id": 1,
        "nome": "Carlos Souza",
        "perfilId": 2,
        "formacao": [
          {
            "curso": "Licenciatura em Matemática",
            "instituicao": "Universidade Estadual",
            "anoConclusao": 2018
          }
        ],
        "disciplinas": [1],
        "turmas": [1],
        "cargaHoraria": "20h"
      }
    ],
    "manager": [
      {
        "id": 1,
        "nome": "Ana Gestora",
        "perfilId": 4,
        "acessoTotal": true,
        "logs": [
          {
            "acao": "CRIACAO_TURMA",
            "data": "2026-01-10"
          }
        ]
      }
    ]
  },
  "turmas": [
    {
      "id": 1,
      "nome": "1º Ano A",
      "anoLetivo": 2026,
      "turno": "Manha",
      "alunos": [1],
      "professores": [1],
      "disciplinas": [1],
      "calendario": {
        "bimestres": [
          {
            "numero": 1,
            "inicio": "2026-02-01",
            "fim": "2026-04-30"
          }
        ],
        "eventos": [
          {
            "titulo": "Prova Bimestral",
            "data": "2026-04-20"
          }
        ]
      }
    }
  ],
  "disciplinas": [
    {
      "id": 1,
      "nome": "Matemática",
      "professorId": 1,
      "conteudos": [
        {
          "tipo": "VIDEO",
          "titulo": "Introdução à Matemática",
          "url": "https://video.com/aula1"
        }
      ],
      "atividades": [
        {
          "id": 1,
          "titulo": "Exercícios Básicos",
          "bimestre": 1,
          "dataEntrega": "2026-03-10"
        }
      ]
    }
  ],
  "controleAcesso": {
    "roles": {
      "ALUNO": ["VER_CONTEUDO"],
      "RESPONSAVEL": ["VER_DADOS_ALUNO"],
      "PROFESSOR": ["GERENCIAR_ATIVIDADES"],
      "GESTOR": ["ACESSO_TOTAL"]
    }
  },

  "users": [
    // Array de UserProps (baseado nos perfis e usuários existentes)
    {
      "IDPerfil": 1,  // Correspondente ao role ALUNO
      "IDEscola": 1,  // Exemplo de ID da escola
      "ID": 1,  // ID do usuário
      "Sessao": 12345,  // Exemplo de sessão
      "SessaoLogada": "sessao-ativa-123",  // String da sessão logada
      "IDTurma": 1,  // ID da turma
      "IDMasterPrincipal": null,  // Pode ser null
      "authorizedTools": [
        {
          "ruleId": 1,
          "authorizedToolsName": "VER_CONTEUDO"
        }
      ],
      "schoolRules": [
        {
          "ruleId": 1,
          "tool": "VER_CONTEUDO",
          "defaultRule": true
        }
      ],
      "NomeEscola": "Escola Projeto",  // Corrigido: "Projetp" → "Projeto"
      "Foto": "https://exemplo.com/foto-joao.jpg",  // URL da foto
      "Nome": "João Silva",  // Nome do usuário
      "city": {
        "id": "1",
        "name": "São Paulo"
      },
      "state": {
        "id": "SP",
        "name": "São Paulo"
      }
    },
    {
      "IDPerfil": 2,  // PROFESSOR
      "IDEscola": 1,
      "ID": 2,
      "Sessao": 67890,
      "SessaoLogada": "sessao-professor-678",
      "IDTurma": 1,
      "IDMasterPrincipal": 1,
      "authorizedTools": [
        {
          "ruleId": 2,
          "authorizedToolsName": "GERENCIAR_ATIVIDADES"
        }
      ],
      "schoolRules": [
        {
          "ruleId": 2,
          "tool": "GERENCIAR_ATIVIDADES",
          "defaultRule": false
        }
      ],
      "NomeEscola": "Escola Projeto",
      "Foto": "https://exemplo.com/foto-carlos.jpg",
      "Nome": "Carlos Souza",
      "city": {
        "id": "1",
        "name": "São Paulo"
      },
      "state": {
        "id": "SP",
        "name": "São Paulo"
      }
    },
    {
      "IDPerfil": 3,  // RESPONSAVEL
      "IDEscola": null,
      "ID": 3,
      "Sessao": 11111,
      "SessaoLogada": "sessao-responsavel-111",
      "IDTurma": null,
      "IDMasterPrincipal": null,
      "authorizedTools": [
        {
          "ruleId": 3,
          "authorizedToolsName": "VER_DADOS_ALUNO"
        }
      ],
      "schoolRules": [
        {
          "ruleId": 3,
          "tool": "VER_DADOS_ALUNO",
          "defaultRule": true
        }
      ],
      "NomeEscola": null,
      "Foto": "https://exemplo.com/foto-maria.jpg",
      "Nome": "Maria Silva",
      "city": {
        "id": "2",
        "name": "Rio de Janeiro"
      },
      "state": {
        "id": "RJ",
        "name": "Rio de Janeiro"
      }
    },
    {
      "IDPerfil": 4,  // GESTOR
      "IDEscola": 1,
      "ID": 4,
      "Sessao": 22222,
      "SessaoLogada": "sessao-gestor-222",
      "IDTurma": null,
      "IDMasterPrincipal": 1,
      "authorizedTools": [
        {
          "ruleId": 4,
          "authorizedToolsName": "ACESSO_TOTAL"
        }
      ],
      "schoolRules": [
        {
          "ruleId": 4,
          "tool": "ACESSO_TOTAL",
          "defaultRule": true
        }
      ],
      "NomeEscola": "Escola Projeto",
      "Foto": "https://exemplo.com/foto-ana.jpg",
      "Nome": "Ana Gestora",
      "city": {
        "id": "1",
        "name": "São Paulo"
      },
      "state": {
        "id": "SP",
        "name": "São Paulo"
      }
    }
  ],
  "questoes": [
    // Array de QuestoesTypes (exemplos de questões)
    {
      "ID": 1,
      "IDMateria": 1,  // Matemática
      "IDSerie": 5,  // 5ª série
      "IDPeriodo": 1,  // Bimestre 1
      "Pergunta": "Quanto é 2 + 2?",
      "Descricao": "Questão básica de matemática",
      "Gabarito": "4",
      "Ativo": true,
      "IDEnsino": 1,
      "IDMaster": 1,
      "IDUsuario": 2,  // Professor Carlos
      "DataCriacao": "2024-01-01T00:00:00Z",
      "Compartilhar": true,
      "Aprovado": true,
      "Netbil": false,
      "Sessao": "sessao-questao-1",
      "Tipo": "MULTIPLA_ESCOLHA",
      "IDPerfil": 2,
      "palavraChave": "matematica basica",
      "idUnidadeTematica": 1,
      "idDificuldade": 1
    },
    {
      "ID": 2,
      "IDMateria": 2,  // Português
      "IDSerie": 5,
      "IDPeriodo": 1,
      "Pergunta": "O que é um substantivo?",
      "Descricao": null,
      "Gabarito": "Palavra que nomeia seres, objetos ou ideias",
      "Ativo": true,
      "IDEnsino": 1,
      "IDMaster": 1,
      "IDUsuario": 2,
      "DataCriacao": "2024-01-02T00:00:00Z",
      "Compartilhar": false,
      "Aprovado": false,
      "Netbil": true,
      "Sessao": null,
      "Tipo": "DISSERTATIVA",
      "IDPerfil": 2,
      "palavraChave": "gramatica",
      "idUnidadeTematica": 2,
      "idDificuldade": 2
    }
  ],
  "headers": {
    // Exemplo de HeaderProps (objeto único para headers de requisição)
    "Content-Type": "application/json",
    "profileID": "1",
    "masterID": "1",
    "schoolID": "1",
    "userId": "1",
    "section": "login"
  }
};