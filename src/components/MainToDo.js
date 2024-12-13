import React, { useState, useEffect } from 'react';
import MenuListTab from './MenuBar';
import MultipleForm from './MultipleForm';
// import '../styles/AddTaskForm.css';
import '../styles/menulisttab.css';
import { Text } from '@innovaccer/design-system';
import '@innovaccer/design-system/css';

const MainToDo = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTab, setCurrentTab] = useState('myTasks');
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState({
    myTasks: "",
    inProgress: "",
    completed: "",
  });

  // useEffect(() => {
  //   const savedTasks = localStorage.getItem('tasks');
  //   if (savedTasks) {
  //     setTasks(JSON.parse(savedTasks));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('tasks', JSON.stringify(tasks));
  // }, [tasks]);

  const handleTabChange = (tab) => {
    // if(tab === 'logout'){
    //   localStorage.clear();
    //   setTasks([]);
    //   setCurrentTab('myTasks');
    // } else {

        setErrorMessage({
          myTasks: "",
          inProgress: "",
          completed: "",
        });
        setCurrentTab(tab);

        const newFilteredTasks = tasks.filter(t => {
          if (tab === 'myTasks') return true;
          if (tab === 'inProgress') return !t.done;
          if (tab === 'completed') return t.done;
          return false;
        });

        setFilteredTasks(newFilteredTasks);
  };


  const sortedTasks = filteredTasks.sort((a, b) => {
    if (b.important !== a.important) {
      return b.important ? 1 : -1;
    }
    return 0; 
  });

  useEffect(() => {
    // Initialize filtered tasks when component mounts
    handleTabChange(currentTab);
  }, [tasks]);

  return (
    <div>
     
        <MenuListTab onTabChange={handleTabChange} currentTab={currentTab} />
         <div className='mt-100'>
        {errorMessage[currentTab] && (
          <div className="d-flex align-items-center justify-content-center">
            <Text size="large" color="alert" weight="strong">
              {errorMessage[currentTab]}
            </Text>
          </div>
        )}
     
      <div className="mt-101"> 
        <div className="position-sticky">
        <MultipleForm setErrorMessage={setErrorMessage} isNewTask={true} currentTab={currentTab} tasks={tasks} setTasks={setTasks}/>
        </div>
        <div>
          {sortedTasks.map((task) => {
            return (
              <MultipleForm key={task.id} task={task} setErrorMessage={setErrorMessage} isNewTask={false} currentTab={currentTab} tasks={tasks} setTasks={setTasks}/>
            );
          })}
        </div>
      </div>
      </div>
    </div>
  );
};

export default MainToDo;



