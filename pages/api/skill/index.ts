import mongoose from "mongoose";
import { Skill } from "@/interfaces/skill";
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
        const skills = await Skill.find();
        res.status(200).json({ skills: skills });
      } catch (err) {
        res.status(500).json({ error: err });
      }
      break;
    case "POST":
      if (session) {
        let skill = await Skill.exists({ name: req.body.name });
        if (skill) {
          await Skill.updateOne({ name: req.body.name }, req.body);
        } else {
          const newSkill = new Skill(req.body);
          try {
            const skillUpload = await newSkill.save();
          } catch (err) {
            res.status(500).json({ error: err });
          }
        }

        res.status(202).json({ message: `uploaded` });
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
