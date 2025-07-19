import UserModel from "../models/userModel.js";

const isTeacher = async (req, res, next) => {
  try {
    const userId = req.body.userId; 
    
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user ID found" });
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "teacher") {
      return res.status(403).json({ message: "Access denied: Only teachers allowed" });
    }

    next(); // User is a teacher, continue
  } catch (error) {
    //console.error("Error in isTeacher middleware:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default isTeacher;
