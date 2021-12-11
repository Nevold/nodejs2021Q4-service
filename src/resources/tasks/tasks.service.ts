// const { v4: uuidv4 } = require('uuid');
// let { tasksRepo: items } = require('../boards/board.service');

// const getAllTasks = (request, reply) => {
//   const { id } = request.params;
//   const currentId = items.find((item) => item.id === id);
//   if (!currentId) {
//     reply.code(404).send('Not Found');
//   } else {
//     const currentItem = items.find((item) => item.id === id);
//     reply.send(currentItem);
//   }
// };

// const getSingleTask = (request, reply) => {
//   const { taskId: id } = request.params;
//   const currentId = items.find((item) => item.id === id);
//   if (!currentId) {
//     reply.code(404).send('Not Found');
//   } else {
//     const currentItem = items.find((item) => item.id === id);
//     reply.send(currentItem);
//   }
// };

// const addTask = (request, reply) => {
//   const { title, columns } = request.body;
//   const item = { id: uuidv4(), title, columns };
//   items = [...items, item];
//   reply.code(201).send(item);
// };

// const deleteTask = (request, reply) => {
//   const { id } = request.params;
//   const currentId = items.find((item) => item.id === id);
//   if (!currentId) {
//     reply.code(404).send('Not Found');
//   } else {
//     items = items.filter((item) => item.id !== id);
//     reply.code(200).send('Deleted');
//   }
// };

// const updateTask = (request, reply) => {
//   const { id } = request.params;
//   const { title, columns } = request.body;
//   items = items.map((elem) => (elem.id === id ? { id, title, columns } : elem));
//   const currentItem = items.find((item) => item.id === id);
//   reply.send(currentItem);
// };

// module.exports = {
//   getAllTasks,
//   getSingleTask,
//   addTask,
//   deleteTask,
//   updateTask,
// };
