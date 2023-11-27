import {Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Modal} from "@mui/material";
import {useEffect, useState} from "react";
import Pagination from '@mui/material/Pagination';
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import './focused-element.css';
import {theme} from "../../Theme/rtl-theme";

function Guide({guidesName, children, refs = null, poses = null}) {
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [height, setHeight] = useState(0);
    const [rects, setRects] = useState([]);

    useEffect(() => {
        const guideShow = Boolean(localStorage.getItem('guideShow') ?? true);
        let currentPage = localStorage.getItem(guidesName);
        if (currentPage) {
            currentPage = parseInt(currentPage)
            setOpen(guideShow && currentPage < children.length);
        } else {
            currentPage = 1;
            localStorage.setItem(guidesName, 1)
            setOpen(true);
        }

        setPage(currentPage);


        if (refs) {
            setRects(refs.current.map(ref => ref.getBoundingClientRect()));
            setHeight(refs.current[currentPage - 1].offsetHeight);
            setHeight(0);
            refs.current[currentPage - 1].style.zIndex = theme.zIndex.modal + 1;
            refs.current[currentPage - 1].style.backgroundColor = 'white';
        }
    }, [guidesName, refs]);


    function handleChange(e, value) {
        if (refs) {
            refs.current[page - 1].style.zIndex = 'unset';
            refs.current[page - 1].style.backgroundColor = 'inherit';
            refs.current[value - 1].style.zIndex = theme.zIndex.modal + 1;
            refs.current[value - 1].style.backgroundColor = 'white';
        }
        setPage(value);
        if (value > localStorage.getItem(guidesName))
            localStorage.setItem(guidesName, value);
    }


    function handleCheckBox(e) {
        localStorage.setItem('guideShow', !e.target.checked);
    }

    const style = {
        right: poses ? '50%' : rects[page - 1] ? rects[page - 1].right : 0,
        top: poses ? '50%' : rects[page - 1] ? rects[page - 1].bottom : 0,
        transform: 'translateY(-50%) translateX(50%)'

    }

    return (
        <>
            <Dialog
                sx={{
                    '.MuiDialog-container': {
                        position: 'absolute',
                        ...style,
                        height: 'auto',
                        transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, 350ms !important'
                    },
                    '.MuiDialog-paper': {
                        borderRadius: 6
                    }
                }}
                open={open}
                onClose={() => setOpen(false)}>
                <DialogTitle>
                    راهنما
                </DialogTitle>
                <IconButton
                    onClick={() => setOpen(false)}
                    size={'small'}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}>
                    <CloseIcon/>
                </IconButton>

                <DialogContent dividers>
                    {children[page - 1]}
                </DialogContent>

                <DialogActions sx={{
                    flexDirection: 'column'
                }}>
                    <FormControlLabel
                        sx={{alignSelf: 'start'}}
                        control={<Checkbox
                            onChange={handleCheckBox}
                        />} label="دیگر نشان نده"/>
                    <Pagination
                        onChange={handleChange}
                        count={children.length}
                        size={'small'}
                        page={page}
                    />
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Guide;