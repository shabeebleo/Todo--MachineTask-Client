import React, { useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import "./TodoList.css";

const TodoItem = ({ todo, index, moveTodo, toggleTodo, deleteTodo }) => {
  const [, ref] = useDrag({
    type: "TODO",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "TODO",
    hover: (item) => {
      if (item.index !== index) {
        moveTodo(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <li ref={(node) => ref(drop(node))} key={todo.id}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo._id)}
      />
      <span
        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
      >
        {todo.title}
      </span>
      <button className="li-button" onClick={() => deleteTodo(todo._id)}>
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
