import axios from "axios";
import { NextResponse } from "next/server";
import connectToDatabase from "@/utils/db";
import Client from "@/models/Client";
import mongoose from "mongoose";

const registerToAirtable = async (emailBody) => {
  const airtableUrl = process.env.AIRTABLE_URL;
  const result = axios
    .post(
      airtableUrl,
      {
        fields: {
          name: emailBody.name,
          email: emailBody.email,
          message: emailBody.message,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.API_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      if (response.status === 200) {
        console.log("user added to the database!");
        //send email to my personal mailbox
      } else {
        throw new error("something went wrong!");
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
};
export async function POST(request) {
  await connectToDatabase();
  const emailBody = await request.json();
  const emailEndpointUrl = process.env.EMAILENDPOINT;

  try {
    const result = await Client.create({ ...emailBody });
    // register client's data to airtable
    await registerToAirtable(emailBody);
    // sending myself a personal email
    await fetch(emailEndpointUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailBody),
    });

    return NextResponse.json({
      message: "thanks for reaching out!",
      statusCode: 201,
    });
  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json({
        message: "info already recieved!",
        statusCode: 400,
      });
    }
    return NextResponse.json({
      message: "something went wrong, try again!",
      statusCode: 500,
    });
  }
}
