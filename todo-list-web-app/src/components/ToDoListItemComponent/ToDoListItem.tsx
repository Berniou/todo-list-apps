import './ToDoListItem.css'
import { ToDoItemModel } from '../../data/todoitem.model';
import React, { forwardRef, Ref } from 'react';

export function ToDoListItem ({item, id}: {item: ToDoItemModel, id: number}){

    function handleOnDragStart(event: any){
        event.dataTransfer?.setData("itemId", `${id}`);
        event.dataTransfer?.setData("item", JSON.stringify(item));
        console.log( event.dataTransfer?.getData("item"))
    }
    
    return( 
        <div className='ToDo-item' draggable="true" onDragStart={handleOnDragStart}>
            <span className='Title'>{item.title.slice(0,15).concat('...')}</span>
            <span className='Date'>{new Date(item.dateOfCreation).toDateString()}</span>
            <div className='Description'>{item.description.slice(0,50).trim().concat('...')}</div>
        </div>
    );
}

