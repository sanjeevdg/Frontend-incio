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


function Sidebar() {

let navigate = useNavigate();


return (
<Grid item xs={2} md={2} sx={{display:'flex'}}>




 <List
      sx={{ width: '100%', maxWidth: 360, marginTop:6,marginLeft:2,bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"      
    >

    




      <ListItemButton onClick={() => navigate('/meetings')} sx={{marginBottom:2}}>
        
          <InsertInvitationOutlinedIcon />
        <Typography style={{fontSize:14,fontFamily:'AeonikBold',marginLeft:25}}>
        Meetings
        </Typography>
      </ListItemButton>
      <ListItemButton sx={{marginBottom:2}}>
        
          <SourceOutlinedIcon />
        <Typography style={{fontSize:14,fontFamily:'AeonikBold',marginLeft:25}}>
        Money</Typography>
      </ListItemButton>
      

<ListItemButton sx={{marginBottom:2}}>
          <PostAddOutlinedIcon />
        <Typography style={{fontSize:14,fontFamily:'AeonikBold',marginLeft:25}}>
        Contracts</Typography>
      </ListItemButton>
      

      <ListItemButton sx={{marginBottom:2}}>
        
          <Person2OutlinedIcon />
        <Typography style={{fontSize:14,fontFamily:'AeonikBold',marginLeft:25}}>
        Clients</Typography>
      </ListItemButton>
      


      </List>

</Grid>

);
}

export default Sidebar;