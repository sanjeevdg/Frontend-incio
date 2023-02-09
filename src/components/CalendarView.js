import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { firebase, auth } from '../config/firebase-config';
import {useNavigate} from 'react-router-dom';

import {styled, withStyles, makeStyles } from "@mui/styles";

import ButtonGroup from '@mui/material/ButtonGroup';

import {Chip,Avatar,Toolbar,IconButton,Tooltip,Divider,MenuItem,Popover, Stack,
        Button,CssBaseline,TextField,FormControlLabel,Checkbox,Link,Paper,Box,
        Badge,Collapse,Grid,Typography,Modal  } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';


import {ListItem,FormControl,ListSubheader,List,ListItemButton,ListItemIcon,ListItemText,ListItemAvatar}
        from '@mui/material';

import {LockOutlined,InboxIcon,DraftsIcon,SendIcon,NotificationsNoneOutlined,Person2Outlined,
        SettingsOutlined,PowerSettingsNewOutlined,DescriptionOutlined,
        EventNoteOutlined,InsertInvitationOutlined,SourceOutlined,HighlightOffTwoTone,
       PostAddOutlined,Done,CloseOutlined,CircleOutlined,LinkOutlined} from '@mui/icons-material';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";

//import { app } from '../config/firebase-config';
import toast, { Toaster } from 'react-hot-toast';
import { set, sub } from 'date-fns';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

import {requiredValidator} from '../utils/requiredValidator';
import Header from './Header';
import Sidebar from './Sidebar';


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 365,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles({


calendarDayCell:{
'& .fc-daygrid-day':{
backgroundColor:'#f2f2f2',
borderColor:'white',
marginLeft:2,marginRight:2,padding:2,
'&: hover':{
    backgroundColor:'black'
}

},

'& .fc-daygrid-day-frame': {

'&:hover:':{
    backgroundColor:'black'
}


}



}

});

const events = [
  { title: 'Meeting', start: new Date() }
];





function CalendarView() {

  
let classes = useStyles();

let navigate = useNavigate();
const [openEventModal, setOpenEventModal] = useState(false);

    const [myEventText,setMyEventText] = useState({value:'',error:''});

    const handleOpenEventModal = () => setOpenEventModal(true);
    
    const handleCloseEventModal = () => {
          setOpenEventModal(false);
   };



/*







headerToolbar={false}
*/
    const [mname, setMName] = useState({value:'',error:''});
  const [mstart, setMStart] = useState(dayjs(new Date()));
  const [mend, setMEnd] = useState(dayjs(new Date()));

  const [mplace, setMPlace] = useState({value:'',error:''});
  const [mpeople, setMPeople] = useState({value:'',error:''});
  const [mdescription, setMDescription] = useState({value:'',error:''});



const recordEvent = () => {

const mnameError = requiredValidator(mname.value);
const mplaceError = requiredValidator(mplace.value);

   if (mnameError || mplaceError) {
      setMName({ ...mname, error: mnameError });
      setMPlace({ ...mplace, error: mplaceError });
    //  setTermAdding(false);
      return false;
    }

const body = {
   "mname": mname.value, 
   "start": mstart, 
   "end": mend,
   "place": mplace.value,
   "people": mpeople.value,
   "description": mdescription.value,
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

try{
  fetch(`https://backend-incio.onrender.com/addMeetingEvent`, {
   method: 'POST', 
   headers: {
        'Content-Type': 'application/x-www-form-urlencoded',              
      },  
   body: formBody,
}).then((resp) => {
  resp.json().then((data) => {
   // setIsLoading(false);
   //alert(JSON.stringify(data));
   //notifyaddtermsuccess();
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


<Grid item xs={10} sx={{position:'relative',top:-230,left:'17%',display:'flex',flexDirection:'row'}}>

<div className={classes.calendarDayCell} style={{position:'relative',width:'95%',height:'fit-content'}}>
 <FullCalendar 
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        weekends={false}
        events={events}
        dayCellClassNames={classes.calendarDayCell}
        dayHeaders={false}
        editable={true}
        eventContent={renderEventContent}
        dateClick={(info) => {alert(JSON.stringify(info));handleOpenEventModal();}}
        eventClick={
          function(arg){
            alert(arg.event.title)
            alert(arg.event.start)
          }
        }
      />
</div>



 <Modal
            open={openEventModal}
            onClose={() => handleCloseEventModal()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Box
                sx={{ display: "flex", flexGrow: 1, width: 280, height: 40 }}
              >
                <Typography
                  sx={{
                    marginTop: 2,
                    fontSize: 18,
                    fontFamily: "OpenSansSemiBold",
                  }}
                >
                  Schedule New Meeting
                </Typography>
                <HighlightOffTwoTone
                  onClick={() => {handleCloseEventModal();}}
                  sx={{ fontSize: 20, marginLeft: 26, marginTop: -2 }}
                />
              </Box>
      <Box sx={{ marginTop: 2 }}>
            <TextField
                  id="outlined-multiline-static"
                  label="Event Name"
                  fullWidth
                  helperText={mname.error}
                  error={!!mname.error}
                  onChange={(e) => setMName({value:e.target.value,error:''})}
                  defaultValue={mname.value}
                />
              </Box>

<Box sx={{ marginTop: 2 }}>

               <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="Start Date/Time"
        fullWidth
        value={mstart}
        onChange={(newValue) => {
          setMStart(newValue);
        }}
      /></Box>

<Box sx={{ marginTop: 2 }}>

               <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="Start Date/Time"
        fullWidth
        value={mend}
        onChange={(newValue) => {
          setMEnd(newValue);
        }}
      /></Box>

      <Box sx={{ marginTop: 2 }}>
            <TextField
                  id="outlined-multiline-static"
                  label="Place"
                  fullWidth
                  helperText={mplace.error}
                  error={!!mplace.error}
                  onChange={(e) => setMPlace({value:e.target.value,error:''})}
                  defaultValue={mplace.value}
                />
              </Box>

      <Box sx={{ marginTop: 2 }}>
            <TextField
                  id="outlined-multiline-static"
                  label="People"
                  fullWidth
                  helperText={mpeople.error}
                  error={!!mpeople.error}
                  onChange={(e) => setMPeople({value:e.target.value,error:''})}
                  defaultValue={mpeople.value}
                />
              </Box>

      <Box sx={{ marginTop: 2 }}>
            <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  fullWidth
                  helperText={mdescription.error}
                  error={!!mdescription.error}
                  onChange={(e) => setMDescription({value:e.target.value,error:''})}
                  defaultValue={mdescription.value}
                />
              </Box>


              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  onClick={() => {                    
                    recordEvent();
                  }}
                  style={{
                    width: 130,
                    height: 42,
                    borderRadius: 20,
                    alignSelf: "center",
                    color: "white",
                    fontSize: 18,
                    fontFamily: "OpenSansSemiBold",
                    textTransform: "none",
                    backgroundColor: "#407392",
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Modal>

</Grid>
</LocalizationProvider>

        );



}


// a custom render function
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b><br/>
      <i>{eventInfo.event.title}</i>
    </>
  )
}


export default CalendarView;