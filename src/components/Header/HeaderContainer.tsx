import React, {useState} from 'react';

import {yesChangeAnimTopPanel} from "../../utils/ChangeAnimTopPanel";
import Header from "./Header";
import ContactsMenuContainer from "../Contacts/ContactsMenuContainer";


const HeaderContainer = () => {

   const [showContacts, setShowContacts] = useState(false);
   const [showHeader, setShowHeader] = useState(false);

   let menuObj = [
      {
         name: 'Главная',
         href: '/',
      },
      {
         name: 'Портфолио',
         href: '/projects',
      },
   ]

   return <>
      <Header menuObj={menuObj} yesChangeAnimTopPanel={yesChangeAnimTopPanel} showContacts={showContacts} setShowContacts={setShowContacts} showHeader={showHeader} setShowHeader={setShowHeader} />
      <ContactsMenuContainer showContacts={showContacts} setShowContacts={setShowContacts}/>
   </>

}


export default HeaderContainer;