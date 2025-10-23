import { ToDoListState } from "../ToDoListStateComponent/ToDoListState";
import "./ToDoList.css"

export function ToDoList(){
    return (
        <div className="ToDoList-container">
            
            <ToDoListState title="En cours"/>
            <ToDoListState title="Terminées"/>
            <ToDoListState title="Archivées"/>
        </div>
    );
}