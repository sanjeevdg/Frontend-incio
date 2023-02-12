import React, { useState,useEffect } from 'react';

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
import ModalUnstyled from '@mui/base/ModalUnstyled';
//import { app } from '../config/firebase-config';
import toast, { Toaster } from 'react-hot-toast';
import { set, sub } from 'date-fns';


import {requiredValidator,emailValidator} from '../utils/validators';

import Header from './Header';
import Sidebar from './Sidebar';
import CardView from './CardView';
import CalendarView from './CalendarView';



const useStyles = makeStyles({
// 
  button: {
    backgroundColor: '#AEAEB2',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#000',
      color: '#fff',
  },},

  selectbox: {

    borderRadius:0,backgroundColor:'#AEAEB2',border:0,outline:'none',

  }

});
const StyledButton = withStyles({
  root: {
    backgroundColor: '#AEAEB2',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#000',
      color: '#fff',
  },
}})(Button);

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

function Clients() {


let navigate = useNavigate();

let classes = useStyles();



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

const notifyclientadd = () => toast.success('Client Added successfully!');
   const notifyeditclientsuccess = () => toast.success("Client has been edited in database!");


const [myclients, setMyClients] = useState([]);
const [clientsLoading, setClientsLoading] = useState(false);


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


const [clientId, setClientId] = useState(0);
const [editClientMode, setEditClientMode] = useState(false);

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    width: 170,
    editable: true,
  },
  {
    field: 'cname',
    headerName: 'Company Name',
    width: 210,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email Address',
    width: 300,
    editable: true,
  },
  {
    field: 'phone',
    headerName: 'Phone',
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


  const [editModalOpen, setEditModalOpen] = useState(false);
  const [countryopen, setCountryOpen] = React.useState(false);
  const handleCountryClose = () => {
    setCountryOpen(false);
  };
  const handleCountryOpen = () => {
    setCountryOpen(true);
  };

  const [ccountryopen, setCCountryOpen] = React.useState(false);
  const handleCCountryClose = () => {
    setCCountryOpen(false);
  };
  const handleCCountryOpen = () => {
    setCCountryOpen(true);
  };



  const handleOpenEditModal = () => setEditModalOpen(true);
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };


useEffect(() => {

// localhost:5000
try{
  fetch('https://backend-incio.onrender.com/getClientsList', {

   method: 'POST', 
   headers: {
        'Content-Type': 'application/x-www-form-urlencoded',              
      }   
}).then((resp) => {
  resp.json().then((data) => {
  let adata = data;
  setMyClients(adata.myclients);
  setClientsLoading(true);
console.log('adata=',adata);
     });
});
} catch(e) { console.log('caught err'+e.message); }








}, []);




async function createClient() {


const nameError = requiredValidator(name.value);
const emailError = emailValidator(email.value);
const phoneError = requiredValidator(phone.value);
const addressError = requiredValidator(address.value);
const zipError = requiredValidator(zip.value);
const countryError = requiredValidator(country.value);

const cnameError = requiredValidator(cname.value);
const cemailError = emailValidator(cemail.value);
const cphoneError = requiredValidator(cphone.value);
const caddressError = requiredValidator(caddress.value);
const czipError = requiredValidator(czip.value);
const ccountryError = requiredValidator(ccountry.value);

   if (nameError || emailError || phoneError || addressError || zipError || countryError || 
    cnameError || cemailError || cphoneError || caddressError || czipError || ccountryError ) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setAddress({...address,error:addressError});
      setPhone({...phone,error:phoneError});
      setZip({...zip,error:zipError});
      setCountry({...country,error:countryError});

      setCName({ ...cname, error: cnameError });
      setCEmail({ ...cemail, error: cemailError });
      setCAddress({...caddress,error:caddressError});
      setCPhone({...cphone,error:cphoneError});
      setCZip({...czip,error:czipError});
      setCCountry({...ccountry,error:ccountryError});

    //  setTermAdding(false);
      return false;
    }

const body = {
   "name": name.value, 
   "email": email.value, 
   "phone": phone.value,
   "address": address.value,
   "zip": zip.value,
   "country": country.value,
   "cname": cname.value, 
   "cemail": cemail.value, 
   "cphone": cphone.value,
   "caddress": caddress.value,
   "czip": czip.value,
   "ccountry": ccountry.value
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

try{
  fetch(`https://backend-incio.onrender.com/addNewClient`, {
   method: 'POST', 
   headers: {
        'Content-Type': 'application/x-www-form-urlencoded',              
      },  
   body: formBody,
}).then((resp) => {
  resp.json().then((data) => {
   // setIsLoading(false);
   //alert(JSON.stringify(data));
   notifyclientadd();
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





const callDelete = (id) => {


// alert('delete pressed on id='+id);




}


function processEditClient() {


const nameError = requiredValidator(name.value);
const emailError = emailValidator(email.value);
const phoneError = requiredValidator(phone.value);
const addressError = requiredValidator(address.value);
const zipError = requiredValidator(zip.value);
const countryError = requiredValidator(country.value);

const cnameError = requiredValidator(cname.value);
const cemailError = emailValidator(cemail.value);
const cphoneError = requiredValidator(cphone.value);
const caddressError = requiredValidator(caddress.value);
const czipError = requiredValidator(czip.value);
const ccountryError = requiredValidator(ccountry.value);

   if (nameError || emailError || phoneError || addressError || zipError || countryError || 
    cnameError || cemailError || cphoneError || caddressError || czipError || ccountryError ) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setAddress({...address,error:addressError});
      setPhone({...phone,error:phoneError});
      setZip({...zip,error:zipError});
      setCountry({...country,error:countryError});

      setCName({ ...cname, error: cnameError });
      setCEmail({ ...cemail, error: cemailError });
      setCAddress({...caddress,error:caddressError});
      setCPhone({...cphone,error:cphoneError});
      setCZip({...czip,error:czipError});
      setCCountry({...ccountry,error:ccountryError});

    //  setTermAdding(false);
      return false;
    }

const body = {
    "clientid":clientId,
   "name": name.value, 
   "email": email.value, 
   "phone": phone.value,
   "address": address.value,
   "zip": zip.value,
   "country": country.value,
   "cname": cname.value, 
   "cemail": cemail.value, 
   "cphone": cphone.value,
   "caddress": caddress.value,
   "czip": czip.value,
   "ccountry": ccountry.value
};




var formBody = [];
for (var key in body) {
   var encodedKey = encodeURIComponent(key);
   var encodedValue = encodeURIComponent(body[key]);
   formBody.push(encodedKey + '=' + encodedValue);
}
formBody = formBody.join('&');
// curl -d "formname=test1&displayname=est1" -X POST https://710d-2409-4060-1e-b158-1d34-fc03-ff6d-1ef2.ngrok.io/createNewForm
// mybtapp2-node-api.onrender.com
try{
  fetch(`https://backend-incio.onrender.com/editClient`, {
   method: 'POST', 
   headers: {
        'Content-Type': 'application/x-www-form-urlencoded',              
      },  
   body: formBody,
}).then((resp) => {
  resp.json().then((data) => {
   // setIsLoading(false);
   //alert(JSON.stringify(data));
   notifyeditclientsuccess();
   //setTermAdding2(false);
   setTimeout(() => { navigate(0);},1000);
//alert('success');
window.reload();
    
    }
    )

  

})
} catch(e) { alert('caught err'+e.message); }




}

 const [profileimage, setProfileImage] = useState({ preview: '', data: '' })
  // const [status, setStatus] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('file', profileimage.data)
    const response = await fetch('http://localhost:5000/uploadProfilePicture', {
      method: 'POST',
      body: formData,
    })
    if (response) alert(response.statusText)
  }

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setProfileImage(img)
  }

const editClient = (id) => {


//alert('edit pressed on id='+id);

alert('myid='+id);

var myc = myclients.filter(function(obj){

  return (obj.id===id);
});

console.log('mc==',myc[0]);




setName({ value:myc[0].name, error: '' });
      setEmail({value:myc[0].email, error: '' });
      setAddress({value:myc[0].address,error:''});
      setPhone({value:myc[0].phone,error:''});
      setZip({value:myc[0].zip,error:''});
      setCountry({value:myc[0].country,error:''});

      setCName({ value:myc[0].cname, error: '' });
      setCEmail({ value:myc[0].cemail, error: '' });
      setCAddress({value:myc[0].caddress,error:''});
      setCPhone({value:myc[0].cphone,error:''});
      setCZip({value:myc[0].czip,error:''});
      setCCountry({value:myc[0].ccountry,error:''});

      setClientId(myc[0].id);



handleOpenClientModal();


setEditClientMode(true);



//navigate('/edit-form',{state:{"termid":id}});


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
<Button onClick={() => handleOpenClientModal()} sx={{'&:hover': {backgroundColor:'black'},width:180,height:30,color:'white',textTransform:'none',backgroundColor:'#AEAEB2',display:'flex'}}>+ Create New Client</Button>
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
   rowHeight={40}
   initialState={{ pinnedColumns: { right: ["actions"] } }}
   componentsProps={{
  row: {
    onMouseEnter: onMouseEnterRow,
    onMouseLeave: onMouseLeaveRow
  }
}}
        rows={myclients}
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
               <Box sx={{width:'35%', justifyContent:'flex-end',alignItems:'flex-end'}}>
                <Typography
                noWrap
                  sx={{
                    fontSize: 25,
                    color:'black',
                    fontFamily: "AeonikBold",
                  }}
                >                
                 {editClientMode? "Edit Client" : "Create New Client"} 
                </Typography>
                </Box>
                <Box sx={{width:'30%'}}></Box>
                <Box sx={{width:'12%',position:"absolute", left:'69%',top:45}}>
                <CloseOutlined
                  onClick={() => {handleCloseClientModal();}}
                  sx={{marginLeft:30,marginTop:-20,justifyContent:'flex-end',alignSelf:'flex-end', fontSize: 20}}
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
          open={countryopen}
          sx={{height:40,width:'100%',borderRadius:0,border:0,outline:'none'}}
          onClose={handleCountryClose}
          onOpen={handleCountryOpen}
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
                onChange={(e) => { setCAddress({value:e.target.value,error:''}) }}                              
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
          open={ccountryopen}
          sx={{height:40,width:'100%',borderRadius:0,border:0,outline:'none'}}
          onClose={handleCCountryClose}
          onOpen={handleCCountryOpen}
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
 <Typography noWrap sx={{fontSize:13,fontFamily:'AeonikBold'}}>

              Profile Photo</Typography>
 </Box>             

 <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>      
<Box sx={{marginLeft:-10,marginTop:3}}>
 <img alt="profile photo" style={{width:80,height:80,borderRadius:40}} 
src={profileimage.preview? profileimage.preview:require('../assets/images/avatar.png')} />


      
</Box>
<Box> 


 
<form onSubmit={handleSubmit}>
<input type='file' name='file' style={{color:'red'}} onChange={handleFileChange}></input>
        <button  style={{
                    width: 140,
                    height: 30,
                    marginLeft:15,
                    borderRadius: 6,
                    alignSelf: "flex-end",
                    color: "white",
                    backgroundColor:"#AEAEB2",
                    fontSize: 14,
                    fontFamily: "AeonikBold",
                    textTransform: "none",                   
                  }} type='submit'>Upload</button>
      </form>

</Box>
</Box>
</Box>



<Box sx={{display:'flex',position:'relative',marginTop:3}}>
<Box sx={{display:'flex',width:200}}>
 <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>

              Company Logo</Typography>
 </Box>             
      <Box sx={{display:'flex',marginTop:2,flexDirection:'row',alignItems:'center'}}> 

 <Avatar alt="Remy Sharp" sx={{marginLeft:-25,marginTop:1,width:80,height:80,borderRadius:40}} 
src={require('../assets/images/avatar.png')} />

      

<Box sx={{"& .MuiButton-root":{"&:hover":{backgroundColor:'#000'}}}}> 

<StyledButton
                  onClick={() => {                    
                    
                  }}
                  style={{
                    width: 140,
                    height: 30,
                    marginLeft:15,
                    borderRadius: 6,
                    alignSelf: "flex-end",
                    color: "white",
                    backgroundColor:"#AEAEB2",
                    fontSize: 14,
                    fontFamily: "AeonikBold",
                    textTransform: "none",                                                       
                  }}
                >
                  Upload New
                </StyledButton>
</Box>
</Box>
</Box>






</Grid>

</Grid>




              <Box
                sx={{
                  display: "flex",
                  zIndex:99,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop:3

                }}
              >
                <StyledButton
                  onClick={() => {                    
                    editClientMode? processEditClient() : createClient()
                  }}
                  style={{
                    width: 150,
                    height: 35,
                    zIndex:99,
                    borderRadius: 6,
                    alignSelf: "center",
                    color: "white",
                    backgroundColor:"#AEAEB2",
                    fontSize: 14,
                    fontFamily: "AeonikBold",
                    textTransform: "none",                                   
                    "&:hover":{backgroundColor:'#000'}
                  }}
                >
                  {editClientMode? "Edit Client": "Create Client"}
                </StyledButton>
              </Box>
            </Paper>
          </Modal>


</Grid>

  );



}




export default Clients;