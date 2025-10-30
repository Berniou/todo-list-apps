import postgres, { PostgresError, Sql } from "postgres";
import sql from "./data.source";
import { ToDoItemModel } from "./todoitem.model";

const UNICITY_CODE_VIOLATION = '23505';
const TITLE_UNICITY_CONSTRAINT = 'todoitems_title_key'

export class ToDoItemDao{
    
    async fingItemById(id: number): Promise<ToDoItemModel>{
        const results = await sql`
                                select *
                                from todoitems
                                where id = ${id}`;

        return  ToDoItemModel.getFromRow(results.at(0));
    }

    async fingItemByTitle(title: string): Promise<ToDoItemModel>{
        const results = await sql`
                                select *
                                from todoitems
                                where title = ${title}`;

        return ToDoItemModel.getFromRow(results.at(0));
    }

    async saveItem(item: ToDoItemModel): Promise<ToDoItemModel | {code: number, message: string}>{
        const idValue: number | Sql = item.id ?? sql`DEFAULT`;

        try {
            const results = await sql`
                                insert into todoitems(id,title,description,dateOfCreation,status)
                                values (${idValue},${item.title},${item.description},${item.dateOfCreation},${item.status}) 
                                on conflict (id) do update 
                                set id = excluded.id, title = excluded.title,
                                description = excluded.description, dateOfCreation = excluded.dateOfCreation,
                                status = excluded.status
                                returning *`;

        return ToDoItemModel.getFromRow(results.at(0));
        }
        catch(err){
            
            if(err instanceof PostgresError && err.code === UNICITY_CODE_VIOLATION && err.constraint_name === TITLE_UNICITY_CONSTRAINT){
                return {code: 400,  message: "Erreur : Ce titre existe déjà. Veuillez en choisir un autre."}
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