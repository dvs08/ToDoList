
import React from 'react';
import '../styles/menulisttab.css';
import "@innovaccer/design-system/css";
import { HorizontalNav } from '@innovaccer/design-system';

const MenuListTab = ({onTabChange, currentTab}) => {
  
  const data = [
    {
      name: 'myTasks',
      label: 'My Tasks',
    },
    {
      name: 'inProgress',
      label: 'In Progress',
    },
    {
      name: 'completed',
      label: 'Completed',
    },

  ];

 const activeMenu = data.find(menu => menu.name === currentTab);
  console.log(activeMenu);
  return (
    <div className="py-6 navpos">
    <HorizontalNav
      className="w-100 justify-content-center"
      menus={data}
      active={activeMenu}
      onClick={(menu) => {console.log(menu); onTabChange(menu.name);}}
    />
  </div>
  );
};

export default MenuListTab;
