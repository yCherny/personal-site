import mongoose from "mongoose";
import { Post } from "@/interfaces/content";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { dbConnect } from "@/lib/db-connect";

import type { NextApiRequest, NextApiResponse } from "next";

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
      try {
        const query = Post.where({ type: "portfolio" });
        const projects = await query.find();
        res.status(200).json({ projects: projects });
      } catch (err) {
        res.status(500).json({ error: err });
      }
      break;
    case "POST":
      if (session) {
        let post = new Post(req.body);
        try {
          const postUpload = await post.save({ timestamps: true });
          res.status(202).json({ message: `uploaded` });
        } catch (err) {
          res.status(500).json({ error: err });
        }
      } else {
        res.status(401).json({
          error: `Unauthorized to access this api point`,
        });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
