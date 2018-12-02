// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

const obj = new ObjectID();
console.log(obj);

MongoClient.connect(
  'mongodb://localhost:27017/TodoApp',
  (err, client) => {
    if (err) {
      return console.log(err);
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos')
    //   .find({ _id: new ObjectID('5ba8c2d3b671001f993c776b') })
    //   .toArray()
    //   .then(
    //     docs => {
    //       console.log('Todos');
    //       console.log(JSON.stringify(docs, undefined, 2));
    //     },
    //     err => {
    //       if (err) {
    //         console.log('Unable to fetch todos');
    //       }
    //     }
    //   );
    db.collection('Users')
      .find({ user: 'Max' })
      .count()
      .then(
        count => {
          console.log(`Users count: ${count}`);
        },
        err => {
          if (err) {
            console.log('Unable to fetch User');
          }
        }
      );

    client.close();
  }
);
