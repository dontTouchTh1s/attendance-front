import React, {useState} from 'react';
import {DataGrid, GridColDef, GridRowProps} from '@mui/x-data-grid';
import RTL from "../theme/RTL";
import {
    Box,
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    ThemeProvider,
    Modal,
    TextField
} from "@mui/material";
import {theme} from "../theme/rtl-theme";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMomentJalaali} from '@mui/x-date-pickers/AdapterMomentJalaali'
import moment from 'moment-jalaali'
import {GridApi} from "@mui/x-data-grid";

moment.loadPersian({dialect: 'persian-modern', usePersianDigits: true});
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};
const rows: GridRowProps = [
    {id: 1, name: 'علی مشایخی', type: 'استحقاقی', date: '4/24/2023'},
    {id: 2, name: 'رضا مشایخی', type: 'استحقاقی', date: '4/24/2023'},
    {id: 3, name: 'محمود مشایخی', type: 'استحقاقی', date: '4/24/2023'},

];

class GridCellValue {
}

const columns: GridColDef = [
    {field: 'id', headerName: 'ردیف', headerAlign: 'right'},
    {field: 'name', headerName: 'نام', headerAlign: 'right', minWidth: 150},
    {field: 'type', headerName: 'نوع', headerAlign: 'right', minWidth: 110},
    {field: 'date', headerName: 'تاریخ', headerAlign: 'right', minWidth: 120},
    {
        field: "action",
        headerName: "عملیات",
        headerAlign: 'center',
        sortable: false,
        disableColumnMenu: true,
        minWidth: 160,
        renderCell: (params) => {
            const onClick = (e) => {
                e.stopPropagation(); // don't select this row after clicking

                const api: GridApi = params.api;
                const thisRow: Record<string, GridCellValue> = {};

                api
                    .getAllColumns()
                    .filter((c) => c.field !== "__check__" && !!c)
                    .forEach(
                        (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
                    );

                return alert(JSON.stringify(thisRow, null, 4));
            };
            return (
                <Box>
                    <Button onClick={onClick}>تایید</Button>
                    <Button onClick={onClick}>رد</Button>
                </Box>
            );

        }
    }
];

function LeaveRequests() {
    const [type, setType] = useState(0);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [employeeNameSearch, setEmployeeNameSearch] = useState('');
    const [group, setGroup] = useState(0);
    const [selectedRequests, setSelectedRequests] = useState([]);
    const [modalInfoOpen, setModalInfoOpen] = useState(false);

    function acceptRequest() {
    }

    return (
        <ThemeProvider theme={theme}>
            <RTL>
                <LocalizationProvider dateAdapter={AdapterMomentJalaali}>
                    <Container component='main' maxWidth={'lg'}>
                        <Box sx={{
                            display: 'flex',
                            marginTop: '8px',
                            gap: '12px'
                        }}>
                            <FormControl sx={{
                                minWidth: '150px'
                            }}>
                                <InputLabel id="type-label">نوع مرخصی</InputLabel>
                                <Select
                                    autoWidth
                                    labelId="type-label"
                                    id="type"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    label="نوع مرخصی"
                                    autoFocus
                                >
                                    <MenuItem value={0}>همه</MenuItem>
                                    <MenuItem value={1}>استحقاقی</MenuItem>
                                    <MenuItem value={2}>استعلاحی</MenuItem>
                                    <MenuItem value={3}>بدون حقوق</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{
                                minWidth: '150px'
                            }}>
                                <InputLabel id="group-label">گروه پرسنلی</InputLabel>
                                <Select
                                    autoWidth
                                    labelId="group-label"
                                    id="group"
                                    value={group}
                                    onChange={(e) => setGroup(e.target.value)}
                                    label="گروه پرسنلی"
                                >
                                    <MenuItem value={1}>مدیران</MenuItem>
                                    <MenuItem value={2}>آبدارچی</MenuItem>
                                    <MenuItem value={0}>همه</MenuItem>
                                </Select>
                            </FormControl>
                            <DatePicker
                                value={fromDate}
                                onchange={(newValue) => setFromDate(newValue)}
                                label="از تاریخ"
                                name="from_date"
                                id="from_date"></DatePicker>
                            <DatePicker
                                value={toDate}
                                onchange={(newValue) => setToDate(newValue)}
                                fullWidth
                                margin="normal"
                                label="تا تاریخ"
                                name="from_date"
                                id="from_date">
                            </DatePicker>
                            <TextField
                                value={employeeNameSearch}
                                label='نام پرسنل'
                                id='employeeNameSearch'
                                name='employeeNameSearch'
                                autoComplete='name'
                                onChange={(e) => setEmployeeNameSearch(e.target.value)}>
                            </TextField>
                        </Box>
                        <Box sx={{marginTop: '8px'}}>
                            <DataGrid rows={rows}
                                      columns={columns}
                                      checkboxSelection
                                      disableRowSelectionOnClick
                                      sx={{}}
                                      onRowSelectionModelChange={(newRowSelectionModel) => {
                                          setSelectedRequests(newRowSelectionModel);
                                          console.log(newRowSelectionModel);
                                      }}
                                      rowSelectionModel={selectedRequests}
                                      onRowClick={() => setModalInfoOpen(true)}
                            >
                            </DataGrid>
                        </Box>
                        <Box sx={{
                            marginTop: '8px',
                            display: 'flex',
                            gap: '8px'
                        }}>
                            <Button disabled={selectedRequests.length == 0 ? true : false} variant='contained'
                                    color='success'>تایید همه</Button>
                            <Button disabled={selectedRequests.length == 0 ? true : false} variant='contained'
                                    color='error'>رد همه</Button>
                        </Box>
                        <Modal
                            open={modalInfoOpen}
                            onClose={() => setModalInfoOpen(false)}>
                            <Box sx={{...style, width: 400}}>
                                <h2 id="parent-modal-title">Text in a modal</h2>
                                <p id="parent-modal-description">
                                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                </p>
                            </Box>
                        </Modal>
                    </Container>
                </LocalizationProvider>
            </RTL>
        </ThemeProvider>
    )
}

export default LeaveRequests;