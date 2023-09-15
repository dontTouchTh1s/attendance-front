import {DataGridPro, GridColDef, GridLogicOperator} from "@mui/x-data-grid-pro";
import React, {useContext, useEffect, useState} from "react";
import {Box, Button, Modal} from "@mui/material";
import moment from "moment-jalaali";
import Api from "../../Api";
import {styled} from "@mui/material/styles";
import {abs} from "stylis";
import UserContext from "../../Contexts/UserContext";


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

const StyledDataGrid = styled(DataGridPro)(({theme}) => ({
    '& .app-theme-different--0': {
        backgroundColor: 'rgba(248, 45, 45, 0.7)',
        '&:hover': {
            backgroundColor: 'rgba(248, 45, 45, 0.8)',
        }
    },
    '& .app-theme-different--1': {
        backgroundColor: 'rgba(248, 45, 45, 0.6)',
        '&:hover': {
            backgroundColor: 'rgba(248, 45, 45, 0.7)',
        }
    },
    '& .app-theme-different--2': {
        backgroundColor: 'rgba(248, 45, 45, 0.5)',
        '&:hover': {
            backgroundColor: 'rgba(248, 45, 45, 0.6)',
        }
    },
    '& .app-theme-different--3': {
        backgroundColor: 'rgba(248, 45, 45, 0.4)',
        '&:hover': {
            backgroundColor: 'rgba(248, 45, 45, 0.5)',
        }
    },
    '& .app-theme-different--4': {
        backgroundColor: 'rgba(248, 45, 45, 0.3)',
        '&:hover': {
            backgroundColor: 'rgba(248, 45, 45, 0.4)'
        }
    },
    '& .app-theme-different--5': {
        backgroundColor: 'rgba(248, 45, 45, 0.2)',
        '&:hover': {
            backgroundColor: 'rgba(248, 45, 45, 0.3)',
        }
    },
    '& .app-theme-different--6': {
        backgroundColor: 'rgba(248, 45, 45, 0.1)',
        '&:hover': {
            backgroundColor: 'rgba(248, 45, 45, 0.2)',
        }
    },
    '& .app-theme-different--7': {
        backgroundColor: 'rgba(248, 45, 45, 0.08)',
        '&:hover': {
            backgroundColor: 'rgba(248, 45, 45, 0.18)',
        }
    },
    '& .app-theme-different--8': {
        backgroundColor: 'rgba(248, 45, 45, 0.06)',
        '&:hover': {
            backgroundColor: 'rgba(248, 45, 45, 0.16)',
        }
    },
    '& .app-theme-different--9': {
        backgroundColor: 'rgba(248, 45, 45, 0.04)',
        '&:hover': {
            backgroundColor: 'rgba(248, 45, 45, 0.14)',
        }
    },
}));

function RequestsDataGrid({onSelectedRowsChanged, filters, data, onModifyRequest}) {
    const [modalInfoOpen, setModalInfoOpen] = useState(false);
    const [filterModel, setFilterModel] = useState({items: []});
    const [clickedRowParams, setClickedRowParams] = useState({row: {}});
    const user = useContext(UserContext);

    useEffect(() => {
        // Convert type to persian text
        // eslint-disable-next-line default-case

        let newFilterModel = {
            items: [],
            logicOperator: GridLogicOperator.And,
        }

        if (filters.type !== 'all') {
            newFilterModel.items.push({id: 1, field: 'type', operator: 'is', value: filters.type});
        }

        if (filters.status !== 'all') {
            newFilterModel.items.push({id: 1, field: 'status', operator: 'is', value: filters.status});
        }

        if (filters.name !== '') {
            newFilterModel.items.push({id: 2, field: 'name', operator: 'contains', value: filters.name});
        }

        if (filters.createDate[0] !== null && filters.createDate[1] !== null) {
            newFilterModel.items.push({
                id: 3, field: 'createDate', operator: 'onOrAfter',
                value: filters.createDate[0].locale('en_US').format('YYYY-MM-DD')
            });
            newFilterModel.items.push({
                id: 4, field: 'createDate', operator: 'onOrBefore',
                value: filters.createDate[1].locale('en_US').format('YYYY-MM-DD')
            });
        }

        if (filters.leaveDate[0] !== null && filters.leaveDate[1] !== null) {
            newFilterModel.items.push({
                id: 3, field: 'leaveDate', operator: 'onOrAfter',
                value: filters.leaveDate[0].locale('en_US').format('YYYY-MM-DD')
            });
            newFilterModel.items.push({
                id: 4, field: 'leaveDate', operator: 'onOrBefore',
                value: filters.leaveDate[1].locale('en_US').format('YYYY-MM-DD')
            });
        }

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
            // handle successful response
        } catch (error) {

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
        {
            field: 'type', type: 'singleSelect', headerName: 'نوع', headerAlign: 'left', minWidth: 110,
            valueFormatter: (params) => {
                switch (params.value) {
                    case 'paid':
                        return 'استحقاقی'
                        break;
                    case 'sick':
                        return 'استعلاجی'
                        break;
                    default:
                        return 'مقدار نامعبر'
                        break;
                }
            },
        },
        {
            field: 'createDate',
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
            field: 'status',
            type: 'singleSelect',
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
                        <Button
                            disabled={user.current.navBarUser.roll === 'manager' && params.row.status !== 'pending'}>تایید</Button>
                        <Button
                            disabled={user.current.navBarUser.roll === 'manager' && params.row.status !== 'pending'}
                            color={'error'}
                            onClick={(event) => acceptDeclineRequest(event, params.id, 'declined')}>رد</Button>
                    </Box>
                );

            }
        }
    ];

    return (
        <>
            <StyledDataGrid
                sx={{height: 420}}
                initialState={{
                    sorting: {
                        sortModel: [{field: 'leaveFromDate', sort: 'asc'}],
                    },
                }}
                {...data}
                getRowClassName={(params) => {
                    let momentDate = moment(params.row.leaveFromDate);
                    let now = moment();
                    let diff = abs(momentDate.diff(now, 'days'));
                    return `app-theme-different--${diff}`;
                }}
                columns={columns}
                checkboxSelection
                filterModel={filterModel}
                onFilterModelChange={(model) => {
                    setFilterModel(model)
                }}
                disableRowSelectionOnClick
                onRowSelectionModelChange={onSelectedRowsChanged}
                onRowClick={(gridRowParams) => {
                    setModalInfoOpen(true);
                    setClickedRowParams(gridRowParams)
                }}
            >
            </StyledDataGrid>
            <Modal
                open={modalInfoOpen}
                onClose={() => setModalInfoOpen(false)}>
                <Box sx={{...style, width: 400}}>
                    <h2 id="parent-modal-title">{'جزییات در خواست'}</h2>
                    <p id="parent-modal-description">
                        {clickedRowParams.row.description}
                    </p>
                    <Button
                        disabled={user.current.navBarUser.roll === 'manager' && clickedRowParams.row.status !== 'pending'}
                        onClick={(event) => acceptDeclineRequest(event, clickedRowParams.row.id, 'accepted')}>تایید
                    </Button>
                    <Button
                        disabled={user.current.navBarUser.roll === 'manager' && clickedRowParams.row.status !== 'pending'}
                        color={'error'}
                        onClick={(event) => acceptDeclineRequest(event, clickedRowParams.row.id, 'declined')}>رد
                    </Button>
                </Box>
            </Modal>
        </>
    )
}

export default RequestsDataGrid;
