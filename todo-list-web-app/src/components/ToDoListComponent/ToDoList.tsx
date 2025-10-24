import { ARCHIVEES, EN_COURS, TERMINEES } from "../../Constants";
import { ToDoListState } from "../ToDoListStateComponent/ToDoListState";
import "./ToDoList.css"
import items from "../../data/ToDoItemModel.json";


export function ToDoList(){

    return (
        <div className="ToDoList-container">
            <ToDoListState title="En cours" status={EN_COURS} listParam={items.filter(v => v.status === 1)}/>
            <ToDoListState title="Terminées" status={TERMINEES} listParam={items.filter(v => v.status === 10)}/>
            <ToDoListState title="Archivées" status={ARCHIVEES} listParam={items.filter(v => v.status === 100)}/>
        </div>
    );
}