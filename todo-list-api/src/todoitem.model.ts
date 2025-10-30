import postgres from "postgres";

export class ToDoItemModel{
    
    id!: number;
    title!: string;
    description!: string;
    dateOfCreation!: Date;
    status!: number;

    static getFromRow(row: postgres.Row | undefined): ToDoItemModel{
        const item = new ToDoItemModel();
        if(row){
            item.id = row.id;
            item.title = row.title;
            item.description = row.description;
            item.dateOfCreation = new Date(row.dateOfCreation);
            item.status = row.status;
        }
        return item;
    }

}