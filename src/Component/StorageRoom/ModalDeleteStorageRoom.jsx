import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import * as React from "react";
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import './modaldeletepurchaserawmaterial.scss';



export default function ModalDeleteStorageRoom({ handleClose }) {

    const [valueVoid, setValueVoid] = React.useState("");

    return (
        <Box className="delete-raw-material">
            <Stack direction="row" spacing={5}>
                <Typography className='header-title' variant="h6" >
                    Delete Storage Room
                </Typography>
                <Box sx={{ flexGrow: 1 }}></Box>
                <IconButton onClick={() => handleClose()}>
                    <DoDisturbOnOutlinedIcon sx={{ color: "red" }} />
                </IconButton>
            </Stack>

            <Stack direction="row" spacing={5} width="100%">
                <Typography variant="subtitle1" >
                    Do you want to void this room?
                </Typography>
            </Stack>

            <Stack direction="row" justifyContent="center" spacing={1} width="100%" sx={{ mt: 4 }}>
                <Typography variant="subtitle1">
                    Please type
                </Typography>
                <Typography className='body-void' variant="subtitle1" >
                    room
                </Typography>
                <Typography variant="subtitle1">
                    to void
                </Typography>
            </Stack>

            <Stack direction="row" justifyContent="center" spacing={1} width="100%" sx={{ mb: 4 }}>
                <TextField size="small" fullWidth onChange={(e) => setValueVoid(e.target.value)} />
            </Stack>

            <Stack direction="row" spacing={5} >
                {valueVoid === "ROOM" ?
                    <Button
                        sx={{ ":hover": { backgroundColor: "red", border: "none" } }}
                        className="btn-void"
                        variant="outlined"
                        fullWidth
                    >void now</Button>
                    :
                    <Button variant="outlined" fullWidth >void</Button>
                }

            </Stack>

        </Box>
    )
}