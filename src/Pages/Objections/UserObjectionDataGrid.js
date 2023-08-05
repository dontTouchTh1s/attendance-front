import {DataGridPro, GridColDef} from "@mui/x-data-grid-pro";
import React, {useState} from "react";
import moment from "moment-jalaali";
import {Box, Button, Modal, TextField, Typography} from "@mui/material";
import Api from "../../Api";
import "../../Theme/data-grid.css";

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


function UserObjectionDataGrid({data}) {
    const [modalObjectionOpen, setModalObjectionOpen] = useState(false);
    const [clickedRowParams, setClickedRowParams] = useState({row: {}});
    const [description, setDescription] = useState('');

    const columns: GridColDef = [
        {
            field: 'id', type: 'number', headerName: 'ردیف', headerAlign: 'left',
            align: 'left', width: '70'
        },
        {
            field: 'type', type: 'singleSelect', headerName: 'نوع', headerAlign: 'left', minWidth: 110,
            valueFormatter: (params) => {
                let type = params.value;
                switch (type) {
                    case 'leave':
                        type = 'خروج';
                        break;
                    case 'attendance':
                        type = 'ورود';
                        break;

                }
                return type;
            },
        },
        {
            field: 'date',
            type: 'dateTime',
            headerName: 'تاریخ و زمان',
            headerAlign: 'left',
            minWidth: 200,

            valueGetter: (params) => {
                return new Date(params.value);
            },
            valueFormatter: (params) => {
                moment.loadPersian({dialect: 'persian-modern', usePersianDigits: true});
                let date = moment(params.value)
                    .format("jYYYY-jMM-jDD HH:mm:ss");
                moment.loadPersian({dialect: 'persian-modern', usePersianDigits: false});
                return date;
            },
        },
        {
            field: 'reviewed', type: 'boolean', headerName: 'بررسی شده', headerAlign: 'left', minWidth: 110,
        },
    ]

    async function sendObjection(event, id) {

        let data = {
            'description': description,
            'attendance_leave_id': id
        };

        try {
            const response = await Api.post('/objections/create', {...data});
            console.log(response);
            // handle successful response
        } catch (error) {
            if (error.response) {
                // handle error response
                console.log(error.response.data);
            } else if (error.request) {
                // handle no response
                console.log(error.request);
            } else {
                // handle other errors
                console.log('Error', error.message);
            }
        }
        setDescription('');
        setModalObjectionOpen(false);
    }

    return (
        <>
            <DataGridPro
                className={'long-data-grid'}
                {...data}
                columns={columns}
                checkboxSelection
                // filterModel={filterModel}
                // onFilterModelChange={(model) => {
                //     setFilterModel(model)
                // }}
                disableRowSelectionOnClick
                // onRowSelectionModelChange={onSelectedRowsChanged}
                onRowClick={(gridRowParams) => {
                    setClickedRowParams(gridRowParams)
                }}
            >
            </DataGridPro>
            <Modal
                open={modalObjectionOpen}
                onClose={() => setModalObjectionOpen(false)}>
                <Box sx={{...style, width: 400}}>
                    <h2 id="parent-modal-title">{'اعتراض به زمان ثبت شده'}</h2>
                    <Typography
                        variant={'p'}
                        component={'p'}
                    >
                        اگر به زمان ورود و خروج ثبت شده اعتراض دارید، با نوشتن توضیحات مربوطه به ثبت اعتراض اقدام
                        نمایید.
                    </Typography>
                    <Box sx={{py: 1}}>
                        <TextField
                            fullWidth
                            placeholder={'توضیحات'}
                            label={'توضیحات'}
                            autoFocus
                            multiline
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            minRows={4}
                            maxRows={5}
                        >
                        </TextField>
                    </Box>
                    <Button
                        onClick={(event) => sendObjection(event, clickedRowParams.row.id)}>
                        ارسال
                    </Button>


                </Box>
            </Modal>

        </>
    )

}

export default UserObjectionDataGrid;