# Aula 07 — CRUD e Padrão REST (NestJS)

Atividade pedida: "Dentro do seu projeto Nest.JS, crie rotas CRUD para o módulo
Usuário; services que atendam essas rotas; DTOs e entity de Usuário."

## Rotas expostas em `/usuarios`
| Método | Rota          | Ação                    |
|--------|---------------|-------------------------|
| POST   | /usuarios     | Cria um usuário         |
| GET    | /usuarios     | Lista todos os usuários |
| GET    | /usuarios/:id | Busca um usuário por id |
| PATCH  | /usuarios/:id | Atualiza um usuário     |
| DELETE | /usuarios/:id | Remove um usuário       |

## Estrutura
- `usuario.entity.ts`
- `dto/create-usuario.dto.ts`
- `dto/update-usuario.dto.ts`
- `usuario.service.ts`
- `usuario.controller.ts`
- `usuario.module.ts`
