import React from "react";
import { useFormik } from "formik";
import "./TodoForm.css";

const TodoForm = ({ addTodo }) => {
  const formik = useFormik({
    initialValues: {
      text: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.text) {
        errors.text = "Required";
      }

      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      addTodo(values.text);
      resetForm();
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.text}
          placeholder="Add a new todo"
        />
        {formik.touched.text && formik.errors.text && (
          <div style={{ color: "red" }}>{formik.errors.text}</div>
        )}
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default TodoForm;
