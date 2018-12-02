// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect(
  'mongodb://localhost:27017/TodoApp',
  (err, client) => {
    if (err) {
      return console.log(err);
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    db.collection('Users')
      .findOneAndUpdate(
        {
          _id: new ObjectID('5ba8c3a3475e6e1f9cfc012e')
        },
        {
          $inc: { age: 1 },
          $set: { name: 'Globi' }
        },
        { returnOriginal: false }
      )
      .then(result => {
        console.log(result);
      });

    // client.close();
  }
);
