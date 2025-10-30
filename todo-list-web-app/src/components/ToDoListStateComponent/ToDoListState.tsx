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
export function ToDoListState({title, status, listParam}: {title: string, status: number, listParam: ToDoItemModel[]}){
    
    const [list, setList] = useState<ToDoItemModel[]>([]);
    const [localId, setLocalId] = useState(-1);
    const ITEM_NAME = "item";
    const ITEM_ID_STATUS = "itemStatus";

    useEffect(()=>{
        setList(listParam);
    }, [listParam])
   
    const handleFromItem = (localId: number) => {
        setLocalId(localId);

    }

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
        const newList = [...list];
        newList.unshift({...item, dateOfCreation: new Date(item.dateOfCreation), status: status});
        setList(newList);
    }

    const processRemove = () => {
        let newList = [...list];
        newList.splice(localId, 1);
        setList(newList);
    }

    return (
        <div className="State-container">
            <h3>{title}</h3>
            <div className="Items-container" onDragOver={handleOnDragOver} onDrop={handleDrop} >
            {
               list.map((value, id) => (
                <ToDoListItem key={id} item={value} id={id} sendToParent={handleFromItem}/>
               ))
            }
            </div>
        </div>
    );

}