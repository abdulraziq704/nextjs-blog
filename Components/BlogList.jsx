import { assets } from "@/assets/assets";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { blog_data } from "@/assets/assets";
import Link from "next/link";
import axios from "axios";

const BlogList = () => {
  const [catalog, setcategory] = useState("All");
const [blogs, setblogs] = useState([]);

const fetchblogs =async (req) => { 
  let response = await axios.get('/api/blog');
  setblogs(response.data.blogs)
  console.log(response.data.blogs);
  
 }
useEffect(() => {  
 fetchblogs();
}, [ ])

  return (
    <>
      <div className="text-center md:py-4">
        <div className="flex justify-center gap-6 text-sm ">
          <button
            onClick={() => {
              setcategory("All");
            }}
            className={
              catalog === "All" ? "bg-black text-white px-4 py-1" : " "
            }
          >
            {" "}
            All
          </button>
          
          <button
            onClick={() => {
              setcategory("Technology");
            }}
            className={
              catalog === "Technology" ? "bg-black text-white px-4 py-1" : " "
            }
          >
            {" "}
            Technology
          </button>
          <button
            onClick={() => {
              setcategory("Startup");
            }}
            className={
              catalog === "Startup" ? "bg-black text-white px-4 py-1" : " "
            }
          >
            {" "}
            Startup
          </button>
          <button
            onClick={() => {
              setcategory("Lifestyle");
            }}
            className={
              catalog === "Lifestyle" ? "bg-black text-white px-4 py-1" : " "
            }
          > 
            Lifestyle
          </button>
        </div>
      </div>

      <div className="flex flex-wrap md:justify-between justify-center lg:px-24 gap-y-11 px-4   pt-12 py-20">
        {blogs
          .filter((item) =>
            catalog === "All" ? true : item.category === catalog
          )
          .map((data, i) => {
            return (
              <div
                key={i}
                className="max-w-[320px]  border-black   border-[1.4px] hover:shadow-custom-shadow bg-white"
              >
                <Link href={`/blogs/${data._id}`}>
                  <img className="w-full mb-4" src={data.image} alt=""   />
                </Link>
                <div className="p-4">
                  <p className="bg-black text-white px-3 py-1 text-sm inline-flex">
                    {data.category}
                  </p>
                  <h3 className="font-medium text-xl pt-4 pb-3 ">
                    {data.title}
                  </h3>
                  <p className="text-sm pb-3">{data.description}</p>
                  <Link href={`/blogs/${data.id}`}>
                    <button className="flex items-center gap-2  font-semibold">
                      Read More{" "}
                      <Image className="  w-3 " src={assets.arrow} alt="" />
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default BlogList;
