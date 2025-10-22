import { ToDoListItem } from "../ToDoListItemComponent/ToDoListItem";
import "./ToDoList.css"
import items from "../../data/ToDoItemModel.json"

export function ToDoList(){
    return (
        <div className="ToDoList-container">
            {
               items.splice(0,3).map((value) => (
                <ToDoListItem item={value}/>
               ))
            }
        </div>
    );
}