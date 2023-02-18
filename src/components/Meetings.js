import React, { useState,useEffect } from 'react';

import PropTypes from 'prop-types';
import { firebase, auth } from '../config/firebase-config';
import {useNavigate} from 'react-router-dom';

import {styled, withStyles, makeStyles } from "@mui/styles";



import ButtonGroup from '@mui/material/ButtonGroup';

import {Autocomplete,Chip,Avatar,Toolbar,IconButton,Tooltip,Divider,MenuItem,Popover, Stack,
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


import {userlist} from '../config/dummylist';



import {requiredValidator,emailValidator} from '../utils/validators';

import Header from './Header';
import Sidebar from './Sidebar';
import CardView from './CardView';
import ListView from './ListView';
import CalendarView from './CalendarView';




//import Meeting from 'google-meet-api';

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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  elevation:0,
  color: theme.palette.text.secondary,
}));


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
const [people, setPeople] = useState({value:'',error:''});


const [rptmon,setRptMon] = useState(false);
const [rpttue,setRptTue] = useState(false);
const [rptwed,setRptWed] = useState(false);
const [rptthu,setRptThu] = useState(false);
const [rptfri,setRptFri] = useState(false);
const [rptsat,setRptSat] = useState(false);
const [rptsun,setRptSun] = useState(false);





useEffect(() => {

/*

Meeting({
clientId : '593436295572-fm9krcm5lg4u7kv70dkchm6fk9n0q0f5.apps.googleusercontent.com',
clientSecret : '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',
refreshToken : '',
date : "2023-02-19",
time : "10:59",
summary : 'summary',
location : 'location',
description : 'description'
}).then(function(result){
console.log('gmeetresponse:'+result);//result is the final link
})

*/



}, []);







function createNewEvent() {


const nameError = requiredValidator(name.value);
const locationError = requiredValidator(location.value);
const descriptionError = requiredValidator(description.value);
const uniquelinkError = requiredValidator(uniquelink.value);
//const mstartError = requiredValidator(mstart.value);
const durationError = requiredValidator(duration.value);
// const peopleError = requiredValidator(people.value);




   if (nameError || locationError || descriptionError || uniquelinkError || durationError) {
      setName({ ...name, error: nameError });
      setLocation({ ...location, error: locationError });
      setDescription({...description,error:descriptionError});
      setUniqueLink({...uniquelink,error:uniquelinkError});
   //   setMStart({...mstart,error:mstartError});
      setDuration({...duration,error:durationError});

   //   setPeople({ ...people, error: peopleError });
      
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
   "rptmon":rptmon ,
   "rpttue":rpttue ,
   "rptwed":rptwed ,
   "rptthu":rptthu,
   "rptfri":rptfri ,
   "rptsat":rptsat ,
   "rptsun":rptsun    
};

console.log('body==',JSON.stringify(body));

var formBody = [];
for (var key in body) {
   var encodedKey = encodeURIComponent(key);
   var encodedValue = encodeURIComponent(body[key]);
   formBody.push(encodedKey + '=' + encodedValue);
}
formBody = formBody.join('&');
// curl -d "formname=test1&displayname=est1" -X POST https://710d-2409-4060-1e-b158-1d34-fc03-ff6d-1ef2.ngrok.io/createNewForm

// 
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


const getGMeetLink = () => {

/*

Meeting({
clientId : '593436295572-fm9krcm5lg4u7kv70dkchm6fk9n0q0f5.apps.googleusercontent.com',
clientSecret : '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',
refreshToken : '',
date : "2023-02-19",
time : "10:59",
summary : 'summary',
location : 'location',
description : 'description'
}).then(function(result){
console.log('gmeetresponse:'+result);//result is the final link
})
*/

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






            <Paper elevation={0} sx={{marginBottom:10,marginLeft:28,marginTop:14}}>

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

<Grid item xs={4} md={4} sx={{width:240,marginRight:2,marginTop:1}}>

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
              /> <span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(name.error)}</span>
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
              /> <span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(location.error)}</span>
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
              /> <span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(description.error)}</span>
</Box>




</Grid>



<Grid item xs={4} sx={{width:250,marginRight:2,marginTop:1}}>


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
        </Select> <span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(duration.error)}</span>
</Box>



<Box sx={{position:'relative',flexDirection:'column',marginTop:4,display:'flex',alignItems:'center'}}>
 <Box sx={{width:'100%',marginTop:-2,marginBottom:1}}><Typography noWrap sx={{fontSize:13,color:'#000',fontFamily:'AeonikBold'}}>
              Repeat on<br/></Typography></Box>
              
             <Stack direction="row" spacing={1} sx={{flexWrap:'wrap',width:280,marginTop:-1}}>
             <Item sx={{display:'flex',flexDirection:'row',alignItems:'center'}} elevation={0}>
             <Checkbox
                required
                sx={{marginRight:-1,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold'}}
                size="small"
                value={rptmon}
                onChange={(e) => { setRptMon(e.target.checked) }}                              
              /><Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>MON</Typography>
              </Item>
<Item sx={{display:'flex',flexDirection:'row',alignItems:'center'}} elevation={0}>
<Checkbox
                required
                sx={{marginLeft:-1,marginRight:-1,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold'}}
                size="small"
                value={rpttue}
                onChange={(e) => { setRptTue(e.target.checked) }}                              
              /><Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>TUE</Typography>
</Item><Item sx={{display:'flex',flexDirection:'row',alignItems:'center'}} elevation={0}>
<Checkbox
                required
                sx={{marginLeft:-1,marginRight:-1,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold'}}
                size="small"
                value={rptwed}
                onChange={(e) => { setRptWed(e.target.checked) }}                              
              /><Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>WED</Typography>
</Item><Item sx={{display:'flex',flexDirection:'row',alignItems:'center'}} elevation={0}>
<Checkbox
                required
                sx={{marginLeft:-1,marginRight:-1,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold'}}
                size="small"
                value={rptthu}
                onChange={(e) => { setRptThu(e.target.checked) }}                              
              /><Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>THU</Typography>
</Item>

<Item sx={{display:'flex',flexDirection:'row',alignItems:'center'}} elevation={0}>

<Checkbox
                required
                sx={{marginLeft:-1,marginRight:-1,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold'}}
                size="small"
                value={rptfri}
                onChange={(e) => { setRptFri(e.target.checked) }}                              
              /><Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>FRI</Typography>
             
</Item><Item sx={{display:'flex',flexDirection:'row',alignItems:'center'}} elevation={0}>

<Checkbox
                required
                sx={{marginLeft:-1,marginRight:-1,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold'}}
                size="small"
                value={rptsat}
                onChange={(e) => { setRptSat(e.target.checked) }}                              
              /><Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>SAT</Typography>
         

</Item><Item sx={{display:'flex',flexDirection:'row',alignItems:'center'}} elevation={0}>

<Checkbox
                required
                sx={{marginLeft:-1,marginRight:-1,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold'}}
                size="small"
                value={rptsun}
                onChange={(e) => { setRptSun(e.target.checked) }}                              
              /><Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>SUN
              </Typography>
              </Item></Stack>
             
              
               

</Box>

 </Grid>



<Grid item xs={4} md={4} sx={{width:250,marginRight:2,marginTop:1}}>

<Box sx={{position:'relative'}}>


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
              /> <span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(uniquelink.error)}</span>
</Box>





</Grid>



<Grid item xs={4}>


<Box sx={{position:'relative',marginTop:1,height:60}}>
 <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>
              People</Typography>


 <Autocomplete
      disablePortal
      variant="standard"
      id="combo-box-demo"
       sx={{
        '& input':{height:3,border:0,outline:'none'},
        width:260,
      }}
      options={userlist.map((option) => option.name)}
      renderInput={(params) => <TextField {...params} sx={{border:0,outline:'none'}}/>}
    />              
      {/*       <InputBase
                required
                sx={{height:35,width:'100%' ,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                type="text"
                fullWidth                
                value={people.value}
                onChange={(e) => { setPeople({value:e.target.value,error:''}); }}                              
              /> */}
      <span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(people.error)}</span>
</Box>

<Paper sx={{maxHeight:'100%',overflow:'auto'}}>
    <List sx={{ width: '100%', marginTop:2,maxWidth: 360, bgcolor: 'background.paper' }}>
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

</Paper>


</Grid>

</Grid>


              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  marginTop:3,
                  zIndex:99
                }}
              >

              <Button aria-label="custom-btn"
                  
                  sx={{
                    width: 150,
                    height: 30,
                    zIndex:99,
                    marginRight:3,
                    borderRadius: 6,
                    alignSelf: "center",
                    color: "#000",
                    backgroundColor:"#f2f2f2",
                    fontSize: 14,
                    fontFamily: "AeonikBold",
                    textTransform: "none",                                   
                    "&:hover":{backgroundColor:'black',color:'#fff'}
                  }}
                >
                Cancel
                </Button>
                <Button aria-label="custom-btn"
                  
                  sx={{
                    width: 150,
                    height: 30,
                    zIndex:99,
                    marginRight:3,
                    borderRadius: 6,
                    alignSelf: "center",
                    color: "#000",
                    backgroundColor:"#f2f2f2",
                    fontSize: 14,
                    fontFamily: "AeonikBold",
                    textTransform: "none",                                   
                    "&:hover":{backgroundColor:'black',color:'#fff'}
                  }}
                   onClick={() => {   
                    setEventCreating(true);createNewEvent();                                     
                  }}
                >
                Create event
                </Button>
                
              </Box> 
            </Paper>
          
</Grid>
</LocalizationProvider>


	);



}




export default Meetings;