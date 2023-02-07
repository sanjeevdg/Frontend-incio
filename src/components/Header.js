import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { firebase, auth } from '../config/firebase-config';
import {useNavigate} from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
//import Scrollbar from '@mui/material/Scrollbar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';

import ListItem from '@mui/material/ListItem';
import FormControl from '@mui/material/FormControl';

import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';

import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';

import InsertInvitationOutlinedIcon from '@mui/icons-material/InsertInvitationOutlined';
import SourceOutlinedIcon from '@mui/icons-material/SourceOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';

//import { app } from '../config/firebase-config';
import toast, { Toaster } from 'react-hot-toast';
import { set, sub } from 'date-fns';


function Header() {


let navigate = useNavigate();

const [anchorEl, setAnchorEl] = React.useState(null);
  const divRef = React.useRef();
  function handleClick() {
    setAnchorEl(divRef.current);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;



  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const divRef2 = React.useRef();
  function handleClick2() {
    setAnchorEl2(divRef2.current);
  }

  function handleClose2() {
    setAnchorEl2(null);
  }

  const open2 = Boolean(anchorEl2);
  const id2 = open2 ? "simple-popover" : undefined;


const MENU_OPTIONS = [
  {
    label: 'Account',
    icon: 'eva:home-fill',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
  },
];




  return (

<React.Fragment>
<Grid item xs={2}>
<Typography sx={{marginLeft:4,marginTop:2,fontSize:22,fontFamily:'AeonikBold'}}>incio.io</Typography>
</Grid>
<Grid item xs={10} sx={{}}>
<Typography onClick={() => navigate('/dashboard')} sx={{fontSize:15,fontFamily:'AeonikBold',mt:2.5}}>| Dashboard</Typography>





<Box sx={{display:'flex',justifyContent:'flex-end',marginRight:4,marginTop:-3}}>
  <div ref={divRef2}>
      <IconButton aria-describedby={id2} color={open ? 'primary' : 'default'} onClick={handleClick2} sx={{ width: 40, height: 40 }}>
<Badge badgeContent={3} color="error"><NotificationsNoneOutlinedIcon sx={{marginTop:0.5}}/></Badge>
</IconButton>
<Popover
        id={id2}
        open={Boolean(open2)}
        onClose={handleClose2}
        anchorEl={anchorEl2}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            Welcome,..
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {'email,phone here'}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleClose} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
</div>

<div ref={divRef}>
<Button  aria-describedby={id} >
      <Avatar alt="Remy Sharp" onClick={() => handleClick()} sx={{width:25,height:25,borderRadius:10}} 
src={require('../assets/images/avatar.png')} />
       </Button>
<Popover
        id={id}
        open={Boolean(open)}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
       
        <Stack sx={{ p: 1 }}>
          
            <MenuItem key='account' onClick={handleClose}>
              <Person2OutlinedIcon sx={{marginLeft:-1}}/>&emsp;Account
            </MenuItem>
            <MenuItem key='settings' onClick={handleClose}>
              <SettingsOutlinedIcon sx={{marginLeft:-1}}/>&emsp;Settings
            </MenuItem>
            <MenuItem key='logout' onClick={handleClose}>
              <PowerSettingsNewOutlinedIcon sx={{marginLeft:-1}}/>&emsp;Logout
            </MenuItem>

        </Stack>

       </Popover>
</div>


</Box>

</Grid>
</React.Fragment>



  	); 
}

export default Header;