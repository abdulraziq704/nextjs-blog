"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [blogs, setBlogs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);

  const fetchAllBlogs = async () => {
    let response = await axios.get("/api/blog");
    setBlogs(response.data.blogs);
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`/api/blog?id=${id}`);
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const editBlog = (blog) => {
    setIsEditing(true);
    setCurrentBlog(blog);
  };

  

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", currentBlog.title);
      formData.append("description", currentBlog.description);
      formData.append("category", currentBlog.category);
      formData.append("author", currentBlog.author);
      if (currentBlog.imageFile) {
        formData.append("image", currentBlog.imageFile);
      }
  
      const response = await axios.put(`/api/blog?id=${currentBlog._id}`, formData);
      setIsEditing(false);
      setCurrentBlog(null);
      fetchAllBlogs(); // Refresh the blogs list
      toast.success(response.data.msg); // Display success toast
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update the blog."); // Display error toast
    }
  };

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  return (
    <>
      <div className="p-6">
        {isEditing && currentBlog && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
              <h2 className="text-xl font-semibold mb-4">Edit Blog</h2>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={currentBlog.title}
                    onChange={(e) =>
                      setCurrentBlog({ ...currentBlog, title: e.target.value })
                    }
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={currentBlog.description}
                    onChange={(e) =>
                      setCurrentBlog({ ...currentBlog, description: e.target.value })
                    }
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <input
                    type="text"
                    value={currentBlog.category}
                    onChange={(e) =>
                      setCurrentBlog({ ...currentBlog, category: e.target.value })
                    }
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Author</label>
                  <input
                    type="text"
                    value={currentBlog.author}
                    onChange={(e) =>
                      setCurrentBlog({ ...currentBlog, author: e.target.value })
                    }
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Image</label>
                  <input
                    type="file"
                    onChange={(e) =>
                      setCurrentBlog({ ...currentBlog, imageFile: e.target.files[0] })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="inline-flex justify-center px-4 py-2 border border-black shadow-custom-shadow  text-sm font-medium     bg-gray-200 hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center px-4 py-2 border-black   text-sm font-medium  shadow-custom-shadow   border-[1.4px]"
                  >
                    Update Blog
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="border-black border">
          <div className="grid grid-cols-5 py-1 gap-6 px-2 bg-gray-100">
            <p>Author Name</p>
            <p className="col-span-2">Blog Title</p>
            <p>Date</p>
            <p>Action</p>
          </div>
          {blogs.map((val, i) => (
            <div
              key={i}
              className="grid grid-cols-5 items-center gap-6 border-t h-12 px-2 py-1 border-black"
            >
              <p>{val.author}</p>
              <p className="col-span-2 text-sm">{val.title}</p>
              <p className="text-sm">
                {new Date(val.date).toLocaleDateString()}
              </p>
              <p className="px-2 flex gap-2">
                <button onClick={() => deleteBlog(val._id)} className="text-red-500 hover:text-red-700">✖</button>
                <button onClick={() => editBlog(val)} className="text-blue-500 hover:text-blue-700">📝</button>
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
