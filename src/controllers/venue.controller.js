// src/controllers/venue.controller.js

const getAll = (req, res) => {
    res.json([{ id: 1, name: 'Auditorio Central' }]);
  };
  
  const getById = (req, res) => {
    const { id } = req.params;
    res.json({ id, name: 'Sede Ejemplo' });
  };
  
  const create = (req, res) => {
    const { name, location } = req.body;
    res.status(201).json({ message: 'Sede creada', data: { name, location } });
  };
  
  const update = (req, res) => {
    const { id } = req.params;
    const { name, location } = req.body;
    res.json({ message: `Sede ${id} actualizada`, data: { name, location } });
  };
  
  const remove = (req, res) => {
    const { id } = req.params;
    res.json({ message: `Sede ${id} eliminada` });
  };
  
  module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
  };
  