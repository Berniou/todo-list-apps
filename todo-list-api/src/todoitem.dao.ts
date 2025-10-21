import sql from "./data.source";
import { ToDoItemModel } from "./todoitem.model";

export class ToDoItemDao{
    
    async fingItemById(id: number): Promise<ToDoItemModel>{
        const results = await sql`
                                select *
                                from todoitems
                                where id = ${id}`;

        return new ToDoItemModel(results.at(0))
    }

    async fingItemByTitle(title: string): Promise<ToDoItemModel>{
        const results = await sql`
                                select *
                                from todoitems
                                where title = ${title}`;

        return new ToDoItemModel(results.at(0))
    }

    async saveItem(item: ToDoItemModel): Promise<ToDoItemModel>{
        const results = await sql`
                                insert into todoitems(id,title,description,dateOfCreation)
                                values (${item.id},${item.title},${item.description},${item.dateOfCreation}) 
                                On conflict do update set todoitems.id = excluded.id,  todoitems.title = excluded.title
                                returning *`;

        return new ToDoItemModel(results.at(0));
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
            items.push(new ToDoItemModel(row));
        }
        return items;
    }
}