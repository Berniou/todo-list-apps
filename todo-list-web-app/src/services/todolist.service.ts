import { ToDoItemModel } from "../data/todoitem.model";

const service = async () => {
     
    const res = await fetch(`${process.env.REACT_APP_API_URL}/items`, {
        method: 'GET',
    });

    const items: ToDoItemModel[] = (await res.json() as ToDoItemModel[]);
    return items;
}

export default service
