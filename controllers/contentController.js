import ContentModel from "../models/contentModel.js";

// Create Content
export const createContent = async (req, res) => {
  try {
    const { title, description, deadline, subject, userId } = req.body;
    

    const newContent = new ContentModel({
      title,
      description,
      deadline,
      subject,
      createdBy: userId,
    });

    await newContent.save();

    res.status(201).json({
      success: true,
      message: "Content created successfully",
      data: newContent,
    });
  } catch (error) {
    // //console.error("Create Content Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get All Content (Visible to all users)
export const getAllContent = async (req, res) => {
  try {
    const contents = await ContentModel.find()
      .sort({ createdAt: -1 })
      .populate("createdBy", "name email role"); // include who created it

    res.status(200).json({
      success: true,
      data: contents,
    });
  } catch (error) {
    //console.error("Get All Content Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get Content by ID
export const getContentById = async (req, res) => {
  try {
    const content = await ContentModel.findById(req.params.id).populate(
      "createdBy",
      "name email role"
    );

    if (!content) {
      return res
        .status(404)
        .json({ success: false, message: "Content not found" });
    }

    res.status(200).json({ success: true, data: content });
  } catch (error) {
    //console.error("Get Content by ID Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateContent = async (req, res) => {
  try {
    const content = await ContentModel.findById(req.params.id);

    if (!content) {
      return res.status(404).json({ success: false, message: "Content not found" });
    }

    const { title, description, deadline, subject } = req.body;

    content.title = title || content.title;
    content.description = description || content.description;

    if (deadline) {
      // Ensure only the date part is saved
      content.deadline = new Date(deadline.split('T')[0]);
    }

    content.subject = subject || content.subject;

    const updatedContent = await content.save();

    res.status(200).json({
      success: true,
      message: "Content updated successfully",
      data: updatedContent,
    });
  } catch (error) {
    //console.error("Update Content Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteContent = async (req, res) => {
  try {
    //console.log("delete ", req.body.userId); 

    const content = await ContentModel.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ success: false, message: "Content not found" });
    }

    await content.deleteOne();
    res.status(200).json({ success: true, message: "Content deleted successfully" });
  } catch (error) {
    //console.error("Delete Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

