import React, { useState, useEffect } from "react";
import {ToDoListItem} from "../ToDoListItemComponent/ToDoListItem";
import { ToDoItemModel } from "../../data/todoitem.model";

import "./ToDoListState.css"
import { ARCHIVEES, EN_COURS, TERMINEES } from "../../Constants";

/*
 * status is either 1, 10 or 100
 * 1 is for OnWaiting
 * 10 is for Finished
 * 100 is for archived.
 */
export function ToDoListState({title, status, listParam}: {title: string, status: number, listParam: ToDoItemModel[]}){
    
    const [list, setList] = useState(listParam);
    const [localId, setLocalId] = useState({id:-1, status:-1});
    const ITEM_NAME = "item";
    const ITEM_ID_NAME = "itemId";
    const ITEM_STATUS_NAME = "itemStatus";
    const [itemId, setItemId] = useState(-1);
    const [itemStatus, setItemStatus] = useState(-1)

    const handleFromItem = (localId: {id:number, status:number}) => {
        setLocalId(localId);
    }

    const handleOnDragOver = (event: any) => {
       event.preventDefault();
    }

    const handleDrop = (event: any) => {
        try{
            
            setItemStatus(parseInt(event.dataTransfer.getData(ITEM_STATUS_NAME)));
            const stringedItem = event.dataTransfer?.getData(ITEM_NAME);
            setItemId(parseInt(event.dataTransfer?.getData(ITEM_ID_NAME)));

            if(itemStatus === EN_COURS && status !== EN_COURS){
                processDrop(stringedItem);
            }
            if(itemStatus === TERMINEES && status !== TERMINEES){
                processDrop(stringedItem);
            }
            if(itemStatus === ARCHIVEES && status !== ARCHIVEES){
                processDrop(stringedItem);
            }
        }catch(err){
            console.log(err);
        }
    }

    const processDrop = (param: string) => {
        const item: ToDoItemModel = JSON.parse(param);
        const newList = [...list]; 
        newList.unshift({...item, dateOfCreation: new Date(item.dateOfCreation).toDateString(), status: status});
        setList(newList);
        //console.log(list);
    }

    const processRemove = () => {
        let newList = [...list];
        newList.splice(localId.id, 1);
        console.log(newList);
        setList(newList);
        setItemId(-1);
        setItemStatus(-1);
    }


    const handleDragEnd = (event:any)=>{
        if(list.length === 0){
            return;
        }
        
        if(localId.status === status ){
            processRemove()
        }
    }

    return (
        <div className="State-container">
            <h3>{title}</h3>
            <div className="Items-container" onDragOver={handleOnDragOver} onDrop={handleDrop} onDragEnd={handleDragEnd}>
            {
               list.map((value, id) => (
                <ToDoListItem key={id} item={value} id={id} sendToParent={handleFromItem}/>
               ))
            }
            </div>
        </div>
    );

}