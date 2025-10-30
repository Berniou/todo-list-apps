import { ToDoItemModel } from "./todoitem.model";
import { ToDoItemDao } from "./todoitem.dao";

export class ToDoItemService{

    todoItemDao = new ToDoItemDao();

    onGetToDoItemById(id: number): Promise<ToDoItemModel>{
        try{
            return this.todoItemDao.fingItemById(id);
        }catch(err){
            console.log(err);
            throw(err) ;
        }      
    }

    onGetToDoItemByTitle(title: string): Promise<ToDoItemModel>{
        try{
            return this.todoItemDao.fingItemByTitle(title);
        }catch(err){
            console.log(err);
            throw(err);
        }  
    }

    onsaveItem(item: ToDoItemModel): Promise<ToDoItemModel | {code: number, message: string}>{
        try{    
            return this.todoItemDao.saveItem(item);
        }catch(err){
            console.log(err);
            throw(err);
        }  
    }

    onDelete(id: number): Promise<boolean>{
        try{
            return this.todoItemDao.deleteItem(id);
         }catch(err){
            console.log(err);
            throw(err)
        }  
    }

    onGetAllItems(): Promise<ToDoItemModel[]>{
        try{
            return this.todoItemDao.findAllItems();
        }catch(err){
            console.log(err);
            throw(err);
        }  
    }
}