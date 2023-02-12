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


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';



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

    borderRadius:0,backgroundColor:'#f2f2f2',border:0,outline:'none',

  },

  dttmp: {

    border:0,backgroundColor:'#f2f2f2',outline:'none',width:'100%'
  },
  input: {height:23}

});


const eventstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 870,
  height:520,
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


const [mstart,setMStart] = useState({value:'',error:''});

const [repeat,setRepeat] = useState('');







return (

<LocalizationProvider dateAdapter={AdapterDayjs}>
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

<Button onClick={() => handleOpenEventModal()} sx={{'&:hover': {backgroundColor:'black'},width:180,height:30,color:'white',textTransform:'none',backgroundColor:'#AEAEB2',display:'flex',marginLeft:'70%'}}>+ Create New Event</Button>
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
                </Typography>

        <Box sx={{width:'35%'}}></Box>
  <Box sx={{position:'absolute',left:'95%',top:42}}>
                <CloseOutlined
                  onClick={() => {handleCloseEventModal();}}
                  sx={{ fontSize: 20}}
                />
              </Box></Box></Grid>

<Grid item xs={12} sx={{display:'flex',flexDirection:'row'}}>

<Grid item xs={4} sx={{marginRight:3,marginTop:1}}>

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
<Box sx={{position:'relative',marginTop:3}}>

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

<Box sx={{position:'relative',marginTop:3}}>

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


<Box sx={{position:'relative',marginTop:3}}>

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



<Grid item xs={4} sx={{marginRight:3,marginTop:1}}>


<Box sx={{position:'relative'}}>

 <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>

              Start Date/Time</Typography>

               <DateTimePicker className={classes.dttmp}
        renderInput={(props) => <TextField size="small" {...props} />}
        style={{height:23}}
        value={mstart}
        onChange={(newValue) => {
          setMStart(newValue);
        }}
      />
</Box>


<Box sx={{position:'relative',marginTop:3}}>

 <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>

              Duration</Typography>
           <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          size="small"
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



<Box sx={{position:'relative',marginTop:3,display:'flex',alignItems:'center'}}>
 <Box sx={{width:'100%',marginTop:-8,marginBottom:1}}><Typography noWrap sx={{fontSize:13,color:'#000',fontFamily:'AeonikBold'}}>
              Repeat on<br/></Typography></Box>
              <Box sx={{display:'flex',alignItems:'center', marginBottom:-1,marginLeft:-33,marginTop:-4,flexDirection:'row'}}>
             <Checkbox
                required
                sx={{marginRight:-1,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold'}}
                size="small"
                value={repeat}
                onChange={(e) => { setRepeat({value:e.target.value,error:''}) }}                              
              /><Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>MON</Typography>

<Checkbox
                required
                sx={{marginLeft:-1,marginRight:-1,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold'}}
                size="small"
                value={repeat}
                onChange={(e) => { setRepeat({value:e.target.value,error:''}) }}                              
              /><Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>TUE</Typography>

<Checkbox
                required
                sx={{marginLeft:-1,marginRight:-1,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold'}}
                size="small"
                value={repeat}
                onChange={(e) => { setRepeat({value:e.target.value,error:''}) }}                              
              /><Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>WED</Typography>

<Checkbox
                required
                sx={{marginLeft:-1,marginRight:-1,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold'}}
                size="small"
                value={repeat}
                onChange={(e) => { setRepeat({value:e.target.value,error:''}) }}                              
              /><Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>THU</Typography>
              </Box>
              <Box sx={{display:'flex',position:'relative',marginTop:5,marginLeft:-25,flexDirection:'row'}}>
              <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>
<Checkbox
                required
                sx={{marginLeft:-1,marginRight:-1,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold'}}
                size="small"
                value={repeat}
                onChange={(e) => { setRepeat({value:e.target.value,error:''}) }}                              
              /><Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>FRI</Typography>
              </Box>&nbsp;&nbsp;&nbsp;<Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>
<Checkbox
                required
                sx={{marginLeft:-1,marginRight:-1,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold'}}
                size="small"
                value={repeat}
                onChange={(e) => { setRepeat({value:e.target.value,error:''}) }}                              
              /><Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>SAT</Typography>
         </Box><Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>     
<Checkbox
                required
                sx={{marginLeft:-1,marginRight:-1,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold'}}
                size="small"
                value={repeat}
                onChange={(e) => { setRepeat({value:e.target.value,error:''}) }}                              
              /><Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>SUN
              </Typography>
              </Box>
              </Box>
               <span style={{color:"#FF3B30"}}>{(name.error)}</span>

</Box>








 </Grid>



<Grid item xs={4}>


<Box sx={{position:'relative',marginTop:1}}>
 <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>
              People</Typography>
             <InputBase
                required
                sx={{height:35,width:'100%' ,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                type="text"
                fullWidth                
                value={name.value}
                onChange={(e) => { setName({value:e.target.value,error:''}) }}                              
              /> <span style={{color:"#FF3B30"}}>{(name.error)}</span>
</Box>


    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem alignItems="center"
         secondaryAction={
              <IconButton edge="end" aria-label="comments">
        <CloseOutlined
                  onClick={() => {handleCloseEventModal();}}
                  sx={{ fontSize: 20}}
                />
              </IconButton>
            }
      >
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={require('../assets/images/avatar.png')} />
        </ListItemAvatar>
        <ListItemText>
        <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>
          Leo Sayer          </Typography>
        </ListItemText>
        
      </ListItem>

<ListItem  sx={{marginTop:-1}} alignItems="center"
         secondaryAction={
              <IconButton edge="end" aria-label="comments">
        <CloseOutlined
                  onClick={() => {handleCloseEventModal();}}
                  sx={{ fontSize: 20}}
                />
              </IconButton>
            }
      >
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={require('../assets/images/avatar.png')} />
        </ListItemAvatar>
        <ListItemText>
        <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>
          Montgomery Clifton          </Typography>
        </ListItemText>
        
      </ListItem>


      <ListItem sx={{marginTop:-1}} alignItems="center"
         secondaryAction={
              <IconButton edge="end" aria-label="comments">
        <CloseOutlined
                  onClick={() => {handleCloseEventModal();}}
                  sx={{ fontSize: 20}}
                />
              </IconButton>
            }
      >
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={require('../assets/images/avatar.png')} />
        </ListItemAvatar>
        <ListItemText>
        <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>
          Steve Blanchett          </Typography>
        </ListItemText>
        
      </ListItem>






</List>



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
                    height: 30,
                    borderRadius: 6,
                    alignSelf: "center",
                    color: "white",
                    backgroundColor:"#AEAEB2",
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
</LocalizationProvider>


	);



}




export default Meetings;