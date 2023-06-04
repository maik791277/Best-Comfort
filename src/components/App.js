import Main from "./Main";
import somethingIsWrong from "../images/something-wrong.png"
import something from "../images/Union (1).png";
import React, {useState, useEffect} from "react";
import {Routes, Route, Navigate, useNavigate, useLocation} from "react-router-dom";
import {api} from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import Login from "./pages/Login";
import {ProtectedRoute} from "./ProtectedRoute";
import Register from "./pages/Register";
import PageNotFound from "./pages/PageNotFound";
import * as mestoAuth from "../utils/mestoAuth";
import * as ApiUser from "../utils/ApiUser"
import Header from "./Header";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePlacePopup from "./DeletePlacePopup";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import jwtDecode from "jwt-decode";
import {getInitialCards, registeringNewUser} from "../utils/ApiUser";
import EditUserPopup from "./pages/EditUserPopup";
import RegisteringNewUserPopup from "./RegisteringNewUserPopup";
import DeleteUserPlacePopup from "./DeleteUserPlacePopup";


function App() {
   const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
   const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
   const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
   const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
   const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
   const [isInfoTooltip, setIsInfoTooltip] = useState(false)
   const [isEditUserPopup, setIsEditUserPopup] = useState(false)
   const [isRegisteringNewUserPopup ,setIsRegisteringNewUserPopup] = useState(false)
   const [inDeleteUser, setInDeleteUser] = useState(false)
   const [popupRegister, setPopupRegister] = useState({
      textPopup: '',
      imagePopup: ''
   })
   const [cardUserid, setCardUserid] = useState({});
   const [loggedUser, setLoggedUser] = useState(false);
   const [loggedAdmin, setLoggedAdmin] = useState(false);
   const [loggedAdminPage, setLoggedAdminPage] = useState(false);
   const [loggedIn, setLoggedIn] = useState(false);
   const [currentIdCard, setCurrentIdCard] = useState("");
   const [selectedCard, setSelectedCard] = useState({});
   const [currentUser, setCurrentUser] = useState([]);
   const [currentAllUsers, setCurrentAllUsers] = useState([])
   const [currentCard, setCurrentCard] = useState([]);

   const navigate = useNavigate()
   let location = useLocation();





   useEffect(() => {
      if (loggedIn) {
         if (location.pathname === '/sign-up' || location.pathname === '/sign-in') {
            navigate('/main')
         }
      }
      card()
   }, [loggedIn, navigate])


   function authorize(email, password) {
      ApiUser.authorize(email, password)
      .then((data) => {
         if (data) {
            localStorage.setItem('jwt', data.token)
            tokenCheck()
         }
      })
      .catch((err) => {
         if (err === 'Ошибка 401') {
            setPopupRegister({
               textPopup: `${err} Что-то пошло не так! пользователь с email не найден или неправильный пароль.`,
               imagePopup: somethingIsWrong
            })
            setIsInfoTooltip(true)
         }
         if (err === 'Ошибка 400') {
            setPopupRegister({
               textPopup: `${err} Что-то пошло не так! Поля не заполнены.`,
               imagePopup: somethingIsWrong
            })
            setIsInfoTooltip(true)
         }
      });
      card()
   }

   function register(email, password) {
      mestoAuth.register(email, password)
      .then(() => {
         setPopupRegister({
            textPopup: `Вы успешно зарегистрировались!`,
            imagePopup: something
         })
         setIsInfoTooltip(true)
         setTimeout(navigate, 3000, '/sign-in')
      })
      .catch((err) => {
         setPopupRegister({
            textPopup: `${err} Что-то пошло не так! Возможно у вас уже есть аккаунт. Попробуйте ещё раз.`,
            imagePopup: somethingIsWrong
         })
         setIsInfoTooltip(true)
      });
   }

   function registeringNewUser(data) {
      ApiUser.registeringNewUser(data)
      .then(() => {
         allUsers()
         closeAllPopups()
      })
   }

   function allUsers() {
      ApiUser.allUsers()
      .then((data) => {
         setCurrentAllUsers(data)
      })
   }

   console.log(currentAllUsers)

   function tokenCheck() {
      let jwt = localStorage.getItem('jwt')
      if (jwt) {
         let jwtUser = jwtDecode(jwt)
         console.log(jwtUser.role)
         ApiUser.usersMe(jwtUser._id)
         .then((data) => {
            if(jwtUser.role === "admin"){
               setCurrentUser(data)
               setLoggedAdmin(true)
               setLoggedIn(true)
               allUsers()
            }else if (jwtUser.role === "user") {
               setLoggedUser(true)
               setCurrentUser(data)
               setLoggedIn(true)
            }
         })
         .catch((err) => alert(err));
      }
   }

   function card() {
      let jwt = localStorage.getItem('jwt')
      if (jwt) {
         let jwtUser = jwtDecode(jwt)
         ApiUser.getInitialCards(jwtUser._id)
         .then((data) => {
            setCurrentCard(data);
         })
         .catch((err) => alert(err));
      }
   }

   useEffect(() => {
      tokenCheck()
      card()
   }, [])


   // function handleCardLike(card) {
   //    const isLiked = card.likes.some((i) => i._id === currentUser._id);
   //
   //    api.putCardLike(card._id, !isLiked)
   //    .then((newCard) => {
   //       setCurrentCard((state) =>
   //       state.map((c) => (c._id === card._id ? newCard : c))
   //       );
   //    })
   //    .catch((err) => alert(err));
   // }

   function handleCardDelete(card) {
      api.deleteCard(card._id)
      .then(() => {
         setCurrentCard((state) => state.filter((c) => c._id !== card._id));
         closeAllPopups();
      })
      .catch((err) => alert(err));
   }

   function handleUpdateUser(data, idUser) {
      ApiUser.createUserInformation(data, idUser)
      .then((data) => {
         setCurrentUser(data);
         closeAllPopups();
      })
      .catch((err) => alert(err));
   }

   function deleteUsers(idUser) {
      ApiUser.deleteUser(idUser)
      .then(() => {
         allUsers()
         closeAllPopups()
      })
   }

   function handleUpdateUserAdmin(data, idUser) {
      ApiUser.createUserInformation(data, idUser)
      .then(() => {
         allUsers()
         closeAllPopups();
      })
      .catch((err) => alert(err));
   }


   // function handleUpdateAvatar(data) {
   //    api.createUserImage(data)
   //    .then((data) => {
   //       setCurrentUser(data);
   //       closeAllPopups();
   //    })
   //    .catch((err) => alert(err));
   // }

   function handleUpdateCard(data) {
      api.createCard(data)
      .then((data) => {
         setCurrentCard([data, ...currentCard]);
         closeAllPopups();
      })
      .catch((err) => alert(err));
   }

   function handleEditAvatarClick() {
      setIsEditAvatarPopupOpen(true);
   }

   function handleEditProfileClick() {
      setIsEditProfilePopupOpen(true);
   }

   function handleAddPlaceClick() {
      setIsAddPlacePopupOpen(true);
   }

   function deleteUser(data) {
      setInDeleteUser(true)
      setCardUserid(data)
   }

   function registeringNewUserPopupClick() {
      setIsRegisteringNewUserPopup(true)
   }

   function DeleteCardClick(asda) {
      setDeleteCardPopupOpen(true);
      setCurrentIdCard(asda)
   }

   function EditUserPopupClick(data) {
      setIsEditUserPopup(true)
      setCardUserid(data)
   }

   function handleCardClick(card) {
      setSelectedCard(card);
      setIsImagePopupOpen(true);
   }

   function closeAllPopups() {
      setIsEditAvatarPopupOpen(false);
      setIsEditProfilePopupOpen(false);
      setIsAddPlacePopupOpen(false);
      setIsImagePopupOpen(false);
      setDeleteCardPopupOpen(false)
      setIsInfoTooltip(false)
      setIsEditUserPopup(false)
      setIsRegisteringNewUserPopup(false)
      setInDeleteUser(false)
   }

   return (
   <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
         <div className="page">
            <Header setLoggedIn={setLoggedIn}
                    setLoggedAdmin={setLoggedAdmin}
                    setLoggedUser={setLoggedUser}
                    admin={loggedAdmin}
                    user={loggedUser}
                    loggedAdminPage={loggedAdminPage}
                    setLoggedAdminPage={setLoggedAdminPage}
                    setCurrentUser={setCurrentUser}
                    setCurrentCard={setCurrentCard}/>
            <Routes>
               <Route path="/main" element={<ProtectedRoute
               element={Main}
               onEditAvatar={handleEditAvatarClick}
               onEditProfile={handleEditProfileClick}
               onAddPlace={handleAddPlaceClick}
               handleClick={handleCardClick}
               onCardDelete={DeleteCardClick}
               editUserPopupClick={EditUserPopupClick}
               card={currentCard}
               loggedUser={loggedUser}
               loggedAdmin={loggedAdmin}
               loggedAdminPage={loggedAdminPage}
               loggedIn={loggedIn}
               currentAllUsers={currentAllUsers}
               registeringNewUserPopupClick={registeringNewUserPopupClick}
               deleteUser={deleteUser}
               />}
               />

               <Route path="/sign-in" element={<Login authorize={authorize}/> }/>
               <Route path="/sign-up" element={<Register popupRegister={setPopupRegister} isInfoTooltip={setIsInfoTooltip} register={register}/>}/>
               <Route path="*" element={<PageNotFound/>}/>
               <Route path="/" element={loggedIn ? <Navigate to='/main'/> : <Navigate to='/sign-in'/>}/>
            </Routes>
         </div>

         <EditProfilePopup
         isOpen={isEditProfilePopupOpen}
         onClose={closeAllPopups}
         onUpdateUser={handleUpdateUser}
         />
         <EditAvatarPopup
         isOpen={isEditAvatarPopupOpen}
         onClose={closeAllPopups}
         onUpdateAvatar={handleUpdateUser}
         />
         <AddPlacePopup
         isOpen={isAddPlacePopupOpen}
         onClose={closeAllPopups}
         onUpdateCard={handleUpdateCard}
         />
         <DeletePlacePopup
         isOpen={isDeleteCardPopupOpen}
         onClose={closeAllPopups}
         onCardDelet={handleCardDelete}
         idCard={currentIdCard}
         />
         <ImagePopup
         isOpen={isImagePopupOpen}
         onClose={closeAllPopups}
         card={selectedCard}
         />
         <InfoTooltip
         isOpen={isInfoTooltip}
         onClose={closeAllPopups}
         image={popupRegister.imagePopup}
         text={popupRegister.textPopup}
         />
         <EditUserPopup
         isOpen={isEditUserPopup}
         onClose={closeAllPopups}
         cardUserid={cardUserid}
         onUpdateUser={handleUpdateUserAdmin}
         />
         <RegisteringNewUserPopup
         isOpen={isRegisteringNewUserPopup}
         onClose={closeAllPopups}
         onUserUp={registeringNewUser}
         />
         <DeleteUserPlacePopup
         isOpen={inDeleteUser}
         onClose={closeAllPopups}
         onUserUp={registeringNewUser}
         cardUserid={cardUserid}
         onCardDelet={deleteUsers}
         />

      </div>
   </CurrentUserContext.Provider>
   );
}

export default App;