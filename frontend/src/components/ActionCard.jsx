import React from 'react';
import { Link } from 'react-router-dom'; 


{/*este codigo es para toda la tarjeta que va tipo en el homepage*/}
const ActionCard = ({ title, description, buttonText, buttonLink, imageUrl }) => {
 
 return (
  <div 
   className="relative p-0.5 rounded-xl bg-gray-200 
        hover:bg-gradient-to-br from-brand-primary via-red-400 to-yellow-400 
        transition-all duration-300 shadow-lg hover:shadow-2xl "
  >
   
   <div className="relative bg-white rounded-lg h-full w-full 
           flex flex-col overflow-hidden">
    
    <div className="h-56 w-full"> 
       
     <img 
      src={imageUrl} 
      alt={title}
      className="w-full h-full object-cover" 
     />
    </div>

    <div className="p-6 flex flex-col flex-grow"> 
     <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
     <p className="text-gray-600 text-sm mb-6 flex-grow">{description}</p>
     
     <Link 
            to={buttonLink} 
            className="relative rounded px-5 py-2.5 overflow-hidden group 
                       text-white 
                       transition-all ease-out duration-300
                       bg-gradient-to-r from-[#E06B00] to-[#FF7905] 
                       hover:ring-2 hover:ring-offset-2 hover:ring-orange-400"
          >
      <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            
      <span className="relative">{buttonText}</span> 
     </Link>

    </div>
   </div>
  </div>
 );
};

export default ActionCard;