import React, { useState, useEffect } from "react";
import {ToDoListItem} from "../ToDoListItemComponent/ToDoListItem";

import items from "../../data/ToDoItemModel.json";




import "./ToDoListState.css"
import { ToDoItemModel } from "../../data/todoitem.model";

export function ToDoListState({title}: {title: string}){
    const [list, setList] = useState<ToDoItemModel[]>(items.slice(0,1)); 

    const handleOnDragOver = (event: any) => {
        if(title === "Terminées"){
            event.preventDefault();
        }
    }

    const handleDrop = (event: any) => {
         if(title === "Terminées"){
            const stringedItem = event.dataTransfer?.getData("item");
            const item: ToDoItemModel = JSON.parse(stringedItem);
            const newList = [...list]; 
            newList.push({...item, dateOfCreation: new Date(item.dateOfCreation).toDateString()});
            setList(newList);
            console.log(list);
        }
    }

   

    return (
        <div className="State-container" onDragOver={handleOnDragOver} onDrop={handleDrop}>
            <h3>{title}</h3>
            {
               list.map((value, id) => (
                <ToDoListItem key={id} item={value} id={id}/>
               ))
            }
        </div>
    );

}