import {createTheme} from "@mui/material/styles";
import {faIR} from "@mui/material/locale";
import {faIR as dataGridFaIR} from "@mui/x-data-grid";

export const theme = createTheme(
    {
        palette: {
            unImportant: {
                main: '#646464',
                contrastText: '#eeeeee',

            }
        },
        typography: {
            fontFamily: [
                "'Vazirmatn', sans-serif"
            ]
        },
        direction: 'rtl',

    },
    faIR,
    dataGridFaIR
);