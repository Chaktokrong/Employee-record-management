import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuNavbarMobile from './MenuNavbarMobile';


export default function IconMenuResponsive() {

    const drawerWidth = 240;

    const [state, setState] = React.useState({ left: false });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };


    // Resize width
    const [width, setWidth] = React.useState(window.innerWidth);
    const updateDimensions = () => setWidth(window.innerWidth);

    React.useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);


    return (
        <>
            <div>

                <React.Fragment key={'left'}>

                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer('left', true)}
                        edge="start"
                        sx={{ display: width > 1400 ? 'none' : "block", borderRadius: "5px" }}
                    >                       
                        <MenuIcon sx={{color :"#0969A0" }}/>
                    </IconButton>

                    
                    <Drawer
                        anchor={'left'}
                        open={state['left']}
                        onClose={toggleDrawer('left', false)}
                    >
                        <Box
                            sx={{ width: drawerWidth }}
                            role="presentation"
                            onClick={toggleDrawer('left', false)}
                            onKeyDown={toggleDrawer('left', false)}
                        >

                            <MenuNavbarMobile />

                        </Box>
                    </Drawer>

                </React.Fragment>

            </div>
        </>
    )
}

