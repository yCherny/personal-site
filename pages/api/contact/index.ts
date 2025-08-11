import mongoose from "mongoose";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { dbConnect } from "@/lib/db-connect";

import type { NextApiRequest, NextApiResponse } from "next";
import { Contact } from "@/interfaces/contact";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  try {
    await dbConnect();
  } catch (err) {
    res.status(500).json({ error: "Connecting to the database failed." });
    return;
  }

  switch (req.method) {
    case "GET":
      if (session) {
        try {
          const contacts = await Contact.find();
          res.status(200).json({ contacts: contacts });
        } catch (err) {
          res.status(500).json({ error: err });
        }
      } else {
        res.status(401).json({
          error: `Unauthorized to access this api point`,
        });
      }

      break;
    case "POST":
      const newContact = new Contact(req.body);
      try {
        const contactUpload = await newContact.save();
        res.status(202).json({ message: `uploaded` });
      } catch (err) {
        res.status(500).json({ error: err });
        return;
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
