import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { firebase, auth } from '../config/firebase-config';
import {useNavigate} from 'react-router-dom';

import {styled, withStyles, makeStyles } from "@mui/styles";



import ButtonGroup from '@mui/material/ButtonGroup';

import {CircularProgress,Chip,Avatar,Toolbar,IconButton,Tooltip,Divider,MenuItem,Popover, Stack,
        Button,CssBaseline,TextField,FormControlLabel,Checkbox,Link,Paper,Box,
        Badge,Collapse,Grid,Typography,Modal,InputBase  } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';


import {Select, ListItem,FormControl,ListSubheader,List,ListItemButton,ListItemIcon,ListItemText,ListItemAvatar}
        from '@mui/material';

import {LockOutlined,InboxIcon,DraftsIcon,SendIcon,NotificationsNoneOutlined,Person2Outlined,
        SettingsOutlined,PowerSettingsNewOutlined,DescriptionOutlined,
        EventNoteOutlined,InsertInvitationOutlined,SourceOutlined,
       PostAddOutlined,Done,CloseOutlined,CircleOutlined,LinkOutlined,Edit,Delete} from '@mui/icons-material';

import { DataGrid, GridColDef } from '@mui/x-data-grid';

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

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];


function Clients() {

let classes = useStyles();

const [clientsLoading, setClientsLoading] = useState(true);

const [openClientModal, setOpenClientModal] = useState(false);
const handleOpenClientModal = () => setOpenClientModal(true);
const handleCloseClientModal = () => {
          setOpenClientModal(false);
   };
const [hoveredRow, setHoveredRow] = useState(null);

  const onMouseEnterRow = (event) => {
    const id = Number(event.currentTarget.getAttribute("data-id"));
    setHoveredRow(id);
  };

  const onMouseLeaveRow = (event) => {
    setHoveredRow(null);
  };


const [name, setName] = useState({value:'',error:''});
const [email, setEmail] = useState({value:'',error:''});
const [phone, setPhone] = useState({value:'',error:''});
const [address, setAddress] = useState({value:'',error:''});
const [zip, setZip] = useState({value:'',error:''});
const [country, setCountry] = useState({value:'',error:''});

const [cname, setCName] = useState({value:'',error:''});
const [cemail, setCEmail] = useState({value:'',error:''});
const [cphone, setCPhone] = useState({value:'',error:''});
const [caddress, setCAddress] = useState({value:'',error:''});
const [czip, setCZip] = useState({value:'',error:''});
const [ccountry, setCCountry] = useState({value:'',error:''});




/*
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'term',
    headerName: 'Term name',
    width: 250,
    editable: true,
  },
  {
    field: 'termdesc',
    headerName: 'Description',
    width: 300,
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
          <IconButton onClick={() => {editClient(params.id)}}>
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
*/

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenEditModal = () => setEditModalOpen(true);
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };


async function createClient() {


alert('cal');

const nameError = requiredValidator(name.value);
const emailError = emailValidator(email.value);

   if (nameError || emailError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
    //  setTermAdding(false);
      return false;
    }



}

const callDelete = (id) => {


// alert('delete pressed on id='+id);




}





const editClient = (id) => {




}





return (

<Grid container>



<Header />

<Sidebar />

<Grid item xs={10} sx={{marginBottom:20,display:'flex',flexDirection:'row'}}>

<Box sx={{position:'absolute',zIndex:99,width:'70%',height:50}}>
<ButtonGroup variant="contained"  aria-label="outlined primary button group" sx={{height:28,zIndex:99}}>
<Button sx={{'&:hover': {backgroundColor:'black'},textTransform:'none',border:'none',outline:'none',backgroundColor:'#AEAEB2',color:'white',fontSize:13,fontFamily:'AeonikBold'}}>Clients</Button>
<Button sx={{'&:hover': {backgroundColor:'black'},backgroundColor:'#AEAEB2',textTransform:'none',border:'none',outline:'none',color:'white',fontSize:13,fontFamily:'AeonikBold'}}>Team</Button>
 </ButtonGroup>

</Box>

<Box sx={{position:'absolute',zIndex:99,flexDirection:'row',left:'70%',height:50}}>
<Button onClick={() => handleOpenClientModal()} sx={{width:180,height:30,color:'white',textTransform:'none',backgroundColor:'#9249f4',display:'flex'}}>+ Create New Client</Button>
</Box>

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

{clientsLoading?
   <DataGrid
   initialState={{ pinnedColumns: { right: ["actions"] } }}
   componentsProps={{
  row: {
    onMouseEnter: onMouseEnterRow,
    onMouseLeave: onMouseLeaveRow
  }
}}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
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
    "& .MuiDataGrid-row": {
      cursor: "pointer",
      border:0,borderColor:'white',
      "&:hover": {
        backgroundColor: "whitesmoke"
      },
      "&:first-of-type": {
        borderTop: "1px solid rgba(224, 224, 224, 1)"
      }
    },
    "& .MuiDataGrid-cell:focus": {
      outline: "none"
    },
    "& .MuiDataGrid-cell:focus-within": {
      outline: "none"
    }
  }}     
      />
:<CircularProgress color="success" />}


</Paper>



</Grid>








<Modal
            open={openClientModal}
            onClose={() => handleCloseClientModal()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"            
          >
            <Paper elevation={2} sx={clientstyle}>

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
                  Create New Client
                </Typography><Box sx={{width:'35%', justifyContent:'flex-end',alignItems:'flex-end'}}></Box><Box sx={{width:'12%', justifyContent:'flex-end',alignItems:'flex-end',alignSelf:'flex-end'}}>
                <CloseOutlined
                  onClick={() => {handleCloseClientModal();}}
                  sx={{ fontSize: 20}}
                />
              </Box></Box></Grid>

<Grid item xs={12} sx={{display:'flex',flexDirection:'row'}}>

<Grid item xs={4} sx={{marginRight:3}}>

<Box sx={{position:'relative'}}>
 <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>
              Name</Typography>
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

              Email</Typography>
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

              Phone</Typography>
             <InputBase
                required
                sx={{height:35,width:'100%' ,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                type="phone"
                value={phone.value}
                fullWidth                
                onChange={(e) => { setPhone({value:e.target.value,error:''}) }}                              
              /> <span style={{color:"#FF3B30"}}>{(phone.error)}</span>
</Box>

<Box sx={{position:'relative',marginTop:1}}>

 <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>

              Address</Typography>
             <InputBase
                required
                sx={{height:35,width:'100%' ,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                type="email"
                value={address.value}
                fullWidth                
                onChange={(e) => { setAddress({value:e.target.value,error:''}) }}                              
              /> <span style={{color:"#FF3B30"}}>{(address.error)}</span>
</Box>

<Box sx={{position:'relative',marginTop:1}}>

 <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>

              ZIP</Typography>
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

<Box sx={{position:'relative',marginTop:1}}>

 <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>

              Country</Typography>
           <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          sx={{height:40,width:'100%',borderRadius:0,border:0,outline:'none'}}
          onClose={handleClose}
          onOpen={handleOpen}
          value={country.value}
          onChange={(e) => { setCountry({value:e.target.value,error:''}) }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select> <span style={{color:"#FF3B30"}}>{(country.error)}</span>
</Box>

</Grid>



<Grid item xs={4} sx={{marginRight:3}}>

<Box sx={{position:'relative'}}>
 <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>
             Company Name</Typography>
             <InputBase
                required
                sx={{height:35,width:'100%' ,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                type="text"
                fullWidth                
                value={cname.value}
                onChange={(e) => { setCName({value:e.target.value,error:''}) }}                              
              /> <span style={{color:"#FF3B30"}}>{(cname.error)}</span>
</Box>
<Box sx={{position:'relative',marginTop:1}}>

 <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>

              Company Email</Typography>
             <InputBase
                required
                sx={{height:35,width:'100%' ,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                type="email"
                fullWidth   
                value={cemail.value}             
                onChange={(e) => { setCEmail({value:e.target.value,error:''}) }}                              
              /> <span style={{color:"#FF3B30"}}>{(cemail.error)}</span>
</Box>

<Box sx={{position:'relative',marginTop:1}}>

 <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>

              Company Phone</Typography>
             <InputBase
                required
                sx={{height:35,width:'100%' ,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                type="phone"
                value={cphone.value}
                fullWidth                
                onChange={(e) => { setCPhone({value:e.target.value,error:''}) }}                              
              /> <span style={{color:"#FF3B30"}}>{(cphone.error)}</span>
</Box>

<Box sx={{position:'relative',marginTop:1}}>

 <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>

              Company Address</Typography>
             <InputBase
                required
                sx={{height:35,width:'100%' ,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                type="text"
                value={caddress.value}
                fullWidth                
                onChange={(e) => { setAddress({value:e.target.value,error:''}) }}                              
              /> <span style={{color:"#FF3B30"}}>{(caddress.error)}</span>
</Box>

<Box sx={{position:'relative',marginTop:1}}>

 <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>

              Company ZIP</Typography>
             <InputBase
                required
                sx={{height:35,width:'100%' ,color:'#8E8E9D', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                type="text"
                value={czip.value}
                fullWidth                
                onChange={(e) => { setCZip({value:e.target.value,error:''}) }}                              
              /> <span style={{color:"#FF3B30"}}>{(czip.error)}</span>
</Box>

<Box sx={{position:'relative',marginTop:1}}>

 <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>

              Company Country</Typography>
           <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          sx={{height:40,width:'100%',borderRadius:0,border:0,outline:'none'}}
          onClose={handleClose}
          onOpen={handleOpen}
          value={ccountry.value}
          onChange={(e) => { setCCountry({value:e.target.value,error:''}) }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select> <span style={{color:"#FF3B30"}}>{(ccountry.error)}</span>
</Box>

 </Grid>



<Grid item xs={4}>
<Box sx={{display:'flex',position:'relative',width:'100%'}}>
<Box sx={{display:'flex',height:20,width:200}}>
 <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>

              Profile Photo</Typography>
 </Box>             
      <Box sx={{display:'flex',marginTop:4,flexDirection:'row',alignItems:'center'}}> 

 <Avatar alt="Remy Sharp" sx={{width:80,height:80,borderRadius:40}} 
src={require('../assets/images/avatar.png')} />

      <span color="red">{(email.error)}</span>

<Box> 
&emsp;
<Button className={classes.button}
                  onClick={() => {                    
                    
                  }}
                  style={{
                    width: 140,
                    height: 30,
                    borderRadius: 6,
                    alignSelf: "flex-end",
                    color: "white",
                    fontSize: 14,
                    fontFamily: "AeonikBold",
                    textTransform: "none",                   
                  }}
                >
                  Upload New
                </Button>
</Box>
</Box>
</Box>



<Box sx={{display:'flex',position:'relative'}}>
<Box sx={{display:'flex',width:200}}>
 <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>

              Company Logo</Typography>
 </Box>             
      <Box sx={{display:'flex',marginTop:4,marginLeft:-4,flexDirection:'row',alignItems:'center'}}> 

 <Avatar alt="Remy Sharp" sx={{width:80,height:80,borderRadius:40}} 
src={require('../assets/images/avatar.png')} />

      <span color="red">{(email.error)}</span>

<Box> 
&emsp;&emsp;
<Button className={classes.button}
                  onClick={() => {                    
                    
                  }}
                  style={{
                    width: 140,
                    height: 30,
                    borderRadius: 6,
                    alignSelf: "flex-end",
                    color: "white",
                    fontSize: 14,
                    fontFamily: "AeonikBold",
                    textTransform: "none",                   
                  }}
                >
                  Upload New
                </Button>
</Box>
</Box>
</Box>






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
                    createClient();
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
                  Create Client
                </Button>
              </Box>
            </Paper>
          </Modal>


</Grid>

  );



}




export default Clients;