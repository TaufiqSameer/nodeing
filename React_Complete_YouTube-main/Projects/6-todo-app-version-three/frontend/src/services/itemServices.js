export const addItemtoServer = async (task, date) => {
  const response = await fetch("http://localhost:8000/api/todo", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      task: task,
      date: date,
    }),
  });
  return mapServerTimeToLocalTime(response.json());
};

export const getItemsFromServer = async () => {
  const response = await fetch("http://localhost:8000/api/todo");
  const item = await response.json();
  return item.map(mapServerTimeToLocalTime);
};

export const maskItemCompletedonServer = async (id) => {
  const response = await fetch(
    `http://localhost:8000/api/todo/${id}/completed,`,
    {
      method: "PUT",
    },
  );
  const items = await response.json();
  return mapServerTimeToLocalTime(items);
};

export const deleteFromServer = async (id) => {
  await fetch(`http://localhost:8000/api/todo/${id}`, {
    method: "DELETE",
  });

  return id;
};
const mapServerTimeToLocalTime = (serverItem) => {
  return {
    id: serverItem._id,
    name: serverItem.task,
    dueDate: serverItem.date,
    completed: serverItem.completed,
    createdAt: serverItem.createdAt,
    updatedAt: serverItem.updatedAt,
  };
};
