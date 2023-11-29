import React, { useEffect, useState } from "react";
import "./TodoList.css";
import DeleteModal from "./DeleteModal";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, toggleTodo, deleteTodo }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  console.log(todos, "todostodos");
  const [orderedTodos, setOrderedTodos] = useState([]);
  console.log(orderedTodos, "orderedTodosorderedTodos");
  
  useEffect(() => {
    // Log the updated state after it has been set
    console.log(orderedTodos, "orderedTodos");
  }, [orderedTodos]); // Run the effect whenever orderedTodos changes

  // Update orderedTodos when todos change
  useEffect(() => {
    setOrderedTodos(todos);
  }, [todos]);
  const handleDeleteClick = (todoId) => {
    setTodoToDelete(todoId);
    setModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (todoToDelete) {
      deleteTodo(todoToDelete);
      setTodoToDelete(null);
      setModalOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setTodoToDelete(null);
    setModalOpen(false);
  };

  const moveTodo = (fromIndex, toIndex) => {
    const updatedTodos = [...orderedTodos];
    const [movedTodo] = updatedTodos.splice(fromIndex, 1);
    updatedTodos.splice(toIndex, 0, movedTodo);
    setOrderedTodos(updatedTodos);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(orderedTodos));
  }, [orderedTodos]);

  console.log(todos, "todostodostodos");
  return (
    <DndProvider backend={HTML5Backend}>
      {" "}
      <div>
        <ul>
          {console.log(
            orderedTodos,
            "  console.log(orderedTodos)  console.log(orderedTodos)"
          )}
          {orderedTodos.map((todo, index) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              index={index}
              moveTodo={moveTodo}
              toggleTodo={toggleTodo}
              deleteTodo={handleDeleteClick}
            />
          ))}
        </ul>
        {modalOpen && (
          <DeleteModal
            onDelete={handleDeleteConfirm}
            onCancel={handleCancelDelete}
          />
        )}
      </div>
    </DndProvider>
  );
};

export default TodoList;
