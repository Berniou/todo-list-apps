import React, { useEffect, useState } from "react";

import { ARCHIVEES, EN_COURS, TERMINEES } from "../../Constants";
import { ToDoListState } from "../ToDoListStateComponent/ToDoListState";
import "./ToDoList.css"
import service from "../../services/todolist.service";
import { ToDoItemModel } from "../../data/todoitem.model";

export function ToDoList(){

    const [items,setItems] = useState<ToDoItemModel[]>([])
    
    useEffect(() => {   
        service().then(value => {
            console.log(value)
            setItems(value)
        });
    }, [])

    return (
        <div className="ToDoList-container">
            <ToDoListState title="En cours" status={EN_COURS} listParam={items.filter(v => v.status === 1).map(v => {return {...v, dateOfCreation: new Date(v.dateOfCreation)}})}/>
            <ToDoListState title="Terminées" status={TERMINEES} listParam={items.filter(v => v.status === 10).map(v => {return {...v, dateOfCreation: new Date(v.dateOfCreation)}})}/>
            <ToDoListState title="Archivées" status={ARCHIVEES} listParam={items.filter(v => v.status === 100).map(v => {return {...v, dateOfCreation: new Date(v.dateOfCreation)}})}/>
        </div>
    );
}