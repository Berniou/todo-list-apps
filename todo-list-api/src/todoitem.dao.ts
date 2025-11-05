import postgres, { PostgresError, Sql } from "postgres";
import sql from "./data.source";
import { ToDoItemModel } from "./todoitem.model";

const UNICITY_CODE_VIOLATION = '23505';
const TITLE_UNICITY_CONSTRAINT = 'todoitems_title_key'
const TITLE_ERROR_MESSAGE = "This title already exists, please enter a new one."
const TITLE_ERROR_TYPE = "title error"
const TITLE_ERROR_CODE = 400

export class ToDoItemDao{
    
    async fingItemById(id: number): Promise<ToDoItemModel>{
        const results = await sql`
                                select *
                                from todoitems
                                where id = ${id}`;

        const res = results.at(0) ?? {}
       console.log("Date Time of creation : ", res);
        return  ToDoItemModel.getFromRow(results.at(0));
    }

    async fingItemByTitle(title: string): Promise<ToDoItemModel>{
        const results = await sql`
                                select *
                                from todoitems
                                where title = ${title}`;
        return ToDoItemModel.getFromRow(results.at(0));
    }

    async saveItem(item: ToDoItemModel): Promise<ToDoItemModel | {code: number, type: string ,message: string}>{
        const idValue: number | Sql = item.id ?? sql`DEFAULT`;
        const dateTimeCreated: Date | Sql = item.dateOfCreation ?? sql`DEFAULT` 

        try {
            const results = await sql`
                                insert into todoitems(id,title,description,dateOfCreation,status)
                                values (${idValue},${item.title},${item.description},${dateTimeCreated},${item.status}) 
                                on conflict (id) do update 
                                set id = excluded.id, title = excluded.title,
                                description = excluded.description, dateOfCreation = excluded.dateOfCreation,
                                status = excluded.status
                                returning *`;

        return ToDoItemModel.getFromRow(results.at(0));
        }
        catch(err){
            
            if(err instanceof PostgresError && err.code === UNICITY_CODE_VIOLATION && err.constraint_name === TITLE_UNICITY_CONSTRAINT){
                return {code: TITLE_ERROR_CODE,  type: TITLE_ERROR_TYPE, message: `Error: ${TITLE_ERROR_MESSAGE}`}
            }
            throw(err)
        }
        
    }

    async deleteItem(id: number): Promise<boolean>{
        const results = await sql`
                                delete from todoitems
                                where id = ${id}
                                returning 1`;
        return results.count > 0;
    }

    async findAllItems(): Promise<ToDoItemModel[]>{
        const results = await sql`
                                select * from todoitems`;
        const items: ToDoItemModel [] = [];

        for(let row of results){
            items.push(ToDoItemModel.getFromRow(row));
        }
        return items;
    }
}