import React, {useState} from 'react';

import {yesChangeAnimTopPanel} from "../../utils/ChangeAnimTopPanel";
import Header from "./Header";
import ContactsMenuContainer from "../Contacts/ContactsMenuContainer";


export interface MenuObjType {
   name: string
   href: string
}

const HeaderContainer: React.FC = () => {

   const [showContacts, setShowContacts] = useState<boolean>(false);
   const [showHeader, setShowHeader] = useState<boolean>(false);



   let menuObj = [
      {
         name: 'Главная',
         href: '/',
      },
      {
         name: 'Портфолио',
         href: '/projects',
      },
   ] as Array<MenuObjType>

   return <>
      <Header menuObj={menuObj} yesChangeAnimTopPanel={yesChangeAnimTopPanel} showContacts={showContacts} setShowContacts={setShowContacts} showHeader={showHeader} setShowHeader={setShowHeader} />
      <ContactsMenuContainer showContacts={showContacts} setShowContacts={setShowContacts}/>
   </>

}


export default HeaderContainer;