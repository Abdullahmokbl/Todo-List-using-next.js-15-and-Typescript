'use client';
import { useEffect, useState } from 'react';
import './home.css';

interface Item {
  id: number;
  name: string;
  completed: boolean;
}
export default function Home() {
  const [list, setList] = useState<Item[]>([]);
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    setList(JSON.parse(localStorage.getItem('list') || '[]'));
  }, []);

  const addItem = () => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return;
    const newList = [...list, { id: Math.random(), name: trimmedValue, completed: false }];
    setList(newList);
    setValue('');
    localStorage.setItem('list', JSON.stringify(newList));
  };

  const toggleCompleted = (id: number) => {
    const updatedList = list.map(item => (item.id === id ? { ...item, completed: !item.completed } : item));
    setList(updatedList);
    localStorage.setItem('list', JSON.stringify(updatedList));
  };
  const deleteItem = (id: number) => {
    const newList = list.filter(item => item.id !== id);
    setList(newList);
    localStorage.setItem('list', JSON.stringify(newList));
  };

  return (
    <div className="todo-container">
      <h1>✨ Todo List</h1>
      <div className="input-section">
        <input
          type="text"
          id="taskInput"
          placeholder="Enter a new task..."
          name="todo"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addItem()}
        />
        <button id="addButton" onClick={addItem}>
          Add Task
        </button>
      </div>
      <ul className="task-list">
        {list?.toReversed().map(item => (
          <li className="task-item" key={item.id}>
            <label className="task-checkbox-label">
              <input
                type="checkbox"
                className="task-checkbox"
                checked={item.completed}
                onChange={() => toggleCompleted(item.id)}
              />
              <span className="checkmark"></span>
            </label>
            <span className={`task-text ${item.completed && 'completed'}`}>{item.name}</span>
            <button className="delete-btn" aria-label="Delete task" onClick={() => deleteItem(item.id)}></button>
          </li>
        ))}
      </ul>
    </div>
  );
}
