import prisma from "../Config/db";
import jwt from "jsonwebtoken";
import { signUpModel } from "../Models/signUpModel";
import { Request, Response } from "express";
import { loginModel } from "../Models/loginModel";

export const signUp = async (req: Request, res: Response) => {

    const { name, email, password, phone, school, role, subjects } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const roleUpperCase = role.toUpperCase() as "TEACHER" | "ADMIN";

    let subjectArray: string[] = [];

    if (Array.isArray(subjects)) {
        subjectArray = subjects.map(s => s.trim());
    } else if (typeof subjects === "string") {
        subjectArray = subjects.split(",").map(s => s.trim());
    }

    try {
        const existingTeacher = await prisma.teacher.findUnique({ where: { email } });

        if (existingTeacher) {
            return res.status(400).json({ error: "User already exists" });
        }

        const newTeacher = await prisma.teacher.create({
            data: {
                name,
                email,
                password,
                phone,
                school,
                subjects: subjectArray,
                role: roleUpperCase,
                createdAt: new Date(),
            },
        });

        const token = jwt.sign(
            { id: newTeacher.id, name: newTeacher.name, email: newTeacher.email, role: newTeacher.role },
            process.env.JWT_SECRET!,
            { expiresIn: "1h" }
        );

        await prisma.teacher.update({
            where: { id: newTeacher.id },
            data: { token },
        });

        console.log("here3")

        return res.status(201).json({
            message: "User registered successfully",
            teacher: {
                id: newTeacher.id,
                name: newTeacher.name,
                email: newTeacher.email,
                role: newTeacher.role,
                token,
            },
        });
    } catch (error) {
        console.error(" Error during sign-up:", error);
        return res.status(500).json({ error: "Something went wrong, please try again." });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const teacher = await prisma.teacher.findUnique({ where: { email } });
        if (!teacher) {
            return res.status(401).json({ error: "User not found" });
        }

        if (teacher.password !== password) {
            return res.status(401).json({ error: "Invalid password" });
        }

        const token = jwt.sign(
            { id: teacher.id, name: teacher.name, email: teacher.email },
            process.env.JWT_SECRET!,
            { expiresIn: "1h" }
        );


        await prisma.teacher.update({
            where: { id: teacher.id },
            data: { token }
        });

        return res.status(200).json({
            message: "Login successful",
            teacher: { id: teacher.id, name: teacher.name, email: teacher.email, token }
        });

    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ error: "Something went wrong, please try again." });
    }
  };