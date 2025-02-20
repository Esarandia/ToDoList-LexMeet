import { Task } from '../Task';
import { useState } from 'react';
import styles from './tasks.module.css';
import { toast } from 'react-toastify';

export function Tasks({ tasks, onDelete, onComplete, onEdit, onCompleteAll, onDeleteAll }) {
  const [showCompleteConfirm, setShowCompleteConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const tasksQuantity = tasks.length;
  const completedTasks = tasks.filter(task => task.isCompleted).length;

  // Check if all tasks are completed
  const checkIfAllCompleted = () => tasks.every(task => task.isCompleted);

  function completeAllTasks() {
    if (tasks.length === 0) {
      toast.info("There are no tasks to mark!");
      return; // If no tasks, do nothing
    }

    // Toggle complete/incomplete for all tasks
    const newTasks = tasks.map(task => ({ ...task, isCompleted: !checkIfAllCompleted() }));
    onCompleteAll(newTasks); // Call the parent function to update tasks
  }

  function confirmCompleteAll() {
    completeAllTasks();
    setShowCompleteConfirm(false);
  }

  function confirmDeleteAll() {
    if (tasks.length === 0) {
      toast.info("No tasks to delete!");
    } else {
      onDeleteAll([]); // Pass an empty array to delete all tasks
    }
    setShowDeleteConfirm(false); // Close the modal immediately
  }
  

  return (
    <section className={styles.tasks}>
      <header className={styles.header}>
        <div>
          <p>Tasks Created : {tasksQuantity}</p>
        </div>

        <div>
          <p className={styles.textOrange}>Tasks Completed : {completedTasks} of {tasksQuantity}</p>
        </div>
      </header>

      <div className={styles.actions}>
        <button 
          className={styles.completeAll} 
          onClick={() => setShowCompleteConfirm(true)}
        >
          {tasks.length === 0 ? 'Complete All' : checkIfAllCompleted() ? 'Mark All Incomplete' : 'Complete All'}
        </button>

        <button 
          className={styles.deleteAll} 
          onClick={() => setShowDeleteConfirm(true)}
        >
          Delete All
        </button>
      </div>

      <div className={styles.list}>
        {tasks.map((task) => (
          <Task 
            key={task.id} 
            task={task} 
            onDelete={onDelete} 
            onComplete={onComplete} 
            onEdit={onEdit} 
          />
        ))}
      </div>

      {/* Confirmation Modal for "Complete All" */}
      {showCompleteConfirm && (
        <div className={`${styles['modal-overlay']} ${showCompleteConfirm ? styles.show : ''}`} onClick={() => setShowCompleteConfirm(false)}>
          <div className={styles['modal-content']} onClick={(e) => e.stopPropagation()}>
            <h3>Are you sure you want to {checkIfAllCompleted() ? 'mark all tasks as incomplete?' : 'complete all tasks?'}</h3>
            <div className={styles['modal-buttons']}>
              <button onClick={confirmCompleteAll}>Yes</button>
              <button onClick={() => setShowCompleteConfirm(false)}>No</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for "Delete All" */}
      {showDeleteConfirm && (
        <div className={`${styles['modal-overlay']} ${showDeleteConfirm ? styles.show : ''}`} onClick={() => setShowDeleteConfirm(false)}>
          <div className={styles['modal-content']} onClick={(e) => e.stopPropagation()}>
            <h3>Are you sure you want to delete all tasks?</h3>
            <div className={styles['modal-buttons']}>
              <button onClick={confirmDeleteAll}>Yes</button>
              <button onClick={() => setShowDeleteConfirm(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
