import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { firebase, auth } from '../config/firebase-config';
import {useNavigate} from 'react-router-dom';

import {Chip,Avatar,Toolbar,IconButton,Tooltip,Divider,MenuItem,Popover, Stack,
        Button,CssBaseline,TextField,FormControlLabel,Checkbox,Link,Paper,Box,
        Badge,Collapse,Grid,Typography  } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';


import {ListItem,FormControl,ListSubheader,List,ListItemButton,ListItemIcon,ListItemText,ListItemAvatar}
        from '@mui/material';

import {LockOutlined,InboxIcon,DraftsIcon,SendIcon,NotificationsNoneOutlined,Person2Outlined,
        SettingsOutlined,PowerSettingsNewOutlined,DescriptionOutlined,
        EventNoteOutlined,InsertInvitationOutlined,SourceOutlined,
       PostAddOutlined,Done,CloseOutlined,CircleOutlined,LinkOutlined} from '@mui/icons-material';

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
        
          <InsertInvitationOutlined />
        <Typography style={{fontSize:14,fontFamily:'AeonikBold',marginLeft:25}}>
        Meetings
        </Typography>
      </ListItemButton>
      <ListItemButton sx={{marginBottom:2}}>
        
          <SourceOutlined />
        <Typography style={{fontSize:14,fontFamily:'AeonikBold',marginLeft:25}}>
        Money</Typography>
      </ListItemButton>
      

<ListItemButton sx={{marginBottom:2}}>
          <PostAddOutlined />
        <Typography style={{fontSize:14,fontFamily:'AeonikBold',marginLeft:25}}>
        Contracts</Typography>
      </ListItemButton>
      

      <ListItemButton sx={{marginBottom:2}}>
        
          <Person2Outlined />
        <Typography style={{fontSize:14,fontFamily:'AeonikBold',marginLeft:25}}>
        Clients</Typography>
      </ListItemButton>
      


      </List>

</Grid>

);
}

export default Sidebar;