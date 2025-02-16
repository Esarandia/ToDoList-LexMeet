import { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { FaSun, FaMoon, FaPlusCircle, FaGithub, FaInfoCircle, FaGlobe } from 'react-icons/fa'; 
import styles from './header.module.css';
import todoLogo from '../../assets/lexmeetlogo.png'; 
import darkLogo from '../../assets/darkmodelogo.png'; 
import headerImage from '../../assets/lexmeetheader.png'; 
import lexmeetHeaderDark from '../../assets/lexmeetheaderdark.png'; 

export function Header({ handleAddTask, theme, setTheme }) {
  const [title, setTitle] = useState('');
  const [showHelp, setShowHelp] = useState(false); 
  const [showModal, setShowModal] = useState(false);
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [description, setDescription] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHamburgerHidden, setIsHamburgerHidden] = useState(false); 

  function handleSubmit(event) {
    event.preventDefault();
    if (title.trim() === '') return;
    handleAddTask(title, dueDate, dueTime, description);
    setTitle('');
    setDueDate('');
    setDueTime('');
    setDescription('');
    setShowModal(false);
  }

  function onChangeTitle(event) {
    setTitle(event.target.value);
  }

  function toggleSidebar() {
    setIsHamburgerHidden(!isHamburgerHidden);
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerBackground}>
        {/*change header image */}
        <img 
          src={theme === 'dark' ? lexmeetHeaderDark : headerImage} 
          alt="LexMeet Header" 
          className={styles.headerImage} 
        />
      </div>

      {/*Hamburger icon*/}
      <div
        className={`${styles.sidebarToggle} ${isHamburgerHidden ? styles.hidden : ''}`}
        onClick={toggleSidebar}
      >
        <AiOutlineMenu size={24} />
      </div>

      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''} ${theme === 'dark' ? styles.darkSidebar : styles.lightSidebar}`}>
        {/* Close Sidebar*/}
        <button 
          className={`${styles.closeSidebarButton} ${theme === 'dark' ? styles.dark : ''}`} 
          onClick={toggleSidebar}
        >
          <AiOutlineClose size={24} />
        </button>

        {/* Sidebar Links */}
        <a href="https://lexmeet.com/" target="_blank" rel="noopener noreferrer">
         <FaGlobe size={18} /> Website
        </a>
        <a href="#" onClick={() => setShowHelp(true)}>
        <FaInfoCircle size={18} /> Help
        </a>
        <a href="https://github.com/Esarandia/ToDoList-LexMeet" target="_blank" rel="noopener noreferrer">
  <FaGithub size={18} /> GitHub
        </a>

        {/* Dark/light mode in sidebar */}
        <div className={styles.themeToggleSidebar} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
          <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </div>
      </div>

      {/* Logo */}
      <img 
        src={theme === 'dark' ? darkLogo : todoLogo} 
        className={styles.logo} 
        alt="LexMeet Logo" 
      />

      {/* Task Creation Form */}
      <form onSubmit={(e) => { e.preventDefault(); setShowModal(true); }} className={styles.newTaskForm}>
        <input
          className={`${styles.inputField} ${theme === 'dark' ? styles.dark : ''}`} 
          placeholder="Add a new task"
          type="text"
          onChange={onChangeTitle}
          value={title}
        />
        <button className={`${styles.createButton} ${theme === 'dark' ? styles.dark : ''}`} type="submit">
          Create <FaPlusCircle size={15} /> 
        </button>
      </form>

      {/* Help Modal */}
        {showHelp && (
        <div className={styles.helpOverlay} onClick={() => setShowHelp(false)}>
        <div className={styles.helpModal} onClick={(e) => e.stopPropagation()}>
      <h4>How to Use</h4>
      <br></br>
      <ol className={styles.helpList}>
        <li>
          <strong>Add Tasks:</strong> Type a task in the text field and click the "Create" button. After entering the task name, a menu will appear, allowing you to add additional task details. In the Due Date field, click the calendar icon to select a date. In the Due Time field, click the clock icon to pick a time. You can also add an optional description for the task. Once you're satisfied with the details, click the Save Task button to add it to the list. If you change your mind, you can click Cancel instead.
        </li>
        <li>
          <strong>Edit Tasks:</strong> To edit a task, click the pencil icon on the task you want to modify. Once clicked, a menu will open, allowing you to edit all the details of the task. If you're satisfied with the changes, click the Save button. If you want to discard the changes, click Cancel instead.
        </li>
        <li>
          <strong>Delete Tasks:</strong> To delete a task, click the trash can icon on the task you want to remove. If you're sure you want to delete the task, click Yes to confirm. If you change your mind, click No to cancel.
        </li>
        <li>
          <strong>Approve Tasks:</strong> When you complete a task, click the checkbox next to the task title to mark it as done. If needed, you can uncheck it to mark the task as incomplete.
        </li>
        <li>
          <strong>Change Theme:</strong> Toggle between Dark and Light mode by clicking the sun/moon button located in the bottom left corner of the sidebar menu.
        </li>
        </ol>
        <button className={styles.closeButton} onClick={() => setShowHelp(false)}>Close</button>
        </div>
        </div>
      )}

      {/* Task Modal */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>Enter Task Details</h3>
            <input 
              type="date" 
              value={dueDate} 
              onChange={(e) => setDueDate(e.target.value)} 
              placeholder="Due Date" 
            />
            <input 
              type="time" 
              value={dueTime} 
              onChange={(e) => setDueTime(e.target.value)} 
              placeholder="Due Time" 
            />
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Description"
            />
            
            {/* Save Task Button */}
            <button className={styles.saveButton} onClick={handleSubmit}>Save Task</button>

            {/* Cancel Button */}
            <button 
              className={styles.cancelButton} 
              onClick={() => setShowModal(false)} 
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
