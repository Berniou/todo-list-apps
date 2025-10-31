import './ToDoListItem.css'
import { ToDoItemModel } from '../../data/todoitem.model';

export function ToDoListItem ({item, id}: {item: ToDoItemModel, id: number}){

    const handleOnDragStart = (event: any) => {
        event.dataTransfer?.setData("itemStatus", `${item.status}`);
        event.dataTransfer?.setData("item", JSON.stringify(item));
    }
    
    return( 
        <div className='ToDo-item' draggable="true" onDragStart={handleOnDragStart}>
            <span className='Title'>{item.title.slice(0,15).concat('...')}</span>
            <span className='Date'>{item.dateOfCreation.toDateString()}</span>
            <div className='Description'>{item.description.slice(0,50).trim().concat('...')}</div>
        </div>
    );
}

