import './ToDoListItem.css'

export function ToDoListItem() {
    return (
        <div className='ToDo-item'>
            <span className='Title'>title</span>
            <span className='Date'>date</span>
            <hr/>
            <div className='Description'>description</div>
        </div>
    );
}