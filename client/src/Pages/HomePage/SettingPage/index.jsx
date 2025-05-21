import React, { useState } from "react";
import { Box, Typography, Switch, Divider, TextField, Button } from "@mui/material";
import Sidebar from "../Sidebar";
import { NavigationBar } from "../AppBar";


const SettingsPage = () => {
    const [darkMode, setDarkMode] = useState(true);
    const [emailNotif, setEmailNotif] = useState(false);
    const [smsNotif, setSmsNotif] = useState(true);
    const [password, setPassword] = useState("");

    return (
        <Box p={3} className="home-container">
            <Sidebar />
            <Box className="main-container">
                <NavigationBar />
                    
                    <Typography variant='h5' fontWeight="bold" justifyContent="flex-start" display="flex" mb={2}>Settings</Typography>
                    <Divider sx={{ my: 4, borderColor: "#2e3b55" }} />
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Appearance
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Typography>Enable Dark Mode</Typography>
                        <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} color="primary" />
                    </Box>

                    <Divider sx={{ my: 4, borderColor: "#2e3b55" }} />
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Notifications
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Typography>Email Notifications</Typography>
                            <Switch checked={emailNotif} onChange={() => setEmailNotif(!emailNotif)} color="primary" />
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Typography>SMS Notifications</Typography>
                            <Switch checked={smsNotif} onChange={() => setSmsNotif(!smsNotif)} color="primary" />
                        </Box>
                    </Box>

                    <Divider sx={{ my: 4, borderColor: "#2e3b55" }} />
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Account
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <TextField
                            variant="outlined"
                            type="password"
                            placeholder="Change Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ input: { color: "white" }, backgroundColor: "#1c1f26", borderRadius: 1, flex: 1 }}
                            InputLabelProps={{ style: { color: '#aaa' } }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => alert("Password Updated")}
                            sx={{ textTransform: "none", borderRadius: 2 }}
                        >
                            Update Password
                        </Button>
                    </Box>
            </Box>
        </Box>
    );
};

export default SettingsPage;