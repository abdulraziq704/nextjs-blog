import { Database } from "@/lib/config/db";
import Blogmodel from "@/lib/models/Blogmodel";
import { NextResponse } from "next/server";

const loadDB = async () => {
  await Database();
};
loadDB();

export async function GET(request) {
  try {
    const category = request.nextUrl.searchParams.get("category");

    if (!category) {
      return NextResponse.json({
        success: false,
        msg: "Category parameter is required",
      });
    }

    // Find the 3 most recent blogs based on category
    const relatedBlogs = await Blogmodel.find({ category })
      .sort({ createdAt: -1 }) // Sort by date, most recent first
      .limit(3) // Limit to 3 results
      .exec();

    return NextResponse.json({
      success: true,
      blogs: relatedBlogs,
    });
  } catch (error) {
    console.error("Error fetching related blogs:", error.message);
    return NextResponse.json({
      success: false,
      msg: `Failed to fetch related blogs: ${error.message}`,
    });
  }
}
