const express = require('express')
const {v4: uuidv4} = require('uuid');

const {tareas} = require('../data/infoTareas').infoTareas;

const routerTareas = express.Router();

routerTareas.use(express.json())

routerTareas.get('/', (req, res) =>{
  res.json(tareas)
})

routerTareas.post('/', (req, res)=>{
  const accion = req.body.accion
  const id = uuidv4()
  let tareaNueva = {id, accion}
  tareas.push(tareaNueva)
  res.json(tareaNueva)
})

routerTareas.put('/:id', (req, res)=>{
  const tareaActualizada = req.body;
  const id = req.params.id
  
  const indice = tareas.findIndex(tarea => tarea.id == id)

  if (indice >= 0){
    tareas[indice] = tareaActualizada;
  }
  res.send(tareas)
})

routerTareas.patch('/:id', (req, res)=>{
  const tareaActualizada = req.body;
  const id = req.params.id
  
  const indice = tareas.findIndex(tarea => tarea.id == id)

  if(indice >= 0){
    const tareaModificar = tareas[indice]
    Object.assign(tareaModificar, tareaActualizada)
  }
  res.send(tareas)
})

routerTareas.delete('/:id', (req, res)=>{
  const id = req.params.id
  
  const indice = tareas.findIndex(tarea => tarea.id == id)

  if(indice >= 0){
    tareas.splice(indice, 1)
  }
  res.send(tareas)
})

module.exports = routerTareas