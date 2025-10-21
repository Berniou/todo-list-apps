import postgres from 'postgres'
const sql = postgres({
    host: "localhost",
    port: 5432,
    database: "todolisdb",
    username: "root",
    password: "root"
});

export default sql;