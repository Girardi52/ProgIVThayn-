# Aula 09-10 — ORM e JWT

Atividade pedida: "Faça integração com o TypeORM e inclua a autenticação com o
JWT em seu projeto."

## O que foi feito
1. **TypeORM**: a entidade `Usuario` agora é persistida de verdade (SQLite para
   fins didáticos, configurável para MySQL trocando `ormconfig.ts`), usando
   `@Entity()`, `@Column()` e `@PrimaryGeneratedColumn()`.
2. **Hash de senha**: a senha nunca é salva em texto puro — usamos `bcrypt`
   para gerar o hash antes de salvar (`usuario.service.ts`).
3. **JWT**: módulo `auth` com:
   - `POST /auth/login` — recebe email/senha, valida e retorna um `access_token`.
   - `JwtStrategy` — valida o token enviado no header `Authorization: Bearer <token>`.
   - `JwtAuthGuard` — protege rotas (aplicado em `GET /usuarios`, `GET /usuarios/:id`
     e `DELETE /usuarios/:id`).

## Como testar
```bash
npm install
npm run start

# 1. Criar usuário
curl -X POST http://localhost:3000/usuarios -H "Content-Type: application/json" \
  -d '{"nome":"Girardi","email":"girardi@example.com","senha":"123456"}'

# 2. Login
curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" \
  -d '{"email":"girardi@example.com","senha":"123456"}'

# 3. Acessar rota protegida com o token retornado
curl http://localhost:3000/usuarios -H "Authorization: Bearer SEU_TOKEN_AQUI"
```
