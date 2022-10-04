import React, { useState } from "react";
import {
    Stack,
    Grid,
    Box,
    Button,
    Typography,
    TextField,
    FormControl,
    Select,
    MenuItem,
    IconButton,
    InputAdornment,
    Autocomplete,
    CircularProgress,

} from "@mui/material";
import "./createsalary.scss";

// Formik
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";

// Icons
import CloseIcon from '@mui/icons-material/Close';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';


// Dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutation } from "@apollo/client";

//schema
// import { CREATE_EMPLOYEE } from "../../Schema/Employee";


function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}


export default function CreateSalary({ open, handleClose, setOpenSuccess, setOpenError, setSuccesstMessage, setErrorMessage }) {

    const [openAutucomplete, setOpenAutucomplete] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = openAutucomplete && options.length === 0;


    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            await sleep(1e3); // For demo purposes.

            if (active) {
                setOptions([...topFilms]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!openAutucomplete) {
            setOptions([]);
        }
    }, [openAutucomplete]);



    //formik
    //   const AddEmployee = Yup.object().shape({
    //   
    //   })

    const formik = useFormik({
        initialValues: {

        },

        // validationSchema: AddEmployee,
        onSubmit: (values) => {
            // console.log(values, ":::: values");
            // createsalary({
            //   variables: {
            //     input: {
            //       ...newsalary,
            //     },
            //   },
            // })
        }
    });

    const {
        errors,
        touched,
        handleSubmit,
        getFieldProps,
        setFieldValue,
        values,
    } = formik;

    const topFilms = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },
        { title: '12 Angry Men', year: 1957 },
        { title: "Schindler's List", year: 1993 },
        { title: 'Pulp Fiction', year: 1994 },
        {
            title: 'The Lord of the Rings: The Return of the King',
            year: 2003,
        },
        { title: 'The Good, the Bad and the Ugly', year: 1966 },
        { title: 'Fight Club', year: 1999 },
        {
            title: 'The Lord of the Rings: The Fellowship of the Ring',
            year: 2001,
        },
        {
            title: 'Star Wars: Episode V - The Empire Strikes Back',
            year: 1980,
        },
        { title: 'Forrest Gump', year: 1994 },
        { title: 'Inception', year: 2010 },
        {
            title: 'The Lord of the Rings: The Two Towers',
            year: 2002,
        },
        { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
        { title: 'Goodfellas', year: 1990 },
        { title: 'The Matrix', year: 1999 },
        { title: 'Seven Samurai', year: 1954 },
        {
            title: 'Star Wars: Episode IV - A New Hope',
            year: 1977,
        },
        { title: 'City of God', year: 2002 },
        { title: 'Se7en', year: 1995 },
        { title: 'The Silence of the Lambs', year: 1991 },
        { title: "It's a Wonderful Life", year: 1946 },
        { title: 'Life Is Beautiful', year: 1997 },
        { title: 'The Usual Suspects', year: 1995 },
        { title: 'Léon: The Professional', year: 1994 },
        { title: 'Spirited Away', year: 2001 },
        { title: 'Saving Private Ryan', year: 1998 },
        { title: 'Once Upon a Time in the West', year: 1968 },
        { title: 'American History X', year: 1998 },
        { title: 'Interstellar', year: 2014 },
    ];

    return (
        <Dialog open={open} className="dialog-salary">
            <DialogTitle>
                <Stack direction="row" justifyContent="right">
                    <IconButton onClick={handleClose}>
                        <CloseIcon sx={{ color: "red" }} />
                    </IconButton>
                </Stack>

                <Stack direction="row" className="stack" justifyContent="center">
                    <Typography className="header-title" direction="row" justifyContent="center">
                        Create Salary
                    </Typography>
                </Stack>
            </DialogTitle>

            <DialogContent>
                <DialogContentText id="alert-dialog-title">
                    <FormikProvider value={formik}>
                        <Form noValidate onSubmit={handleSubmit}>
                            <Box className="create-salary">
                                <Grid item container spacing={3}>
                                    <Grid item xs={6} md={6}>
                                        <Typography className="header-body" variant="body1"> Employee Name </Typography>

                                        {/* <FormControl fullWidth size="small">
                                            <Select
                                                defaultValue="Select Employee Name"
                                                // {...getFieldProps("gender")}
                                                displayEmpty
                                            >
                                                <MenuItem disabled value="">
                                                    <em style={{ color: "rgb(0 0 0 / 40%)", fontWeight: "100", }}>Select any name.</em>
                                                </MenuItem>
                                                <MenuItem value="Male">
                                                    <Typography>Theang Rathana</Typography>
                                                </MenuItem>
                                            </Select>
                                        </FormControl> */}

                                        <Autocomplete
                                            id="asynchronous-demo"
                                            size="small"
                                            openAutucomplete={openAutucomplete}
                                            onOpen={() => {
                                                setOpenAutucomplete(true);
                                            }}
                                            onClose={() => {
                                                setOpenAutucomplete(false);
                                            }}
                                            isOptionEqualToValue={(option, value) => option.title === value.title}
                                            getOptionLabel={(option) => option.title}
                                            options={options}
                                            loading={loading}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    placeholder="Select employee name"
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        endAdornment: (
                                                            <React.Fragment>
                                                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                                {params.InputProps.endAdornment}
                                                            </React.Fragment>
                                                        ),
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>

                                    <Grid item xs={6} md={6}>
                                        <Typography className="header-body" variant="body1"> Base salary </Typography>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            disabled
                                            placeholder="Empty base salary"
                                            // {...getFieldProps("first_Name_kh")}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="start">
                                                        <AttachMoneyIcon sx={{ fontSize: "1.3em", marginRight: "-20px" }} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        <Typography className="header-body" variant="body1">Working days</Typography>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            disabled
                                            placeholder="Empty working days"
                                        // {...getFieldProps("first_Name_kh")}
                                        />
                                    </Grid>

                                    <Grid item xs={6} md={6}>
                                        <Typography className="header-body" variant="body1"> Bonus </Typography>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            placeholder="Bonus"
                                            // {...getFieldProps("first_Name_kh")}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="start">
                                                        <AttachMoneyIcon sx={{ fontSize: "1.3em", marginRight: "-20px" }} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={6} md={6}>
                                        <Typography className="header-body" variant="body1"> Over Times </Typography>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            placeholder="Over Times"
                                        // {...getFieldProps("first_Name_kh")}
                                        // error={Boolean(touched.first_Name_kh && errors.first_Name_kh)}
                                        // helperText={touched.first_Name_kh && errors.first_Name_kh}
                                        />
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        <Typography className="header-body" variant="body1"> Last salary </Typography>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            disabled
                                            placeholder="Empty last salary"
                                            // {...getFieldProps("first_Name_kh")}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="start">
                                                        <AttachMoneyIcon sx={{ fontSize: "1.3em", marginRight: "-20px" }} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>

                                </Grid>

                                <DialogActions>
                                    <Box className="action-button">
                                        <Grid item container spacing={4}>
                                            <Grid item xs={12}>
                                                <Button className="btn-create" onClick={handleSubmit}>Create</Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </DialogActions>
                            </Box>
                        </Form>
                    </FormikProvider>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
}