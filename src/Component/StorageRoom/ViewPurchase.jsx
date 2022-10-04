import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './viewpurchase.scss';
import { FormControl, Icon, IconButton, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import ListRawMaterial from './ListRawMaterial';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';


function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}
  
const rows = [
    createData('Frozen yoghurt',24,"Cosmetic" ,  4.0),
    createData('Ice cream sandwich',37,"Cosmetic",   4.3),
    createData('Eclair',24,"Cosmetic" ,  6.0),
    createData('Cupcake',67,"Cosmetic" ,  4.3),    
];



export default function ViewProduct({handleClose}) {

    return (
    
    <Box className='view-purchase' >
        <Stack direction="row" spacing={5}>        
            <Typography className='header-title' variant="h6" >
                Product Detail
            </Typography>
            <Box sx={{flexGrow:1}}></Box>
            <IconButton onClick={() => handleClose()}>
                <DoDisturbOnOutlinedIcon sx={{color:"red"}}/>
            </IconButton>    
        </Stack>   

          
        <Stack direction="row" spacing={5} width="100%">
            <Typography variant='body2'>
                Number: PO#0002
            </Typography>            
        </Stack>         

        <Box className="container">
            
            <TableContainer >
                <Table className="table" aria-label="simple table">
                    <TableHead >
                        <TableRow className="header-row">
                            <TableCell className="header-title">Raw Materail</TableCell>  
                            <TableCell className="header-title" width="3%"></TableCell>                          
                            <TableCell className="header-title" align='center'>QTY</TableCell>  
                            <TableCell className="header-title" width="3%"></TableCell>  
                            <TableCell className="header-title" align='right'> </TableCell>                                                       
                        </TableRow>
                    </TableHead>

                    {rows.map((row , index) => (
                        <TableBody key={index} component={Paper} className="body" >                        
                            <TableRow  className="body-row">                                
                                <TableCell className="body-title" component="th" scope="row" > {row.name} </TableCell>
                                <TableCell className="header-title" width="3%"></TableCell>
                                <TableCell className="body-title" align='center'>{row.calories}Kg</TableCell>   
                                <TableCell className="header-title" width="3%"></TableCell> 
                                <TableCell className="body-title" ></TableCell>                                                   
                            </TableRow>
                        </TableBody>                        
                    ))}                        

                </Table>
            </TableContainer>

        </Box> 

        <Stack direction="row" spacing={1} sx={{mt:1}}>  
            <Box sx={{flexGrow:1}}></Box>
            <Typography variant='body1'>
                Total:
            </Typography>  
            <Typography variant='body1'>
                21.25$
            </Typography>   
        </Stack>

        <Stack direction="row" spacing={1} sx={{mt:2}}>  
            <Box sx={{flexGrow:1}}></Box>
            <Button variant="contained" color='error'>reject</Button>       
            <Button variant="contained">Approve</Button>
        </Stack>
        
        
        
    </Box>        
  );
}