import React from 'react';
import ContactsMenu from "./ContactsMenu";
import ContactsForm from "./ContactsForm";


interface PropsType {
   setShowContacts: (showContacts: boolean) => void
   showContacts: boolean
}

const ContactsMenuContainer: React.FC<PropsType> = (props) => {
   return <>

      <div className={props.showContacts ? "contactsMenu _show" : "contactsMenu"}>
         <div className="backgroundPattern"></div>
         <svg className={"closeIcon"} onClick={()=>{props.setShowContacts(false)}} id="close" viewBox="0 0 12 12" fill="none"><path d="M10.1134 1.96826L1.56909 10.5125" /><path d="M1.56909 1.96826L10.1134 10.5125" /></svg>

         <ContactsMenu />
         <ContactsForm />

      </div>
   </>
}



export default ContactsMenuContainer



