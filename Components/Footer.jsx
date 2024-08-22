import React, { useState } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="bg-black text-center md:text-left lg:px-24 px-6 py-2 md:flex items-center justify-center gap-2 md:justify-between text-white">
        <div className="flex justify-center py-3 md:block md:py-0">
          <Link href="/">
            <Image src={assets.logo_light} className="w-28  " alt="" />
          </Link>
        </div>
        <div className="">
          <p className="text-sm text-[#cccccc]">
            All Right Reserved Copyright @blogger
          </p>
        </div>
        <div className="socila flex justify-center gap-2 pt-4 md:pt-0 cursor-pointer ">
          <Image className="w-10 h-10" src={assets.facebook_icon} alt="" />
          <Image className="w-10 h-10" src={assets.googleplus_icon} alt="" />
          <Image className="w-10 h-10" src={assets.twitter_icon} alt="" />
        </div>
      </footer>
    </>
  );
};

export default Footer;
