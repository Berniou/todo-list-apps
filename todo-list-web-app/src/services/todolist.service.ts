import { ToDoItemModel } from "../data/todoitem.model";

const apiUrl = process.env.REACT_APP_API_URL

const serviceGetAll = async () => {
     
    const res = await fetch(`${apiUrl}/items`, {
        method: 'GET',
    });

    const items: ToDoItemModel[] = (await res.json() as ToDoItemModel[]);
    return items;
}

const serviceChangeStatus = async (item: ToDoItemModel) => {
    const res = await fetch(`${apiUrl}/items`,{
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(item)
    });
    const updatedItem: ToDoItemModel = (await res.json() as ToDoItemModel);
    return updatedItem;
}

export {serviceGetAll, serviceChangeStatus}
