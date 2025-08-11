import mongoose from "mongoose";
import { Section } from "@/interfaces/about";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { dbConnect } from "@/lib/db-connect";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  const sectionSlug = req.query.section as string;

  try {
    await dbConnect();
  } catch (err) {
    res.status(500).json({ error: "Connecting to the database failed." });
    return;
  }

  switch (req.method) {
    case "GET":
      try {
        const query = Section.where({ title: sectionSlug });
        const section = await query.findOne();
        res.status(200).json({ section: section });
      } catch (err) {
        res.status(500).json({ error: err });
      }
      break;
    case "DELETE":
      if (session) {
        await Section.deleteOne({ title: sectionSlug });
        res.status(202).json({
          deleted: `/about/${sectionSlug}`,
        });
      } else {
        res.status(401).json({
          error: `Unauthorized to access this api point`,
        });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
