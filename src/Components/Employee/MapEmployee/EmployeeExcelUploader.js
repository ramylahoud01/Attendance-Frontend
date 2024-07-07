import React, { useRef, useState } from "react";
import { Badge, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import "./../AddEmployee/EmployeeImageUploader/ImageUploader.css";
import { SiMicrosoftexcel } from 'react-icons/si';
const API_URL = process.env.REACT_APP_SERVER_API;
const EmployeeExcelUploader = ({ defaultValue, name, getFlag, getSelectedFile, isCSV }) => {
    const inputRef = useRef(defaultValue);
    const [defaultvalue, setDefaultValue] = useState(defaultValue)
    const [selectedFile, setSelectedFile] = useState();
    const [isSvgFile, setIsSvgFile] = useState(false);
    const ChangeInput = (event) => {
        const selectedFile = event.target.files[0];
        getSelectedFile && getSelectedFile(event.target.files[0])
        if (selectedFile) {
            const fileType = selectedFile.type;
            if (fileType === 'application/vnd.ms-excel' || fileType === 'text/csv') {
                setIsSvgFile(true)
            } else if (fileType.startsWith('image/')) {
                setIsSvgFile(false)
            } else {
                setIsSvgFile(false)
            }
            setSelectedFile(selectedFile);
            getFlag && getFlag(false);
            setDefaultValue(null);
        }
    };
    const removeFile = (e) => {
        getSelectedFile && getSelectedFile(null)
        setSelectFileToEmpty()
        e.stopPropagation();
        setSelectedFile(null);
        inputRef.current.value = null;
    };
    const removeDefaultFile = (e) => {
        setDefaultValue(null)
        getFlag && getFlag(false)
    }
    const setSelectFileToEmpty = () => {
        setSelectedFile(null)
    }
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
                width: { xs: "25ch", sm: '100%' },
                flexDirection: { sm: 'row', xs: 'column' }
            }}
        >
            <input
                style={{ cursor: "pointer", display: 'flex', width: '13ch', overflow: 'hidden' }}
                type="file"
                name={name}
                onChange={ChangeInput}
                ref={inputRef}
                accept={isCSV ? ".csv" : "image/*"}
                aria-label="Upload CSV or Image"

            />
            {
                <Typography component={'div'} mt={'4px'}>
                    {defaultvalue && defaultvalue[0] && !selectedFile && !isSvgFile && (
                        <div
                            style={{
                                position: 'relative',
                                display: 'inline-block',
                                marginLeft: '20px'// Ensure the container respects the image size
                            }}
                        >
                            <Badge
                                badgeContent={
                                    <CancelIcon
                                        onClick={removeDefaultFile}
                                        sx={{ fontSize: "30px", cursor: "pointer" }}
                                    />
                                }
                            >
                                <Typography
                                    component={'img'}
                                    src={`${API_URL}${defaultvalue[0].replace('/app/', '')}`}
                                    alt="Uploaded"
                                    sx={{
                                        width: { sm: '100px', xs: '60px' },
                                        height: { sm: '100px', xs: '60px' },
                                        objectFit: 'cover',
                                        borderRadius: '10px',
                                        position: 'relative',
                                        filter: selectedFile ? 'brightness(70%)' : 'none', // Change brightness on hover
                                        transition: 'filter 0.3s ease',
                                        cursor: 'pointer' // Add a smooth transition
                                    }}
                                />
                            </Badge>
                        </div>
                    )}
                    {selectedFile && !isSvgFile && (
                        <Badge
                            badgeContent={
                                <CancelIcon
                                    onClick={removeFile}
                                    sx={{ fontSize: "30px", cursor: "pointer" }}
                                />
                            }
                        >
                            <Typography component={'img'}
                                src={
                                    selectedFile instanceof File
                                        ? URL.createObjectURL(selectedFile)
                                        : selectedFile
                                }
                                alt="Uploaded"
                                sx={{
                                    width: { sm: "100px", xs: '60px' },
                                    height: { sm: "100px", xs: '60px' },
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                    marginLeft: "5px",
                                }}
                            />
                        </Badge>
                    )}
                </Typography>
            }
            {isSvgFile && selectedFile &&
                <div
                    style={{
                        position: 'relative',
                        display: 'inline-block',
                        marginLeft: '40px'// Ensure the container respects the image size
                    }}
                >
                    <Badge
                        badgeContent={
                            <CancelIcon
                                onClick={removeFile}
                                sx={{ fontSize: "30px", cursor: "pointer", ml: '10px' }}
                            />
                        }
                    >
                        <a
                            href={URL.createObjectURL(selectedFile)}
                            download={selectedFile.name}
                            style={{ textDecoration: 'none' }}
                        >
                            <SiMicrosoftexcel size={30} style={{ color: '#006400' }} />
                        </a>
                    </Badge>
                    <Typography color={'primary'} sx={{ fontWeight: 'bold', fontSize: '14px' }}>{selectedFile.name}</Typography>
                </div>}
        </Typography>
    );
};

export default EmployeeExcelUploader;
