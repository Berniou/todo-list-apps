import express from 'express';
import { ToDoItemService } from './todoitem.service';

const api = express();

const todoItemService = new ToDoItemService();

api.use(express.json());

api.get('/items', (req, res) => {   
    todoItemService.onGetAllItems()
                    .then(value => {
                        res.type('application/json');
                        res.send(value);
                    })
                     .catch(err => {
                        console.log(err);
                    })
                    .finally(() => {
                         res.end();
                    });
});

api.get('/items/:id', (req, res) => {
    todoItemService.onGetToDoItemById(parseInt(req.params['id']))
                    .then(value => {
                        res.send(value);
                    })
                     .catch(err => {
                        console.log(err);
                    })
                    .finally(() => {
                         res.end();
                    });
});

api.post('/items', (req,res) => {
    todoItemService.onsaveItem(req.body)
                    .then(value => {
                        res.send(value);
                    })
                    .catch(err => {
                        console.log(err);
                    })
                    .finally(() => {
                         res.end();
                    });
});

api.put('/items', (req,res) => {
    todoItemService.onsaveItem(req.body)
                    .then(value => {
                        res.send(value);
                    })
                    .catch(err => {
                        console.log(err);
                    })
                    .finally(() => {
                         res.end();
                    });
});

api.delete('/items/:id', (req,res) =>{
    todoItemService.onDelete(parseInt(req.params['id']))
                    .then(value => {
                        res.send(value);
                    })
                    .catch(err => {
                        console.log(err);
                    })
                    .finally(() => {
                         res.end();
                    });
});

export {api as app};