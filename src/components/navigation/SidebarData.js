import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import Login from '../../actions/services/Login';


  const email = localStorage.getItem("email");
   
  
async function axiosTest() {
  let menuData = [];
  const response = await Login.getGroupsByUserEmail(email)
  if (response.data.id === "DG"){
    menuData =  
       [
                {
                  title: 'Accueil',
                  path: '/',
                  icon: <AiIcons.AiFillHome />,
                  cName: 'nav-text'
                },
                {
                  title: 'Mes demandes',
                  path: '/myRequests',
                  icon: <AiIcons.AiFillContainer />,
                  cName: 'nav-text'
                },
                {
                  title: 'Nouvelle demande',
                  path: '/request',
                  icon: <IoIcons.IoIosPaper />,
                  cName: 'nav-text'
                },
                {
                  title: 'Valider demandes',
                  path: '/requestList',
                  icon: <AiIcons.AiFillCheckSquare />,
                  cName: 'nav-text'
                },
                {
                  title: 'Historique demandes',
                  path: '/taskHistory',
                  icon: <AiIcons.AiFillSwitcher />,
                  cName: 'nav-text'
                },
              ];
  }
  else if (response.data.id === "DAF"){
    menuData =  
       [
                {
                  title: 'Accueil',
                  path: '/',
                  icon: <AiIcons.AiFillHome />,
                  cName: 'nav-text'
                },
                {
                  title: 'Mes demandes',
                  path: '/myRequests',
                  icon: <AiIcons.AiFillContainer />,
                  cName: 'nav-text'
                },
                {
                  title: 'Nouvelle demande',
                  path: '/request',
                  icon: <IoIcons.IoIosPaper />,
                  cName: 'nav-text'
                },
                {
                  title: 'Traiter demandes',
                  path: '/listRequest',
                  icon: <AiIcons.AiFillControl />,
                  cName: 'nav-text'
                },
                {
                  title: 'Historique demandes',
                  path: '/taskHistory',
                  icon: <AiIcons.AiFillSwitcher />,
                  cName: 'nav-text'
                },
              ];
  }
  else {
    menuData =  
       [
                {
                  title: 'Accueil',
                  path: '/',
                  icon: <AiIcons.AiFillHome />,
                  cName: 'nav-text'
                },
                {
                  title: 'Mes demandes',
                  path: '/myRequests',
                  icon: <AiIcons.AiFillContainer />,
                  cName: 'nav-text'
                },
                {
                  title: 'Nouvelle demande',
                  path: '/request',
                  icon: <IoIcons.IoIosPaper />,
                  cName: 'nav-text'
                },
                {
                  title: 'Historique demandes',
                  path: '/taskHistory',
                  icon: <AiIcons.AiFillSwitcher />,
                  cName: 'nav-text'
                },
              ];
  }
  return menuData
}
export const SidebarData = axiosTest()