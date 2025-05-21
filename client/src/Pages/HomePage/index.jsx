import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import Sidebar from './Sidebar';
import "./styled.css"
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { NavigationBar } from './AppBar';


const pieData = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
];

const COLORS = ['#0088FE', '#00C49F'];

const barData = [
    { name: 'Jan', present: 350, absent: 50 },
    { name: 'Feb', present: 300, absent: 100 },
    { name: 'Mar', present: 450, absent: 50 },
    { name: 'Apr', present: 250, absent: 100 },
];



const cardData = [
    { title: "Total Student", icon: <SchoolOutlinedIcon /> },
    { title: "Total Present", icon: <TrendingUpIcon /> },
    { title: "Total Absent", icon: <TrendingDownIcon /> },
]


const DashboardPage = () => {

    return (
        <Box p={3} className="home-container">
            <Sidebar />

            <Box className="main-container">
                <NavigationBar />
                <Typography variant='h5' fontWeight="bold" justifyContent="flex-start" display="flex" mb={2}>Dashboard</Typography>
                <Grid container spacing={2}>
                    {cardData.map((item) => (
                        <Grid item xs={12} md={4} key={item}>
                            <Card sx={{
                                backgroundColor: "#d0e2ff",
                                color: "black",
                                height: 120,
                                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                                },
                            }}>
                                <CardContent>
                                    <Grid sx={{ display: "flex" }}>
                                        <Typography variant="h6" gutterBottom>
                                            {item.icon}
                                        </Typography>
                                        <Typography variant="h6" gutterBottom sx={{ color: "black", fontWeight: "bold", justifyContent: "flex-start", display: "flex", marginLeft: "3px" }}>
                                            {item.title}
                                        </Typography>
                                    </Grid>

                                    <Typography variant="body2" style={{ color: "#333", justifyContent: "flex-start", display: "flex" }}>
                                        {item.title}.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                    ))}
                </Grid>

                {/* Charts */}
                <Grid container spacing={2} mt={2}>
                    {/* Pie Chart */}
                    <Grid item xs={12} md={6}>
                        <Card sx={{
                            backgroundColor: "transparent",
                            border: "2px solid rgba(163, 158, 158, 0.2)",
                            color: "#fff",
                            p: 2,
                            transition: "box-shadow 0.3s ease",
                            "&:hover": {
                                boxShadow: "0 0 10px rgba(255,255,255,0.2)",
                            },
                        }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom style={{ display: "flex", justifyContent: "flex-start", }}>
                                    Attendance
                                </Typography>
                                <BarChart
                                    width={400}
                                    height={300}
                                    data={barData}
                                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />

                                    <Bar dataKey="present" name="Total Present" fill='#0088FE'>
                                        {barData.map((entry, index) => (
                                            <Cell key={`present-${index}`} fill="#0088FE" />
                                        ))}
                                    </Bar>

                                    <Bar dataKey="absent" name="Total Absent" fill='#00C49F'>
                                        {barData.map((entry, index) => (
                                            <Cell key={`absent-${index}`} fill="#00C49F" />
                                        ))}
                                    </Bar>
                                </BarChart>


                            </CardContent>

                        </Card>
                    </Grid>

                    {/* Bar Chart */}
                    <Grid item xs={12} md={6}>
                        <Card sx={{
                            backgroundColor: "transparent",
                            border: "2px solid rgba(163, 158, 158, 0.2)",
                            color: "#fff",
                            p: 2,
                            transition: "box-shadow 0.3s ease",
                            "&:hover": {
                                boxShadow: "0 0 10px rgba(255,255,255,0.2)",
                            },
                        }}
                        >
                            <CardContent>

                                <Typography variant="h6" gutterBottom style={{ display: "flex", justifyContent: "flex-start" }}>
                                    Monthly Attendance
                                </Typography>
                                <PieChart width={300} height={300}>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

        </Box >
    );
};

export default DashboardPage;
