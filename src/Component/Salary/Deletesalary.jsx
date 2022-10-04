import React, { useState } from "react";
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
// Icons
import CloseIcon from '@mui/icons-material/Close';
import './deletesalary.scss';
import { useMutation } from "@apollo/client";
// Schema
// import { DELETE_USER } from "../../Schema/User";

export default function DeleteUser({ handleCloseDelete, handleClose, setRefetch, setOpenSuccess, setOpenError, setSuccesstMessage, setErrorMessage, userId }) {

  // const [valueVoid, setValueVoid] = React.useState("");

  // Delete
//   const [deleteUser] = useMutation(DELETE_USER, {
//     onCompleted: ({ deleteUser }) => {
//       if (deleteUser?.status === true) {
//         setOpenSuccess(true);
//         setSuccesstMessage(deleteUser?.message);
//         setRefetch();
//         handleClose();
//       } else {
//         setOpenError(true);
//         setErrorMessage(deleteUser?.message);
//       }
//     },

//     onError: (error) => {
//       setOpenError(true);
//       setErrorMessage(error.message);
//     },
//   });

//   const handleDelete = () => {
//     deleteUser({
//       variables: {
//         deleteUserId: userId,
//       },
//     });
//   };

  return (
    <Box className="delete-salary">
      <Stack direction="row" spacing={5}>
        <Typography className='header-title' variant="h6">Delete Salary</Typography>
        <Box sx={{ flexGrow: 1 }}></Box>
        <IconButton><CloseIcon sx={{ color: "red" }} 
        onClick={handleCloseDelete} 
        /> </IconButton>
      </Stack>

      <Stack direction="row" spacing={5} width="100%" sx={{ padding: "10px 0px" }}>
        <Typography variant="subtitle1"> Do you want to Delete this Salary? </Typography>
      </Stack>

      <Stack direction="row">
        <Button fullWidth
        //  onClick={handleDelete}
          className="btn-delete">Delete</Button>
      </Stack>

    </Box>
  )
}