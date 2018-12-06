require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { User } = require('./models/user');
const { Todo } = require('./models/todo');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });
  todo
    .save()
    .then(doc => res.send(doc))
    .catch(e => res.status(400).send(e));
});

app.get('/todos', (req, res) => {
  Todo.find()
    .then(todos => res.send({ todos }))
    .catch(e => res.status(400).send(e));
});

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send('Not a valid ObjectID');
  }

  Todo.findById(id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send('No such Todo');
      }
      res.send({ todo });
    })
    .catch(e => {
      console.log('Something went wrong');
      res.status(400).send('Something went Wrong');
    });
});

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send('Not a valid ObjectID');
  }

  Todo.findByIdAndDelete(id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send('No such Todo');
      }
      res.send({ todo });
    })
    .catch(e => {
      console.log('Something went wrong');
      res.status(400).send('Something went Wrong');
    });
});

app.patch('/todos/:id', (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ['text', 'completed']);
  if (!ObjectID.isValid(id)) {
    return res.status(404).send('Not a valid ObjectID');
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }
      res.status(200).send(todo);
    })
    .catch(e => {
      res.status(400).send('Something went wrong');
    });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = { app };
