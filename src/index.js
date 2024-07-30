const express = require('express');

const bodyParser = require('body-parser');

const { connectToDb, getDb } = require('./db/db');

const YAML = require('yamljs');

const swaggerUi = require('swagger-ui-express');

const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();

const port = 3000;

// start middlware
//
// parse json requests
app.use(express.json());
// encode uri
app.use(express.urlencoded());

app.use(bodyParser());


// swagger
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// end middlware

let db;

connectToDb((err) => {
  if (!err) {
    db = getDb();
    app.listen(port, () => {
      console.log(`server is runing in port ${port}`);
    });
  }
});

app.get('/', (request, response) => response.redirect('/api/docs'));

app.get('/api/users', (request, response) => {
  let pageNum = request.query.page || '0';
  let users = [];
  const userPerPage = 10;
  db.collection('users').find().sort({ id: -1 }).skip(userPerPage * pageNum).limit(userPerPage).forEach(e => {
    delete e._id;
    users.push(e);
  }).then(() =>
    response.status(200).json(users)
  ).catch(() =>
    response.status(500).json({ message: 'error fetching data' })
  );
});


app.get('/api/users/:id', (request, response) => {
  let userId = parseInt(request.params.id);
  if (isNaN(userId)) {
    response.status(500).json({ message: 'Id should be a Number' });
    return;
  }

  db.collection('users').findOne({ id: userId })
    .then((user) => {
      if (user) {
        delete user._id;
        response.status(200).json(user);
      } else
        response.status(404).json({ message: 'User Not Found' });
    }
    ).catch(() =>
      response.status(500).json({ message: 'error fetching data' })
    );

});

app.post('/api/users', (request, response) => {
  const newUser = request.body;

  if (!('first_name' in newUser) || !('last_name' in newUser)) {
    response.status(400).json({ message: 'first_name and last_name is required' });
    return;
  }

  let id = 1;
  db.collection('users').find().sort({ id: 1 })
    .forEach(user => {
      if (id === user.id)
        id++;
    }).then(() => {

      user = {
        "id": id,
        "first_name": newUser.first_name,
        "last_name": newUser.last_name,
        "email": newUser.email,
        "gender": newUser.gender,
        "address": newUser.address
      };

      db.collection('users').insertOne(user)
        .then(res => {
          delete user._id;
          response.status(201).json({ message: 'user created', user: user });
        })
        .catch(() => {
          response.status(500).json({ message: 'error adding data' })
        });

    })
    .catch((err) => {
      response.status(500).json({ message: 'error adding data' })
    });

});

app.patch('/api/users/:id', (request, response) => {
  let userId = parseInt(request.params.id);
  if (isNaN(userId)) {
    response.status(400).json({ message: 'Id should be a Number' });
    return;
  }

  const newUser = request.body;

  const user = {};

  const userFields = [
    "first_name",
    "last_name",
    "email",
    "gender",
    "address"
  ];

  for (let item of userFields)
    if (item in newUser)
      user[item] = (newUser[item]);


  db.collection('users').updateOne({ id: userId }, { $set: user })
    .then(res => {
      delete user._id;
      response.status(200).json({ message: 'user data Updated' });
    })
    .catch((err) => {
      console.log(err.message);
      response.status(500).json({ message: 'error changing data' })
    });
});

app.delete('/api/users/:id', (request, response) => {
  console.log("delete");
  let userId = parseInt(request.params.id);
  if (isNaN(userId)) {
    response.status(400).json({ message: 'Id should be a Number' });
    return;
  }

  db.collection('users').deleteOne({ id: userId })
    .then(res => {
      if (res.deletedCount === 1)
        response.status(200).json({ message: 'user deleted successfuly' });
      else
        response.status(404).json({ message: 'user not found' });
    })
    .catch((err) => {
      console.log(err.message);
      response.status(500).json({ message: 'error deleting user' })
    });

});







