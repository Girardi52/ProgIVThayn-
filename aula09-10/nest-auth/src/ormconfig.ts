import { DataSourceOptions } from 'typeorm';

// Para fins didáticos usamos SQLite (sem precisar instalar servidor externo).
// Para usar o MySQL da aula 08, troque type para 'mysql' e informe host/porta/usuário/senha.
export const config: DataSourceOptions = {
  type: 'sqlite',
  database: '.db/sqlite.db',
  synchronize: true, // usar apenas em desenvolvimento
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
};
