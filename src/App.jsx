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
        <img className='imgTitle' src="/public/checklist.png" alt="" />
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
