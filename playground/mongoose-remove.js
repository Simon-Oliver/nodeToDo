const { ObjectID } = require('mongoose');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// Todo.remove({}).then(result => {
//   console.log(result);
// });

Todo.findByIdAndRemove('5c031bc6854818936c602035').then(result => {
  console.log(result);
});
