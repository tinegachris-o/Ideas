import mongoose, { mongo } from "mongoose";
import Idea from "../models/ideas.js";
export const getIdeas = async (req, res) => {
  try {
    const limit = parseInt(req.query._limit);
    const query = Idea.find().sort({ createdAt: -1 });

    if (!isNaN(limit)) {
      query.limit(limit);
    }

    const ideas = await query.exec(); // ✅ call exec on the query

    res.json(ideas);
  } catch (error) {
    console.error("Error fetching ideas:", error);
    res.status(500).json({ message: error.message });
  }
};

export const createIdea = async (req, res) => {
  const { title, description, summary, tags } = req.body || {};

  // Validate required fields
  if (!title?.trim() || !description?.trim() || !summary?.trim()) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newIdea = new Idea({
      title,
      description,
      summary,
      tags:
        typeof tags === "string"
          ? tags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean)
          : Array.isArray(tags)
          ? tags
          : [],
          user:req.user.id,
    });

    const savedIdea = await newIdea.save();
    res.status(201).json(savedIdea);
  } catch (error) {
    console.error(error,'error creating new idea')
    res.status(400).json({ message: error.message });
  }
};



export const deleteIdea = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Block deletion if idea.user is missing or doesn't match the logged-in user
    if (!idea.user || idea.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this idea" });
    }

    await idea.deleteOne();
    res.status(200).json({ message: "Idea deleted successfully" });
  } catch (error) {
    console.error("Error deleting idea:", error.message);
    res.status(500).json({ message: "Server error deleting idea" });
  }
};


export const getIdea = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("No idea with that id");
    }
    const idea = await Idea.findById(req.params.id);
    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }
    res.json(idea);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateIdea = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("No idea with that id");
    }
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }
    const { title, description, summary, tags } = req.body || {}; // ✅ add this line

    

    // Block deletion if idea.user is missing or doesn't match the logged-in user
    if (!idea.user || idea.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this idea" });
    }

   idea.title=title;
   idea.description=description;
   idea.summary=summary;
   idea.tags=Array.isArray(tags)?tags:typeof tags ==='string'?tags.split(',').map((t)=>t.trim()).filter(Boolean):[]
    const updatedIdea=await idea.save()
    res.json(updatedIdea);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
