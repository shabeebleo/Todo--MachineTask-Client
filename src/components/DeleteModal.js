import React from 'react';

const DeleteModal = ({ onDelete, onCancel }) => {
  return (
    <div className="modal">
      <p>Are you sure you want to delete this task?</p>
      <button onClick={onDelete}>Yes</button>
      <button onClick={onCancel}>No</button>
    </div>
  );
};

export default DeleteModal;
