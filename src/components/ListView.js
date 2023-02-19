import React, { useState,useEffect } from 'react';

import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';

import { firebase, auth } from '../config/firebase-config';
import {useNavigate} from 'react-router-dom';

import {styled, withStyles, makeStyles } from "@mui/styles";



import ButtonGroup from '@mui/material/ButtonGroup';

import {CircularProgress,Chip,Avatar,Toolbar,IconButton,Tooltip,Divider,MenuItem,Popover, Stack,
        Button,CssBaseline,TextField,FormControlLabel,Checkbox,Link,Paper,Box,
        Badge,Collapse,Grid,Typography,InputBase,Select  } from '@mui/material';


import {Table,TableBody,TableCell,TableContainer,Autocomplete,
        TableHead,TableRow,TablePagination,TableFooter} from '@mui/material';

import dayjs from 'dayjs';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { DataGrid, GridColDef } from '@mui/x-data-grid';

import {ListItem,FormControl,ListSubheader,List,ListItemButton,ListItemIcon,ListItemText,ListItemAvatar}
        from '@mui/material';

import {Edit,Delete,LockOutlined,InboxIcon,DraftsIcon,SendIcon,NotificationsNoneOutlined,Person2Outlined,
        SettingsOutlined,PowerSettingsNewOutlined,DescriptionOutlined,KeyboardArrowUp,KeyboardArrowDown,
        EventNoteOutlined,InsertInvitationOutlined,SourceOutlined,
       PostAddOutlined,Done,CloseOutlined,CircleOutlined,LinkOutlined,
       FirstPage,LastPage,KeyboardArrowLeft,KeyboardArrowRight} from '@mui/icons-material';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

//import { app } from '../config/firebase-config';
import toast, { Toaster } from 'react-hot-toast';
import { set, sub } from 'date-fns';

import Header from './Header';
import Sidebar from './Sidebar';
import {requiredValidator,emailValidator} from '../utils/validators';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import {userlist} from '../config/dummylist';



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






function ListView() {


const [myevents, setMyEvents] = useState([]);
const [eventsLoading, setEventsLoading] = useState(false);


let navigate = useNavigate();

let classes = useStyles();

const notifyediteventsuccess = () => toast.success("Client has been edited in database!");


const [openDurationSelect, setOpenDurationSelect] = React.useState(false);

  const handleCloseDurationSelect = () => {
    setOpenDurationSelect(false);
  };

  const handleOpenDurationSelect = () => {
    setOpenDurationSelect(true);
  };



const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - myevents.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };




  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


function Row(props) {
  const { row } = props;

  const [open, setOpen] = React.useState(false);

//console.log('mrow=='+JSON.stringify(row));

const [nametr, setNameTr] = useState({value:row.name,error:''});
const [locationtr, setLocationTr] = useState({value:row.location,error:''});
const [descriptiontr, setDescriptionTr] = useState({value:row.description,error:''});
const [uniquelinktr, setUniqueLinkTr] = useState({value:row.uniquelink,error:''});
const [mstarttr,setMStartTr] = useState(dayjs(new Date()));
const [durationtr,setDurationTr] = useState({value:row.duration,error:''});
const [peopletr, setPeopleTr] = useState({value:row.people,error:''});




const [rptmontr,setRptMonTr] = useState(row.rptmon);
const [rpttuetr,setRptTueTr] = useState(row.rpttue);
const [rptwedtr,setRptWedTr] = useState(row.rptwed);
const [rptthutr,setRptThuTr] = useState(row.rptthu);
const [rptfritr,setRptFriTr] = useState(row.rptfri);
const [rptsattr,setRptSatTr] = useState(row.rptsat);
const [rptsuntr,setRptSunTr] = useState(row.rptsun);

const [myusers, setMyUsers] = useState(null);
const [myusersloaded,setMyUsersLoaded] = useState(false);



useEffect(() => {

// retrieve all users here 
// backend-incio.onrender.com

try{
  fetch('https://backend-incio.onrender.com/getAllUsers', {

   method: 'POST', 
   headers: {
        'Content-Type': 'application/x-www-form-urlencoded',              
      }   
}).then((resp) => {
  resp.json().then((data) => {
  let adata = data;
  setMyUsers(adata.myusers); 
  setMyUsersLoaded(true); 
console.log('adata=',adata);
     });
});
} catch(e) { console.log('caught err'+e.message); }





},[]);


function editEventTr() {


const nametrError = requiredValidator(nametr.value);
const locationtrError = requiredValidator(locationtr.value);
const descriptiontrError = requiredValidator(descriptiontr.value);
const uniquelinktrError = requiredValidator(uniquelinktr.value);
//const mstartError = requiredValidator(mstart.value);
const durationtrError = requiredValidator(durationtr.value);
// const peopleError = requiredValidator(people.value);




   if (nametrError || locationtrError || descriptiontrError || uniquelinktrError || durationtrError) {
      setNameTr({ ...nametr, error: nametrError });
      setLocationTr({ ...locationtr, error: locationtrError });
      setDescriptionTr({...descriptiontr,error:descriptiontrError});
      setUniqueLinkTr({...uniquelinktr,error:uniquelinktrError});
   //   setMStart({...mstart,error:mstartError});
      setDurationTr({...durationtr,error:durationtrError});

   //   setPeople({ ...people, error: peopleError });
      
    //  setTermAdding(false);
    alert('not sending...')
      return false;
    }


const body = {
   "event_id":row.id,
   "name": nametr.value, 
   "location": locationtr.value, 
   "description": descriptiontr.value,
   "uniquelink": uniquelinktr.value,
   "mstart": mstarttr,
   "duration": durationtr.value,
   "people": peopletr.value, 
   "rptmon":rptmontr ,
   "rpttue":rpttuetr ,
   "rptwed":rptwedtr ,
   "rptthu":rptthutr,
   "rptfri":rptfritr ,
   "rptsat":rptsattr ,
   "rptsun":rptsuntr    
};

console.log('mmbody==',body);

var formBody = [];
for (var key in body) {
   var encodedKey = encodeURIComponent(key);
   var encodedValue = encodeURIComponent(body[key]);
   formBody.push(encodedKey + '=' + encodedValue);
}
formBody = formBody.join('&');
// curl -d "formname=test1&displayname=est1" -X POST https://710d-2409-4060-1e-b158-1d34-fc03-ff6d-1ef2.ngrok.io/createNewForm
// backend-incio.onrender.com
try{
  fetch(`https://backend-incio.onrender.com/editEvent`, {
   method: 'POST', 
   headers: {
        'Content-Type': 'application/x-www-form-urlencoded',              
      },  
   body: formBody,
}).then((resp) => {
  resp.json().then((data) => {
   // setIsLoading(false);
   //alert(JSON.stringify(data));
   notifyediteventsuccess();
   //setTermAdding2(false);
 //  setTimeout(() => { navigate(0);},1000);
//alert('success');
//window.reload();
    
  //  }
  //  )

  

})
})} catch(e) { alert('caught err'+e.message); }




}


  return (
 <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={(e) => {e.stopPropagation();setOpen(!open);}}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>
          {row.name}
        </TableCell>
        <TableCell align="right">{new Date(row.mstart).toGMTString()}</TableCell>
        <TableCell align="right">{row.location}</TableCell>
        <TableCell align="right">{row.uniquelink}</TableCell>
        
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>


 <Paper elevation={0} sx={{marginBottom:3,marginTop:1,overflow:'hidden'}}> 

     
<Box sx={{display:'flex',flexDirection:'row'}}>   


<Box sx={{marginLeft:1,marginRight:2,marginTop:1,width:240,marginBottom:2}}>
<Box sx={{width:250}}>
 <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>
              Event Name</Typography>
             <InputBase
                required
                sx={{height:35,width:'100%' ,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                type="text"
                fullWidth                
                value={nametr.value}
                onChange={(e) => { setNameTr({value:e.target.value,error:''}) }}                              
              /> <span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(nametr.error)}</span>
</Box>
<Box sx={{width:250,position:'relative',marginTop:3}}>

 <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>

              Location</Typography>
             <InputBase
                required
                sx={{height:35,width:'100%' ,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                type="text"
                fullWidth   
                value={locationtr.value}             
                onChange={(e) => { setLocationTr({value:e.target.value,error:''}) }}                              
              /> <span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(locationtr.error)}</span>
</Box>

<Box sx={{width:250,position:'relative',marginTop:3}}>

 <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>

              Description</Typography>
             <InputBase
                required
                sx={{height:100,width:'100%' ,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                multiline
                rows={5}
                type="text"
                value={descriptiontr.value}
                fullWidth                
                onChange={(e) => { setDescriptionTr({value:e.target.value,error:''}) }}                              
              /> <span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(descriptiontr.error)}</span>
</Box>




</Box>



<Box sx={{width:250,marginRight:2,marginTop:1}}>


<Box sx={{position:'relative'}}>

 <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>

              Time</Typography>

               <DateTimePicker className={classes.dttmp}
        renderInput={(props) => <TextField style={{fontSize:12, fontFamily:'AeonikBold'}} size="small" {...props} />}
        style={{height:23}}
        value={mstarttr}
        onChange={(newValue) => {
          setMStartTr(newValue);
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
          value={durationtr.value}
          onChange={(e) => { setDurationTr({value:e.target.value,error:''}) }}
        >
          <MenuItem value={'halfhour'}><Typography sx={{fontSize:12, fontFamily:'AeonikBold'}}>30 min</Typography></MenuItem>
          <MenuItem value={'onehour'}><Typography sx={{fontSize:12, fontFamily:'AeonikBold'}}>1 hour</Typography></MenuItem>
          <MenuItem value={'fewhours'}><Typography sx={{fontSize:12, fontFamily:'AeonikBold'}}>Several hours</Typography></MenuItem>
          <MenuItem value={'oneweek'}><Typography sx={{fontSize:12, fontFamily:'AeonikBold'}}>Less than one week</Typography></MenuItem>
          <MenuItem value={'onemonth'}><Typography sx={{fontSize:12, fontFamily:'AeonikBold'}}>Less than one month</Typography></MenuItem>
          <MenuItem value={'indefinite'}><Typography sx={{fontSize:12, fontFamily:'AeonikBold'}}>Ongoing indefinite</Typography></MenuItem>
        </Select> <span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(durationtr.error)}</span>
</Box>



<Box sx={{position:'relative',flexDirection:'column',marginTop:4,display:'flex',alignItems:'center'}}>
 <Box sx={{width:'100%',marginTop:-2,marginBottom:1}}><Typography noWrap sx={{fontSize:13,color:'#000',fontFamily:'AeonikBold'}}>
              Repeat on<br/></Typography></Box>
              
             <Stack direction="row" spacing={1} sx={{flexWrap:'wrap',width:290,marginTop:-1}}>
             <Item sx={{display:'flex',marginLeft:1,flexDirection:'row',alignItems:'center'}} elevation={0}>
             <Checkbox
                required
                sx={{marginRight:-1,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold'}}
                size="small"
                value={rptmontr}
                checked={rptmontr}
                onChange={(e) => { setRptMonTr(e.target.checked) }}                              
              /><Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>MON</Typography>
              </Item>
<Item sx={{display:'flex',flexDirection:'row',alignItems:'center'}} elevation={0}>
<Checkbox
                required
                sx={{marginLeft:-1,marginRight:-1,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold'}}
                size="small"
                value={rpttuetr}
                checked={rpttuetr}
                onChange={(e) => { setRptTueTr(e.target.checked) }}                              
              /><Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>TUE</Typography>
</Item><Item sx={{display:'flex',flexDirection:'row',alignItems:'center'}} elevation={0}>
<Checkbox
                required
                sx={{marginLeft:-1,marginRight:-1,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold'}}
                size="small"
                checked={rptwedtr}
                value={rptwedtr}
                onChange={(e) => { setRptWedTr(e.target.checked) }}                              
              /><Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>WED</Typography>
</Item><Item sx={{display:'flex',flexDirection:'row',alignItems:'center'}} elevation={0}>
<Checkbox
                required
                sx={{marginRight:-1,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold'}}
                size="small"
                checked={rptthutr}
                value={rptthutr}
                onChange={(e) => { setRptThuTr(e.target.checked) }}                              
              /><Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>THU</Typography>
</Item>

<Item sx={{display:'flex',flexDirection:'row',alignItems:'center'}} elevation={0}>

<Checkbox
                required
                sx={{marginLeft:-1,marginRight:-1,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold'}}
                size="small"
                checked={rptfritr}
                value={rptfritr}
                onChange={(e) => { setRptFriTr(e.target.checked) }}                              
              /><Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>FRI</Typography>
             
</Item><Item sx={{display:'flex',flexDirection:'row',alignItems:'center'}} elevation={0}>

<Checkbox
                required
                sx={{marginLeft:-1,marginRight:-1,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold'}}
                size="small"
                checked={rptsattr}
                value={rptsattr}
                onChange={(e) => { setRptSatTr(e.target.checked) }}                              
              /><Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>SAT</Typography>
         

</Item><Item sx={{display:'flex',flexDirection:'row',alignItems:'center'}} elevation={0}>

<Checkbox
                required
                sx={{marginLeft:-1,marginRight:-1,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold'}}
                size="small"
                checked={rptsuntr}
                value={rptsuntr}
                onChange={(e) => { setRptSunTr(e.target.checked) }}                              
              /><Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>SUN
              </Typography>
              </Item></Stack>
             
              
               

</Box>
</Box>
 
<Box sx={{width:250,marginRight:2,marginTop:1}}>

<Box sx={{position:'relative'}}>


 <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>

              Unique link</Typography>
             <InputBase
                required
                sx={{height:35,width:'100%' ,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                type="text"
                value={uniquelinktr.value}
                fullWidth                
                onChange={(e) => { setUniqueLinkTr({value:e.target.value,error:''}) }}                              
              /> <span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(uniquelinktr.error)}</span>
</Box>





</Box>



<Box sx={{width:250,position:'relative'}}>


<Box sx={{position:'relative',marginTop:1,height:60}}>
 <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>
              People</Typography>


<Autocomplete
      disablePortal
      multiple
      freeSolo
      value={peopletr.value}
      getOptionLabel={(option) => option}
      isOptionEqualToValue={(option, value) => option === value.name}
      variant="standard"
      id="combo-box-demo"
       sx={{
        '& input':{height:3,border:0,outline:'none'},
        width:260,
      }}
      onChange={(event, newValue) => {
          setPeopleTr({value:newValue,error:''});
        }}
      options={myusersloaded?myusers.map((option) => option.name):[{name:'dummyuser',value:'dummyuser'}]}
      renderInput={(params) => { 
         return (<TextField  sx={{border:0,overflowY:'auto',maxHeight:200,outline:'none'}} { ...params } />);
            }} />              
      {/*       <InputBase
                required
                sx={{height:35,width:'100%' ,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                type="text"
                fullWidth                
                value={people.value}
                onChange={(e) => { setPeople({value:e.target.value,error:''}); }}                              
              /> */}
      <span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(peopletr.error)}</span>
</Box>

{/*
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
*/}
</Box>

</Box>     

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
                    editEventTr();                                     
                  }}
                >
                Edit event
                </Button>
                
              </Box> 
         

            </Paper>


          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>


  );
}

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    mstart: PropTypes.string.isRequired,
    uniquelink: PropTypes.string.isRequired,
  })
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


<Grid sx={{position:'relative',top:-150,left:205,display:'flex',flexDirection:'row'}} item xs={10}>


<Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    width:'100%',
                    flexDirection: 'column',
                    height: 800,
                  }}
                >

{eventsLoading?


 <TableContainer component={Paper} sx={{fontSize:13,fontFamily:'AeonikBold'}}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell align="right">Start</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">UniqueLink</TableCell>
            
          </TableRow>

        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? myevents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : myevents
          ).map((row) => (
            <Row key={row.name} row={row} />
          ))}
  {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[2, 4, { label: 'All', value: -1 }]}
              colSpan={3}
              count={myevents.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>:<CircularProgress color="success" />
   }


</Paper>



</Grid>

</>
)
}

export default ListView;