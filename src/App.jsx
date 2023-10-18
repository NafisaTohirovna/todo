import { useEffect, useState } from "react";
import { useRequest } from "./utils/httpsRequest";

import AddTodo from "./components/AddTodo";
import Todo from "./components/Todos";

import "./App.css";
import Tabs from "./components/Tabs";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    (async () => {
      const res = await useRequest.get();
      if (!localStorage.getItem("todos")) {
        setTodos(res.data);
      }
    })();
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAdd = () => {
    if (!inputValue.trim()) {
      alert("Kiruvchi ma'lumot yo'q!");
      return;
    }

    const newId =
      todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;
    const newTodo = {
      id: newId,
      title: inputValue,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue("");

    useRequest.post("", newTodo);
  };

  const handleEdit = (todo) => {
    const idx = todos.findIndex((t) => t.id === todo.id);
    let todoTitle = prompt(todo.title, todo.title);
    todos[idx].title = todoTitle;

    setTodos([...todos]);
    useRequest.put(`${todo.id}`, {
      id: todo.id,
      title: todoTitle,
      completed: false,
    });
  };

  const handleDelete = (id) => {
    const newTodo = todos.filter((todo) => todo.id !== id);
    setTodos([...newTodo]);

    useRequest.delete(`${id}`);
  };

  const handleCompleted = (id) => {
    const updateTodo = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    setTodos(updateTodo);

    useRequest.put(`${id}`, {
      id: id,
      title: updateTodo.find((todo) => todo.id === id).title,
      completed: updateTodo.find((todo) => todo.id === id).completed,
    });
  };

  useEffect(() => {
    if (todos.length) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  useEffect(() => {
    const todos = localStorage.getItem("todos");
    if (todos) {
      setTodos(JSON.parse(todos));
    }
  }, []);

  return (
    <div>
      <AddTodo
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        handleAdd={handleAdd}
      />

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <Todo
        todos={todos}
        activeTab={activeTab}
        handleCompleted={handleCompleted}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
