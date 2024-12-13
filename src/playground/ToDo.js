import React, { useState } from 'react';
import { Text, Textarea, Button } from '@innovaccer/design-system';
import '../styles/todo.css';

const ToDoList = () => {
    const [inputValue, setInputValue] = useState('');
    const [items, setItems] = useState([]);
    const [items2, setItems2] = useState([]);

    const handleAddItem = () => {
        if (inputValue.trim() !== '') {
            setItems([...items, inputValue]);
            setInputValue('');
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleAddItem(); 
        }
    };

    const handleRemoveItem = (index) => {
        
        const itemToMove = items[index];   
        const newItems = items.filter((_, itemIndex) => itemIndex !== index);
    
        setItems(newItems);
        setItems2([...items2, itemToMove]);
    };
    const handleDeleteItem = (index) => {

      const newItems = items.filter((_, itemIndex) => itemIndex !== index);
      setItems(newItems);
    };

    return (
        <div className='bar'>
            <div>
                <h1>To Do List</h1>
                {/* <Textarea 
                  aria-labelledby="Textarea" 
                  name="Textarea" 
                  onChange={(e) => setInputValue(e.target.value)} 
                  onKeyDown={handleKeyDown}
                  placeholder="Enter Here" 
                  className='holder' 
                  value={inputValue} 
                  resize={false} 
                  rows={3} /> */}
                <input 
                    type="text" 
                    placeholder="Enter here" 
                    className='holder' 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)} 
                    onKeyDown={handleKeyDown}
                />
                <Button onClick={handleAddItem}>Add</Button>
            </div>
            <div className='itemlist'>
                <h2>Pending Tasks</h2>
                {items.map((item, index) => (
                    <div key={index} className='listbar'>
                        {item} 
                        <div className='rembut'>
                          <Button onClick={() => handleRemoveItem(index)}>Done</Button>
                          <Button onClick={() => handleDeleteItem(index)}>Delete</Button>
                        </div>
                    </div>
                ))}
            </div>

            <div className='itemlist'>
                <h2>Completed Tasks</h2>
                {items2.map((item, index) => (
                    <div key={index} className='listbar2'>
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ToDoList;
