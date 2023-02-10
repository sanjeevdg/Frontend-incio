import React, { useState } from 'react';

import {useNavigate} from 'react-router-dom';

import {Chip,Avatar,IconButton,Divider,MenuItem,Popover, Stack,
        Button,Box,Badge,Grid,Typography  } from '@mui/material';


import {Close,Circle,NotificationsNoneOutlined,Person2Outlined,
        SettingsOutlined,PowerSettingsNewOutlined,Done,CircleOutlined} from '@mui/icons-material';

import { firebase, auth } from '../config/firebase-config';

import { makeStyles } from "@mui/styles";
import { getAuth, signOut } from "firebase/auth";

const useStyles = makeStyles({
  chipBorderRadius: {
    borderRadius:0
  }
});


function Header() {

let classes = useStyles();
const auth = getAuth();
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


 const logout = () => {
        signOut(auth).then(() => { navigate('/') }).catch((e)=> { console.log(e+'signout err')  })
        
    }

 const handleChipClick = () => {
    console.info('You clicked the Chip.');
  };

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };


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
<Badge badgeContent={3} color="error"><NotificationsNoneOutlined sx={{marginTop:0.5}}/></Badge>
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
            width: 280,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
       <Stack sx={{ p: 1 }}>
          
            <Box key="1" style={{whiteSpace: 'normal',display:'flex',flexDirection:'row'}} onClick={handleClose}>
             <Box sx={{marginRight:0.5}}> 
             <IconButton><Circle sx={{width:15,height:15,color:'#FF3B30'}}/></IconButton></Box>
             <Box>
          <Typography sx={{fontSize:12,fontFamily:'AeonikRegular'}}><b>Joe Blow</b> joined #team incio under
             'Announcements' today 
             </Typography>
            </Box></Box>
          
<Box>&nbsp;</Box>
<Box key="2" style={{whiteSpace: 'normal',display:'flex',flexDirection:'row'}} onClick={handleClose}>
             <Box sx={{marginRight:0.5}}><IconButton><Circle sx={{width:15,height:15,color:'#FF3B30'}}/></IconButton></Box>
<Box>          <Typography sx={{fontSize:12,fontFamily:'AeonikRegular'}}><b>Payment</b> is being 
          processed by incio Strategic Partners'
             </Typography>
            </Box></Box>


<Box>&nbsp;</Box>
<Box key="3" style={{whiteSpace: 'normal',display:'flex',flexDirection:'row'}} onClick={handleClose}>
             <Box sx={{marginRight:0.5}}><IconButton><Circle sx={{width:15,height:15,color:'#FF3B30'}}/></IconButton></Box>
<Box>          <Typography sx={{fontSize:12,fontFamily:'AeonikRegular'}}><b>Payment</b> is being 
          processed by incio Strategic Partners'
             </Typography>
            </Box></Box>





        </Stack>


        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleClose} sx={{ m: 1 }}>

           <Chip
            className={classes.chipBorderRadius}
        label="Custom delete icon"
        sx={{borderRadius:0,width:'100%'}}
        onClick={handleChipClick}
        onDelete={handleDelete}
        deleteIcon={<Close sx={{marginLeft:'80%'}}/>}
      />
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
          
            <MenuItem key='account' sx={{fontSize:13,fontFamily:'AeonikBold'}} onClick={handleClose}>
              <Person2Outlined sx={{marginLeft:-1}}/>&emsp;Account
            </MenuItem>
            <MenuItem key='settings' onClick={handleClose}>
              <SettingsOutlined sx={{marginLeft:-1}}/>&emsp;Settings
            </MenuItem>
            <MenuItem key='logout' onClick={() => logout()}>
              <PowerSettingsNewOutlined sx={{marginLeft:-1}}/>&emsp;Logout
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
