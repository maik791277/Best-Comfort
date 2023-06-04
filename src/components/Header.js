import mestoSvg from "../images/Mesto.svg";
import {Link, useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Header (props) {

   const [loggedIna, setLoggedIna] = useState(false)
   const [login, setLogin] = useState(false)
   const [register, setRegister] = useState(false)
   const [unknown, setUnknown] = useState(true)
   const [user, setUser] = useState(false)
   const [admin,setAdmin] = useState(false)
   const [adminPage, setAdminPage] = useState(false)
   const currentUser = React.useContext(CurrentUserContext)
   let location = useLocation();
   const navigate = useNavigate()

   function locationPage() {
      if (location.pathname === '/main') {
         setLogin(false)
         setRegister(false)
         setUnknown(false)
         setLoggedIna(true)
         if (props.user){
            setUser(true)
            setAdmin(false)
         }else if (props.admin){
            setAdmin(true)
            setUser(false)
         }
         if (adminPage){
            setAdmin(false)
         }
         document.querySelector('.header__user').classList.add('header__user-main')
      }else if(location.pathname === '/sign-in') {
         setLogin(true)
         setRegister(false)
         setLoggedIna(false)
         setUnknown(false)
         setAdmin(false)
         setUser(false)
         document.querySelector('.header__user').classList.remove('header__user-main')
      }else if (location.pathname === '/sign-up') {
         setLogin(false)
         setRegister(true)
         setLoggedIna(false)
         setUnknown(false)
      }
   }

   useEffect(() => {
      locationPage()
   })

   function deleteJwt() {
      localStorage.removeItem('jwt')
      navigate('/sign-in')
      props.setLoggedAdmin(false)
      props.setLoggedUser(false)
      props.setLoggedIn(false)
      props.setLoggedAdminPage(false)
      setUser(false)
      setAdminPage(false)
      setAdmin(false)

      props.setCurrentUser({})
      props.setCurrentCard([])
   }

   function adminPages() {
      props.setLoggedAdminPage(true)
      setAdmin(false)
      setAdminPage(true)
   }
   function adminPagesNo() {
      props.setLoggedAdminPage(false)
      setAdmin(true)
      setAdminPage(false)
   }


   function toggleMenu() {
      const hamburger = document.querySelector('.hamburger')
      const barTop = document.querySelector('.top')
      const barMiddle = document.querySelector('.middle')
      const barBottom = document.querySelector('.bottom')

      if
      (hamburger.classList.toggle('hamburger__menu-is-visible'))
      {
         hamburger.classList.add('hamburger__menu-is-visible')
         barTop.classList.add('top-open')
         barMiddle.classList.add('middle-open')
         barBottom.classList.add('bottom-open')
      }
      else
      {
         hamburger.classList.remove('hamburger__menu-is-visible')
         barTop.classList.remove('top-open')
         barMiddle.classList.remove('middle-open')
         barBottom.classList.remove('bottom-open')
      }
   }

   return (
   <>


      {user &&
      <div className="hamburger">
         <p className="header__user-email">{currentUser.email}</p>
         <button onClick={deleteJwt} className="header__button">Выход</button>
      </div>
      }

      {admin &&
      <div className="hamburger">
         <p className="header__user-email">{currentUser.email}</p>
         <button onClick={deleteJwt} className="header__button">Выход</button>
         <button onClick={adminPages} className="header__button">Пользователи</button>
      </div>
      }

      {adminPage &&
      <div className="hamburger">
         <p className="header__user-email">{currentUser.email}</p>
         <button onClick={deleteJwt} className="header__button">Выход</button>
         <button onClick={adminPagesNo} className="header__button">Главная</button>
      </div>
      }


      <header className="header">
         <img
         className="header__logo"
         src={mestoSvg}
         alt="Логотип Mesto"
         />

         <div className="header__user">
            {user &&
            <>
               <button onClick={deleteJwt} className="header__button">Выход</button>
               <p className="header__user-email">{currentUser.email}</p>
            </>
            }

            {admin &&
            <>
               <button onClick={adminPages} className="header__button">Пользователи</button>
               <button onClick={deleteJwt} className="header__button">Выход</button>
               <p className="header__user-email">{currentUser.email}</p>
            </>
            }

            {adminPage &&
            <>
               <button onClick={adminPagesNo} className="header__button">Главная</button>
               <button onClick={deleteJwt} className="header__button">Выход</button>
               <p className="header__user-email">{currentUser.email}</p>
            </>
            }

            {login &&
            <>
               <Link to="/sign-up" className="header__button" >Регистрация</Link>
            </>
            }

            {register &&
            <>
               <Link to="/sign-in" className="header__button">Вход</Link>
            </>
            }
            {unknown &&
               <>
                  <Link to="/main" className="header__button">Главная</Link>
               </>
            }

         </div>

         {user &&
         <div className="hamburger__button" onClick={toggleMenu}>
            <div className="hamburger__button-con">
               <div className="hamburger__button-bar top"></div>
               <div className="hamburger__button-bar middle"></div>
               <div className="hamburger__button-bar bottom"></div>
            </div>
         </div>
         }
         {admin &&
         <div className="hamburger__button" onClick={toggleMenu}>
            <div className="hamburger__button-con">
               <div className="hamburger__button-bar top"></div>
               <div className="hamburger__button-bar middle"></div>
               <div className="hamburger__button-bar bottom"></div>
            </div>
         </div>
         }
         {adminPage &&
         <div className="hamburger__button" onClick={toggleMenu}>
            <div className="hamburger__button-con">
               <div className="hamburger__button-bar top"></div>
               <div className="hamburger__button-bar middle"></div>
               <div className="hamburger__button-bar bottom"></div>
            </div>
         </div>
         }
      </header>
   </>
   );
}

export default Header;