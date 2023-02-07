import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { firebase, auth } from '../config/firebase-config';
import {useNavigate} from 'react-router-dom';

import {Table, TableBody, TableRow, TableCell} from '@mui/material';

import ButtonGroup from '@mui/material/ButtonGroup';

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

import Header from './Header';
import Sidebar from './Sidebar';



function Meetings() {

  




return (


<Grid container>



<Header />

<Sidebar />

<Grid item xs={10} sx={{display:'flex',flexDirection:'row'}}>

<Box sx={{position:'relative',width:'70%'}}>
<ButtonGroup>
<Button>List view</Button>
<Button>Calendar view</Button>
 </ButtonGroup>

</Box>

<Box>
<Button sx={{width:180,height:30,color:'white',textTransform:'none',backgroundColor:'#9249f4',display:'flex',marginLeft:'70%'}}>+ Create New Event</Button>
</Box>

</Grid>


<Grid sx={{position:'relative',top:-300,left:'10%',display:'flex',flexDirection:'row'}} item xs={10}>

<Typography sx={{position:'relative',marginTop:8,marginLeft:10,fontSize:30,fontFamily:'AeonikBold'}}>Today</Typography>


<Grid sx={{backgroundColor:'#f2f2f2',marginTop:15,marginLeft:-10,marginRight:5}} item xs={3}>

<Typography sx={{fontSize:18,fontFamily:'AeonikBold',ml:3,mt:2}}>Budget Planning</Typography>

<Box>

<Table sx={{fontSize:13,fontFamily:'AeonikBold'}}>
 <TableBody>
<TableRow>
<TableCell>Time </TableCell><TableCell>Fri, Feb 3, 2023 <br/> 5:30pm - 6:30pm CET</TableCell>
</TableRow>

<TableRow>
<TableCell>Place </TableCell><TableCell>Zoom Call </TableCell>
</TableRow>

<TableRow>
<TableCell>People </TableCell>
<TableCell sx={{display:'flex',flexDirection:'row'}}>

<Avatar alt="Remy Sharp" sx={{width:25,height:25,borderRadius:10}} 
src={require('../assets/images/avatar.png')} />

<Avatar alt="Remy Sharp" sx={{width:25,height:25,borderRadius:10}} 
src={require('../assets/images/avatar.png')} />



 </TableCell>
</TableRow>


 </TableBody>


</Table>

</Box>








</Grid>

<Grid sx={{backgroundColor:'#f5f5f5',marginTop:15,marginRight:5}} item xs={3}>






<Typography sx={{fontSize:18,fontFamily:'AeonikBold',ml:3,mt:2}}>Budget Planning</Typography>

<Box>

<Table sx={{fontSize:13,fontFamily:'AeonikBold'}}>
 <TableBody>
<TableRow>
<TableCell>Time </TableCell><TableCell>Fri, Feb 3, 2023 <br/> 5:30pm - 6:30pm CET</TableCell>
</TableRow>

<TableRow>
<TableCell>Place </TableCell><TableCell>Zoom Call </TableCell>
</TableRow>

<TableRow>
<TableCell>People </TableCell>
<TableCell sx={{display:'flex',flexDirection:'row'}}>

<Avatar alt="Remy Sharp" sx={{width:25,height:25,borderRadius:10}} 
src={require('../assets/images/avatar.png')} />

<Avatar alt="Remy Sharp" sx={{width:25,height:25,borderRadius:10}} 
src={require('../assets/images/avatar.png')} />



 </TableCell>
</TableRow>


 </TableBody>


</Table>

</Box>








</Grid>

<Grid sx={{backgroundColor:'#000',height:200,marginTop:15}} item xs={3}>
sada
</Grid>


</Grid>






</Grid>



	);



}




export default Meetings;