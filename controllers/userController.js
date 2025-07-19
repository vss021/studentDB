import express from 'express';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js'; 
import ContentModel from "../models/contentModel.js"

// POST /api/auth/signup
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create new user with hashed password
    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    //console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error during signup" });
  }
};

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    //console.error("Login Error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};




const getAssignment = async (req, res) => {
    
  try {
    // Fetch all content 
    const contents = await ContentModel.find().sort({ createdAt: -1 }).populate("createdBy", "name");; 

    res.status(200).json({
      success: true,
      message: "Assignments fetched successfully",
      data: contents
    });
  } catch (error) {
    //console.error("Error fetching assignments:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching assignments"
    });
  }
};




export { signup, login, getAssignment };
