import React from "react";
import './styled.css'
import { TextField, Box } from "@mui/material"


const CustomInput = ({
    updateValue,
    inputType,
    currentValue,
    label,
    textInputStyles,
    containerStyles,
    maxLength,
    maxRows,
    multiline,
    date,
    Adornment,
    fullWidth,
    className
}) => {

    const handleChange = (e) => {
        const inputValue = e.target.value;
        updateValue(inputValue)
    }

    return (
        <Box style={{ ...containerStyles }}>
            <TextField
                className={`input ${className}`}
                type={inputType}
                value={currentValue}
                onChange={(e) => handleChange(e)}
                label={label}
                sx={{
                    input: {
                        color: "#fff",              
                    },
                    label: {
                        color: "#aaa",              
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#555',   
                        },
                        '&:hover fieldset': {
                            borderColor: '#888',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#4169E1', 
                        },
                    },
                }}
                inputProps={{ maxLength }}
                rows={maxRows}
                multiline={multiline}
                InputLabelProps={date}
                InputProps={{
                    ...Adornment,  
                }}
                fullWidth={fullWidth}
            />

        </Box>
    )
}

export default CustomInput
