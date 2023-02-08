import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { firebase, auth } from '../config/firebase-config';
import {useNavigate} from 'react-router-dom';

import {Chip,Avatar,Toolbar,IconButton,Tooltip,Divider,MenuItem,Popover, Stack,
        Button,CssBaseline,TextField,FormControlLabel,Checkbox,Link,Paper,Box,
        Badge,Collapse,Grid,Typography  } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import {Table, TableBody, TableRow, TableCell,TableHead} from '@mui/material';

import {ListItem,FormControl,ListSubheader,List,ListItemButton,ListItemIcon,ListItemText,ListItemAvatar}
        from '@mui/material';

import {LockOutlined,InboxIcon,DraftsIcon,SendIcon,NotificationsNoneOutlined,Person2Outlined,
        SettingsOutlined,PowerSettingsNewOutlined,DescriptionOutlined,
        EventNoteOutlined,InsertInvitationOutlined,SourceOutlined,
       PostAddOutlined,Done,CloseOutlined,CircleOutlined,LinkOutlined} from '@mui/icons-material';

//import { app } from '../config/firebase-config';
import toast, { Toaster } from 'react-hot-toast';
import { set, sub } from 'date-fns';
import { withStyles, makeStyles } from "@mui/styles";
import Header from './Header';
import Sidebar from './Sidebar';


const useStyles = makeStyles({
  tableRow: {
    height: 10
  },
  tableCell: {
  	height:20,
    padding: "0px 6px",
    borderBottom:'none'
  },
  table: {
  	border:'none',outline:'none'
  },
});

function Dashboard() {

  
const classes = useStyles();



return (


<Grid container>



<Header />

<Sidebar />


<Grid item xs={10} md={10} sx={{position:'relative',marginTop:6}}>

<img src={require('../assets/images/bg1.png')} style={{width:'96%',height:'90%'}}/>

</Grid>





<Grid sx={{marginLeft:28.5,backgroundColor:'#f2f2f2',marginRight:3}} item xs={2.5}>

<Table className={classes.table}>
<TableBody>
<TableRow>
<TableCell>
<Typography sx={{marginLeft:-5,marginTop:-1	,fontSize:50,fontFamily:'AeonikBold'}}>&emsp;12</Typography>
</TableCell>
<TableCell>
<Typography noWrap sx={{marginTop:2,fontSize:15,fontFamily:'AeonikBold'}}>scheduled meetings</Typography>
</TableCell>
</TableRow>


<TableRow>
<TableCell className={classes.tableCell}>
<Typography align="right" sx={{fontSize:15,fontFamily:'AeonikBold'}}>&emsp;2</Typography>
</TableCell>
<TableCell  className={classes.tableCell}>
<Typography align="left" sx={{fontSize:15,fontFamily:'AeonikBold'}}>invitations</Typography>
</TableCell>
</TableRow>


<TableRow className={classes.tableRow}>
<TableCell className={classes.tableCell}>
<Typography align="right" sx={{fontSize:15,fontFamily:'AeonikBold'}}>&emsp;4</Typography>
</TableCell>
<TableCell className={classes.tableCell}>
<Typography sx={{fontSize:15,fontFamily:'AeonikBold'}}>confirmed meetings</Typography>
</TableCell>
</TableRow>


<TableRow className={classes.tableRow}>
<TableCell className={classes.tableCell}>
<Typography align="right" sx={{fontSize:15,fontFamily:'AeonikBold'}}>120</Typography>
</TableCell>
<TableCell className={classes.tableCell}>
<Typography sx={{fontSize:15,fontFamily:'AeonikBold'}}>this week</Typography>
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