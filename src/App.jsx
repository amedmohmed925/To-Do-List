import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const inputRef = useRef();

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    const textInput = inputRef.current.value;
    const newItem = { completed: false, textInput };
    setTodos([...todos, newItem]);
    inputRef.current.value = '';
  };

  const handleToggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1); // Corrected deletion logic
    setTodos(newTodos);
  };

  const handleCorrectClick = (index) => {
    // Toggle the class for the correct icon
    const newTodos = [...todos];
    newTodos[index].classs = newTodos[index].classs === 'correctIcone' ? '' : 'correctIcone';
    setTodos(newTodos);
  };

  return (
    <div className='App center'>
      <div className='mainToDo'>
        <div className="header">
        {/* <img className='imgTitle' src="/public/checklist.png" alt="" /> */}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="imgTitle bi bi-clipboard-check-fill" viewBox="0 0 16 16">
  <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z"/>
  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
</svg>
        <h2>To Do List</h2>
        </div>
        
        <ul>
          {todos.map(({ textInput, completed, classs }, index) => (
            <div className='itemDeletItem' key={index}>
              <li
                className={completed ? 'done' : ''}
                onClick={() => handleToggleTodo(index)}
                key={textInput}
              >
                {textInput}
              </li>
              <div className='Icons'>
                <span
                  id={`correct-${index}`}
                  className={`correct ${classs}`}
                  onClick={() => handleCorrectClick(index)}
                >
                  ✔️
                </span>
                <span className='CloseIcone' onClick={() => handleDeleteTodo(index)}>
                  ✖️
                </span>
              </div>
            </div>
          ))}
        </ul>
        <div className='footer'>
          <input type='text' ref={inputRef} placeholder='Enter your task' />
          <button onClick={handleAddTodo}>Add</button>
        </div>
      </div>
    </div>
  );
}

export default App;
