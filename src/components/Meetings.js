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
import ListView from './ListView';
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

    border:0,backgroundColor:'#f2f2f2',outline:'none',width:'100%',
    fontSize:12,fontFamily:'AeonikBold'
  },
  input: {height:23}

});


const eventstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 870,
  height:540,
  bgcolor: "background.paper",
  borderRadius:0,
  boxShadow: 15,
  marginBottom:15,
  p: 4,
};

function Meetings() {


let navigate = useNavigate();


let classes = useStyles();

const [view, setView] = useState('calendar');
const [calendarView, setCalendarView] = useState(false);
const [cardView, setCardView] = useState(true);
const [listView, setListView] = useState(false);


const notifyeventadd = () => toast.success('Event Added successfully!');

const [openDurationSelect, setOpenDurationSelect] = React.useState(false);

  const handleCloseDurationSelect = () => {
    setOpenDurationSelect(false);
  };

  const handleOpenDurationSelect = () => {
    setOpenDurationSelect(true);
  };


const [openEventModal, setOpenEventModal] = useState(false);
const handleOpenEventModal = () => setOpenEventModal(true);
const handleCloseEventModal = () => {
          setOpenEventModal(false);
   };



const [eventCreating, setEventCreating] = useState(false);

const [name, setName] = useState({value:'',error:''});
const [location, setLocation] = useState({value:'',error:''});
const [description, setDescription] = useState({value:'',error:''});
const [uniquelink, setUniqueLink] = useState({value:'',error:''});
const [mstart,setMStart] = useState(dayjs(new Date()));

const [duration,setDuration] = useState({value:'',error:''});



const [repeatmon,setRepeatMon] = useState({value:'',error:''});
const [repeattue,setRepeatTue] = useState({value:'',error:''});
const [repeatwed,setRepeatWed] = useState({value:'',error:''});
const [repeatthu,setRepeatThu] = useState({value:'',error:''});
const [repeatfri,setRepeatFri] = useState({value:'',error:''});
const [repeatsat,setRepeatSat] = useState({value:'',error:''});
const [repeatsun,setRepeatSun] = useState({value:'',error:''});

const [people, setPeople] = useState({value:'',error:''});


function createNewEvent() {


alert('name='+name.value+'location='+location.value+'descr='+description.value+'unilk='+uniquelink.value+'mstart='+mstart+'dura='+duration.value+'peple='+people.value);


const nameError = requiredValidator(name.value);
const locationError = requiredValidator(location.value);
const descriptionError = requiredValidator(description.value);
const uniquelinkError = requiredValidator(uniquelink.value);
//const mstartError = requiredValidator(mstart.value);
const durationError = requiredValidator(duration.value);
const peopleError = requiredValidator(people.value);

   if (nameError || locationError || descriptionError || uniquelinkError || durationError || 
    peopleError ) {
      setName({ ...name, error: nameError });
      setLocation({ ...location, error: locationError });
      setDescription({...description,error:descriptionError});
      setUniqueLink({...uniquelink,error:uniquelinkError});
   //   setMStart({...mstart,error:mstartError});
      setDuration({...duration,error:durationError});

      setPeople({ ...people, error: peopleError });
      
    //  setTermAdding(false);
    alert('not sending...')
      return false;
    }

const body = {
   "name": name.value, 
   "location": location.value, 
   "description": description.value,
   "uniquelink": uniquelink.value,
   "mstart": mstart,
   "duration": duration.value,
   "people": people.value, 
   
};

console.log('body==',body);

var formBody = [];
for (var key in body) {
   var encodedKey = encodeURIComponent(key);
   var encodedValue = encodeURIComponent(body[key]);
   formBody.push(encodedKey + '=' + encodedValue);
}
formBody = formBody.join('&');
// curl -d "formname=test1&displayname=est1" -X POST https://710d-2409-4060-1e-b158-1d34-fc03-ff6d-1ef2.ngrok.io/createNewForm

// backend-incio.onrender.com
alert('inhere');
try{
  fetch(`https://backend-incio.onrender.com/addNewEvent`, {
   method: 'POST', 
   headers: {
        'Content-Type': 'application/x-www-form-urlencoded',              
      },  
   body: formBody,
}).then((resp) => {
  resp.json().then((data) => {
   // setIsLoading(false);
   //alert(JSON.stringify(data));
   notifyeventadd();
   alert('returned data::'+JSON.stringify(data));
   //setTermAdding(false);
   setTimeout(() => { navigate(0);},1000);
//alert('success');
window.reload();
    
    }
    )

  

})
} catch(e) { alert('caught err'+e.message); }




}





return (

<LocalizationProvider dateAdapter={AdapterDayjs}>
<Grid container>



<Header />

<Sidebar />

<Grid item xs={10} sx={{marginBottom:20,display:'flex',flexDirection:'row'}}>

<Box sx={{position:'absolute',zIndex:99,width:'70%',height:50}}>
<ButtonGroup variant="contained"  aria-label="outlined primary button group" sx={{height:28,zIndex:99}}>
<Button onClick={()=>{setCalendarView(false);setListView(false); setCardView(true);}}
sx={{'&:hover': {backgroundColor:'black'},textTransform:'none',border:'none',outline:'none',backgroundColor:cardView?'black':'#AEAEB2',color:'white',fontSize:13,fontFamily:'AeonikBold'}}>Group view</Button>
<Button onClick={()=>{setCalendarView(false);setCardView(false);setListView(true);}}
sx={{'&:hover': {backgroundColor:'black'},textTransform:'none',border:'none',outline:'none',backgroundColor:listView?'black':'#AEAEB2',color:'white',fontSize:13,fontFamily:'AeonikBold'}}>List view</Button>

<Button onClick={()=>{setCalendarView(true);setCardView(false);setListView(false)}} sx={{'&:hover': {backgroundColor:'black'},backgroundColor:calendarView?'black':'#AEAEB2',textTransform:'none',border:'none',outline:'none',color:'white',fontSize:13,fontFamily:'AeonikBold'}}>Calendar view</Button>
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

{listView?
<ListView/>:<></>

}


</Grid>




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

<Grid item xs={6} md={6} sx={{width:240,marginRight:3,marginTop:1}}>

<Box sx={{position:'relative'}}>
 <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>
              Event Name</Typography>
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
<Box sx={{position:'relative',marginTop:3}}>

 <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>

              Location</Typography>
             <InputBase
                required
                sx={{height:35,width:'100%' ,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                type="text"
                fullWidth   
                value={location.value}             
                onChange={(e) => { setLocation({value:e.target.value,error:''}) }}                              
              /> <span style={{color:"#FF3B30"}}>{(location.error)}</span>
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
                type="text"
                value={description.value}
                fullWidth                
                onChange={(e) => { setDescription({value:e.target.value,error:''}) }}                              
              /> <span style={{color:"#FF3B30"}}>{(description.error)}</span>
</Box>


<Box sx={{position:'relative',marginTop:3}}>

 <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>

              Unique link</Typography>
             <InputBase
                required
                sx={{height:35,width:'100%' ,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                type="text"
                value={uniquelink.value}
                fullWidth                
                onChange={(e) => { setUniqueLink({value:e.target.value,error:''}) }}                              
              /> <span style={{color:"#FF3B30"}}>{(uniquelink.error)}</span>
</Box>


</Grid>



<Grid item xs={4} sx={{width:250,marginRight:3,marginTop:1}}>


<Box sx={{position:'relative'}}>

 <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>

              Time</Typography>

               <DateTimePicker className={classes.dttmp}
        renderInput={(props) => <TextField style={{fontSize:12, fontFamily:'AeonikBold'}} size="small" {...props} />}
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
          open={openDurationSelect}
          size="small"
          className={classes.selectbox}
          sx={{height:40,width:'100%'}}
          onClose={handleCloseDurationSelect}
          onOpen={handleOpenDurationSelect}
          value={duration.value}
          onChange={(e) => { setDuration({value:e.target.value,error:''}) }}
        >
          <MenuItem value={'halfhour'}><Typography sx={{fontSize:12, fontFamily:'AeonikBold'}}>30 min</Typography></MenuItem>
          <MenuItem value={'onehour'}><Typography sx={{fontSize:12, fontFamily:'AeonikBold'}}>1 hour</Typography></MenuItem>
          <MenuItem value={'fewhours'}><Typography sx={{fontSize:12, fontFamily:'AeonikBold'}}>Several hours</Typography></MenuItem>
          <MenuItem value={'oneweek'}><Typography sx={{fontSize:12, fontFamily:'AeonikBold'}}>Less than one week</Typography></MenuItem>
          <MenuItem value={'onemonth'}><Typography sx={{fontSize:12, fontFamily:'AeonikBold'}}>Less than one month</Typography></MenuItem>
          <MenuItem value={'indefinite'}><Typography sx={{fontSize:12, fontFamily:'AeonikBold'}}>Ongoing indefinite</Typography></MenuItem>
        </Select> <span style={{color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(duration.error)}</span>
</Box>



<Box sx={{position:'relative',marginTop:3,display:'flex',alignItems:'center'}}>
 <Box sx={{width:'100%',marginTop:-8,marginBottom:1}}><Typography noWrap sx={{fontSize:13,color:'#000',fontFamily:'AeonikBold'}}>
              Repeat on<br/></Typography></Box>
              <Box sx={{display:'flex',alignItems:'center', marginBottom:-1,marginLeft:-33,marginTop:-4,flexDirection:'row'}}>
             <Checkbox
                required
                sx={{marginRight:-1,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold'}}
                size="small"
                value={repeatmon}
                onChange={(e) => { setRepeatMon({value:e.target.value,error:''}) }}                              
              /><Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>MON</Typography>

<Checkbox
                required
                sx={{marginLeft:-1,marginRight:-1,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold'}}
                size="small"
                value={repeattue}
                onChange={(e) => { setRepeatTue({value:e.target.value,error:''}) }}                              
              /><Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>TUE</Typography>

<Checkbox
                required
                sx={{marginLeft:-1,marginRight:-1,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold'}}
                size="small"
                value={repeatwed}
                onChange={(e) => { setRepeatWed({value:e.target.value,error:''}) }}                              
              /><Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>WED</Typography>

<Checkbox
                required
                sx={{marginLeft:-1,marginRight:-1,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold'}}
                size="small"
                value={repeatthu}
                onChange={(e) => { setRepeatThu({value:e.target.value,error:''}) }}                              
              /><Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>THU</Typography>
              </Box>
              <Box sx={{display:'flex',position:'relative',marginTop:5,marginLeft:-25,flexDirection:'row'}}>
              <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>
<Checkbox
                required
                sx={{marginLeft:-1,marginRight:-1,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold'}}
                size="small"
                value={repeatfri}
                onChange={(e) => { setRepeatFri({value:e.target.value,error:''}) }}                              
              /><Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>FRI</Typography>
              </Box>&nbsp;&nbsp;&nbsp;<Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>
<Checkbox
                required
                sx={{marginLeft:-1,marginRight:-1,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold'}}
                size="small"
                value={repeatsat}
                onChange={(e) => { setRepeatSat({value:e.target.value,error:''}) }}                              
              /><Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>SAT</Typography>
         </Box><Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>     
<Checkbox
                required
                sx={{marginLeft:-1,marginRight:-1,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold'}}
                size="small"
                value={repeatsun}
                onChange={(e) => { setRepeatSun({value:e.target.value,error:''}) }}                              
              /><Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>SUN
              </Typography>
              </Box>
              </Box>
               

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
                value={people.value}
                onChange={(e) => { setPeople({value:e.target.value,error:''}) }}                              
              /> <span style={{color:"#FF3B30"}}>{(people.error)}</span>
</Box>


    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem alignItems="center"
         secondaryAction={
              <IconButton edge="end" onClick={() => {console.log('xxx');}} aria-label="comments">
        <CloseOutlined                  
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
              <IconButton edge="end" onClick={() => {console.log('xxx');}} aria-label="comments">
        <CloseOutlined
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
              <IconButton edge="end" onClick={() => {console.log('xxx');}} aria-label="comments">
        <CloseOutlined
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
                  marginTop:3,
                  zIndex:99
                }}
              >
                <Button aria-label="custom-btn"
                  onClick={() => {   
                    setEventCreating(true);createNewEvent();                                     
                  }}
                  style={{
                    width: 150,
                    height: 30,
                    zIndex:99,
                    marginBottom:10,
                    borderRadius: 15,
                    alignSelf: "center",
                    color: "white",
                    backgroundColor:"#AEAEB2",
                    fontSize: 14,
                    fontFamily: "AeonikBold",
                    textTransform: "none", 
                    "&:hover":{bgcolor:'black'},                  
                  }}
                >
                  Create Event
                </Button>
              </Box> 
            </Paper>
          </Modal>


</LocalizationProvider>


	);



}




export default Meetings;