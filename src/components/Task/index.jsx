import { useState } from 'react';
import styles from './task.module.css';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { TbTrash } from 'react-icons/tb';
import { AiOutlineEdit } from 'react-icons/ai';

export function Task({ task, onDelete, onComplete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);
  const [newDueDate, setNewDueDate] = useState(task.dueDate);
  const [newDueTime, setNewDueTime] = useState(task.dueTime);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  function handleEditClick() {
    setIsEditing(true);
  }

  function handleSave() {
    onEdit(task.id, newTitle, newDescription, newDueDate, newDueTime);
    setIsEditing(false);
  }

  function handleCancel() {
    setNewTitle(task.title);
    setNewDescription(task.description);
    setNewDueDate(task.dueDate);
    setNewDueTime(task.dueTime);
    setIsEditing(false);
  }

  function handleBlur() {
    handleSave();
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      handleSave();
    }
  }

  function handleDeleteClick() {
    setShowDeleteConfirm(true);
  }

  function confirmDelete() {
    onDelete(task.id);
    setShowDeleteConfirm(false);
  }

  function cancelDelete() {
    setShowDeleteConfirm(false);
  }

  const formatTime = (time) => {
    if (!time) return ''; 

    const [hours, minutes] = time.split(':').map(Number); 
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);

    let hours12 = date.getHours() % 12; 
    hours12 = hours12 === 0 ? 12 : hours12; 
    const amPm = date.getHours() >= 12 ? 'PM' : 'AM'; 

    const formattedTime = `${hours12}:${String(date.getMinutes()).padStart(2, '0')} ${amPm}`;
    return formattedTime;
  };

  return (
    <div className={styles.task}>
      <button className={styles.checkContainer} onClick={() => onComplete(task.id)}>
        {task.isCompleted ? <BsFillCheckCircleFill /> : <div />}
      </button>

      <p className={task.isCompleted ? styles.textCompleted : ""}>
        {task.title}
        <span className={styles.taskDetails}>
          <br />
          <strong>{task.description}</strong>
          <br />
          Due Date: <strong>{task.dueDate}</strong>
          <br />
          Due Time: <strong>{formatTime(task.dueTime)}</strong>
        </span>
      </p>

      <button className={styles.editButton} onClick={handleEditClick}>
        <AiOutlineEdit size={20} />
      </button>

      <button className={styles.deleteButton} onClick={handleDeleteClick}>
        <TbTrash size={20} />
      </button>

      {isEditing && (
        <div className={styles.modalOverlay} onClick={() => setIsEditing(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>Edit Task</h3>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onBlur={handleBlur}
              onKeyPress={handleKeyPress}
              placeholder="Title"
            />
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Description"
            />
            <input
              type="date"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
            />
            <input
              type="time"
              value={newDueTime}
              onChange={(e) => setNewDueTime(e.target.value)}
            />
            <div className={styles.modalButtons}>
              <button className={styles.saveButton} onClick={handleSave}>Save</button>
              <button className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className={styles.modalOverlay} onClick={cancelDelete}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>Are you sure you want to delete this task?</h3>
            <div className={styles.modalButtons}>
              <button className={styles.deleteConfirmButton} onClick={confirmDelete}>Yes</button>
              <button className={styles.cancelButton} onClick={cancelDelete}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



