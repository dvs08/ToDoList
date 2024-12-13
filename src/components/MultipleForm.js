import React, { useState, useEffect , useRef} from "react";
import '../styles/AddTaskForm.css';          //Used for 1 where it's used as MDS prop -- addcustomstyle
import  '@innovaccer/design-system/css';
import { Input, DatePicker, TimePicker, Label, Textarea, Button, Checkbox , Card , Icon, Text} from '@innovaccer/design-system';

const MultipleForm = ({ task, setErrorMessage , isNewTask , currentTab , tasks , setTasks}) => {  //This is destrcutring. Props is also an object. eg) task = props.task

    const [title, setTitle] = useState(task ? task.title : '');
    const [done, setDone] = useState(task ? task.done : false);
    const [date, setDate] = useState(task ? task.date : '');
    const [time, setTime] = useState(task ? task.time : '');
    const [comment, setComment] = useState(task ? task.comment : '');
    const [important, setImportant] = useState(task ? task.important : false);
    const [isEditing, setIsEditing] = useState(!!task);
    const [showDetails, setShowDetails] = useState(false); 
    const [initialValues, setInitialValues] = useState({});
    
    // const originalIndices = tasks.map((_, index) => index);
    
    const formRef = useRef(null);  //hhdanling out of form click

    useEffect(() => {
        if (task) {
            setInitialValues({
                title: task.title,
                done: task.done,
                date: task.date,
                time: task.time,
                comment: task.comment,
                important: task.important,
            });
            setTitle(task.title);
            setDone(task.done);
            setDate(task.date);
            setTime(task.time);
            setComment(task.comment);
            setImportant(task.important);
        }
    }, [task]);

    const handleClickOutside = (e)=>{
        console.log('e', e);
        console.log(('eT:', e.target.tagName));
        if(formRef.current && !formRef.current.contains(e.target) && e.target.tagName.toLowerCase() === 'div'){
            setShowDetails(false);
        }
    }

    useEffect(() =>{
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    },[]);



    const handleSave = () => {
        if (title) {
            console.log("title:",title);
            const newTask = {
                id: task ? task.id : Date.now(),
                title,
                done,
                date,
                time,
                comment,
                important,
            };

            if (isEditing) {                  
                updateTask(newTask);         
                setShowDetails(false);

            } else {
                
                    addTask(newTask);
                    resetForm();
            }
            
            
        } else {

            if(isEditing){

                resetFormUpdate(task);
                setShowDetails(false);
                setErrorMessage((prev) => {
                    const newMessage = { ...prev, [currentTab]: "Task was Empty"};
                    return newMessage;
                    
                  });  
            } else {

            setErrorMessage((prev) => {
                const newMessage = { ...prev, [currentTab]: "Task is Empty"};
                return newMessage;
                
              });   
            }
            
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
        
    };
    const resetFormUpdate = (task) => {
        console.log("task : ",task);
        setTitle(task.title);
        setDone(task.done);
        setDate(task.date);
        setTime(task.time);
        setComment(task.comment);
        setImportant(task.important);
        setShowDetails(false);
       
    };
    const cancelForm = () => {
        
        setTitle(!isEditing? '' : initialValues.title);
        setDone(initialValues.done);
        setDate(initialValues.date);
        setTime(initialValues.time);
        setComment(initialValues.comment);
        setImportant(initialValues.important);
        setShowDetails(false);
        setErrorMessage(prev => ({ ...prev, [currentTab]: '' }));

    };
    const addTask = (newTask) => {

        const taskWithId = {...newTask, id: Date.now()};
        
        if (tasks.find((it) => it.title === taskWithId.title)) {
          setErrorMessage((prev) => {
            const updatedMessage = { ...prev, [currentTab]: "This task already exists" }; 
            return updatedMessage;
          });
          return;
    
        }
        
        setTasks([...tasks, newTask]);
        setErrorMessage(prev => ({ ...prev, [currentTab]: '' }));
        
      };

    //const updateTask = (updatedTask) => {        
  
    //     const originalTask = tasks.find(ti => ti.id === updatedTask.id);
    
    //     const x =  tasks.find(it => it.title === updatedTask.title && it.id !== updatedTask.id)      // x = object which contains same title
    //     console.log("x: ", x);
    //     if (x) {
    //       setErrorGet("This task already exists");
    //       setErrorMessage(prev => ({ ...prev, [currentTab]: "This task already exists" }));
          
    //       resetFormUpdate(originalTask);
    //       return;

    //   } else {
    //     setTasks((prevTasks) => {
    //       const newTaskss = prevTasks.map((task) =>
    //         task.id === updatedTask.id ? updatedTask : task
    //       );  
    //       // Sort the tasks based on importance
    //       const sortedTasks = newTaskss.sort((a, b) => {

    //             if(b.important !== a.important){
    //                 return b.important ? 1 : -1;
    //             }

    //             return 0;

    //         });
    //         const originalIndex = prevTasks.findIndex(task => task.id === updatedTask.id);

    //         if(originalIndex !== -1 && !updatedTask.important){
    //             const currentIndex = sortedTasks.findIndex(task => task.id === updatedTask.id);
    //             if (currentIndex !== -1 && currentIndex !== originalIndex) {
    //                 const [removedTask] = sortedTasks.splice(currentIndex, 1);
    //                 sortedTasks.splice(originalIndex, 0, removedTask);
    //               }
    //         }
    //         return sortedTasks;
    //     });
    //   }
        
       
    // };

    const updateTask = (updatedTask) => {
  
        const originalTask = tasks.find(ti => ti.id === updatedTask.id);

        console.log("originalTask: ", originalTask);
        console.log("tasks[]:", tasks);
        const x =  tasks.find(it => it.title === updatedTask.title && it.id !== updatedTask.id)      // x = object which contains same title
        console.log("x: ", x);
        if (x) {
          setErrorMessage(prev => ({ ...prev, [currentTab]: "This task already exists" }));
          
          resetFormUpdate(originalTask);
          return;
      } else {
        setTasks((prevTasks) => {
          const newTaskss = prevTasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          );  
          // Sort the tasks based on importance
          return newTaskss.sort((a, b) => {
            if (b.important !== a.important) {
              return b.important ? 1 : -1;
            }
            return 0; 
          });
        });
      }
        
       
    };

    // const handleChange = (e) => {
    //             console.log(e);
    //             e.persist();
             
    //             const isImportantCheckbox = e.target.name === "important";
    //             const updatedValue = e.target.checked;
        
    //             if (isImportantCheckbox) {
    //                 setImportant(updatedValue);
    //             }
    //              else {
    //                 setDone(updatedValue);
    //             }
                
    //             const updatedTask = {
    //                 id: task ? task.id : Date.now(),        //check on this
    //                 title,
    //                 done: !isImportantCheckbox ? updatedValue : done,
    //                 date,
    //                 time,
    //                 comment,
    //                 important: isImportantCheckbox ? updatedValue: important,
    //             };
                
                
    //             updateTask(updatedTask);
                
    // }; 

    const handleChange = (e) => {
       
        const updatedValue = e.target.checked;

        
        setDone(updatedValue);
        
        
        const updatedTask = {
            id: task ? task.id : Date.now(),   
            title,
            done: updatedValue,
            date,
            time,
            comment,
            important,
        };
        
        
        updateTask(updatedTask);
        
    }; 

    const handleStarClick = () => {

        const updatedImportant = !important;
        setImportant(updatedImportant);

        const newTask = {

            id: task ? task.id : Date.now(),
            title,
            done,
            time,
            comment,
            important: updatedImportant,

        };

        updateTask(newTask);
    }
            
    return (
            
        <div className='w-50 px-0 py-6 mt-6 ml-auto mr-auto' ref={formRef}> {/*  content-wrapper*/}
            <div className="d-flex flex-column mb-5">    {/*Edit-headSingle*/}
                <Card shadow="none">
                <div className="d-flex align-items-center h-50 p-6">  {/*className="edit-headtaskbar" style={{ padding : '20px'}} */}
                    {!isNewTask && (
                     <div className="d-flex align-items-center p-5">     {/*checkbox-wrapper*/}
                    <Checkbox 
                        checked={done} 
                        onChange={(e) => handleChange(e)} 
                    />
                     </div>
                    )}
                    <Input
                        placeholder="Task title"
                        className="w-25 flex-grow-1 h-100 p-5"        
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onFocus={() => setShowDetails(true)}
                        onClear={() => setTitle('')}
                    />  
                    {!isNewTask && (
                    <div className="d-flex align-items-center">  {/*edit head priority */}
                         <div className="d-flex align-items-center p-5">     {/*checkbox-wrapper*/}  
                        {/* <Checkbox 
                            
                            name="important"
                            id={`important-${title}`}
                            checked={important} 
                            onChange={(e) => handleChange(e)}
                            value={'Important'}
                            
                             
                        /> */}

                        <Icon 
                            name="star" 
                            size={25} 
                            appearance ="warning" 
                            type ={important ? "filled":"outlined"}
                            onClick={handleStarClick}
    
                        />

                        </div>
                    </div>
                    )}
                </div>
                </Card>
            
                {showDetails && (
                    <Card shadow="none"> 
                    <div>
                        <div className="d-flex flex-column mb-6 p-7">                                         {/*editbodyField*/}
                            <label htmlFor="deadline">Deadline</label>
                            <div>
                                 <div className="d-flex">                               {/*w-25b*/}
                                    <DatePicker 
                                        disabledAfter={new Date("2028-01-19T18:30:00.000Z")} 
                                        disabledBefore={new Date("2015-01-19T18:30:00.000Z")} 
                                        firstDayOfWeek="saturday" 
                                        inputOptions={{required: true}} 
                                        onDateChange={setDate} 
                                        outputFormat="yyyy/mm/dd" withInput={true} 
                                        date={date}
                                    />

                                    <TimePicker
                                        inputFormat={'hh:mm AM'}
                                        outputFormat={'hh:mm AM'}
                                        // inputOptions={{disabled: !isEditing}}
                                        onTimeChange={setTime}
                                        time={time}
                    
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex-column mb-6 p-7">                
                                <Label htmlFor="comments" withInput={true}>
                                     Comments
                                </Label>
                                <Textarea aria-labelledby="Comments" value={comment} id="comments" 
                                name="comments" 
                                placeholder="Enter your comments here" 
                                // disabled={!isEditing} 
                                onChange={(e) => setComment(e.target.value)} 
                                resize={false}
                                className="custtextarea"   
                                />
                                {/*MDS PRop for custom class -  width: 60vh;*/}
                    
                        </div>
                        <div className="d-flex justify-content-center m-5">  {/*editbody_btns*/}
                            <Button
                                aria-label="x Cancel"
                                type="button"
                                style={{ marginRight: '10px'} }
                                appearance="alert"
                                onClick={cancelForm}
                                
                            >
                                {/*style: MDS PROP*/}
                                x Cancel
                            </Button>
                            <Button
                                aria-label="+ Save Task"
                                type="button"
                                onClick={handleSave}
                                style={{marginLeft:'10px'}}
                                appearance="success"
                            >
                                {isEditing ? 'Save Task' : 'Add Task'}
                            </Button>
                        </div>
                    </div>
                    </Card>
                )}
            </div>
        </div>
        
    );
};

export default MultipleForm;



