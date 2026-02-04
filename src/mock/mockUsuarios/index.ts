// data.ts (arquivo separado para o JSON)
export const data = {
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
    "alunos": [
      {
        "id": 1,
        "nome": "João Silva", // Adicionado nome diretamente
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
    "responsaveis": [
      {
        "id": 1,
        "nome": "Maria Silva", // Adicionado nome diretamente
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
    "professores": [
      {
        "id": 1,
        "nome": "Carlos Souza", // Adicionado nome diretamente
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
    "gestores": [
      {
        "id": 1,
        "nome": "Ana Gestora", // Adicionado nome diretamente
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
  }
};