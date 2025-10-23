import React, { useRef, useEffect } from "react";
import {ToDoListItem} from "../ToDoListItemComponent/ToDoListItem";

import items from "../../data/ToDoItemModel.json";




import "./ToDoListState.css"
import { ToDoItemModel } from "../../data/todoitem.model";

export function ToDoListState({title}: {title: string}){

    const cardRef = useRef<HTMLDivElement>(null);
    const stateLRef = useRef<HTMLDivElement>(null);

    const list = items.splice(0,1);

    useEffect(() => {

    })

    return (
        <div className="State-container" >
            <h3>{title}</h3>
            {
               list.map((value, id) => (
                <ToDoListItem key={id} item={value} id={id}/>
               ))
            }
        </div>
    );

}