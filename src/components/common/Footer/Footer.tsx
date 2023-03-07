import React from "react";


const Footer: React.FC = () => {
   let dateObj = new Date()

   return <>
      <footer id={'footer'}>
         <div className="contain">
            <p className="copyright">© webcustom {dateObj.getFullYear()}</p>
         </div>
      </footer>
   </>
}

export default Footer