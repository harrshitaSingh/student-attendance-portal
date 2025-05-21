import React, { useState } from "react";
import {
    Box,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Checkbox,
    TextField
} from "@mui/material";
import Sidebar from "../Sidebar";
import "./styled.css";
import CustomButton from "../../../Components/CustomButton";
import { NavigationBar } from "../AppBar";

const AttendancePage = () => {
    const [selectedMonth, setSelectedMonth] = useState("2024-05");
    const [selectedGrade, setSelectedGrade] = useState("5th");

    const students = [
        { id: 1, name: "Rahul S" },
        { id: 2, name: "Harry Potter" },
        { id: 3, name: "Jhon C" },
        { id: 9, name: "Michael L. Eby" },
        { id: 10, name: "Christopher M. Matte" },
        { id: 11, name: "Amanda M. McGee" },
        { id: 12, name: "Edward C. Gonzalez" },
        { id: 13, name: "Brenda A. White" },
        { id: 14, name: "Velma E. Hernandez" },
        { id: 15, name: "Elinor L. Woods" },
    ];

    const days = Array.from({ length: 30 }, (_, i) => i + 1);

    const [attendance, setAttendance] = useState({});

    const toggleAttendance = (studentId, day) => {
        const key = `${studentId}_${day}`;
        setAttendance((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
 
    };

    return (
        <Box p={3} className="home-container">
            <Sidebar />
            <Box className="main-container">
                <NavigationBar />

                <Box className="attendance-container">
                    <Typography variant='h5' fontWeight="bold" justifyContent="flex-start" display="flex" mb={2}>Attendance</Typography>
                    <Box className="controls" display="flex" gap={3} alignItems="center" mb={3} flexWrap="wrap">
                        <FormControl>
                            <InputLabel shrink sx={{ color: "#fff" }}>Select Month</InputLabel>
                            <TextField
                                type="month"
                                label="Select Month"
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                                sx={{
                                    width: 200,
                                    label: { color: '#fff' },
                                    input: { color: '#fff' },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#ccc',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#aaa',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#4169E1',
                                        },
                                    },
                                    '& .MuiSvgIcon-root': {
                                        color: '#fff',
                                    },
                                }}
                            />


                        </FormControl>

                        <FormControl sx={{ minWidth: 120 }}>
                            <InputLabel shrink id="grade-label" sx={{ color: "#fff" }}>Select Grade</InputLabel>
                            <Select
                                labelId="grade-label"
                                value={selectedGrade}
                                onChange={(e) => setSelectedGrade(e.target.value)}
                                sx={{
                                    color: "#fff",
                                    '& .MuiSvgIcon-root': {
                                        color: "#fff", 
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#ccc',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#aaa',
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#4169E1',
                                    },
                                }}
                            >

                                <MenuItem value="5th">5th</MenuItem>
                                <MenuItem value="6th">6th</MenuItem>
                                <MenuItem value="7th">7th</MenuItem>
                            </Select>
                        </FormControl>


                        <CustomButton
                            btnText="Search"
                            btnStyles={{ backgroundColor: '#4169E1', color: '#fff' }}
                            className="search-student-btn"
                            updateClick={() => {
                                console.log("Search clicked");
                            }}
                        />
                    </Box>


                    <Box className="attendance-table-wrapper">
                        <TableContainer component={Paper}>
                            <Table className="attendance-table" stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><strong>Id</strong></TableCell>
                                        <TableCell><strong>Name</strong></TableCell>
                                        {days.map((day) => (
                                            <TableCell key={day}><strong>{day}</strong></TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {students.map((student) => (
                                        <TableRow key={student.id}>
                                            <TableCell>{student.id}</TableCell>
                                            <TableCell>{student.name}</TableCell>
                                            {days.map((day) => (
                                                <TableCell key={day}>
                                                    <Checkbox
                                                        checked={!!attendance[`${student.id}_${day}`]}
                                                        onChange={() => toggleAttendance(student.id, day)}
                                                        size="small"
                                                        sx={{ color: "#fff" }}
                                                    />
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>

                </Box>
            </Box>
        </Box>
    );
};

export default AttendancePage;
