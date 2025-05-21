"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = void 0;
const db_1 = __importDefault(require("../Config/db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, phone, school, role, subjects } = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).json({ error: "All fields are required" });
    }
    const roleUpperCase = role.toUpperCase();
    let subjectArray = [];
    if (Array.isArray(subjects)) {
        subjectArray = subjects.map(s => s.trim());
    }
    else if (typeof subjects === "string") {
        subjectArray = subjects.split(",").map(s => s.trim());
    }
    try {
        const existingTeacher = yield db_1.default.teacher.findUnique({ where: { email } });
        if (existingTeacher) {
            return res.status(400).json({ error: "User already exists" });
        }
        const newTeacher = yield db_1.default.teacher.create({
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
        const token = jsonwebtoken_1.default.sign({ id: newTeacher.id, name: newTeacher.name, email: newTeacher.email, role: newTeacher.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        yield db_1.default.teacher.update({
            where: { id: newTeacher.id },
            data: { token },
        });
        console.log("here3");
        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newTeacher.id,
                name: newTeacher.name,
                email: newTeacher.email,
                role: newTeacher.role,
                token,
            },
        });
    }
    catch (error) {
        console.error(" Error during sign-up:", error);
        return res.status(500).json({ error: "Something went wrong, please try again." });
    }
});
exports.signUp = signUp;
