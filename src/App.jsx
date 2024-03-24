import { useRef, useState , useEffect} from 'react';
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

  const handleDeleteTodo = () => {
    const newTodos = [...todos];
    newTodos.splice(0, 1);
    setTodos(newTodos);
  };
  
  const [classs, setClass] = useState('')
 const handelCorrect = () =>{
  if (classs == false) {
    
    setClass('correctIcone')
  }else{
    setClass('')
  }
  //  correct.classList.toggle("correctIcone")
 }
 
  return (
    <div className='App center'>
      <div className='mainToDo'>
        <h2>To Do List</h2>
        <ul>
          {todos.map(({ textInput, completed }, index) => (
            <div className='itemDeletItem' key={index}>
              <li
                className={completed ? 'done' : ''}
                onClick={() => handleToggleTodo(index)}
                key={textInput}
              >
                {textInput}

              </li>
              <div className="Icons">

              <span id='correct' className={`correct ${classs}`} onClick={handelCorrect}>✔️</span>
              
              <span className='CloseIcone' onClick={handleDeleteTodo}>✖️</span>
              </div>
            </div>
          ))}
        </ul>
        <div  className='footer'>
          <input type='text' ref={inputRef} placeholder='Enter your task' />
          <button onClick={handleAddTodo}>Add</button>
        </div>
      </div>
    </div>
  );
}

export default App;
