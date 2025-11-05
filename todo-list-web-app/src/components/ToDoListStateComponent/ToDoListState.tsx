import React, { useEffect, useState } from "react";
import {ToDoListItem} from "../ToDoListItemComponent/ToDoListItem";
import { ToDoItemModel } from "../../data/todoitem.model";

import "./ToDoListState.css"

/*
 * status is either 1, 10 or 100
 * 1 is for OnWaiting
 * 10 is for Finished
 * 100 is for archived.
 */

type props =  {title: string, status: number, listParam: ToDoItemModel[], sendToParent: (item: ToDoItemModel)=>void};

export function ToDoListState({title, status, listParam, sendToParent}:props){
    
    const [list, setList] = useState<ToDoItemModel[]>([]);
    const ITEM_NAME = "item";
    const ITEM_ID_STATUS = "itemStatus";

    useEffect(()=>{
        setList(listParam);
    }, [listParam])

    const handleOnDragOver = (event: any) => {
       event.preventDefault();
    }

    const handleDrop = (event: any) => {
        const stringedItem = event.dataTransfer?.getData(ITEM_NAME);
        const itemStatus = parseInt(event.dataTransfer?.getData(ITEM_ID_STATUS));
        try{
            if(itemStatus !== status){
                processDrop(stringedItem);
            }
        }catch(err){
            console.log(err);
        }
    }

    const processDrop = (param: string) => {
        const item: ToDoItemModel = JSON.parse(param);
        sendToParent({...item, dateOfCreation: new Date(item.dateOfCreation), status: status})
        // .then(updatedItem => {
        //     const newList = [...list];
        //     newList.unshift({...updatedItem, dateOfCreation: new Date(updatedItem.dateOfCreation)});
        //     setList(newList);
        // });
    }

    return (
        <div className="State-container">
            <h3>{title}</h3>
            <div className="Items-container" onDragOver={handleOnDragOver} onDrop={handleDrop} >
            {
               list.map((value, id) => (
                <ToDoListItem key={id} item={value} id={id}/>
               ))
            }
            </div>
        </div>
    );

}