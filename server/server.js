#!/usr/bin/env node
const express = require('express')
const app = express();
const PORT = 5000;
const cors = require('cors');
const { MongoClient } = require('mongodb')
const mongoose = require('mongoose')
const Schematask = require('./models/schemaTasks')

const dbUri = 'mongodb+srv://hector:1234@to-do-list.izkqmpn.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbUri, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=>{
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  })


app.use(cors());

const {infoTareas} = require('./data/infoTareas');

const routerTareas = require('./routers/routerTareas');
app.use('/api', routerTareas)

app.get('/', (req, res)=>{
  res.send('Mi primer servisor con express. Cursos.')
})

app.get('/add-task', (req, res)=>{
  const task = new Schematask({
    task: 'new task'

  });
  task.save()
  .then((result)=>{
    res.send(result)
  })
  .catch((err)=>{
    console.log(err);
  })
})

app.get("/api", (req, res)=>{
  res.json(JSON.stringify(infoTareas))
});

app.listen(PORT, () => {console.log("Server started on port 5000");})