import React, { useState } from "react";
import Image from "next/image.js";
import { assets } from "../assets/assets.js";
import Link from "next/link.js";
import axios from "axios";
import { toast } from "react-toastify";

const Header = () => {
  const [email, setemail] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("email", email);
      const response = await axios.post("/api/email", formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setemail("");  // Clear the email field on success
      } else {
        toast.error("API not working");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <nav className="nav">
        <div className="flex justify-between items-center px-4 lg:px-24 py-4">
          <Image className="md:w-44 w-auto" src={assets.logo} alt="Logo" />
          <Link
            href="/admin/AddBlog/"
            className="border-[1.5px] border-black shadow-custom-shadow md:py-2 md:px-5 px-3 py-1 flex gap-2 justify-between items-center"
          >
            Write For Us
            <Image className="w-3" src={assets.arrow} alt="Arrow" />
          </Link>
        </div>
      </nav>

      <div className="text-center flex gap-6 py-12 px-4 flex-col items-center">
        <h1 className="font-semibold text-4xl">Latest Blogs</h1>
        <p className="md:w-[80%]">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa
          molestiae numquam, amet, magnam debitis fuga minus provident culpa
          nemo totam, non voluptas.
        </p>
        <div className="md:w-[33%] py-4">
          <form
            onSubmit={onSubmit}
            className="flex justify-between border-[1.5px] w-full border-black shadow-custom-shadow"
          >
            <input
              onChange={(e) => setemail(e.target.value)}
              className="px-3 w-full outline-none"
              type="email"
              placeholder="Enter Your Email"
              value={email}
            />
            <button
              type="submit"
              className="px-4 py-2 border-black border-l-[1.5px]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Header;
