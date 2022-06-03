import React,{useState, useEffect} from 'react';
import styles from './NavBarButton.module.css';
import { NavLink } from 'react-router-dom';

// Temporary settings stub
const NavBarButton = props => {
  const [isMobile, setIsMobile] = useState(false);
  
  const resize = () =>{
    if(window.innerWidth<930){
      setIsMobile(true);
    }else{
      setIsMobile(false);
    }
  }

  useEffect(()=>{
    window.addEventListener('resize', resize)

    return () =>{
      window.removeEventListener('resize',resize);
    }
  })


  return (
    <NavLink 
      to={props.to} 
      className={styles['nav-bar-button']} 
      style={({ isActive }) => {
        return {
          backgroundColor: isActive ? 'var(--primary-background)' : undefined
        }
      }}>
        {props.children}
        {
          !isMobile &&
            props.label ? <span className={styles['nav-button-label']}>{props.label}</span> : null
        }

    </NavLink>
  );
};

export default NavBarButton;
