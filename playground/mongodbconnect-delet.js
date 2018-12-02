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

    // db.collection('Users')
    //   .deleteMany({ user: 'Max' })
    //   .then(result => {
    //     console.log(result);
    //   });

    db.collection('Users')
      .findOneAndDelete({ _id: new ObjectID('5ba8c3960a4bc31f9b8fed9f') })
      .then(result => {
        console.log(result);
      });

    // client.close();
  }
);
