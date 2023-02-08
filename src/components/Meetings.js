import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { firebase, auth } from '../config/firebase-config';
import {useNavigate} from 'react-router-dom';

import {styled, withStyles, makeStyles } from "@mui/styles";



import ButtonGroup from '@mui/material/ButtonGroup';

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

import Header from './Header';
import Sidebar from './Sidebar';



const useStyles = makeStyles({


});



function Meetings() {

  
let classes = useStyles();



return (


<Grid container>



<Header />

<Sidebar />

<Grid item xs={10} sx={{display:'flex',flexDirection:'row'}}>

<Box sx={{position:'relative',width:'70%'}}>
<ButtonGroup sx={{height:28}}>
<Button sx={{textTransform:'none',border:'none',outline:'none',backgroundColor:'black',color:'white',fontSize:13,fontFamily:'AeonikBold'}}>List view</Button>
<Button sx={{textTransform:'none',border:'none',outline:'none',backgroundColor:'#AEAEB2',color:'white',fontSize:13,fontFamily:'AeonikBold'}}>Calendar view</Button>
 </ButtonGroup>

</Box>

<Box>
<Button sx={{width:180,height:30,color:'white',textTransform:'none',backgroundColor:'#9249f4',display:'flex',marginLeft:'70%'}}>+ Create New Event</Button>
</Box>

</Grid>


<Grid sx={{position:'relative',top:-300,left:'10%',display:'flex',flexDirection:'row'}} item xs={10}>

<Typography sx={{position:'relative',marginTop:8,marginLeft:10,fontSize:30,fontFamily:'AeonikBold'}}>Today</Typography>


<Grid sx={{marginTop:15,marginLeft:-10}} item xs={2}>
<Paper elevation={0} sx={{
height:250,width:250,borderRadius:0,backgroundColor:'#f2f2f2',
"&:hover":{
        backgroundColor:'black',
        color:'white'
    }


}}>
<br/>
<Typography noWrap sx={{fontSize:18,fontFamily:'AeonikBold',ml:3}}>Budget Planning</Typography>

<Box sx={{display:'flex',flexDirection:'row',marginBottom:-1}}>


<Box sx={{width:70}}>
<Typography sx={{color:'#8E8E9D',fontSize:13,fontFamily:'AeonikBold',ml:3,mt:2}}>Time</Typography>
</Box>
<Box>
<Typography sx={{fontSize:13,fontFamily:'AeonikBold',ml:3,mt:2}}>Fri, Feb 3, 2023 <br/> 5:30pm - 6:30pm CET</Typography>
</Box>


</Box>

<Box sx={{display:'flex',flexDirection:'row',marginBottom:-1}}>


<Box sx={{width:70}}>
<Typography sx={{color:'#8E8E9D',fontSize:13,fontFamily:'AeonikBold',ml:3,mt:2}}>Place</Typography>
</Box>
<Box>
<Typography sx={{fontSize:13,fontFamily:'AeonikBold',ml:3,mt:2}}>Zoom Call</Typography>
</Box>

</Box>

<Box sx={{display:'flex',flexDirection:'row'}}>


<Box sx={{width:70,marginBottom:1}}>
<Typography sx={{color:'#8E8E9D',fontSize:13,fontFamily:'AeonikBold',ml:3,mt:2}}>People</Typography>
</Box>
<Box sx={{display:'flex',flexDirection:'row',marginLeft:3,marginTop:2,justifyContent:'center',alignItems:'center'}}>
<Avatar alt="Remy Sharp" sx={{width:20,height:20,borderRadius:10}} 
src={require('../assets/images/avatar.png')} />
&nbsp;
<Avatar alt="Remy Sharp" sx={{width:20,height:20,borderRadius:10}} 
src={require('../assets/images/avatar.png')} />

<Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>&nbsp;+2</Typography>
</Box>

</Box>


<Box sx={{display:'flex', flexDirection:'row',alignItems:'center',marginTop:5,marginLeft:3}}>
<LinkOutlined style={{width:14,height:14}}/>
<Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>&nbsp;Copy Link</Typography>
</Box>

</Paper>
</Grid>

<Grid sx={{backgroundColor:'#f5f5f5',marginTop:15,marginLeft:10}} item xs={2}>


<Paper elevation={0} sx={{
height:250,width:250,borderRadius:0,backgroundColor:'#f2f2f2',
"&:hover":{
        backgroundColor:'black',
        color:'white'
    }


}}>
<br/>
<Typography noWrap sx={{fontSize:18,fontFamily:'AeonikBold',ml:3}}>Budget Planning</Typography>

<Box sx={{display:'flex',flexDirection:'row',marginBottom:-1}}>


<Box sx={{width:70}}>
<Typography sx={{color:'#8E8E9D',fontSize:13,fontFamily:'AeonikBold',ml:3,mt:2}}>Time</Typography>
</Box>
<Box>
<Typography sx={{fontSize:13,fontFamily:'AeonikBold',ml:3,mt:2}}>Fri, Feb 3, 2023 <br/> 5:30pm - 6:30pm CET</Typography>
</Box>


</Box>

<Box sx={{display:'flex',flexDirection:'row',marginBottom:-1}}>


<Box sx={{width:70}}>
<Typography sx={{color:'#8E8E9D',fontSize:13,fontFamily:'AeonikBold',ml:3,mt:2}}>Place</Typography>
</Box>
<Box>
<Typography sx={{fontSize:13,fontFamily:'AeonikBold',ml:3,mt:2}}>Zoom Call</Typography>
</Box>

</Box>

<Box sx={{display:'flex',flexDirection:'row'}}>


<Box sx={{width:70,marginBottom:1}}>
<Typography sx={{color:'#8E8E9D',fontSize:13,fontFamily:'AeonikBold',ml:3,mt:2}}>People</Typography>
</Box>
<Box sx={{display:'flex',flexDirection:'row',marginLeft:3,marginTop:2,justifyContent:'center',alignItems:'center'}}>
<Avatar alt="Remy Sharp" sx={{width:20,height:20,borderRadius:10}} 
src={require('../assets/images/avatar.png')} />
&nbsp;
<Avatar alt="Remy Sharp" sx={{width:20,height:20,borderRadius:10}} 
src={require('../assets/images/avatar.png')} />

<Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>&nbsp;+2</Typography>
</Box>

</Box>


<Box sx={{display:'flex', flexDirection:'row',alignItems:'center',marginTop:5,marginLeft:3}}>
<EventNoteOutlined style={{width:14,height:14}}/>
<Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>&nbsp;Copy Link</Typography>
</Box>

</Paper>


</Grid>

<Grid sx={{backgroundColor:'#f5f5f5',marginTop:15,marginLeft:10}} item xs={2}>


<Paper elevation={0} sx={{
height:250,width:250,borderRadius:0,backgroundColor:'#f2f2f2',
"&:hover":{
        backgroundColor:'black',
        color:'white'
    }


}}>
<br/>
<Typography noWrap sx={{fontSize:18,fontFamily:'AeonikBold',ml:3}}>Budget Planning</Typography>

<Box sx={{display:'flex',flexDirection:'row',marginBottom:-1}}>


<Box sx={{width:70}}>
<Typography sx={{color:'#8E8E9D',fontSize:13,fontFamily:'AeonikBold',ml:3,mt:2}}>Time</Typography>
</Box>
<Box>
<Typography sx={{fontSize:13,fontFamily:'AeonikBold',ml:3,mt:2}}>Fri, Feb 3, 2023 <br/> 5:30pm - 6:30pm CET</Typography>
</Box>


</Box>

<Box sx={{display:'flex',flexDirection:'row',marginBottom:-1}}>


<Box sx={{width:70}}>
<Typography sx={{color:'#8E8E9D',fontSize:13,fontFamily:'AeonikBold',ml:3,mt:2}}>Place</Typography>
</Box>
<Box>
<Typography sx={{fontSize:13,fontFamily:'AeonikBold',ml:3,mt:2}}>Zoom Call</Typography>
</Box>

</Box>

<Box sx={{display:'flex',flexDirection:'row'}}>


<Box sx={{width:70,marginBottom:1}}>
<Typography sx={{color:'#8E8E9D',fontSize:13,fontFamily:'AeonikBold',ml:3,mt:2}}>People</Typography>
</Box>
<Box sx={{display:'flex',flexDirection:'row',marginLeft:3,marginTop:2,justifyContent:'center',alignItems:'center'}}>
<Avatar alt="Remy Sharp" sx={{width:20,height:20,borderRadius:10}} 
src={require('../assets/images/avatar.png')} />
&nbsp;
<Avatar alt="Remy Sharp" sx={{width:20,height:20,borderRadius:10}} 
src={require('../assets/images/avatar.png')} />

<Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>&nbsp;+2</Typography>
</Box>

</Box>


<Box sx={{display:'flex', flexDirection:'row',alignItems:'center',marginTop:5,marginLeft:3}}>
<EventNoteOutlined style={{width:14,height:14}}/>
<Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>&nbsp;Copy Link</Typography>
</Box>

</Paper>


</Grid>



<Grid sx={{backgroundColor:'#f5f5f5',marginTop:15,marginLeft:10}} item xs={2}>


<Paper elevation={0} sx={{
height:250,width:250,borderRadius:0,backgroundColor:'#f2f2f2',
"&:hover":{
        backgroundColor:'black',
        color:'white'
    }
}}>
<br/>
<Typography noWrap sx={{fontSize:18,fontFamily:'AeonikBold',ml:3}}>Budget Planning</Typography>

<Box sx={{display:'flex',flexDirection:'row',marginBottom:-1}}>


<Box sx={{width:70}}>
<Typography sx={{color:'#8E8E9D',fontSize:13,fontFamily:'AeonikBold',ml:3,mt:2}}>Time</Typography>
</Box>
<Box>
<Typography sx={{fontSize:13,fontFamily:'AeonikBold',ml:3,mt:2}}>Fri, Feb 3, 2023 <br/> 5:30pm - 6:30pm CET</Typography>
</Box>


</Box>

<Box sx={{display:'flex',flexDirection:'row',marginBottom:-1}}>


<Box sx={{width:70}}>
<Typography sx={{color:'#8E8E9D',fontSize:13,fontFamily:'AeonikBold',ml:3,mt:2}}>Place</Typography>
</Box>
<Box>
<Typography sx={{fontSize:13,fontFamily:'AeonikBold',ml:3,mt:2}}>Zoom Call</Typography>
</Box>

</Box>

<Box sx={{display:'flex',flexDirection:'row'}}>


<Box sx={{width:70,marginBottom:1}}>
<Typography sx={{color:'#8E8E9D',fontSize:13,fontFamily:'AeonikBold',ml:3,mt:2}}>People</Typography>
</Box>
<Box sx={{display:'flex',flexDirection:'row',marginLeft:3,marginTop:2,justifyContent:'center',alignItems:'center'}}>
<Avatar alt="Remy Sharp" sx={{width:20,height:20,borderRadius:10}} 
src={require('../assets/images/avatar.png')} />
&nbsp;
<Avatar alt="Remy Sharp" sx={{width:20,height:20,borderRadius:10}} 
src={require('../assets/images/avatar.png')} />

<Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>&nbsp;+2</Typography>
</Box>

</Box>


<Box sx={{display:'flex', flexDirection:'row',alignItems:'center',marginTop:5,marginLeft:3}}>
<EventNoteOutlined style={{width:14,height:14}}/>
<Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>&nbsp;Copy Link</Typography>
</Box>

</Paper>


</Grid>


</Grid>


</Grid>



	);



}




export default Meetings;