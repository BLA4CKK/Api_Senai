import postgres from "postgres"; // importa o módulo 'postgres' para conectar ao banco de dados PostgreSQL

const sql = postgres("postgres://user:user@192.168.1.15:5433/heloisa") // cria uma constante 'sql' que representa a conexão com o banco de dados PostgreSQL usando a string de conexão fornecida

export default sql; // exporta a constante 'sql' para que possa ser usada em outros arquivos do projeto
