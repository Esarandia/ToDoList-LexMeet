import { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { FaSun, FaMoon, FaPlusCircle, FaGithub, FaInfoCircle, FaGlobe } from 'react-icons/fa'; 
import styles from './header.module.css';
import todoLogo from '../../assets/lexmeetlogo.png'; 
import darkLogo from '../../assets/darkmodelogo.png'; 
import headerImage from '../../assets/lexmeetheader.png'; 
import lexmeetHeaderDark from '../../assets/lexmeetheaderdark.png'; 
import { toast } from 'react-toastify';  // Import toast

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

    // Validate that title, dueDate, and dueTime are filled
    if (title.trim() === '') {
      toast.error('Title cannot be empty!');
      return;
    }

    if (dueDate === '') {
      toast.error('Please provide a due date!');
      return;
    }

    if (dueTime === '') {
      toast.error('Please provide a due time!');
      return;
    }

    // If all fields are valid, proceed to add the task
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
        <img 
          src={theme === 'dark' ? lexmeetHeaderDark : headerImage} 
          alt="LexMeet Header" 
          className={styles.headerImage} 
        />
      </div>

      <div
        className={`${styles.sidebarToggle} ${isHamburgerHidden ? styles.hidden : ''}`}
        onClick={toggleSidebar}
      >
        <AiOutlineMenu size={24} />
      </div>

      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''} ${theme === 'dark' ? styles.darkSidebar : styles.lightSidebar}`}>
        <button 
          className={`${styles.closeSidebarButton} ${theme === 'dark' ? styles.dark : ''}`} 
          onClick={toggleSidebar}
        >
          <AiOutlineClose size={24} />
        </button>

        <a href="https://lexmeet.com/" target="_blank" rel="noopener noreferrer">
         <FaGlobe size={18} /> Website
        </a>
        <a href="#" onClick={() => setShowHelp(true)}>
          <FaInfoCircle size={18} /> Help
        </a>
        <a href="https://github.com/Esarandia/ToDoList-LexMeet" target="_blank" rel="noopener noreferrer">
          <FaGithub size={18} /> GitHub
        </a>

        <div className={styles.themeToggleSidebar} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
          <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </div>
      </div>

      <img 
        src={theme === 'dark' ? darkLogo : todoLogo} 
        className={styles.logo} 
        alt="LexMeet Logo" 
      />

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
            <ol className={styles.helpList}>
              <li><strong>Add Tasks:</strong> Type a task in the text field and click the "Create" button...</li>
              {/* The rest of your help instructions */}
            </ol>
            <button className={styles.closeButton} onClick={() => setShowHelp(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Task Modal */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div 
            className={styles.modalContent} 
            onClick={(e) => e.stopPropagation()} // Prevent closing the modal when clicking inside the modal content
          >
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
            
            <button className={styles.saveButton} onClick={handleSubmit}>Save Task</button>
            <button className={styles.cancelButton} onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}

    </header>
  );
}
