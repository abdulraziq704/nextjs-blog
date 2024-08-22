import { Database } from "@/lib/config/db";
import Blogmodel from "@/lib/models/Blogmodel";
import { writeFile } from "fs/promises";
const { NextResponse } = require("next/server");
const fs = require("fs");

const loadDB = async () => {
  await Database();
};
loadDB();

export async function GET(request) {
  try {
    const blogid = request.nextUrl.searchParams.get("id");
    if (blogid) {
      const blogging = await Blogmodel.findById(blogid);
      return NextResponse.json({ blogging });
    } else {
      const blogs = await Blogmodel.find({});
      return NextResponse.json({ blogs });
    }
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
    return NextResponse.json({
      success: false,
      msg: `Failed to fetch blogs: ${error.message}`,
    });
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const timestamp = Date.now();

    const image = formData.get("image");
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timestamp}_${image.name}`;
    await writeFile(path, buffer);

    const imgUrl = `/${timestamp}_${image.name}`;
    console.log(imgUrl);

    const blogdata = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      author: formData.get("author"),
      image: imgUrl,
    };

    // Attempt to create the blog post in the database
    const newBlog = await Blogmodel.create(blogdata);

    console.log("Blog created successfully:", newBlog);
    return NextResponse.json({ success: true, msg: "Blog added successfully" });
  } catch (error) {
    console.error("Error adding blog:", error.message, error.stack);
    return NextResponse.json({
      success: false,
      msg: `Failed to add blog: ${error.message}`,
    });
  }
}

export async function DELETE(request) {
  const id = await request.nextUrl.searchParams.get("id");
  const blog = await Blogmodel.findById(id);
  fs.unlink(`./public${blog.image}`, () => {});
  await Blogmodel.findByIdAndDelete(id);
  return NextResponse.json({ msg: "blog deleted" });
}

export async function PUT(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    const formData = await request.formData();

    let blog = await Blogmodel.findById(id);

    if (!blog) {
      return NextResponse.json({ success: false, msg: "Blog not found" });
    }

    const updateData = {
      title: formData.get("title") || blog.title,
      description: formData.get("description") || blog.description,
      category: formData.get("category") || blog.category,
      author: formData.get("author") || blog.author,
    };

    if (formData.get("image")) {
      const timestamp = Date.now();
      const image = formData.get("image");
      const imageByteData = await image.arrayBuffer();
      const buffer = Buffer.from(imageByteData);
      const path = `./public/${timestamp}_${image.name}`;
      await writeFile(path, buffer);

      fs.unlink(`./public${blog.image}`, () => {}); // delete old image

      updateData.image = `/${timestamp}_${image.name}`;
    }

    blog = await Blogmodel.findByIdAndUpdate(id, updateData, { new: true });
    
    return NextResponse.json({ success: true, msg: "Blog updated successfully" });
  } catch (error) {
    console.error("Error updating blog:", error.message);
    return NextResponse.json({
      success: false,
      msg: `Failed to update blog: ${error.message}`,
    });
  }
}