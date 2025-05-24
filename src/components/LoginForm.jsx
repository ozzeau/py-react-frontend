
// import { Link } from 'react-router-dom';

// import specialEventImage from "../assets/special-event_2.svg";

// function LoginForm() {
//   return (
//     <div className="h-screen w-[80%] mx-auto  flex items-center p-15">
//       <div className="w-full h-[90%] bg-blue-500 flex rounded-2xl overflow-hidden">
//         <div className="h-full w-[50%] overflow-hidden">
//           <Link to="/"><img src={specialEventImage} alt="image" className="object-cover h-full w-full p-2 hover:scale-102 transition-transform duration-500 cursor-pointer"/></Link>
//         </div>
//         <div className="h-full w-[50%] bg-blue-200 rounded-l-2xl">
//           <div className="h-full w-[80%] mx-auto  flex flex-row items-center">
//             <div className="w-[400px] h-[400px] mx-auto flex flex-col justify-between">
//               <h1 className="text-4xl font-bold text-gray-900 flex justify-center">Sign in</h1>
//               <form action="">
//                 <label>Email</label>
//                 <input type="text" className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-red-800" placeholder="yourEmail@email.com"/>
//                 <label>Password <Link to="/"><span className="text-red-800">(forgot your password?)</span></Link></label>
//                 <input type="text" className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-red-800"/>
//                 <button className="border border-black rounded-md focus:outline-none flex gap-2 p-4 cursor-pointer mx-auto mt-4">
//                   Sign in
//                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
//                   </svg>
//                 </button>
//               </form>
//               <p className="text-center text-base">Already have an account? Sign in <span className="text-red-800 underline cursor-pointer">here</span> instead.</p>

//             </div>
//           </div>
          
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoginForm;


import { Link } from 'react-router-dom';
import specialEventImage from "../assets/special-event_2.svg";
import { useState } from 'react';
import Authform from './AuthForm';





function LoginForm() {
  
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-lg md:mx-4 mx-2">
        
        <div className="hidden md:block md:w-1/2">
          <Link to="/">
            <img
              src={specialEventImage}
              alt="Special Event"
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>

        <Authform />
      </div>
    </div>
  );
}

export default LoginForm;
