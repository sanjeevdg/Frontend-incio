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

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

//import { app } from '../config/firebase-config';
import toast, { Toaster } from 'react-hot-toast';
import { set, sub } from 'date-fns';

import Header from './Header';
import Sidebar from './Sidebar';



const useStyles = makeStyles({


calendarDayCell:{
'& .fc-daygrid-day':{
backgroundColor:'#f2f2f2',
borderColor:'white',
marginLeft:9,marginRight:9,padding:9
},

'& .fc-daygrid-day-frame': {



}



}

});

const events = [
  { title: 'Meeting', start: new Date() }
];





function CalendarView() {

  
let classes = useStyles();




/*







headerToolbar={false}
*/


return (




<Grid item xs={10} sx={{position:'relative',top:-230,left:'17%',display:'flex',flexDirection:'row'}}>

<div className={classes.calendarDayCell} style={{position:'relative',width:'95%',height:'fit-content'}}>
 <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        weekends={false}
        events={events}
        dayHeaders={false}
        eventContent={renderEventContent}
         eventClick={
          function(arg){
            alert(arg.event.title)
            alert(arg.event.start)
          }
        }
      />
</div>
</Grid>


        );



}


// a custom render function
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}


export default CalendarView;