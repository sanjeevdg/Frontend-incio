import React, { useState,useEffect } from 'react';

import PropTypes from 'prop-types';
import { firebase, auth } from '../config/firebase-config';
import {useNavigate} from 'react-router-dom';

import {styled, withStyles, makeStyles } from "@mui/styles";



import ButtonGroup from '@mui/material/ButtonGroup';

import {CircularProgress,Chip,Avatar,Toolbar,IconButton,Tooltip,Divider,MenuItem,Popover, Stack,
        Button,CssBaseline,TextField,FormControlLabel,Checkbox,Link,Paper,Box,
        Badge,Collapse,Grid,Typography  } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { DataGrid, GridColDef } from '@mui/x-data-grid';

import {ListItem,FormControl,ListSubheader,List,ListItemButton,ListItemIcon,ListItemText,ListItemAvatar}
        from '@mui/material';

import {Edit,Delete,LockOutlined,InboxIcon,DraftsIcon,SendIcon,NotificationsNoneOutlined,Person2Outlined,
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


function ListView() {


const [myevents, setMyEvents] = useState([]);
const [eventsLoading, setEventsLoading] = useState(false);

const [hoveredRow, setHoveredRow] = useState(null);

  const onMouseEnterRow = (event) => {
    const id = Number(event.currentTarget.getAttribute("data-id"));
    setHoveredRow(id);
  };

  const onMouseLeaveRow = (event) => {
    setHoveredRow(null);
  };

  const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    width: 170,
    editable: true,
  },
  {
    field: 'mstart',
    headerName: 'Start',
    width: 210,
    editable: true,
  },
  {
    field: 'location',
    headerName: 'Location',
    width: 300,
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 140,
    editable: true,
  },
  {
  field: "actions",
  headerName: "",
  width: 120,
  sortable: false,
  disableColumnMenu: true,
  renderCell: (params) => {
    if (hoveredRow === params.id) {
      return (
        <Box
          sx={{
            backgroundColor: "whitesmoke",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <IconButton onClick={() => {editEvent(params.id)}}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => {callDelete(params.id)}}>
            <Delete />
          </IconButton>
        </Box>
      );
    } else return null;
  }
}
];

const editEvent = (id) => {


}

const callDelete = (id) => {


}

  
useEffect(() => {

// backend-incio.onrender.com
try{
  fetch('https://backend-incio.onrender.com/getEventsList', {

   method: 'POST', 
   headers: {
        'Content-Type': 'application/x-www-form-urlencoded',              
      }   
}).then((resp) => {
  resp.json().then((data) => {
  let adata = data;
  setMyEvents(adata.myevents);
  setEventsLoading(true);
console.log('adata=',adata);
     });
});
} catch(e) { console.log('caught err'+e.message); }








}, []);



return (
<>


<Grid sx={{position:'relative',display:'flex',flexDirection:'row'}} item xs={10}>


<Typography sx={{position:'relative',marginTop:8,marginLeft:10,fontSize:30,fontFamily:'AeonikBold'}}>Today</Typography>


</Grid>


<Grid sx={{position:'relative',top:-240,left:225,display:'flex',flexDirection:'row'}} item xs={10}>


<Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    width:'95%',
                    flexDirection: 'column',
                    height: 470,
                  }}
                >

{eventsLoading?
   <DataGrid
   rowHeight={40}
   initialState={{ pinnedColumns: { right: ["actions"] } }}
   componentsProps={{
  row: {
    onMouseEnter: onMouseEnterRow,
    onMouseLeave: onMouseLeaveRow
  }
}}
        rows={myevents}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
   sx={{
    border:0,borderColor:'white',
    "& .MuiDataGrid-iconSeparator": {
      display: "none"
    },
    "& .MuiDataGrid-pinnedColumnHeaders": {
      boxShadow: "none",
      backgroundColor: "transparent"
    },
    "& .MuiDataGrid-pinnedColumns": {
      boxShadow: "none",
      backgroundColor: "transparent",
      "& .MuiDataGrid-cell": {
        padding: 0
      }
    },
    "& .MuiDataGrid-row:hover": {
    backgroundColor: "skyblue"
    },
    "& .MuiDataGrid-row": {
      cursor: "pointer",
      border:1,borderColor:'white',
      "&:hover": {
        backgroundColor: "#000"
      },

      "&:first-of-type": {
        borderTop: "1px solid rgba(224, 224, 224, 1)"
      }
    },
    "& .MuiDataGrid-cell:focus": {
      outline: "none"
    },
    "& .MuiDataGrid-cell": {
      fontSize:11,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'
    },
    "& .MuiDataGrid-columnHeaderTitle": {
      fontSize:12,fontFamily:'AeonikBold',height:50
    },
    "& .MuiDataGrid-cell:focus-within": {
      outline: "none"
    }
  }}     
      />
:<CircularProgress color="success" />}


</Paper>


</Grid>
</>
)
}

export default ListView;