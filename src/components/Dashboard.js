import React, { useState } from 'react';

import {Paper,Box,Grid,Typography  } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { makeStyles } from "@mui/styles";
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





<Grid sx={{marginLeft:28.5,marginRight:3}} item xs={2.5}>

<Paper sx={{backgroundColor:'#f2f2f2',width:'100%',height:250}}>

<Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>
<Box sx={{marginTop:-5,marginLeft:2,width:80,height:50}}><Typography sx={{fontSize:60,fontFamily:'AeonikBold'}}>12</Typography>
</Box>
<Box sx={{width:190,height:50,marginTop:8}}>
<Typography noWrap sx={{fontSize:15,fontFamily:'AeonikBold'}}>scheduled meetings</Typography>
</Box>
</Box>


<Box sx={{display:'flex',flexDirection:'row',marginTop:3,marginBottom:-2}}>
<Box sx={{width:50,height:30,marginLeft:4}}>
<Typography align="right" sx={{fontSize:25,fontFamily:'AeonikBold'}}>2</Typography>
</Box>
<Box sx={{width:70,height:30,marginTop:1.5,marginLeft:2}}>
<Typography align="left" sx={{fontSize:15,fontFamily:'AeonikBold'}}>invitations</Typography>
</Box>
</Box>



<Box sx={{display:'flex',flexDirection:'row',marginBottom:-2}}>
<Box sx={{width:50,height:30,marginLeft:4}}>
<Typography align="right" sx={{fontSize:25,fontFamily:'AeonikBold'}}>4</Typography>
</Box>

<Box sx={{width:190,height:30,marginTop:1.5,marginLeft:2}}>
<Typography sx={{fontSize:15,fontFamily:'AeonikBold'}}>confirmed meetings</Typography>
</Box>
</Box>



<Box sx={{display:'flex',flexDirection:'row'}}>
<Box sx={{width:50,height:30,marginLeft:4}}>
<Typography align="right" sx={{fontSize:25,fontFamily:'AeonikBold'}}>120</Typography>
</Box>
<Box sx={{width:190,height:30,marginTop:1,marginLeft:2}}>
<Typography sx={{fontSize:15,fontFamily:'AeonikBold'}}>this week</Typography>

</Box>
</Box>

</Paper>

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