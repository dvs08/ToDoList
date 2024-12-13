// TaskForm.js
import React, { useState, useEffect } from "react";
import '../styles/AddTaskForm.css';
import { Input, DatePicker, TimePicker, Label, Textarea, Button, Checkbox } from '@innovaccer/design-system';

const TaskForm = ({ tasks, setTasks, setErrorMessage, currentTask, resetCurrentTask }) => {
    const [title, setTitle] = useState(currentTask ? currentTask.title : '');
    const [done, setDone] = useState(currentTask ? currentTask.done : false);
    const [date, setDate] = useState(currentTask ? currentTask.date : '');
    const [time, setTime] = useState(currentTask ? currentTask.time : '');
    const [comment, setComment] = useState(currentTask ? currentTask.comment : '');
    const [important, setImportant] = useState(currentTask ? currentTask.important : false);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        if (currentTask) {
            setTitle(currentTask.title);
            setDone(currentTask.done);
            setDate(currentTask.date);
            setTime(currentTask.time);
            setComment(currentTask.comment);
            setImportant(currentTask.important);
        } else {
            resetForm();
        }
    }, [currentTask]);

    const handleSaveTask = () => {
        if (title) {
            const newTask = {
                title,
                done,
                date,
                time,
                comment,
                important,
            };

            if (currentTask) {
                // Update existing task
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.title === currentTask.title ? newTask : task
                    )
                );
            } else {
                // Add new task
                if (tasks.find((it) => it.title === title)) {
                    setErrorMessage("This task already exists");
                    return;
                }
                setTasks((prevTasks) => [...prevTasks, newTask]);
            }

            resetForm();
            resetCurrentTask(); // Reset current task after saving
        } else {
            setErrorMessage("Task title is empty");
        }
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
                            style={{ display: 'none' }}
                        />
                        <span style={{ fontSize: '1.2rem', cursor: 'pointer' }}>
                            {important ? '⭐' : '☆'}
                        </span>
                    </label>
                </div>
                {showDetails && (
                    <div className="edit-body">
                        <div className="edit-body__field" style={{ padding: '20px' }}>
                            <label htmlFor="deadline" className="edit-body__label">Deadline</label>
                            <div className="edit-body__input-wrapper">
                                <div className="w-25">
                                    <DatePicker
                                        disabledAfter={new Date("2028-01-19T18:30:00.000Z")}
                                        disabledBefore={new Date("2015-01-19T18:30:00.000Z")}
                                        firstDayOfWeek="saturday"
                                        onDateChange={(e) => setDate(e)}
                                        outputFormat="yyyy/mm/dd"
                                        withInput={true}
                                    />
                                    <TimePicker
                                        inputFormat={'hh:mm AM'}
                                        outputFormat={'hh:mm AM'}
                                        onTimeChange={(e) => setTime(e)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="edit-body__field" style={{ padding: '20px' }}>
                            <div className="w-50">
                                <Label htmlFor="comments" withInput={true}>
                                    Comments
                                </Label>
                                <Textarea
                                    id="comments"
                                    placeholder="Enter your comments here"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    resize={false}
                                    className="custtextarea"
                                />
                            </div>
                        </div>
                        <div className="edit-body__btns">
                            <Button
                                aria-label="x Cancel"
                                type="button"
                                style={{ backgroundColor: 'red', marginRight: '10px' }}
                                onClick={resetForm}
                            >
                                x Cancel
                            </Button>
                            <Button
                                aria-label="+ Save Task"
                                type="button"
                                onClick={handleSaveTask}
                                style={{ backgroundColor: 'lightgreen', marginLeft: '10px' }}
                            >
                                {currentTask ? 'Save Task' : '+ Save Task'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskForm;
