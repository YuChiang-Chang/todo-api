const express = require('express');
const mongoose = require('mongoose');
const Todo = require('./models/todo');
const cors = require('cors');

const app = express();
const port = 3001;

// 解析JSON請求體
app.use(express.json());
app.use(cors());

// 本地MongoDB連接字符串，請將yourDatabaseName替換成實際的數據庫名
const dbConnectionString = 'mongodb://localhost:27017/todoDB';

// 連接到MongoDB
mongoose.connect(dbConnectionString)
    .then(() => console.log('成功連接MongoDB'))
    .catch(err => console.error('無法連接MongoDB', err))

app.get('/', (req, res) => {
    res.send('歡迎來到我的待辦事項API');
});
    

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})

app.post('/todos', async (req, res) => {
    try {
        const newTodo = new Todo(req.body);
        await newTodo.save();
        res.status(201).send(newTodo);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find({});
        res.send(todos);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).send();
        }
        res.send(todo);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.put('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true });
        if (!todo) {
            return res.status(404).send();
        }
        res.send(todo);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.delete('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) {
            return res.status(404).send();
        }
        res.send(todo);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.use((err, req, res, next) => {
    res.status(500).send({ error: err.message});
});

