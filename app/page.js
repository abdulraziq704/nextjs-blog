 "use client"
 
 import BlogList from "@/Components/BlogList";
import Footer from "@/Components/Footer";
import Headers from "@/Components/Header";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



export default function Home() {
 
  return (
   <>
<ToastContainer theme="dark"/>
     <Headers   />
     <BlogList/>
     <Footer/>
  </>
  );
}
