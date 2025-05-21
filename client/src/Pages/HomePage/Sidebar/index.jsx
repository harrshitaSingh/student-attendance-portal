import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import BackHandOutlinedIcon from '@mui/icons-material/BackHandOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import "./styled.css";

const drawerWidth = 240;

const Sidebar = () => {
    const location = useLocation();

    const navItems = [
        { label: "Dashboard", icon: <SpaceDashboardOutlinedIcon />, path: "/home" },
        { label: "Students", icon: <SchoolOutlinedIcon />, path: "/students" },
        { label: "Attendance", icon: <BackHandOutlinedIcon />, path: "/attendance" },
        { label: "Settings", icon: <SettingsOutlinedIcon />, path: "/settings" },
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                },
            }}
            className="sidebar"
        >
            <Toolbar />
            <Box className="sidebar-content">
                <List>
                    {navItems.map((item) => {
                        const isSelected = location.pathname === item.path;
                        return (
                            <ListItem
                                key={item.label}
                                button
                                component={Link}
                                to={item.path}
                                selected={isSelected}
                                sx={{
                                    marginTop:"15px",
                                    backgroundColor: isSelected ? "#4169E1 " : "transparent",
                                    color:  "white",
                                    borderRadius: isSelected ? "12px" : "none",
                                    transition: "background-color 0.3s ease, color 0.3s ease",
                                    "&:hover": {
                                        backgroundColor: "#B0C4DE",
                                        color: "white",
                                        "& .MuiListItemIcon-root, & .MuiListItemText-root": {
                                            color: "white",
                                        },
                                        borderRadius:'12px'
                                    },
                                    "& .MuiListItemIcon-root, & .MuiListItemText-root": {
                                        color: "white",
                                    },
                                }}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.label} />
                            </ListItem>
                        );
                    })}
                </List>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
