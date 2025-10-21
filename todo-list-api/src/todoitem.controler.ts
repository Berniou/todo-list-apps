import express from 'express';
import { ToDoItemService } from './todoitem.service';

const api = express();

const todoItemService = new ToDoItemService();


api.get('/items', (req, res) => {   
    todoItemService.onGetAllItems()
                    .then(value => res.end(value));
});

api.get('/items/:id', (req, res) => {
    todoItemService.onGetToDoItemById(parseInt(req.params['id']))
                    .then(value => res.end(value));
});

api.post('/items', (req,res) => {
    todoItemService.onsaveItem(req.body)
                    .then(value => res.end(value));
});

api.put('/items', (req,res) => {
    todoItemService.onsaveItem(req.body)
                    .then(value => res.end(value));
});

api.delete('/items/:id', (req,res) =>{
    todoItemService.onDelete(parseInt(req.params['id']))
                    .then(value => res.end(value));
});

export {api as app};