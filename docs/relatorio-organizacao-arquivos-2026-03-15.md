# Relatorio de organizacao de arquivos

Data: 2026-03-15
Escopo: organizacao de estrutura e nomenclatura de arquivos, sem alteracao de logica da aplicacao.

## Objetivo

Reduzir ruido no topo do projeto e nas pastas de codigo, mantendo historico de arquivos legados em local controlado.

## Criterios aplicados

- Nao mover arquivos com impacto conhecido em rotas/imports.
- Mover apenas artefatos sem uso na aplicacao atual.
- Preservar rastreabilidade: nada foi apagado, apenas realocado.
- Agrupar itens legados em uma pasta unica de arquivamento.

## Pasta criada

- archive/legacy-artifacts

## Arquivos realocados

1. Novo volume (F).lnk -> archive/legacy-artifacts/atalho-disco-novo-volume-F.lnk
2. src/WebSchool_Refatorado.tsx -> archive/legacy-artifacts/WebSchool_Refatorado.lnk
3. src/pages/CalendarGrid.tsx -> archive/legacy-artifacts/CalendarGrid.placeholder.tsx
4. src/pages/EventPanel.tsx -> archive/legacy-artifacts/EventPanel.placeholder.tsx

## Justificativa por item

1. Novo volume (F).lnk
- Atalho local de sistema operacional, fora do escopo de build.
- Nao deve ficar na raiz do repositorio produtivo.

2. src/WebSchool_Refatorado.tsx
- Conteudo binario de atalho (na pratica, arquivo .lnk) com extensao .tsx.
- Nao havia referencias no codigo-fonte.
- Foi renomeado para extensao coerente e arquivado.

3. src/pages/CalendarGrid.tsx
4. src/pages/EventPanel.tsx
- Arquivos vazios (0 bytes), sem referencias no codigo.
- Mantidos apenas para historico no arquivo morto.

## Resultado da organizacao

- Raiz do projeto ficou mais limpa.
- Codigo-fonte ativo em src ficou sem artefatos binarios/placeholder vazios no fluxo principal.
- Itens legados agora estao concentrados em archive/legacy-artifacts para consulta futura.

## Risco tecnico

Baixo.

- Nao houve alteracao de implementacao.
- Nao houve alteracao de imports/rotas.
- Nao houve remocao definitiva de arquivos.

## Proximos passos opcionais

- Adicionar regra no .gitignore para bloquear novos .lnk na raiz.
- Criar padrao de arquivamento com prefixo de data para proximos legados.
