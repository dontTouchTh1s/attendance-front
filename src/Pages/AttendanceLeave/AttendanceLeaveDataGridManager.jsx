import {DataGridPro, GridColDef} from "@mui/x-data-grid-pro";
import React from "react";
import moment from "moment-jalaali";
import {Box, Button} from "@mui/material";
import "../../Theme/data-grid.css";

const columns: GridColDef = [
    {
        field: 'id', type: 'number', headerName: 'ردیف', headerAlign: 'left',
        align: 'left', width: '70'
    },
    {field: 'name', type: 'string', headerName: 'نام کارمند', headerAlign: 'left', minWidth: 150},
    {field: 'type', type: 'singleSelect', headerName: 'نوع', headerAlign: 'left', minWidth: 110},
    {
        field: 'createDate',
        type: 'date',
        headerName: 'تاریخ و زمان',
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
        field: "action",
        headerName: "عملیات",
        headerAlign: 'center',
        sortable: false,
        disableColumnMenu: true,
        minWidth: 160,
        renderCell: (params) => {
            return (
                <Box>
                    <Button>حذف</Button>
                </Box>
            );

        }
    }
]

function AttendanceLeaveDataGridManager({data}) {
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
                // onRowClick={(gridRowParams) => {
                //     setModalInfoOpen(true);
                //     setClickedRowParams(gridRowParams)
                // }}
            >
            </DataGridPro>
        </>
    )

}

export default AttendanceLeaveDataGridManager;