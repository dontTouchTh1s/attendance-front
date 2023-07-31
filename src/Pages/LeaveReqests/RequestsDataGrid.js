import {DataGridPro, GridColDef, GridLogicOperator} from "@mui/x-data-grid-pro";
import React, {useEffect, useState} from "react";
import {Box, Button, Modal} from "@mui/material";
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


function RequestsDataGrid({onSelectedRowsChanged, filters, data, onModifyRequest}) {
    const [modalInfoOpen, setModalInfoOpen] = useState(false);
    const [filterModel, setFilterModel] = useState({items: []});
    const [clickedRowParams, setClickedRowParams] = useState({row: {}});
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
            console.log('not null')
            newFilterModel.items.push({
                id: 3, field: 'createDate', operator: 'onOrAfter',
                value: filters.createDate[0].locale('en_US').format('jYYYY-jMM-jDD')
            });
            newFilterModel.items.push({
                id: 4, field: 'createDate', operator: 'onOrBefore',
                value: filters.createDate[1].locale('en_US').format('jYYYY-jMM-jDD')
            });
        }
        console.log(filters.createDate)
        console.log(newFilterModel);
        setFilterModel(newFilterModel);
    }, [filters.createDate, filters.name, filters.toDate, filters.type, filters]);

    async function acceptDeclineRequest(e, id, status) {
        e.stopPropagation();
        let row = {
            status: status
        };
        let data = {
            rows: row,
        };

        try {
            const response = await Api.post('/requests/' + id, {...data, _method: 'patch'});
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
        setModalInfoOpen(false);
        onModifyRequest();
    }

    const columns: GridColDef = [
        {
            field: 'id', type: 'number', headerName: 'ردیف', headerAlign: 'left',
            align: 'left', width: '70'
        },
        {field: 'name', type: 'string', headerName: 'نام', headerAlign: 'left', minWidth: 150},
        {field: 'type', type: 'singleSelect', headerName: 'نوع', headerAlign: 'left', minWidth: 110},
        {
            field: 'createDate',
            type: 'date',
            headerName: 'تاریخ ثبت',
            headerAlign: 'left',
            minWidth: 120,
            sortable: true,
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
            field: 'leaveFromDate',
            type: 'date',
            headerName: 'مرخصی از تاریخ',
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
            field: 'leaveToDate',
            type: 'date',
            headerName: 'مرخصی تا تاریخ',
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
            field: 'stauts',
            type: 'string',
            headerName: 'وضعیت',
            headerAlign: 'left',
            minWidth: 120,
            valueFormatter: (params) => {
                switch (params.value) {
                    case 'pending':
                        return 'در حال بررسی'
                        break;
                    case 'accepted':
                        return 'تایید شده'
                        break;
                    case 'declined':
                        return 'رد شده'
                        break;
                    default:
                        return 'مقدار نامعبر'
                        break;

                }
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
                return (
                    <Box sx={{width: '100%'}}>
                        <Button>تایید</Button>
                        <Button
                            color={'error'}
                            onClick={(event) => acceptDeclineRequest(event, params.id, 'declined')}>رد</Button>
                    </Box>
                );

            }
        }
    ];

    return (
        <>
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
                onRowClick={(gridRowParams) => {
                    setModalInfoOpen(true);
                    setClickedRowParams(gridRowParams)
                }}
            >
            </DataGridPro>

            <Modal
                open={modalInfoOpen}
                onClose={() => setModalInfoOpen(false)}>
                <Box sx={{...style, width: 400}}>
                    <h2 id="parent-modal-title">{'جزییات در خواست'}</h2>
                    <p id="parent-modal-description">
                        {clickedRowParams.row.description}

                    </p>
                    <Button
                        onClick={(event) => acceptDeclineRequest(event, clickedRowParams.row.id, 'accepted')}>تایید
                    </Button>
                    <Button
                        color={'error'}
                        onClick={(event) => acceptDeclineRequest(event, clickedRowParams.row.id, 'declined')}>رد
                    </Button>
                </Box>
            </Modal>
        </>
    )
}

export default RequestsDataGrid;
