// src/controllers/participant.controller.js

const getAll = (req, res) => {
    res.json([{ id: 1, name: 'Diego Pérez', age: 22 }]);
  };
  
  const getById = (req, res) => {
    const { id } = req.params;
    res.json({ id, name: 'Participante Demo' });
  };
  
  const create = (req, res) => {
    const { name, age } = req.body;
    res.status(201).json({ message: 'Participante creado', data: { name, age } });
  };
  
  const update = (req, res) => {
    const { id } = req.params;
    const { name, age } = req.body;
    res.json({ message: `Participante ${id} actualizado`, data: { name, age } });
  };
  
  const remove = (req, res) => {
    const { id } = req.params;
    res.json({ message: `Participante ${id} eliminado` });
  };
  
  module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
  };
  