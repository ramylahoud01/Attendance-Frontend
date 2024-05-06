import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { SiMicrosoftexcel } from "react-icons/si";
import { FaFilePdf } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import Logo from "../Image/Boulanger-Logo.png"
import { displayScheduleforReports } from '../../Services/Schedule.service';
// import * as XLSX from 'xlsx';
import ExcelJS from 'exceljs';
const options = ['Print as PDF', 'Print as Excel', 'Reset'];


export default function StyledButtonGroup({ reset, isLoading, selectedEmployee, role, selectedDate }) {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const generatePDF = (data) => {
        const doc = new jsPDF()
        const imgWidth = 40;
        const imgHeight = 14;
        const pageWidth = doc.internal.pageSize.getWidth();
        const imageX = pageWidth - imgWidth - 18;
        doc.addImage(Logo, "JPEG", imageX, 5, imgWidth, imgHeight);
        const header = [
            {
                content: "Employee Name",
                styles: {
                    halign: "start",
                    valign: "middle",
                    fillColor: ["#2F4F4F"],
                    textColor: [255, 255, 255],
                    fontSize: 12,
                },
            },
            {
                content: "Full Date",
                styles: {
                    halign: "start",
                    valign: "middle",
                    fillColor: ["#2F4F4F"],
                    textColor: [255, 255, 255],
                    fontSize: 12,
                },
            },
            {
                content: "Shift work",
                styles: {
                    fontSize: 12,
                    halign: "center",
                    valign: "middle",
                    fillColor: ["#2F4F4F"],
                    textColor: [255, 255, 255],
                },
            },
            {
                content: "Punch In",
                styles: {
                    fontSize: 12,
                    halign: "center",
                    valign: "middle",
                    fillColor: ["#2F4F4F"],
                    textColor: [255, 255, 255],
                },
            },
            {
                content: "Punch Out",
                styles: {
                    fontSize: 12,
                    halign: "center",
                    valign: "middle",
                    fillColor: ["#2F4F4F"],
                    textColor: [255, 255, 255],
                },
            },
            {
                content: "Punch Status",
                styles: {
                    fontSize: 12,
                    halign: "center",
                    valign: "middle",
                    fillColor: ["#2F4F4F"],
                    textColor: [255, 255, 255],
                },
            },
        ];
        const body = data?.map(schedule => ([
            {
                content: schedule.EmployeeName,
                rowSpan: 1,
                colSpan: 1,
                styles: {
                    halign: "center",
                    valign: "middle",
                    fillColor: [255, 255, 255],
                },
            },
            {
                content: schedule.FullDate,
                rowSpan: 1,
                colSpan: 1,
                styles: {
                    halign: "center",
                    valign: "middle",
                    fillColor: [255, 255, 255],
                },
            },
            {
                content: schedule.Shiftwork,
                rowSpan: 1,
                colSpan: 1,
                styles: {
                    halign: "center",
                    valign: "middle",
                    fillColor: [255, 255, 255],
                },
            },
            {
                content: schedule.PunchIn,
                rowSpan: 1,
                colSpan: 1,
                styles: {
                    halign: "center",
                    valign: "middle",
                    fillColor: [255, 255, 255],
                },
            },
            {
                content: schedule.PunchOut,
                rowSpan: 1,
                colSpan: 1,
                styles: {
                    halign: "center",
                    valign: "middle",
                    fillColor: [255, 255, 255],
                },
            },
            {
                content: schedule.PunchStatus,
                rowSpan: 1,
                colSpan: 1,
                styles: {
                    halign: "center",
                    valign: "middle",
                    fillColor: [255, 255, 255],
                },
            }
        ]));
        autoTable(doc, {
            head: [header],
            body: body,
            theme: "grid",
            startY: 25,
            styles: {
                halign: "center",
                valign: "middle",
                fontSize: 10,
                cellPadding: 3,
                textColor: [0, 0, 0],
                cellBorder: "1px solid black",
            },
        });
        doc.save(`schedule.pdf`);
    };
    const generateExcel = (data) => {
        // Create a workbook and worksheet
        let workbook = new ExcelJS.Workbook();
        let worksheet = workbook.addWorksheet('Schedule');

        // Define headers
        const headers = [
            { header: 'Employee Name', key: 'EmployeeName', width: 20 },
            { header: 'Full Date', key: 'FullDate', width: 20 },
            { header: 'Shift Work', key: 'Shiftwork', width: 20 },
            { header: 'Punch In', key: 'PunchIn', width: 20 },
            { header: 'Punch Out', key: 'PunchOut', width: 20 },
            { header: 'Punch Status', key: 'PunchStatus', width: 20 },
        ];
        worksheet.columns = headers;

        // Add data to the worksheet
        data.forEach((row) => {
            worksheet.addRow({
                EmployeeName: row.EmployeeName,
                FullDate: row.FullDate,
                Shiftwork: row.Shiftwork,
                PunchIn: row.PunchIn,
                PunchOut: row.PunchOut,
                PunchStatus: row.PunchStatus,
            });
        });

        headers.forEach((header, index) => {
            if (header.header) {
                worksheet.getCell(1, index + 1).fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FF2F4F4F' }, // Background color #2F4F4F
                };
                worksheet.getCell(1, index + 1).font = {
                    color: { argb: 'FFFFFFFF' }, // Font color white
                };
            }
        });

        // Write to buffer
        workbook.xlsx.writeBuffer().then((buffer) => {
            // Convert buffer to Blob
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            // Save Blob to file
            const fileName = 'schedule.xlsx';
            if (navigator.msSaveBlob) {
                // For IE
                navigator.msSaveBlob(blob, fileName);
            } else {
                // For other browsers
                const link = document.createElement('a');
                if (link.download !== undefined) {
                    const url = URL.createObjectURL(blob);
                    link.setAttribute('href', url);
                    link.setAttribute('download', fileName);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            }
            console.log('Excel file generated successfully.');
        }).catch((err) => {
            console.error('Error generating Excel file:', err);
        });
    };


    const handleClick = async () => {
        const response = await displayScheduleforReports(selectedEmployee?._id, role, selectedDate)
        const data = await response.json()
        console.log('data', data)
        if (options[selectedIndex] === 'Print as PDF') {
            generatePDF(data);
        } else if (options[selectedIndex] === 'Print as Excel') {
            generateExcel(data);
        } else if (options[selectedIndex] === 'Reset') {
            reset();
        }
    };
    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    return (
        <React.Fragment>
            <ButtonGroup
                variant="contained"
                ref={anchorRef}
                aria-label="Button group with a nested menu"
                size='small'
            >
                <Button disabled={isLoading} onClick={handleClick} startIcon={options[selectedIndex] === 'Print as PDF' ? <FaFilePdf /> : options[selectedIndex] === 'Print as Excel' ? <SiMicrosoftexcel /> : <GrPowerReset />}>{options[selectedIndex]}</Button>
                <Button
                    size="small"
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                    disabled={isLoading}
                >
                    <ArrowDropDownIcon size="small" />
                </Button>
            </ButtonGroup>
            <Popper
                sx={{
                    zIndex: 1,
                }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu" autoFocusItem>
                                    {options.map((option, index) => (
                                        <MenuItem
                                            key={option}
                                            selected={index === selectedIndex}
                                            onClick={(event) => handleMenuItemClick(event, index)}
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </React.Fragment>
    );
}