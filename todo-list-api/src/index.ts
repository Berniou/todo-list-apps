import { app } from "./todoitem.controller";
import 'dotenv/config'

const port = parseInt(process.env.PORT ?? "") || 3000
const bdd =process.env.POSTGRES_DB;

app.listen(port, (err: Error | undefined) => {
    if(err) {console.log(err);}
    console.log("Server has started on port", port);
    //console.log("hello");
});