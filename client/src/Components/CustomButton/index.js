import React from "react";
import { Button } from "@mui/material";

const CustomButton = ({ updateClick, btnStyles, btnText, className, variant, btnType, disabled }) => {

    const handleClick = () => {
        updateClick();
    }

    return (
        <Button onClick={handleClick} style={btnStyles} className={className} variant={variant} type={btnType} disabled={disabled}>
            {btnText}
        </Button>
    )
}

export default CustomButton;
