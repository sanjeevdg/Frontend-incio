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
import {Table, TableBody, TableRow, TableCell} from '@mui/material';
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



function Dashboard() {

  




return (


<Grid container>



<Header />

<Sidebar />


<Grid item xs={10} md={10} sx={{position:'relative',marginTop:6}}>

<img src={require('../assets/images/bg1.png')} style={{width:'96%',height:'90%'}}/>

</Grid>





<Grid sx={{marginLeft:28.5,backgroundColor:'#f2f2f2',marginRight:3}} item xs={2.5}>

<Table>
<TableBody>
<TableRow>
<TableCell>
<Typography sx={{marginLeft:-5,marginTop:-1	,fontSize:50,fontFamily:'AeonikBold'}}>&emsp;12</Typography>
</TableCell>
<TableCell>
<Typography noWrap sx={{marginLeft:-5,marginTop:2,fontSize:15,fontFamily:'AeonikBold'}}>scheduled meetings</Typography>
</TableCell>
</TableRow>


<TableRow>
<TableCell>
<Typography sx={{marginTop:-2,fontSize:15,fontFamily:'AeonikBold'}}>&emsp;2</Typography>
</TableCell>
<TableCell sx={{marginTop:-5}}>
<Typography sx={{fontSize:15,fontFamily:'AeonikBold'}}>invitations</Typography>
</TableCell>
</TableRow>


<TableRow>
<TableCell>
<Typography sx={{fontSize:15,fontFamily:'AeonikBold'}}>&emsp;12</Typography>
</TableCell>
<TableCell>
<Typography></Typography>
</TableCell>
</TableRow>
</TableBody>

</Table>

</Grid>

<Grid sx={{backgroundColor:'#f2f2f2',height:200,marginRight:3}} item xs={2.5}>

</Grid>

<Grid sx={{backgroundColor:'#f2f2f2',height:200,marginRight:3}} item xs={2}>
</Grid>

<Grid sx={{backgroundColor:'#f2f2f2',height:200,marginRight:3}} item xs={2}>
</Grid>



</Grid>




	);



}




export default Dashboard;