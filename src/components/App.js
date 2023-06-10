import Main from "./Main";
import somethingIsWrong from "../images/something-wrong.png"
import React, {useState, useEffect} from "react";
import {Routes, Route, Navigate, useNavigate, useLocation} from "react-router-dom";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import Login from "./pages/Login";
import {ProtectedRoute} from "./ProtectedRoute";
import PageNotFound from "./pages/PageNotFound";
import * as ApiUser from "../utils/ApiUser"
import Header from "./Header";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePlacePopup from "./DeletePlacePopup";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import jwtDecode from "jwt-decode";
import EditUserPopup from "./pages/EditUserPopup";
import RegisteringNewUserPopup from "./RegisteringNewUserPopup";
import DeleteUserPlacePopup from "./DeleteUserPlacePopup";
import ViewUser from "./pages/ViewUser";
import {CurrentUserid} from "../contexts/CurrentUserid";
import CardInfoUser from "./CardInfoUser";
import Users from "./pages/Users";


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
   const [cardInfoUser, setCardInfoUser] = useState(false)
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
   const [inforationUserCard, setInforationUserCard] = useState({})
   const [token, setToken] = useState(true)
   const [idUser, setIdUser] = useState("")
   const [jwt, setJwt] = useState(localStorage.getItem('jwt'))

   const navigate = useNavigate()
   let location = useLocation();






   function authorize(email, password) {
      ApiUser.authorize(email, password)
      .then((data) => {
            localStorage.setItem('jwt', data.token)
            setJwt(data.token)
            tokenCheck(data.token)
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
   }

   function registeringNewUser(data) {
      ApiUser.registeringNewUser(data, jwt)
      .then(() => {
         allUsers(jwt)
         closeAllPopups()
      })
   }

   function allUsers(jwt) {
      ApiUser.allUsers(jwt)
      .then((data) => {
         setCurrentAllUsers(data)
      })
   }

   function tokenCheck(jwt) {
      if (jwt){
         ApiUser.tokenVerification(jwt).then(() => {
            let jwtUser = jwtDecode(jwt)
            ApiUser.usersMe(jwtUser._id, jwt)
            .then((data) => {
               if(jwtUser.role === "admin"){
                  setCurrentUser(data)
                  setLoggedAdmin(true)
                  setLoggedIn(true)
                  allUsers(jwt)
                  card()
               }else if (jwtUser.role === "user") {
                  setLoggedUser(true)
                  setCurrentUser(data)
                  setLoggedIn(true)
                  card()
               }
            })
            .catch((err) => alert(err));
         })
      }
   }

   function card() {
      if (jwt) {
         let jwtUser = jwtDecode(jwt)
         ApiUser.getInitialCards(jwtUser._id, jwt)
         .then((data) => {
            setCurrentCard(data);
         })
         .catch((err) => alert(err));
      }
   }

   function handleUpdateUser(data, idUser) {
      ApiUser.createUserInformation(data, idUser, jwt)
      .then((data) => {
         setCurrentUser(data);
         closeAllPopups();
      })
      .catch((err) => alert(err));
   }

   function deleteUsers(idUser) {
      ApiUser.deleteUser(idUser, jwt)
      .then(() => {
         allUsers(jwt)
         closeAllPopups()
      })
   }

   function handleUpdateUserAdmin(data, idUser) {
      ApiUser.createUserInformation(data, idUser, jwt)
      .then(() => {
         allUsers(jwt)
         closeAllPopups();
      })
      .catch((err) => alert(err));
   }

   useEffect(() => {
      tokenCheck(jwt)
   }, [])

   useEffect(() => {
      if (loggedIn) {
         if (location.pathname === '/sign-up' || location.pathname === '/sign-in') {
            navigate('/main')
         }
      }
      card()
   }, [loggedIn, navigate])




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

   function setCardInfoUserClick(data) {
      setCardInfoUser(true)
      setInforationUserCard(data)
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
      setCardInfoUser(false)
   }

   return (
   <CurrentUserContext.Provider value={currentUser}>
      <CurrentUserid.Provider value={idUser}>
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
                    setCurrentCard={setCurrentCard}
                    setJwt={setJwt}/>
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
               setIdUser={setIdUser}
               setCardInfoUser={setCardInfoUserClick}
               />}/>
               <Route path="/view-user" element={<ProtectedRoute
                  element={ViewUser}
                  jwt={jwt}
                  loggedIn={loggedAdmin}
                  setCardInfoUser={setCardInfoUserClick}
                  />}/>
               <Route path="/sign-in" element={<Login authorize={authorize}/> }/>
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
         // onUpdateCard={}
         />
         <DeletePlacePopup
         isOpen={isDeleteCardPopupOpen}
         onClose={closeAllPopups}
         // onCardDelet={handleCardDelete}
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
         <CardInfoUser
         isOpen={cardInfoUser}
         onClose={closeAllPopups}
         inforationUserCard={inforationUserCard}
         />

      </div>
      </CurrentUserid.Provider>
   </CurrentUserContext.Provider>
   );
}

export default App;