"use client";
import { assets } from "@/assets/assets";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/Components/Footer";
import axios from "axios";

const Page = ({ params }) => {
  const [data, setData] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/blog", {
          params: {
            id: params.id,
          },
        });
        setData(response.data);

         
        const relatedResponse = await axios.get("/api/reatedblogs", {
          params: {
            category: response.data.blogging.category,
          },
        });
        setRelatedBlogs(relatedResponse.data.blogs || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <div>
      {data ? (
        <>
          <div className="nav bg-gray-200">
            <div className="flex justify-between items-center px-4 lg:px-24 py-4 ">
              <Link href="/">
                <Image
                  className="md:w-40 w-auto"
                  src={assets.logo}
                  alt="logo"
                />
              </Link>
              <Link
                href="/admin/AddBlog"
                className="border-[1.5px] border-black shadow-custom-shadow md:py-2 md:px-5 px-3 py-1 flex gap-2 justify-between items-center"
              >
                Write with us
                <Image className="w-3" src={assets.arrow} alt="" />
              </Link>
            </div>
          </div>

          <div className="hero relative bg-gray-200 flex h-[60vh] flex-col justify-center items-center text-center">
            <h1 className="text-4xl md:w-[50%] pb-4 font-semibold">
              {data.blogging.title}
            </h1>
            <p className="pb-12">By {data.blogging.author}</p>
            <Image
              className="md:w-[50%] w-[80%] border-4 absolute -bottom-12 md:-bottom-72 border-white pb-2"
              src={data.blogging.image}
              alt={data.blogging.title}
              width={800}  
              height={500}
            />
          </div>

          <div className="content flex flex-col justify-center items-center ">
            <div className="md:h-[60vh] h-[15vh] "> </div>
            <div className="md:w-[50%] px-4">
              <h1 className="text-3xl font-bold  mb-4">Introduction: </h1>
              <p>
                In the startup world, maximizing returns while minimizing
                resource usage is crucial for long-term success. This approach
                not only conserves capital but also drives efficiency, allowing
                startups to grow sustainably.
              </p>

               <div className="my-12">
                <h2 className="text-2xl font-semibold mb-4">
                  Automate Routine Tasks
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Invest in Automation Tools:</strong> Utilize tools
                    like Zapier or Automate.io to handle repetitive tasks such
                    as email marketing and customer service.
                  </li>
                  <li>
                    <strong>AI-Powered Customer Support:</strong> Implement AI
                    chatbots to manage customer inquiries efficiently, freeing
                    up your team time.
                  </li>
                  <li>
                    <strong>Schedule and Manage Projects:</strong> Use project
                    management tools like Asana or Trello with automation
                    features to streamline operations.
                  </li>
                </ul>
              </div>

                

              {/* Section: Optimize Marketing Spend */}
              <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">
                  Optimize Marketing Spend
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Data-Driven Advertising:</strong> Use analytics to
                    track campaign performance and allocate budget to the most
                    effective channels.
                  </li>
                  <li>
                    <strong>Leverage Content Marketing:</strong> Invest in
                    content marketing strategies like blogging and SEO, which
                    require lower budgets but yield high returns.
                  </li>
                  <li>
                    <strong>Refine Target Audience:</strong> Use demographic
                    data to focus on your most profitable customer segments,
                    optimizing your marketing spend.
                  </li>
                </ul>
              </div>
              {/* Conclusion */}
              <div className="py-6">
                <h2 className="text-2xl font-semibold mb-4">Conclusion:</h2>
                <p className="text-lg">
                  By focusing on automation, outsourcing, lean operations, cloud
                  computing, and optimized marketing, startups can maximize
                  returns while minimizing resource usage. These strategies not
                  only enhance profitability but also lay the foundation for
                  sustainable growth.
                </p>
              </div>

              <div className=" flex flex-col pt-5 pb-9 gap-3">
                <h3 className="font-bold">
                  Share This Article on Social Media:
                </h3>
                <div className="socila flex justify-center self-start gap-2 pt-4 md:pt-0 cursor-pointer ">
                  <Image
                    className="w-10 h-10"
                    src={assets.facebook_icon}
                    alt=""
                  />
                  <Image
                    className="w-10 h-10"
                    src={assets.googleplus_icon}
                    alt=""
                  />
                  <Image
                    className="w-10 h-10"
                    src={assets.twitter_icon}
                    alt=""
                  />
                </div>
              </div>
            </div>

          </div>

          <div className="related-blogs mt-12 pb-20 md:px-24 px-4">
            <h2 className="text-2xl font-semibold text-center mb-4">Related Blogs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-6">
              {relatedBlogs.map((blog, index) => (
                <div key={index} className="related-blog-item border-[1.2px] border-black    hover:shadow-custom-shadow">
                  <Link href={`/blogs/${blog._id}`}>
                    <Image
                      className="w-full h-40 object-cover mb-4  "
                      src={blog.image}
                      alt={blog.title}
                      width={300}
                      height={200}
                    />
                      <div className="p-4">
                  <p className="bg-black text-white px-3 py-1 text-sm inline-flex">
                    {blog.category}
                  </p>
                  <h3 className="font-medium text-xl pt-4 pb-3 ">
                    {blog.title}
                  </h3>
                  <p className="text-sm pb-3">{blog.description}</p>
                  <Link href={`/blogs/${blog._id}`}>
                    <button className="flex items-center gap-2  font-semibold">
                      Read More{" "}
                      <Image className="  w-3 " src={assets.arrow} alt="" />
                    </button>
                  </Link>
                </div>
                
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <Footer />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Page;
