
import React, { useState } from "react";
import '../styles/AddTaskForm.css';
import {Input , DatePicker, TimePicker, Label, Textarea , Button, Checkbox} from '@innovaccer/design-system';
import "@innovaccer/design-system/css/dist/index.css";
 
const SingleForm = ({ tasks, setTasks , setErrorMessage }) => {
    const [title, setTitle] = useState('');
    const [done, setDone] = useState(false);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [comment, setComment] = useState('');
    const [important, setImportant] = useState(false); 
    const [showDetails, setShowDetails] = useState(false); 

    const addTask = () => {
      if(title){
        const newTask = {
            title,
            done,
            date,
            time,
            comment,
            important, 
        };

        if (tasks.find((it) => it.title === title)) {
            setErrorMessage("This task already exists");
            return;
        }

        setTasks([...tasks, newTask]);
        resetForm();
        console.log(newTask);
      } else{
        setErrorMessage("Task Empty");
      }
    };

    const cancelTask = () => {
        resetForm();
    };

    const resetForm = () => {
        setTitle('');
        setDone(false);
        setDate('');
        setTime('');
        setComment('');
        setImportant(false); 
        setShowDetails(false); 
        setErrorMessage('');
    };

    return (
             
        <div className='content-wrapper'>
            <div className="edit-headSingle">
                <div className="edit-headtaskbar">
                    {showDetails && (
                        
                        <Checkbox
                            checked={done}
                            onChange={(e) => setDone(e.target.checked)}
                        />
                    )}
                        <Input
                            placeholder="Task title"
                            name="input"
                            className="w-25 w-25a"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onClick={() => setShowDetails(true)}
                            onClear={() => setTitle('')}
                        />
                          <label>
                            <input
                                type="checkbox"
                                checked={important}
                                onChange={(e) => setImportant(e.target.checked)}
                                style={{display:'none'}}
                            />
                                <span style={{ fontSize: '1.2rem', cursor: 'pointer' }}>
                                    {important ? '⭐' : '☆'} 
                                </span>
                        </label>
                </div>
                {showDetails && ( 
                    <div className="edit-body">
                        <div className="edit-body__field" style={{ padding : '20px'}}>
                            <label htmlFor="deadline" className="edit-body__label">Deadline</label>
                            <div className="edit-body__input-wrapper">
            
                                <div className="w-25">
                                    <DatePicker disabledAfter={new Date("2028-01-19T18:30:00.000Z")} disabledBefore={new Date("2015-01-19T18:30:00.000Z")} firstDayOfWeek="saturday" inputOptions={{
                                        required: true
                                        }} onDateChange={(e) => setDate(e)} outputFormat="yyyy/mm/dd" withInput={true} />
                                         
                                        <TimePicker
                                        inputFormat={'hh:mm AM'}
                                        outputFormat={'hh:mm AM'}
                                        onTimeChange={(e) => setTime(e)}
                                        
                                    />
                                </div>
                                
                            </div>
                        </div>
                        <div className="edit-body__field" style={{ padding : '20px'}}>
                            <div className="w-50">
                                <Label htmlFor="comments" withInput={true}>
                                     Comments
                                </Label>
                                <Textarea aria-labelledby="Comments" id="comments" name="comments" 
                                placeholder="Enter your comments here" 
                                onChange={(e) => setComment(e.target.value) }  
                                resize={false} 
                                className="custtextarea"
                                />
                            </div>
                            
                        </div>
                        <div className="edit-body__btns">
                            <Button
                                aria-label="x Cancel"
                                type="button"
                                onClick={cancelTask}
                                style={{backgroundColor: 'red' , marginRight: '10px'} }
                            >
                                x Cancel
                            </Button>
                            <Button
                                aria-label="+ Save Task"
                                type="button"
                                onClick={addTask}
                                style={{backgroundColor:'lightgreen', marginLeft:'10px'}}
                            >
                                + Save Task
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>



    );
};

export default SingleForm;

