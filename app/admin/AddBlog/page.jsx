"use client";
import React, { useState } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets"; // Assuming assets contains your upload area image.
import axios from "axios";
import { toast } from "react-toastify";

const Page = () => {
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null); // Store the actual file

  const [data, setdata] = useState({
    title: "",
    description: "",
    author: "Alex Bennet",
    category: "Startup",
  });

  const onchangehandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setdata((data) => ({ ...data, [name]: value }));
  };

  const handleThumbnailUpload = (event) => {
    const file = event.target.files[0];
    setThumbnail(URL.createObjectURL(file)); // Preview image
    setThumbnailFile(file); // Store the file for upload
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("description", data.description);
    formdata.append("category", data.category);
    formdata.append("author", data.author); 
    
    if (thumbnailFile) {
      formdata.append("image", thumbnailFile); // Use the actual file
    }

    try {
      const response = await axios.post("/api/blog", formdata);
      if (response.data.success) {
        toast.success(response.data.msg);
      } else {
        toast.error("Error: " + response.data.msg);
      }
    } catch (error) {
      toast.error("Upload failed: " + error.message);
    }
  };

  return (
    <div className="max-w-2xl p-6 border-r border-black ">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload thumbnail
          </label>
          <div className="relative inline-flex p-2 border-2 border-dashed border-gray-300 rounded-lg items-center justify-center cursor-pointer">
            <input
              type="file"
              onChange={handleThumbnailUpload}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            {thumbnail ? (
              <Image
                src={thumbnail}
                alt="Thumbnail"
                className="object-cover"
                width={100}
                height={100}
              />
            ) : (
              <Image
                src={assets.upload_area}
                alt="Upload Area"
                width={100}
                height={100}
                className="object-cover"
              />
            )}
          </div>
         
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Blog title
          </label>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={onchangehandler}
            placeholder="Type here"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Blog Description
          </label>
          <textarea
            name="description"
            value={data.description}
            onChange={onchangehandler}
            placeholder="Write content here"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300 h-28"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Blog category
          </label>
          <select
            name="category"
            value={data.category}
            onChange={onchangehandler}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="Startup">Startup</option>
            <option value="Technology">Technology</option>
            <option value="Lifestyle">Lifestyle</option>
           </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default Page;
