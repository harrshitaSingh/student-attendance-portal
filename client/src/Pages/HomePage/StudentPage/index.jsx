/* eslint-disable no-unused-expressions */
import React, { useContext, useState } from "react";
import {
    Box,
    IconButton,
    InputBase,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "../Sidebar";
import SearchIcon from '@mui/icons-material/Search';
import "./styled.css";
import CustomButton from "../../../Components/CustomButton";
import CustomModal from "../../../Components/CustomModal";
import CustomInput from "../../../Components/CustomInput";
import { StudentDataContext } from "../../../Context/StudentDataContext";
import { toast, ToastContainer } from "react-toastify";
import { NavigationBar } from "../AppBar";


const StudentsPage = () => {
    const [handleModalState, setHandleModalState] = useState(false);
    const [newStudent, setNewStudent] = useState({ name: "", grade: "", address: "", contact: "" });
    const [searchStudent, setSearchStudent] = useState("");
    const { studentContextData, setStudentContextData } = useContext(StudentDataContext);

    const handleAddStudent = () => {
        const newId = studentContextData?.length + 1 || 1;
        const studentToAdd = { id: newId, ...newStudent };

        setStudentContextData((prevState) => [...prevState, studentToAdd]);

        localStorage.setItem("student", studentToAdd)
        toast.dark("Student added succesfully", { position: "top-right" })

        setHandleModalState(false);
        setNewStudent({ name: "", grade: "", address: "", contact: "" });
    };

    const handleSearchStudent = (e) => {
        setSearchStudent(e.target.value);
    };

    const filteredStudents = studentContextData.filter(student =>
        Object.values(student)
            .join(" ")
            .toLowerCase()
            .includes(searchStudent.toLowerCase())
    );

    return (
        <Box p={3} className="home-container">
            <ToastContainer />
            <Sidebar />
            <Box className="main-container">
                <NavigationBar />

                <Box className="content-wrapper">
                    <Typography variant='h5' fontWeight="bold" justifyContent="flex-start" display="flex" mb={2}>
                        Students
                    </Typography>

                    <Box className="top-actions">
                        <Paper component="form" className="search-bar">
                            <SearchIcon sx={{ color: '#fff', mr: 1 }} />
                            <InputBase
                                sx={{ ml: 1, flex: 1, color: '#fff' }}
                                placeholder="Search on Anything..."
                                inputProps={{ style: { color: "#fff" } }}
                                value={searchStudent}
                                onChange={handleSearchStudent}
                            />
                        </Paper>

                        <CustomButton
                            btnText="+ Add New Student"
                            btnStyles={{ backgroundColor: '#4169E1', color: '#fff' }}
                            className="add-student-btn"
                            updateClick={() => setHandleModalState(true)}
                        />
                    </Box>

                    <Box className="table-wrapper">
                        <TableContainer component={Paper}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Grade</TableCell>
                                        <TableCell>Address</TableCell>
                                        <TableCell>Contact</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredStudents.map((student) => (
                                        <TableRow key={student.id}>
                                            <TableCell>{student.id}</TableCell>
                                            <TableCell>{student.name}</TableCell>
                                            <TableCell>{student.grade}</TableCell>
                                            <TableCell>{student.address}</TableCell>
                                            <TableCell>{student.contact}</TableCell>
                                            <TableCell>
                                                <IconButton color="error">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>

                {handleModalState && (
                    <CustomModal isOpen={handleModalState} closeModal={() => setHandleModalState(false)}>
                        <Box className="modal-box" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Typography variant="h6" sx={{ color: "#FFF", fontWeight: "bold", mb: 1 }}>
                                Add New Student
                            </Typography>

                            <CustomInput
                                label="Student Name"
                                inputType="text"
                                required
                                currentValue={newStudent.name}
                                updateValue={(value) => setNewStudent(prev => ({ ...prev, name: value }))}
                            />
                            <CustomInput
                                label="Grade"
                                inputType="text"
                                required
                                currentValue={newStudent.grade}
                                updateValue={(value) => setNewStudent(prev => ({ ...prev, grade: value }))}
                            />
                            <CustomInput
                                label="Address"
                                inputType="text"
                                required
                                currentValue={newStudent.address}
                                updateValue={(value) => setNewStudent(prev => ({ ...prev, address: value }))}
                            />
                            <CustomInput
                                label="Contact"
                                inputType="number"
                                required
                                currentValue={newStudent.contact}
                                updateValue={(value) => setNewStudent(prev => ({ ...prev, contact: value }))}
                            />
                            <CustomButton
                                btnText="ADD"
                                btnClass="add-button"
                                btnStyles={{ color: '#fff', backgroundColor: "#4169E1" }}
                                updateClick={handleAddStudent}
                            />
                        </Box>
                    </CustomModal>
                )}
            </Box>
        </Box>
    );
};

export default StudentsPage;
