import postgres from "postgres";

const sql = postgres("postgres://postgres:user@localhost:5432/postgres")

export default sql;

/*DATABASE_URL=postgresql://postgres:[YOUR_PASSWORD]@db.iebtulnkywfqmnksvrvm.supabase.co:5432/postgres 
postgres://user:user@192.168.1.15:5433/heloisa
*/