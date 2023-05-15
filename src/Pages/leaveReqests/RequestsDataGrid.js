import {DataGridPro, GridApi, GridColDef, GridLogicOperator} from "@mui/x-data-grid-pro";
import React, {useEffect, useState} from "react";
import {Box, Button, Modal, ThemeProvider} from "@mui/material";
import {theme} from '../../theme/rtl-theme'
import RTL from "../../theme/RTL";

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

const columns: GridColDef = [
    {
        field: 'id', type: 'number', headerName: 'ردیف', headerAlign: 'left',
        align: 'left', width: '70'
    },
    {field: 'name', type: 'string', headerName: 'نام', headerAlign: 'left', minWidth: 150},
    {field: 'type', type: 'singleSelect', headerName: 'نوع', headerAlign: 'left', minWidth: 110},
    {
        field: 'date',
        type: 'date',
        headerName: 'تاریخ',
        headerAlign: 'left',
        minWidth: 120,
        valueGetter: (params) => {
            return new Date(params.value);
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
                    <Button onClick={onClick}>تایید</Button>
                    <Button onClick={onClick}>رد</Button>
                </Box>
            );

        }
    }
];


function RequestsDataGrid({onSelectedRowsChanged, filters, data}) {
    const [modalInfoOpen, setModalInfoOpen] = useState(false);
    const [filterModel, setFilterModel] = useState({items: []});
    useEffect(() => {
        let type;
        // eslint-disable-next-line default-case
        // Convert type to persian text
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

        if (filters.fromDate !== null) {
            newFilterModel.items.push({
                id: 3, field: 'date', operator: 'onOrAfter',
                value: filters.fromDate.locale('en_US').format('YYYY-MM-DD')
            });
        }
        if (filters.toDate !== null) {
            newFilterModel.items.push({
                id: 4, field: 'date', operator: 'onOrBefore',
                value: filters.toDate.locale('en_US').format('YYYY-MM-DD')
            });
        }
        setFilterModel(newFilterModel);
    }, [filters.fromDate, filters.group, filters.name, filters.toDate, filters.type]);


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
                        console.log(model)
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
            </RTL>
        </ThemeProvider>
    )
}

export default RequestsDataGrid;
