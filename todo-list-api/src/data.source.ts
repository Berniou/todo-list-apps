import postgres from 'postgres'
import 'dotenv/config'

const sql = postgres({
    host: "localhost",
    port: parseInt(process.env.POSTGRES_PORT ?? ""),
    database: process.env.POSTGRES_DB ?? "",
    username: process.env.POSTGRES_USER ?? "",
    password: process.env.POSTGRES_PASSWORD ?? ""
});

export default sql;