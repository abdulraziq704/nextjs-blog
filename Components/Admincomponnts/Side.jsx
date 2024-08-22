import { assets } from "@/assets/assets";
import React from "react"; 
import Image from "next/image";
import Link from "next/link";

const Side = () => {
  return (
    <>
      <div className="bg-gray-100 ">
        <div className="md:w-[280px] w-52 border-r h-screen border-black p-6 flex flex-col gap-6 ">
          <Link href='/'>          <Image src={assets.logo} alt="" className="w-36 mb-9" />
          </Link>
          <Link href='/admin/AddBlog' className="py-2 px-4 bg-gray-200 border border-black flex shadow-custom-shadow  gap-4 items-center"  > <Image src={assets.add_icon} className="w-7" alt="" />New Blog</Link>
          <Link  href='/admin/BLogList' className="py-2 px-4 bg-gray-200 border border-black flex  shadow-custom-shadow gap-4 items-center" > <Image src={assets.blog_icon} className="w-7"  alt="" />My Blogs </Link>
          <Link  href='/admin/Subscriber' className="py-2 px-4 bg-gray-200 border border-black flex shadow-custom-shadow  gap-4 items-center" > <Image src={assets.email_icon} className="w-7"  alt="" />My Subscribers</Link>
        </div>
      </div>
    </>
  );
};

export default Side;
