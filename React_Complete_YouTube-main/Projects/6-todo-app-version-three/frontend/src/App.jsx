import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import TodoItems from "./components/TodoItems";
import WelcomeMessage from "./components/WelcomeMessage";
import "./App.css";
import { useEffect, useState } from "react";
import { deleteFromServer, getItemsFromServer } from "./services/itemServices";
// import { addItemtoServer } from "./services/itemServices";
function App() {
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    getItemsFromServer().then((items) => {
      setTodoItems(items);
    });
  });
  const handleNewItem = async (itemName, itemDueDate) => {
    console.log(`New Item Added: ${itemName} Date:${itemDueDate}`);
    // const serverItem = await addItemtoServer(itemName, itemDueDate);
    const newTodoItems = [
      ...todoItems,
      { name: itemName, dueDate: itemDueDate },
    ];
    setTodoItems(newTodoItems);
  };
  const handleDeleteItem = async (id) => {
    const deletedId = await deleteFromServer(id)
    const newTodoItems = todoItems.filter((item) => item.id !== deletedId);
    setTodoItems(newTodoItems);
  };
  return (
    <center className="todo-container">
      <AppName />
      <AddTodo onNewItem={handleNewItem} />
      {todoItems.length === 0 && <WelcomeMessage></WelcomeMessage>}
      <TodoItems
        todoItems={todoItems}
        onDeleteClick={handleDeleteItem}
      ></TodoItems>
    </center>
  );
}

export default App;
