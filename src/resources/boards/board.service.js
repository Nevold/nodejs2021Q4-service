const { v4: uuidv4 } = require('uuid');
let items = require('./board.memory.repository');

const getAllBoards = (_, reply) => {
  reply.send(items);
};

const getSingleBoard = (request, reply) => {
  const { id } = request.params;
  const currentId = items.find((item) => item.id === id);
  if (!currentId) {
    reply.code(404).send('Not Found');
  } else {
    const currentItem = items.find((item) => item.id === id);
    reply.send(currentItem);
  }
};

const addBoard = (request, reply) => {
  const { title, columns } = request.body;
  for (let i = 0; i < columns.length; i += 1) {
    columns[i].id = uuidv4();
  }
  const item = { id: uuidv4(), title, columns };
  items = [...items, item];
  reply.code(201).send(item);
};

const deleteBoard = (request, reply) => {
  const { id } = request.params;
  const currentId = items.find((item) => item.id === id);
  if (!currentId) {
    reply.code(404).send('Not Found');
  } else {
    items = items.filter((item) => item.id !== id);
    reply.code(200).send('Deleted');
  }
};

const updateBoard = (request, reply) => {
  const { id } = request.params;
  const { title, columns } = request.body;
  items = items.map((elem) => (elem.id === id ? { id, title, columns } : elem));
  const currentItem = items.find((item) => item.id === id);
  reply.send(currentItem);
};

// tasks

const getAllTasks = (request, reply) => {
  const { boardId: id } = request.params;
  const currentItem = items.find((item) => item.id === id);
  if (!currentItem) {
    reply.code(404).send('Not Found');
  } else {
    const currentTask = currentItem.columns;
    reply.send(currentTask);
  }
};

const getSingleTask = (request, reply) => {
  const { boardId, taskId } = request.params;
  const currentItem = items.find((item) => item.id === boardId);

  if (!currentItem) {
    reply.code(404).send('Not Found');
  } else {
    const currentTask = currentItem.columns.find((item) => item.id === taskId);
    if (!currentTask) {
      reply.code(404).send('Not Found');
    } else {
      reply.send(currentTask);
    }
  }
};

const addTask = (request, reply) => {
  const { title, columnId, description, order, userId } = request.body;
  const { boardId: id } = request.params;
  const currentItem = items.find((item) => item.id === id);
  if (!currentItem) {
    reply.code(404).send('Not Found');
  } else {
    const currentTask = currentItem.columns;
    const newTask = {
      id: uuidv4(),
      title,
      order,
      description,
      userId,
      columnId,
      boardId: id,
    };
    items = items.map((elem) =>
      elem.id === id ? { id, title, columns: [...currentTask, newTask] } : elem
    );
    reply.code(201).send(newTask);
  }
};

const deleteTask = (request, reply) => {
  const { boardId: id, taskId } = request.params;
  const currentItem = items.find((item) => item.id === id);
  if (!currentItem) {
    reply.code(404).send('Not Found');
  } else {
    const currentTask = currentItem.columns;

    const deleteCurrentTask = currentTask.filter((elem) => elem.id !== taskId);
    items = items.map((elem) =>
      elem.id === id ? { ...elem, columns: [...deleteCurrentTask] } : elem
    );

    reply.send('Deleted');
  }
};

const updateTask = (request, reply) => {
  const { title, description, order } = request.body;
  const { boardId: id, taskId } = request.params;
  const currentItem = items.find((item) => item.id === id);
  if (!currentItem) {
    reply.code(404).send('Not Found');
  } else {
    const currentTask = currentItem.columns;
    const updateCurrentTask = currentTask.map((elem) =>
      elem.id === taskId ? { ...elem, title, order, description } : elem
    );
    items = items.map((elem) =>
      elem.id === id ? { id, title, columns: [...updateCurrentTask] } : elem
    );
    const updateItem = updateCurrentTask.find((item) => item.id === taskId);
    reply.send(updateItem);
  }
};

module.exports = {
  getAllBoards,
  getSingleBoard,
  addBoard,
  deleteBoard,
  updateBoard,
  getAllTasks,
  getSingleTask,
  addTask,
  deleteTask,
  updateTask,
};
