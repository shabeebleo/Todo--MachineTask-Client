import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {
  fetchTodos,
  addTodoApi,
  updateTodoApi,
  deleteTodoApi,
} from "../services/todoService";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import Chart from "./Chart/Chart";
import ChartForm from "./Chart/ChartForm";

const TodoHome = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todosFromApi = await fetchTodos();
        console.log(todosFromApi, "todosFromApitodosFromApi");
        setTodos(todosFromApi);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchData();
  }, []);

  const addTodo = async (text) => {
    try {
      const newTodo = await addTodoApi(text);
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const toggleTodo = async (id) => {
    console.log(id, "iddd");
    try {
      const updatedTodo = await updateTodoApi(
        id,
        !todos.find((todo) => todo._id === id).completed
      );
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, completed: updatedTodo.completed } : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    console.log(id, "id to delete");
    try {
      await deleteTodoApi(id);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <Router>
      <div
        style={{
          display: "flex",
          marginTop: "20px",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          textAlign: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        <div>
          <nav>
            <ul style={{ display: "flex" }}>
              <li>
                <Link to="/">
                  {" "}
                  <span style={{ color: "green", fontSize: "25px" }}>
                    Home
                  </span>{" "}
                </Link>
              </li>
              <li>
                <Link to="/todos">
                  {" "}
                  <span style={{ color: "green", fontSize: "25px" }}>
                    Todos
                  </span>{" "}
                </Link>
              </li>
              <li>
                <Link to="/chart">
                  {" "}
                  <span style={{ color: "green", fontSize: "25px" }}>
                    Chart
                  </span>{" "}
                </Link>
              </li>
              <li>
                <Link to="/chartForm">
                  {" "}
                  <span style={{ color: "green", fontSize: "25px" }}>
                    Chart-Form
                  </span>{" "}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <hr />
        <Routes>
          <Route path="/" exact render={() => <h2>Home</h2>} />
          <Route
            path="/chart"
            element={
              <Chart
                chartTitle="Custom Chart Title"
                backgroundColor="rgba(255, 255, 255, 0.2)"
                gridLineColor="rgba(128, 128, 128, 0.2)"
                tooltipsFontSize={14}
                customTooltipsLabel={(item) => `Value: ${item.value}`}
              />
            }
          />
          <Route
            path="/todos"
            element={
              <div
                style={{
                  display: "flex",
                  marginTop: "20px",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  textAlign: "center",
                  width: "100vw",
                  height: "100vh",
                }}
              >
                <h2>Todos</h2>
                <TodoForm addTodo={addTodo} />
                <TodoList
                  todos={todos}
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                />
              </div>
            }
          />

          <Route path="/chartForm" element={<ChartForm/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default TodoHome;
