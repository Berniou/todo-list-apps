import { ToDoItemModel } from "./todoitem.model";
import { ToDoItemDao } from "./todoitem.dao";

export class ToDoItemService{

    todoItemDao = new ToDoItemDao();

    onGetToDoItemById(id: number): Promise<ToDoItemModel>{
        return this.todoItemDao.fingItemById(id);
    }

    onGetToDoItemByTitle(title: string): Promise<ToDoItemModel>{
        return this.todoItemDao.fingItemByTitle(title);
    }

    onsaveItem(item: ToDoItemModel): Promise<ToDoItemModel>{
        return this.todoItemDao.saveItem(item);
    }

    onDelete(id: number): Promise<boolean>{
        return this.todoItemDao.deleteItem(id);
    }

    onGetAllItems(): Promise<ToDoItemModel[]>{
        return this.todoItemDao.findAllItems();
    }
}