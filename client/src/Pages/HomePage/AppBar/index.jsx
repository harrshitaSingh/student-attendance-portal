import { Toolbar, AppBar, IconButton } from "@mui/material";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import React from "react";
import { useNavigate } from "react-router-dom";
import CustomAvatar from "../../../Components/CustomAvatar/indes";

export const NavigationBar = () => {
    const navigate = useNavigate()
    return (
        <AppBar position="fixed" className="app-bar">
            <Toolbar className="toolbar">
                <IconButton onClick={() => navigate('/')} sx={{ color: '#4169E1', mr: 3 }} >
                    <PowerSettingsNewIcon />
                </IconButton>
                <CustomAvatar size={50} fontSize={20} />
            </Toolbar>
        </AppBar>
    )
}