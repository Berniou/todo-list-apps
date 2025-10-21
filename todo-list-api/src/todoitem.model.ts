export class ToDoItemModel{

    constructor(row: any){
        this.id = row.id;
        this.title = row.title;
        this.description = row.description;
        this.dateOfCreation = row.dateOfCreation;
    }

    id!: number;
    title!: string;
    description!: string;
    dateOfCreation!: Date;

}