import { assets } from "@/assets/assets";
import Side from "@/Components/Admincomponnts/Side";
import Image from "next/image";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Layout({ children }) {
  return (
    <>
      <div className="flex">
        <ToastContainer theme="dark"/>
         <Side />
         <div className="w-full">
         <div className="flex border-b border-black justify-between w-full items-center font-bold px-6 py-2">
          <h3>Admin</h3>
          <Image src={assets.profile_icon} className="w-8 h-8" alt="" />
         </div>
         {children}

         </div>

      </div>
    </>
  );
}
