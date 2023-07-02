import {DataGridPro, GridApi, GridColDef, GridLogicOperator} from "@mui/x-data-grid-pro";
import React, {useEffect, useState} from "react";
import {Box, Button, Modal, TextField, ThemeProvider} from "@mui/material";
import {theme} from '../../Theme/rtl-theme'
import RTL from "../../Theme/RTL";
import moment from "moment-jalaali";
import Api from "../../Api";


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


function RequestsDataGrid({onSelectedRowsChanged, filters, data}) {
    const [modalInfoOpen, setModalInfoOpen] = useState(false);
    const [acceptLeaveRequestModal, setAcceptLeaveRequestModal] = useState(false);
    const [filterModel, setFilterModel] = useState({items: []});
    const [currentRequest, setCurrentRequest] = useState();

    async function handleChangeStatus(id, status) {
        setCurrentRequest(id);
        if (status === 'accepted') {
            setAcceptLeaveRequestModal(true);
            try {
                const data = new FormData();
                data.append('id', id);
                data.append('status', status);
                data.append('_method', 'patch')
                await Api.post('/requests/update', data);
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
        }
    }

    const columns: GridColDef = [
        {
            field: 'id', type: 'number', headerName: 'ردیف', headerAlign: 'left',
            align: 'left', width: '70'
        },
        {field: 'name', type: 'string', headerName: 'نام', headerAlign: 'left', minWidth: 150},
        {field: 'type', type: 'singleSelect', headerName: 'نوع', headerAlign: 'left', minWidth: 110},
        {
            field: 'create-date',
            type: 'date',
            headerName: 'تاریخ ثبت',
            headerAlign: 'left',
            minWidth: 120,
            valueGetter: (params) => {
                return new Date(params.value);
            },
            valueFormatter: (params) => {
                moment.loadPersian({dialect: 'persian-modern', usePersianDigits: true});
                let date = moment(params.value)
                    .format("jYYYY-jMM-jDD");
                moment.loadPersian({dialect: 'persian-modern', usePersianDigits: false});
                return date;

            },
        },
        {
            field: 'leave-date',
            type: 'date',
            headerName: 'تاریخ مرخصی',
            headerAlign: 'left',
            minWidth: 120,
            valueGetter: (params) => {
                let dates = JSON.parse(params.value);
                return new Date(dates[0]);
            },
            valueFormatter: (params) => {
                moment.loadPersian({dialect: 'persian-modern', usePersianDigits: true});
                let date = moment(params.value)
                    .format("jYYYY-jMM-jDD");
                moment.loadPersian({dialect: 'persian-modern', usePersianDigits: false});
                return date;

            },
        },
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
                        <Button onClick={() => handleChangeStatus(params.id, 'accepted')}>تایید</Button>
                        <Button onClick={() => handleChangeStatus(params.id, 'declined')}>رد</Button>
                    </Box>
                );

            }
        }
    ];


    useEffect(() => {
        let type;
        // Convert type to persian text
        // eslint-disable-next-line default-case
        switch (filters.type) {
            case 0:
                type = 'همه';
                break;
            case 1:
                type = 'استحقاقی';
                break;
            case 2:
                type = 'استعلاجی';
                break;
            case 3:
                type = 'بدون حقوق';
                break;
        }
        let newFilterModel = {
            items: [],
            logicOperator: GridLogicOperator.And,
        }

        if (filters.type !== 0) {
            newFilterModel.items.push({id: 1, field: 'type', operator: 'is', value: type});
        }
        if (filters.name !== '') {
            newFilterModel.items.push({id: 2, field: 'name', operator: 'contains', value: filters.name});
        }

        if (filters.createDate[0] !== null && filters.createDate[1] !== null) {
            newFilterModel.items.push({
                id: 3, field: 'create-date', operator: 'onOrAfter',
                value: filters.createDate[0].locale('en_US').format('YYYY-MM-DD')
            });
            newFilterModel.items.push({
                id: 4, field: 'create-date', operator: 'onOrBefore',
                value: filters.createDate[1].locale('en_US').format('YYYY-MM-DD')
            });
        }
        if (filters.leaveDate[0] !== null && filters.leaveDate[1] !== null) {
            newFilterModel.items.push({
                id: 5, field: 'leave-date', operator: 'onOrAfter',
                value: filters.leaveDate[0].locale('en_US').format('YYYY-MM-DD')
            });
            newFilterModel.items.push({
                id: 6, field: 'leave-date', operator: 'onOrBefore',
                value: filters.leaveDate[1].locale('en_US').format('YYYY-MM-DD')
            });
        }

        setFilterModel(newFilterModel);
    }, [filters.createDate, filters.group, filters.name, filters.leaveDate, filters.type]);

    return (
        <ThemeProvider theme={theme}>
            <RTL>
                <DataGridPro
                    {...data}
                    columns={columns}
                    checkboxSelection
                    filterModel={filterModel}
                    onFilterModelChange={(model) => {
                        setFilterModel(model)
                    }}
                    disableRowSelectionOnClick
                    sx={{}}
                    onRowSelectionModelChange={onSelectedRowsChanged}
                    onRowClick={() => setModalInfoOpen(true)}

                >
                </DataGridPro>
                <Modal
                    open={modalInfoOpen}
                    onClose={() => setModalInfoOpen(false)}>
                    <Box sx={{...style, width: 400}}>
                        <h2 id="parent-modal-title">Text in a modal</h2>
                        <p id="parent-modal-description">
                            this is test modal description

                        </p>
                    </Box>
                </Modal>
                <Modal
                    open={modalInfoOpen}
                    onClose={() => setModalInfoOpen(false)}>
                    <Box sx={{...style, width: 400}}>
                        <h2 id="parent-modal-title">Text in a modal</h2>
                        <p id="parent-modal-description">
                            this is test modal description

                        </p>
                    </Box>
                </Modal>
                <Modal
                    open={acceptLeaveRequestModal}
                    onClose={() => setAcceptLeaveRequestModal(false)}>
                    <Box sx={{...style, width: 400}}>
                        <h2 id="parent-modal-title">Text in a modal</h2>
                        <p id="parent-modal-description">
                            this is test modal description

                        </p>
                        <TextField
                            multiline></TextField>
                    </Box>
                </Modal>
            </RTL>
        </ThemeProvider>
    )
}

export default RequestsDataGrid;
