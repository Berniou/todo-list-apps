import { ToDoListItem } from "../ToDoListItemComponent/ToDoListItem";
import "./ToDoList.css"

export function ToDoList(){
    return (
        <div className="ToDoList-container">
            <ToDoListItem/>
        </div>
    );
}