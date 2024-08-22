"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [email, setemail] = useState([]);
  const fetchemails = async () => {
    let response = await axios.get("/api/email");
    setemail(response.data.email);
  };

  const deleteemail = async (id) => {
    let response = await axios.delete("/api/email", {
      params: {
        id: id,
      },
    });
    if (response.data.success) {
      toast.success(response.data.msg);
      fetchemails(); // Refresh the email list
    } else {
      toast.error("Failed to delete email");
    }
  };
  useEffect(() => {
    fetchemails();
  }, []);

  return (
    <>
      <div className="e m-4   p-4 w-[70%]">
        <h3 className="font-semibold">All Subscribers</h3>
        <div className="mt-4 border-black  border">
          <div className="grid grid-cols-4 bg-gray-100 px-2 py-1">
            <p className="col-span-2">Email</p>
            <p>Date</p>
            <p>Action</p>
          </div>
          <div className="">
            {email.map((val, i) => {
              return (
                <div
                  key={i}
                  className="grid grid-cols-4 border-b  text-sm px-2 py-1"
                >
                  <p className="col-span-2">{val.email}</p>
                  <p> {new Date(val.date).toLocaleDateString()}</p>
                  <button
                    onClick={() => {
                      deleteemail(val._id);
                    }}
                    className="inline-flex px-4"
                  >
                    x
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
