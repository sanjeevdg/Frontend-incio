import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { firebase, auth } from '../config/firebase-config';
import {useNavigate} from 'react-router-dom';

import {styled, withStyles, makeStyles } from "@mui/styles";



import ButtonGroup from '@mui/material/ButtonGroup';

import {Chip,Avatar,Toolbar,IconButton,Tooltip,Divider,MenuItem,Popover, Stack,
        Button,CssBaseline,TextField,FormControlLabel,Checkbox,Link,Paper,Box,
        Badge,Collapse,Grid,Typography,Modal,InputBase  } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';


import {Select, ListItem,FormControl,ListSubheader,List,ListItemButton,ListItemIcon,ListItemText,ListItemAvatar}
        from '@mui/material';

import {LockOutlined,InboxIcon,DraftsIcon,SendIcon,NotificationsNoneOutlined,Person2Outlined,
        SettingsOutlined,PowerSettingsNewOutlined,DescriptionOutlined,
        EventNoteOutlined,InsertInvitationOutlined,SourceOutlined,
       PostAddOutlined,Done,CloseOutlined,CircleOutlined,LinkOutlined} from '@mui/icons-material';

import SelectUnstyled, { selectUnstyledClasses } from '@mui/base/SelectUnstyled';
//import { app } from '../config/firebase-config';
import toast, { Toaster } from 'react-hot-toast';
import { set, sub } from 'date-fns';


import {requiredValidator,emailValidator} from '../utils/validators';

import Header from './Header';
import Sidebar from './Sidebar';
import CardView from './CardView';
import CalendarView from './CalendarView';



const useStyles = makeStyles({

  button: {
    backgroundColor: '#AEAEB2',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#9249F4',
      color: '#fff',
  },},

  selectbox: {

    borderRadius:0,border:0,outline:'none',

  }

});
const clientstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 940,
  height:600,
  bgcolor: "background.paper",
  borderRadius:0,
  boxShadow: 15,
  p: 4,
};

const eventstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 940,
  height:600,
  bgcolor: "background.paper",
  borderRadius:0,
  boxShadow: 15,
  p: 4,
};

function Meetings() {





let classes = useStyles();

const [view, setView] = useState('calendar');
const [calendarView, setCalendarView] = useState(false);
const [cardView, setCardView] = useState(true);


const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };


const [openEventModal, setOpenEventModal] = useState(false);
const handleOpenEventModal = () => setOpenEventModal(true);
const handleCloseEventModal = () => {
          setOpenEventModal(false);
   };



const [name, setName] = useState({value:'',error:''});
const [email, setEmail] = useState({value:'',error:''});
const [phone, setPhone] = useState({value:'',error:''});
const [zip, setZip] = useState({value:'',error:''});
const [country, setCountry] = useState({value:'',error:''});

const [repeat,setRepeat] = useState('');







return (


<Grid container>



<Header />

<Sidebar />

<Grid item xs={10} sx={{marginBottom:20,display:'flex',flexDirection:'row'}}>

<Box sx={{position:'absolute',zIndex:99,width:'70%',height:50}}>
<ButtonGroup variant="contained"  aria-label="outlined primary button group" sx={{height:28,zIndex:99}}>
<Button onClick={()=>{setCalendarView(false);setCardView(true);}}
sx={{'&:hover': {backgroundColor:'black'},textTransform:'none',border:'none',outline:'none',backgroundColor:cardView?'black':'#AEAEB2',color:'white',fontSize:13,fontFamily:'AeonikBold'}}>List view</Button>
<Button onClick={()=>{setCalendarView(true);setCardView(false);}} sx={{'&:hover': {backgroundColor:'black'},backgroundColor:calendarView?'black':'#AEAEB2',textTransform:'none',border:'none',outline:'none',color:'white',fontSize:13,fontFamily:'AeonikBold'}}>Calendar view</Button>
 </ButtonGroup>

</Box>

<Box sx={{position:'absolute',zIndex:99,flexDirection:'row',left:'70%',height:50}}>

<Button onClick={() => handleOpenEventModal()} sx={{width:180,height:30,color:'white',textTransform:'none',backgroundColor:'#9249f4',display:'flex',marginLeft:'70%'}}>+ Create New Event</Button>
</Box>

</Grid>


{cardView?
<CardView/>:<></>

}

{calendarView?
<CalendarView/>:<></>

}









<Modal
            open={openEventModal}
            onClose={() => handleCloseEventModal()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"            
          >
            <Paper elevation={2} sx={eventstyle}>

            <Grid item xs={12}>
              <Box
                sx={{ display: "flex",width:'100%',flexDirection:'row',height: 60 }}
              >
                <Typography
                noWrap
                  sx={{
                    fontSize: 25,
                    color:'black',
                    fontFamily: "AeonikBold",
                  }}
                >                
                  Create New Event
                </Typography><Box sx={{width:'35%', justifyContent:'flex-end',alignItems:'flex-end'}}></Box><Box sx={{width:'12%', justifyContent:'flex-end',alignItems:'flex-end',alignSelf:'flex-end'}}>
                <CloseOutlined
                  onClick={() => {handleCloseEventModal();}}
                  sx={{ fontSize: 20}}
                />
              </Box></Box></Grid>

<Grid item xs={12} sx={{display:'flex',flexDirection:'row'}}>

<Grid item xs={4} sx={{marginRight:3}}>

<Box sx={{position:'relative'}}>
 <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>
              Event Name</Typography>
             <InputBase
                required
                sx={{height:35,width:'100%' ,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                type="email"
                fullWidth                
                value={name.value}
                onChange={(e) => { setName({value:e.target.value,error:''}) }}                              
              /> <span style={{color:"#FF3B30"}}>{(name.error)}</span>
</Box>
<Box sx={{position:'relative',marginTop:1}}>

 <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>

              Location</Typography>
             <InputBase
                required
                sx={{height:35,width:'100%' ,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                type="email"
                fullWidth   
                value={email.value}             
                onChange={(e) => { setEmail({value:e.target.value,error:''}) }}                              
              /> <span style={{color:"#FF3B30"}}>{(email.error)}</span>
</Box>

<Box sx={{position:'relative',marginTop:1}}>

 <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>

              Description</Typography>
             <InputBase
                required
                sx={{height:100,width:'100%' ,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                multiline
                rows={5}
                type="phone"
                value={phone.value}
                fullWidth                
                onChange={(e) => { setPhone({value:e.target.value,error:''}) }}                              
              /> <span style={{color:"#FF3B30"}}>{(phone.error)}</span>
</Box>


<Box sx={{position:'relative',marginTop:1}}>

 <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>

              Unique link</Typography>
             <InputBase
                required
                sx={{height:35,width:'100%' ,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                type="email"
                value={zip.value}
                fullWidth                
                onChange={(e) => { setZip({value:e.target.value,error:''}) }}                              
              /> <span style={{color:"#FF3B30"}}>{(zip.error)}</span>
</Box>


</Grid>



<Grid item xs={4} sx={{marginRight:3}}>





<Box sx={{position:'relative',marginTop:1}}>

 <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>

              Duration</Typography>
           <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          className={classes.selectbox}
          sx={{height:40,width:'100%'}}
          onClose={handleClose}
          onOpen={handleOpen}
          value={country.value}
          onChange={(e) => { setCountry({value:e.target.value,error:''}) }}
        >
          <MenuItem value="">
            <em>15 min</em>
          </MenuItem>
          <MenuItem value={10}>30 min</MenuItem>
          <MenuItem value={20}>1 hour</MenuItem>
          <MenuItem value={30}>2 hours</MenuItem>
        </Select> <span style={{color:"#FF3B30"}}>{(country.error)}</span>
</Box>



<Box sx={{position:'relative',marginTop:1}}>
 <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>
              Repeat on</Typography>
             <Checkbox
                required
                sx={{height:35,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold'}}
                size="small"
                value={repeat}
                onChange={(e) => { setRepeat({value:e.target.value,error:''}) }}                              
              />Mon

<Checkbox
                required
                sx={{height:35,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold'}}
                size="small"
                value={repeat}
                onChange={(e) => { setRepeat({value:e.target.value,error:''}) }}                              
              />Tue

<Checkbox
                required
                sx={{height:35,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold'}}
                size="small"
                value={repeat}
                onChange={(e) => { setRepeat({value:e.target.value,error:''}) }}                              
              />Wed

<Checkbox
                required
                sx={{height:35,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold'}}
                size="small"
                value={repeat}
                onChange={(e) => { setRepeat({value:e.target.value,error:''}) }}                              
              />Thu
<Checkbox
                required
                sx={{height:35,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold'}}
                size="small"
                value={repeat}
                onChange={(e) => { setRepeat({value:e.target.value,error:''}) }}                              
              />Fri
<Checkbox
                required
                sx={{height:35,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold'}}
                size="small"
                value={repeat}
                onChange={(e) => { setRepeat({value:e.target.value,error:''}) }}                              
              />Sat
<Checkbox
                required
                sx={{height:35,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold'}}
                size="small"
                value={repeat}
                onChange={(e) => { setRepeat({value:e.target.value,error:''}) }}                              
              />Sun
               <span style={{color:"#FF3B30"}}>{(name.error)}</span>
</Box>








 </Grid>



<Grid item xs={4}>






</Grid>

</Grid>




              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop:3

                }}
              >
                <Button className={classes.button}
                  onClick={() => {                    
                   
                  }}
                  style={{
                    width: 150,
                    height: 35,
                    borderRadius: 6,
                    alignSelf: "center",
                    color: "white",
                    fontSize: 14,
                    fontFamily: "AeonikBold",
                    textTransform: "none",                   
                  }}
                >
                  Create Event
                </Button>
              </Box>
            </Paper>
          </Modal>













</Grid>



	);



}




export default Meetings;