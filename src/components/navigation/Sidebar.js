import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './Sidebar.css'; //the css file
import { IconContext } from 'react-icons';
import { SidebarData } from './SidebarData';




function Sidebar() {
  const [sidebar, setSidebar] = useState(false); //for sidebar? false by default is not showing 
  const [sideData, setSideData] = useState([]); //for sidebar? false by default is not showing 
  var promise = Promise.resolve(SidebarData);
  
promise.then(function(val) {
    console.log(val);
    setSideData(val);
});
console.log(SidebarData)
  const showSidebar = () => setSidebar(!sidebar); //to show the sidebar



  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}> {/* </li> color of all icons*/}
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars style={{ color: "#053477" }} onClick={showSidebar} />
          </Link>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>   
            {sideData.map((item, index) => {
              return (
                // targetting the name,path, icon, title
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Sidebar;
