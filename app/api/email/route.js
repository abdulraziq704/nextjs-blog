// import { Database } from "@/lib/config/db";
// import EmailModel from "@/lib/models/EmailModel";
// import { NextResponse } from "next/server";

// const loadDB = async () => {
//     await Database();
//   };
//   loadDB();

// export async function POST(request) {
//     const formdata = await request.formData();
//     const emaildata = {
//         email:  `${formdata.get('email')}`
//     }
//     await EmailModel.create(emaildata)
//     return NextResponse.json({seccess:true,msg:"email subscribed successfullly"})
// }
import { Database } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

const loadDB = async () => {
  try {
    await Database();
  } catch (error) {
    console.error("Database connection failed:", error);
    throw new Error("Database connection failed");
  }
};

loadDB();

export async function POST(request) {
  try {
    const formData = await request.formData();
    const emailData = {
      email: `${formData.get("email")}`,
    };
    await EmailModel.create(emailData);
    return NextResponse.json({
      success: true,
      msg: "Email subscribed successfully",
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({
      success: false,
      msg: "API not working",
      error: error.message,
    });
  }
}

export async function GET(request) {
  const email = await EmailModel.find({});
  return NextResponse.json({ email });
}

export async function DELETE(request) {
  const id = await request.nextUrl.searchParams.get("id");
  await EmailModel.findByIdAndDelete(id);
  return NextResponse.json({ success: true, msg: "email deleted" });
}
