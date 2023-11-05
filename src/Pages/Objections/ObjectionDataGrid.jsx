import {DataGridPro, GridColDef} from "@mui/x-data-grid-pro";
import React, {useState} from "react";
import moment from "moment-jalaali";
import {Box, Button, Container, Modal, Paper, TextField, Typography} from "@mui/material";
import Api from "../../Api";
import Grid from "@mui/material/Unstable_Grid2";
import "../../Theme/data-grid.css";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};


function ObjectionDataGrid({data, onModifyObjection}) {
    const [modalObjectionOpen, setModalObjectionOpen] = useState(false);
    const [clickedRowParams, setClickedRowParams] = useState({row: {}});
    const [objectionFeedback, setObjectionFeedback] = useState('');

    function checkObjection() {
        setModalObjectionOpen(true);
    }

    const columns: GridColDef = [
        {
            field: 'id', type: 'number', headerName: 'ردیف', headerAlign: 'left',
            align: 'left', width: '70'
        },
        {
            field: 'employee_name', type: 'string', headerName: 'نام کارمند', headerAlign: 'left',
            align: 'left', minWidth: 150
        },
        {
            field: 'type', type: 'singleSelect', headerName: 'نوع', headerAlign: 'left', minWidth: 110,
            valueFormatter: (params) => {
                let type = params.value;
                // eslint-disable-next-line default-case
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
            field: 'description', type: 'string', headerName: 'توضیحات', headerAlign: 'left',
            align: 'left', minWidth: 300
        },
        {
            field: "action",
            headerName: "بررسی",
            headerAlign: 'center',
            sortable: false,
            disableColumnMenu: true,
            minWidth: 160,
            renderCell: (params) => {
                return (

                    <Button
                        fullWidth
                        color={'secondary'}
                        onClick={(event) => checkObjection(event, params.id, 'declined')}>
                        بررسی
                    </Button>

                );

            }
        }
    ]

    async function modifyObjection(event, id) {

        let data = {
            'feedback': objectionFeedback,
        };

        try {
            const response = await Api.post('/objections/' + id, {...data, _method: 'patch'});
            // handle successful response
        } catch (error) {

        }
        setObjectionFeedback('');
        onModifyObjection();
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
                    setClickedRowParams(gridRowParams);
                    setModalObjectionOpen(true);
                }}
            >
            </DataGridPro>
            <Modal
                open={modalObjectionOpen}
                onClose={() => setModalObjectionOpen(false)}>
                <Box sx={{...style}} minWidth={'md'} maxWidth={'md'}>
                    <h2 id="parent-modal-title">{'بررسی اعتراض'}</h2>
                    <Typography
                        variant={'p'}
                        component={'p'}
                    >
                        با توجه به زمان ثبت شده و اعتراض ثبت شده توسط کارمند میتوانید اقدامتی انجام دهید.
                    </Typography>
                    <Container disableGutters sx={{py: 1}}>
                        <Grid container spacing={1}>
                            <Grid xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    minRows={3}
                                    inputProps={
                                        {readOnly: true,}
                                    }
                                    label={'متن اعتراض'}
                                    value={clickedRowParams.row.description}>
                                </TextField>
                            </Grid>
                            <Grid xs={12}>
                                <Typography
                                    variant={'p'}
                                    component={'p'}
                                >
                                    باز خورد خود را به اعتراض بنویسید.
                                </Typography>
                            </Grid>
                            <Grid xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    minRows={3}
                                    label={'باز خورد'}
                                    onChange={(e) => setObjectionFeedback(e.target.value)}
                                    value={objectionFeedback}>
                                </TextField>
                            </Grid>
                        </Grid>
                    </Container>
                    <Button
                        onClick={(event) => modifyObjection(event, clickedRowParams.row.id)}>
                        ارسال
                    </Button>


                </Box>
            </Modal>

        </>
    )

}

export default ObjectionDataGrid;