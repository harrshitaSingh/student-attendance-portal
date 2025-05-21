import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, IconButton, InputAdornment, Paper, FormControl } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import CustomSelect from "../../Components/CustomSelect";
import CircularProgress from '@mui/material/CircularProgress';


const selectFieldStyle = {
    mb: 2,
    input: {
        color: "#fff",
    },
    label: {
        color: "#aaa",
    },
    "& .MuiInputBase-root": {
        backgroundColor: "transparent",
        color: "white",
    },
    "& .MuiSvgIcon-root": {
        color: "white",
    },
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#555",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#2196f3",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#2196f3",
    },
};


function SignUpPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [school, setSchool] = useState("");
    const [subjects, setSubjects] = useState([]);
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("teacher");
    const [loading, setLoading] = useState(false);
    const [passwordVisibility, setPasswordVisibility] = useState({
        password: false,
        confirmPassword: false,
    });
    const roleOptions = [
        { label: "Teacher", value: "teacher" },
        { label: "Admin", value: "admin" },
    ];

    const subjectOptions = [
        { label: "Math", value: "Math" },
        { label: "Science", value: "Science" },
        { label: "English", value: "English" },
        { label: "History", value: "History" },
        { label: "Geography", value: "Geography" },
    ];


    const navigate = useNavigate();

    const handleSignUp = async (e) => {

        if (e && e.preventDefault()) {
            e.preventDefault();
        }

        if (!name || !email || !password || !confirmPassword || !school || !subjects.length || !phone) {
            toast.warn("All fields must be filled out");
            return;
        }
        if (password !== confirmPassword) {
            toast.warn("Passwords do not match");
            return;
        }


        setLoading(true);

        try {
            const response = await fetch(`http://localhost:5000/auth/signUp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, phone, school, subjects, role })
            }
            )

            const data = await response.json()

            if (response.ok) {
                setTimeout(() => {
                    toast.success("Teacher account created successfully!");
                    navigate('/');
                    setLoading(false);
                }, 1500);
            }

            else {
                toast.error(data.error);
                setLoading(false); 

            }
        }
        catch (error) {
            toast.error("Failed to create an account. Please try again.");

        }


    };

    const handlePasswordVisibilityToggle = (field) => {
        setPasswordVisibility((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    return (
        <Box
            sx={{
                backgroundColor: "#000",
                color: "#fff",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                filter: loading ? "blur(2px)" : "none",
                px: 2,
            }}
        >
            <ToastContainer />
            <Typography sx={{ fontSize: "3rem", fontFamily: "Helvetica Neue", color: "#2196f3", mb: 4 }}>
                Teacher Sign Up - Student Attendance Tracker
            </Typography>

            <Paper
                elevation={6}
                sx={{
                    width: "100%",
                    maxWidth: 400,
                    backgroundColor: "#121212",
                    borderRadius: "12px",
                    p: 4,
                    boxShadow: "0 0 15px rgba(33, 150, 243, 0.3)",
                }}
            >
                <Typography variant="h5" fontWeight="bold" color="white" mb={4}>
                    Create your Teacher Account
                </Typography>

                <Box component="form" onSubmit={handleSignUp} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <CustomInput
                        label="Full Name"
                        inputType="text"
                        currentValue={name}
                        updateValue={setName}
                        maxLength={50}
                        fullWidth
                    />

                    <CustomInput
                        label="Email Address"
                        inputType="email"
                        currentValue={email}
                        updateValue={setEmail}
                        maxLength={50}
                        fullWidth
                    />

                    <CustomInput
                        label="Phone Number"
                        inputType="tel"
                        currentValue={phone}
                        updateValue={setPhone}
                        maxLength={15}
                        fullWidth
                    />

                    <CustomInput
                        label="Password"
                        inputType={passwordVisibility.password ? "text" : "password"}
                        currentValue={password}
                        updateValue={setPassword}
                        maxLength={50}
                        fullWidth
                        Adornment={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => handlePasswordVisibilityToggle("password")} edge="end" sx={{ color: "white" }}>
                                        {passwordVisibility.password ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        InputLabelProps={{ style: { color: "white" } }}
                    />

                    <CustomInput
                        label="Confirm Password"
                        inputType={passwordVisibility.confirmPassword ? "text" : "password"}
                        currentValue={confirmPassword}
                        updateValue={setConfirmPassword}
                        maxLength={50}
                        fullWidth
                        Adornment={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => handlePasswordVisibilityToggle("confirmPassword")} edge="end" sx={{ color: "white" }}>
                                        {passwordVisibility.confirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        InputLabelProps={{ style: { color: "white" } }}
                    />

                    <CustomInput
                        label="School/Institute Name"
                        inputType="text"
                        currentValue={school}
                        updateValue={setSchool}
                        maxLength={100}
                        fullWidth
                    />
                    <FormControl fullWidth>
                        <CustomSelect
                            currentValue={subjects}
                            updateValue={setSubjects}
                            options={subjectOptions}
                            select="Subject Taught"
                            selectStyle={selectFieldStyle}

                        />

                    </FormControl>

                    <FormControl fullWidth>
                        <CustomSelect
                            currentValue={role}
                            updateValue={setRole}
                            options={roleOptions}
                            select="Role"
                            selectStyle={selectFieldStyle}
                        />

                    </FormControl>

                    <CustomButton
                        btnText={loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
                        btnType="submit"
                        updateClick={handleSignUp}
                        variant="contained"
                        disabled={loading}
                        btnStyles={{
                            width: "100%",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            padding: "12px",
                            backgroundColor: "#2196f3",
                            color: "#fff",
                            border: "none",
                            cursor: "pointer",
                            transition: "background-color 0.3s ease",
                        }}
                    />
                </Box>
            </Paper>
        </Box>
    );
}

export default SignUpPage;
