import './ToDoListItem.css'
import { ToDoItemModel } from '../../data/todoitem.model';

export function ToDoListItem({item}: {item: ToDoItemModel}) {
    return (
        <div className='ToDo-item'>
            <span className='Title'>{item.title.slice(0,15).concat('...')}</span>
            <span className='Date'>{new Date(item.dateOfCreation).toDateString()}</span>
            <div className='Description'>{item.description.slice(0,50).trim().concat('...')}</div>
        </div>
    );
}