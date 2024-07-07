import React, { useRef, useState } from "react";
import { Badge, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import "./ImageUploader.css";

const API_URL = process.env.REACT_APP_SERVER_API;

const EmployeeImageUploader = ({ defaultValue, name, getFlag, getSelectedFile }) => {
    const inputRef = useRef(null);
    const [defaultvalue, setDefaultValue] = useState(defaultValue);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setSelectedFile(selectedFile);
            setDefaultValue(null);
            if (getSelectedFile) getSelectedFile(selectedFile);
            if (getFlag) getFlag(false);
        }
    };

    const handleRemoveFile = (e) => {
        e.stopPropagation();
        setSelectedFile(null);
        inputRef.current.value = null;
        if (getSelectedFile) getSelectedFile(null);
    };

    const handleRemoveDefaultFile = () => {
        setDefaultValue(null);
        if (getFlag) getFlag(false);
    };

    return (
        <Typography
            component="div"
            color="primary"
            sx={{
                backgroundColor: "#eeeeee",
                border: "2px dashed #eeeeee",
                borderRadius: "10px",
                marginTop: "10px",
                padding: "20px 0px",
                textAlign: "center",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: { xs: "25ch", sm: "100%" },
                flexDirection: { sm: "row", xs: "column" },
            }}
        >
            <input
                style={{ cursor: "pointer", display: "flex", width: "13ch", overflow: "hidden" }}
                type="file"
                name={name}
                onChange={handleChange}
                ref={inputRef}
                accept="image/*"
                aria-label="Upload Image"
            />
            <Typography component="div" mt="4px">
                {defaultvalue && defaultvalue[0] && !selectedFile && (
                    <div style={{ position: "relative", display: "inline-block", marginLeft: "20px" }}>
                        <Badge
                            badgeContent={
                                <CancelIcon
                                    onClick={handleRemoveDefaultFile}
                                    sx={{ fontSize: "30px", cursor: "pointer" }}
                                />
                            }
                        >
                            <Typography
                                component="img"
                                src={`${API_URL}${defaultvalue[0].replace("/app/", "")}`}
                                alt="Uploaded"
                                sx={{
                                    width: { sm: "100px", xs: "60px" },
                                    height: { sm: "100px", xs: "60px" },
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                    filter: selectedFile ? "brightness(70%)" : "none",
                                    transition: "filter 0.3s ease",
                                    cursor: "pointer",
                                }}
                            />
                        </Badge>
                    </div>
                )}
                {selectedFile && (
                    <Badge
                        badgeContent={
                            <CancelIcon
                                onClick={handleRemoveFile}
                                sx={{ fontSize: "30px", cursor: "pointer" }}
                            />
                        }
                    >
                        <Typography
                            component="img"
                            src={URL.createObjectURL(selectedFile)}
                            alt="Uploaded"
                            sx={{
                                width: { sm: "100px", xs: "60px" },
                                height: { sm: "100px", xs: "60px" },
                                objectFit: "cover",
                                borderRadius: "10px",
                                marginLeft: "5px",
                            }}
                        />
                    </Badge>
                )}
            </Typography>
        </Typography>
    );
};

export default EmployeeImageUploader;
