import React, { useState,useEffect,useMemo } from 'react';

import PropTypes from 'prop-types';
import { firebase, auth,storage } from '../config/firebase-config';
import {useNavigate} from 'react-router-dom';

import {styled, withStyles, makeStyles } from "@mui/styles";
import { useTheme } from '@mui/material/styles';
import { ref,uploadBytesResumable,getDownloadURL } from "firebase/storage";


import ButtonGroup from '@mui/material/ButtonGroup';

import {Select,Fab,CircularProgress,Chip,Avatar,Toolbar,IconButton,Tooltip,Divider,MenuItem,Popover, Stack,
        Button,CssBaseline,TextField,FormControlLabel,Checkbox,Link,Paper,Box,
        Badge,Collapse,Grid,Typography,Modal,InputBase,Table,TableBody,TableCell,TableContainer,
        TableHead,TableRow,TablePagination,TableFooter  } from '@mui/material';



import { createTheme, ThemeProvider } from '@mui/material/styles';




import {ListItem,FormControl,ListSubheader,List,ListItemButton,ListItemIcon,ListItemText,ListItemAvatar}
        from '@mui/material';

import {KeyboardArrowLeft,KeyboardArrowRight,KeyboardArrowUp,KeyboardArrowDown,LockOutlined,InboxIcon,DraftsIcon,SendIcon,NotificationsNoneOutlined,Person2Outlined,
        SettingsOutlined,PowerSettingsNewOutlined,DescriptionOutlined,FirstPage,LastPage,
        EventNoteOutlined,InsertInvitationOutlined,SourceOutlined,
       PostAddOutlined,Done,CloseOutlined,CircleOutlined,LinkOutlined,Edit,Delete} from '@mui/icons-material';

import { DataGrid, GridColDef } from '@mui/x-data-grid';

import SelectUnstyled, { selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import ModalUnstyled from '@mui/base/ModalUnstyled';
//import { app } from '../config/firebase-config';
import toast, { Toaster } from 'react-hot-toast';
import { set, sub } from 'date-fns';

import { ReactCountrySelectComponent } from 'react-country-select-component'

import {requiredValidator,emailValidator} from '../utils/validators';

import Header from './Header';
import Sidebar from './Sidebar';
import CardView from './CardView';
import CalendarView from './CalendarView';


/*
const useStyles = makeStyles(theme => ({
  customHoverFocus: {
    "&:hover, &.Mui-focusVisible": { backgroundColor: "#000" }
  }
}));
*/

//#AEAEB2
const useStyles = makeStyles(theme => ({
// 
  button: {
    backgroundColor: '#AEAEB2',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#000',
      color: '#fff',
  },},

  selectbox: {
    height:30,width:250,
    borderRadius:20,color:'#000',backgroundColor:'#f2f2f2',border:0,outline:'none',

  },
  fileinput: { display:'none'},

  fileinputbutton: {
    marginLeft:10,
    marginBottom:5,
    "&:hover":{backgroundColor:'#000'} ,
    width: 130,
                    height: 35,
                    borderRadius: 6,
                    alignSelf: "flex-end",
                    color: "#000",
                    backgroundColor:"green",
                    fontSize: 14,
                    fontFamily: "AeonikBold",
                    textTransform: "none", 

  },
  myclientstyle : {
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
  ".fileinputbutton":{backgroundColor:'#000'}
},

 customHoverFocus: {
    "&:hover, &.Mui-focusVisible": { backgroundColor: "#000" }
  }

}));





const colourStyles: StylesConfig<ColourOption> = {
  control: (styles) => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = 'black';
    return {
      ...styles,
      backgroundColor: '#fff',
      color: 'black',
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor:'#f2f2f2',
      },
    };
  },
  // input: (styles) => ({ height:30,color:'black',backgroundColor:'#fff',zIndex:99 }),
  // placeholder: (styles) => ({ color:'black',backgroundColor:'#aeaeb2',zIndex:99 }),
  // singleValue: (styles, { data }) => ({ color:'black',backgroundColor:'#f2f2f2',zIndex:99 }),
};





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
  ".fileinputbutton":{backgroundColor:'#000'}
};

function Clients() {


let navigate = useNavigate();

let classes = useStyles();



const [openClientModal, setOpenClientModal] = useState(false);
const handleOpenClientModal = () => setOpenClientModal(true);
const handleCloseClientModal = () => {
          setOpenClientModal(false);
   };


const notifyclientadd = () => toast.success('Client Added successfully!');
   const notifyeditclientsuccess = () => toast.success("Client has been edited in database!");


const [myclients, setMyClients] = useState([]);

const [myclienttable, setMyClientTable] = useState([]);

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

const [profilephoto, setProfilePhoto] = useState('');
const [companylogo, setCompanyLogo] = useState('');

const [role,setRole] = useState({value:'',error:''});

const [ccno,setCcno] = useState({value:'',error:''});
const [ccexp,setCcexp] = useState({value:'',error:''});
const [cccvv,setCccvv] = useState({value:'',error:''});






const [clientId, setClientId] = useState(0);
const [editClientMode, setEditClientMode] = useState(false);

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

// backend-incio.onrender.com
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
const [emailtr, setEmailTr] = useState({value:row.email,error:''});
const [phonetr, setPhoneTr] = useState({value:row.phone,error:''});
const [addresstr, setAddressTr] = useState({value:row.address,error:''});
const [ziptr, setZipTr] = useState({value:row.zip,error:''});
const [countrytr, setCountryTr] = useState({value:row.country,error:''});

const [cnametr, setCNameTr] = useState({value:row.cname,error:''});
const [cemailtr, setCEmailTr] = useState({value:row.cemail,error:''});
const [cphonetr, setCPhoneTr] = useState({value:row.phone,error:''});
const [caddresstr, setCAddressTr] = useState({value:row.caddress,error:''});
const [cziptr, setCZipTr] = useState({value:row.czip,error:''});
const [ccountrytr, setCCountryTr] = useState({value:row.ccountry,error:''});

//alert('country'+JSON.stringify(ccountrytr));

const [profilephototr, setProfilePhotoTr] = useState(null);
const [companylogotr, setCompanyLogoTr] = useState(null);

 const [profileimagetr, setProfileImageTr] = useState({ preview: row.profilephoto, data: '' });
 const [companyimagetr, setCompanyImageTr] = useState({ preview: row.companylogo, data: '' });


const [roletr, setRoleTr] = useState({value:row.role,error:''});
const [ccnotr, setCcnoTr] = useState({value:row.ccno,error:''});
const [ccexptr, setCcexpTr] = useState({value:row.ccexp,error:''});
const [cccvvtr, setCccvvTr] = useState({value:row.cccvv,error:''});




  // const [status, setStatus] = useState('')
  const handleProfileImageUploadTr = async (e) => {
    alert('called');

    e.preventDefault()

console.log('mpi'+JSON.stringify(profileimagetr));

const storageRef = ref(storage,'images/'+profileimagetr.data)

const uploadTask = uploadBytesResumable(storageRef, profileimagetr.bytes);

uploadTask.on(
"state_changed",
(snapshot) => {

//const percent = Math.round(
//(snapshot.bytesTransferred / snapshot.totalBytes) * 100
//);

// update progress
//setPercent(percent);
},
(err) => console.log(err),
() => {
// download url
getDownloadURL(uploadTask.snapshot.ref).then((url) => {
setProfilePhotoTr(url);
console.log('murlaa'+url);
});
}
); 

  }

  const handleFileChangeTr = (e) => {
    let mf = e.target.files[0];
    const img = {
      data: mf.name,
      preview: URL.createObjectURL(mf),   
      bytes: mf,   
    }
    setProfileImageTr(img)
  }


  const handleCompanyImageUploadTr = async (e) => {
    alert('called');

    e.preventDefault()

console.log('mpi'+JSON.stringify(companyimagetr));

const storageRef = ref(storage,'images/'+companyimagetr.data)

const uploadTask = uploadBytesResumable(storageRef, companyimagetr.bytes);

uploadTask.on(
"state_changed",
(snapshot) => {

//const percent = Math.round(
//(snapshot.bytesTransferred / snapshot.totalBytes) * 100
//);

// update progress
//setPercent(percent);
},
(err) => console.log(err),
() => {
// download url
getDownloadURL(uploadTask.snapshot.ref).then((url) => {
setCompanyLogoTr(url);
console.log('murlaa'+url);
});
}
); 

  }

  const handleCompanyLogoChangeTr = (e) => {
    let mf = e.target.files[0];
    const img = {
      data: mf.name,
      preview: URL.createObjectURL(mf),   
      bytes: mf,   
    }
    setCompanyImageTr(img)
  }

function processEditClientTr() {


const nametrError = requiredValidator(nametr.value);
const emailtrError = emailValidator(emailtr.value);
const phonetrError = requiredValidator(phonetr.value);
const addresstrError = requiredValidator(addresstr.value);
const ziptrError = requiredValidator(ziptr.value);
const countrytrError = requiredValidator(countrytr.value);

const cnametrError = requiredValidator(cnametr.value);
const cemailtrError = emailValidator(cemailtr.value);
const cphonetrError = requiredValidator(cphonetr.value);
const caddresstrError = requiredValidator(caddresstr.value);
const cziptrError = requiredValidator(cziptr.value);
const ccountrytrError = requiredValidator(ccountrytr.value);

const roletrError = requiredValidator(roletr.value);
const ccnotrError = requiredValidator(ccnotr.value);
const ccexptrError = requiredValidator(ccexptr.value);
const cccvvtrError = requiredValidator(cccvvtr.value);




   if (nametrError || emailtrError || phonetrError || addresstrError || ziptrError || countrytrError || 
    cnametrError || cemailtrError || cphonetrError || caddresstrError || cziptrError || ccountrytrError ||
    roletrError || ccnotrError || ccexptrError || cccvvtrError) {
      setNameTr({ ...nametr, error: nametrError });
      setEmailTr({ ...emailtr, error: emailtrError });
      setAddressTr({...addresstr,error:addresstrError});
      setPhoneTr({...phonetr,error:phonetrError});
      setZipTr({...ziptr,error:ziptrError});
      setCountryTr({...countrytr,error:countrytrError});

      setCNameTr({ ...cnametr, error: cnametrError });
      setCEmailTr({ ...cemailtr, error: cemailtrError });
      setCAddressTr({...caddresstr,error:caddresstrError});
      setCPhoneTr({...cphonetr,error:cphonetrError});
      setCZipTr({...cziptr,error:cziptrError});
      setCCountryTr({...ccountrytr,error:ccountrytrError});

      setRoleTr({...roletr,error:roletrError})
      setCcnoTr({...ccnotr,error:ccnotrError})
      setCcexpTr({...ccexptr,error:ccexptrError})
      setCccvvTr({...cccvvtr,error:cccvvtrError})

      //  setTermAdding(false);
      return false;
    }

let pp='';let cp='';
if (profilephototr == null) 
  pp = row.profilephoto;
else pp = profilephototr;
if (companylogotr == null) 
  cp = row.companylogo;
else cp =  companylogotr;


const body = {
  "clientid":row.id,
   "name": nametr.value, 
   "email": emailtr.value, 
   "phone": phonetr.value,
   "address": addresstr.value,
   "zip": ziptr.value,
   "country": countrytr.value,
   "cname": cnametr.value, 
   "cemail": cemailtr.value, 
   "cphone": cphonetr.value,
   "caddress": caddresstr.value,
   "czip": cziptr.value,
   "ccountry": ccountrytr.value,
   "profilephoto":pp,
  "companylogo":cp,
  "role":roletr.value,
  "ccno":ccnotr.value,
  "ccexp" :ccexptr.value,
  "cccvv": cccvvtr.value
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
        <TableCell align="right">{row.cname}</TableCell>
        <TableCell align="right">{row.cemail}</TableCell>
        <TableCell align="right">{row.phone}</TableCell>
        <TableCell align="right">{'$ 1,000.00'}</TableCell>
        <TableCell align="right">{'$ 2,500.00'}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>


 <Paper elevation={0} sx={{marginBottom:3,marginTop:1,overflow:'hidden'}}> 

     
<Box sx={{display:'flex',flexDirection:'row'}}>

<Box sx={{marginLeft:1,marginRight:2,marginTop:1,width:240,marginBottom:2}}>
<Box sx={{position:'relative'}}>
             <InputBase
                required
                sx={{height:35,width:'100%' ,color:'#000', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                type="email"
                fullWidth                
                value={nametr.value}
                onChange={(e) => { setNameTr({value:e.target.value,error:''}) }}                              
              /> 
  <span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(name.error)}</span>
</Box>
<Box sx={{clear:'both',position:'relative',marginTop:1}}>

             <InputBase
                required
                sx={{height:35,width:'100%' ,color:'#000', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                type="email"
                fullWidth   
                value={emailtr.value}             
                onChange={(e) => { setEmailTr({value:e.target.value,error:''}) }}                              
              /> <span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(email.error)}</span>
</Box>

<Box sx={{clear:'both',position:'relative',marginTop:1}}>

             <InputBase
                required
                sx={{height:35,width:'100%' ,color:'#000', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                type="phone"
                value={phonetr.value}
                fullWidth                
                onChange={(e) => { setPhoneTr({value:e.target.value,error:''}) }}                              
              /> <span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(phone.error)}</span>
</Box>

<Box sx={{clear:'both',position:'relative',marginTop:1}}>

             <InputBase
                required
                sx={{height:35,width:'100%' ,color:'#000', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                type="email"
                value={addresstr.value}
                fullWidth                
                onChange={(e) => { setAddressTr({value:e.target.value,error:''}) }}                              
              /> <span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(address.error)}</span>
</Box>

<Box sx={{clear:'both',position:'relative',marginTop:1}}>

             <InputBase
                required
                sx={{height:35,width:'100%' ,color:'#000', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                type="email"
                value={ziptr.value}
                fullWidth                
                onChange={(e) => { setZipTr({value:e.target.value,error:''}) }}                              
              /> <span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(zip.error)}</span>
</Box>

<Box sx={{clear:'both',zIndex:99,position:'relative',marginTop:1}}>

             

 <ReactCountrySelectComponent
        name={'countrytr'}
        isClearable={true}
        error={false}
        placeholder={'Select country'}
        borderRadius={6}
        defaultvalue={{value:countrytr.value,label:countrytr.value}}        
        onChange={(c) => setCountryTr({value:c.value,error:''})}
      />


          
           

            <span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(country.error)}</span>
</Box>

</Box>



<Box sx={{marginLeft:1,marginTop:1,marginRight:1,width:240,marginBottom:2}}>

<Box sx={{clear:'both',position:'relative'}}>

             <InputBase
                required
                sx={{height:35,width:'100%' ,color:'#000', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                type="text"
                fullWidth                
                value={cnametr.value}
                onChange={(e) => { setCNameTr({value:e.target.value,error:''}) }}                              
              /> <span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(cname.error)}</span>
</Box>
<Box sx={{clear:'both',position:'relative',marginTop:1}}>

             <InputBase
                required
                sx={{height:35,width:'100%' ,color:'#000', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                type="email"
                fullWidth   
                value={cemailtr.value}             
                onChange={(e) => { setCEmailTr({value:e.target.value,error:''}) }}                              
              /> <span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(cemail.error)}</span>
</Box>

<Box sx={{clear:'both',position:'relative',marginTop:1}}>

             <InputBase
                required
                sx={{height:35,width:'100%' ,color:'#000', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                type="phone"
                value={cphonetr.value}
                fullWidth                
                onChange={(e) => { setCPhoneTr({value:e.target.value,error:''}) }}                              
              /> <span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(cphone.error)}</span>
</Box>

<Box sx={{clear:'both',position:'relative',marginTop:1}}>

             <InputBase
                required
                sx={{height:35,width:'100%' ,color:'#000', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                type="text"
                value={caddresstr.value}
                fullWidth                
                onChange={(e) => { setCAddressTr({value:e.target.value,error:''}) }}                              
              /> <span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(caddress.error)}</span>
</Box>

<Box sx={{clear:'both',position:'relative',marginTop:1}}>

             <InputBase
                required
                sx={{height:35,width:'100%' ,color:'#000', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                type="text"
                value={cziptr.value}
                fullWidth                
                onChange={(e) => { setCZipTr({value:e.target.value,error:''}) }}                              
              /> <span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(czip.error)}</span>
</Box>

<Box sx={{clear:'both',position:'relative',marginTop:1}}>


<ReactCountrySelectComponent
        name={'ccountrytr'}
        isClearable={true}
        error={false}
        placeholder={'Select country'}
        borderRadius={6}
        defaultvalue={{value:ccountrytr.value,label:ccountrytr.value}}
        onChange={(c) => setCCountryTr({value:c.value,error:''})}
      />

<span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(ccountry.error)}</span>

 
</Box>

 </Box>


<Box sx={{marginLeft:1,marginRight:2,marginTop:1,width:240,marginBottom:2}}>
<Box sx={{position:'relative'}}>
             <InputBase
                required
                sx={{height:35,width:'100%' ,color:'#000', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                placeholder="Credit Card No"
                type="text"
                fullWidth                
                value={ccnotr.value}
                onChange={(e) => { setCcnoTr({value:e.target.value,error:''}) }}                              
              /> 
  <span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(name.error)}</span>
</Box>
<Box sx={{clear:'both',position:'relative',marginTop:1}}>

             <InputBase
                required
                sx={{height:35,width:'48%' ,color:'#000', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2',marginRight:1}}
                size="small"
                type="email"
                placeholder="Expiry mm/yy"
                fullWidth   
                value={ccexptr.value}             
                onChange={(e) => { setCcexpTr({value:e.target.value,error:''}) }}                              
              />

<InputBase
                required
                sx={{height:35,width:'48%' ,color:'#000', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                type="email"
                placeholder="CVV"
                fullWidth   
                value={cccvvtr.value}             
                onChange={(e) => { setCccvvTr({value:e.target.value,error:''}) }}                              
              />

               <span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(email.error)}</span>
</Box>


<Box sx={{position:'relative',marginTop:1}}>

 <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>

              Role</Typography>
           <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={openRoleSelect}
          size="small"
          className={classes.selectbox}
          sx={{height:40,width:'100%'}}
          onClose={handleCloseRoleSelect}
          onOpen={handleOpenRoleSelect}
          value={roletr.value}
          onChange={(e) => { setRoleTr({value:e.target.value,error:''}) }}
        >
          <MenuItem value={'Customer'}><Typography sx={{fontSize:12, fontFamily:'AeonikBold'}}>Customer</Typography></MenuItem>
          <MenuItem value={'Employee'}><Typography sx={{fontSize:12, fontFamily:'AeonikBold'}}>Employee</Typography></MenuItem>
          <MenuItem value={'Owner'}><Typography sx={{fontSize:12, fontFamily:'AeonikBold'}}>Owner</Typography></MenuItem>
          <MenuItem value={'Partner'}><Typography sx={{fontSize:12, fontFamily:'AeonikBold'}}>Partner</Typography></MenuItem>
          <MenuItem value={'Supplier'}><Typography sx={{fontSize:12, fontFamily:'AeonikBold'}}>Supplier</Typography></MenuItem>
        
        </Select> <span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(role.error)}</span>
</Box>



</Box>



<Box sx={{width:250}}>

<Box sx={{display:'flex',height:20,width:200}}>
 <Typography noWrap sx={{fontSize:13,fontFamily:'AeonikBold'}}>

              Profile Photo</Typography>
</Box>             

<ListItem>
<ListItemAvatar>
<Avatar alt="Remy Sharp" sx={{marginTop:1,width:80,height:80,borderRadius:40}} 
src={profileimagetr.preview?profileimagetr.preview:require('../assets/images/avatar.png')} />
</ListItemAvatar>
<ListItemText>
      

<form onSubmit={handleProfileImageUploadTr}>


<label className={classes.fileinputbutton }>
<input className={classes.fileinput} type='file' name='file' onChange={handleFileChangeTr}></input>
<Typography sx={{fontSize:13,fontFamily:'AeonikBold',color:''}}>&emsp;&nbsp;Select File</Typography>
</label>
        <Button style={{
                    width: 100,
                    height: 28,
                    marginTop:8,
                    zIndex:199,
                    marginLeft:15,
                    borderRadius: 6,
                    alignSelf: "flex-end",
                    color: "#000",
                    backgroundColor:"#f2f2f2",
                    fontSize: 13,
                    fontFamily: "AeonikBold",
                    textTransform: "none", 
                    '&:hover':{backgroundColor:'#000',color:'#fff'}                  
                  }} type='submit'>Upload</Button>
      
</form>
</ListItemText>
</ListItem>




<Box sx={{display:'flex',width:250}}>
 <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>

              Company Logo</Typography>
 </Box>             

<ListItem>
<ListItemAvatar>
 <Avatar alt="Remy Sharp" sx={{marginTop:1,width:80,height:80,borderRadius:40}} 
src={companyimagetr.preview?companyimagetr.preview:require('../assets/images/avatar.png')} />
</ListItemAvatar>

<ListItemText>
<form onSubmit={handleCompanyImageUploadTr}>

<label className={classes.fileinputbutton }>
<input className={classes.fileinput} type='file' name='file' onChange={handleCompanyLogoChangeTr}></input>
<Typography sx={{fontSize:13,fontFamily:'AeonikBold',color:''}}>&emsp;&nbsp;Select File</Typography>
</label>
        <Button style={{
                    width: 100,
                    height: 30,
                    marginTop:8,
                    zIndex:199,
                    marginLeft:15,
                    borderRadius: 6,
                    alignSelf: "flex-end",
                    color: "#000",
                    backgroundColor:"#f2f2f2",
                    fontSize: 13,
                    fontFamily: "AeonikBold",
                    textTransform: "none", 
                    '&:hover':{backgroundColor:'#000',color:'#000'}                  
                  }} type='submit'>Upload</Button>
      
</form>

</ListItemText>
</ListItem>

</Box>
</Box>      



              <Box
                sx={{
                  display: "flex",
                  zIndex:99,
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  marginTop:3

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
                  onClick={() => {                    
                    processEditClientTr();
                  }}
                  sx={{
                    width: 150,
                    height: 30,
                    zIndex:99,
                    borderRadius: 6,
                    marginRight:5,
                    alignSelf: "center",
                    color: "#000",
                    backgroundColor:"#f2f2f2",
                    fontSize: 14,
                    fontFamily: "AeonikBold",
                    textTransform: "none",                                   
                    "&:hover":{backgroundColor:'black',color:'#fff'}
                  }}
                >
                  Edit Client
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
    cname: PropTypes.string.isRequired,
    cemail: PropTypes.string.isRequired,    
    phone: PropTypes.string.isRequired,
  })
}


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

const roleError = requiredValidator(role.value);
const ccnoError = requiredValidator(ccno.value);
const ccexpError = requiredValidator(ccexp.value);
const cccvvError = requiredValidator(cccvv.value);



   if (nameError || emailError || phoneError || addressError || zipError || countryError || 
    cnameError || cemailError || cphoneError || caddressError || czipError || ccountryError ||
  roleError || ccnoError || ccexpError || cccvvError) {
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

      setRole({...role,error:roleError});
      setCcno({...ccno, error:ccnoError});
      setCcexp({...ccexp,error:ccexpError});
      setCccvv({...cccvv,error:cccvvError});

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
   "ccountry": ccountry.value,
   "profilephoto":profilephoto,
   "companylogo":companylogo,
   "role":role.value,
   "ccno":ccno.value,
   "ccexp":ccexp.value,
   "cccvv":cccvv.value
};

console.log('clcr-body==',body);

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
   // setTimeout(() => { navigate(0);},1000);
//alert('success');
// window.reload();
    
    }
    )

  

})
} catch(e) { alert('caught err'+e.message); }



}





const callDelete = (id) => {


// alert('delete pressed on id='+id);




}

 const [profileimage, setProfileImage] = useState({ preview: '', data: '' });
 const [companyimage, setCompanyImage] = useState({ preview: '', data: '' });

 const [url, setUrl] = useState('');


  // const [status, setStatus] = useState('')
  const handleProfileImageUpload = async (e) => {
    alert('called');

    e.preventDefault()

console.log('mpi'+JSON.stringify(profileimage));

const storageRef = ref(storage,'images/'+profileimage.data)

const uploadTask = uploadBytesResumable(storageRef, profileimage.bytes);

uploadTask.on(
"state_changed",
(snapshot) => {

//const percent = Math.round(
//(snapshot.bytesTransferred / snapshot.totalBytes) * 100
//);

// update progress
//setPercent(percent);
},
(err) => console.log(err),
() => {
// download url
getDownloadURL(uploadTask.snapshot.ref).then((url) => {
setProfilePhoto(url);
console.log('murlaa'+url);
});
}
); 

  }

  const handleFileChange = (e) => {
    let mf = e.target.files[0];
    const img = {
      data: mf.name,
      preview: URL.createObjectURL(mf),   
      bytes: mf,   
    }
    setProfileImage(img)
  }


  const handleCompanyImageUpload = async (e) => {
    alert('called');

    e.preventDefault()

console.log('mpi'+JSON.stringify(companyimage));

const storageRef = ref(storage,'images/'+companyimage.data)

const uploadTask = uploadBytesResumable(storageRef, companyimage.bytes);

uploadTask.on(
"state_changed",
(snapshot) => {

//const percent = Math.round(
//(snapshot.bytesTransferred / snapshot.totalBytes) * 100
//);

// update progress
//setPercent(percent);
},
(err) => console.log(err),
() => {
// download url
getDownloadURL(uploadTask.snapshot.ref).then((url) => {
setCompanyLogo(url);
console.log('murlaa'+url);
});
}
); 

  }

  const handleCompanyLogoChange = (e) => {
    let mf = e.target.files[0];
    const img = {
      data: mf.name,
      preview: URL.createObjectURL(mf),   
      bytes: mf,   
    }
    setCompanyImage(img)
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

      setProfilePhoto(myc[0].profilephoto);
      setProfileImage({preview:myc[0].profilephoto,data:''});

      setCompanyLogo(myc[0].companylogo);
      setCompanyImage({preview:myc[0].companylogo,data:''});


      setRole({value:myc[0].role,error:''});
      setCcno({value:myc[0].ccno,error:''});
      setCcexp({value:myc[0].ccexp,error:''});
      setCccvv({value:myc[0].cccvv,error:''});


      // setCompanyLogo(myc[0].companylogo);
      setClientId(myc[0].id);



handleOpenClientModal();


setEditClientMode(true);



//navigate('/edit-form',{state:{"termid":id}});


}



const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - myclients.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


const [openRoleSelect, setOpenRoleSelect] = React.useState(false);

  const handleCloseRoleSelect = () => {
    setOpenRoleSelect(false);
  };

  const handleOpenRoleSelect = () => {
    setOpenRoleSelect(true);
  };


return (
<>
<Grid container>



<Header />

<Sidebar />

<Grid item xs={10} sx={{height:'fit-content',width:'100%',marginBottom:20,display:'flex',flexDirection:'row'}}>

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



 <Paper elevation={0} sx={{position:'relative',top:-235,left:223}}> 

     
<Box sx={{display:'flex',flexDirection:'row'}}>

<Box sx={{marginLeft:1,marginRight:2,marginTop:1,width:240,marginBottom:2}}>
<Box sx={{position:'relative'}}>
             <InputBase
                required
                sx={{height:35,width:'100%',color:'#000', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                placeholder="First Last Name"
                type="text"
                fullWidth                
                value={name.value}
                onChange={(e) => { setName({value:e.target.value,error:''}) }}                              
              /> 
  <span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(name.error)}</span>
</Box>
<Box sx={{clear:'both',position:'relative',marginTop:1}}>

             <InputBase
                required
                sx={{height:35,width:'100%' ,color:'#000', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                placeholder="myemail@mycompany.com"
                type="email"
                fullWidth   
                value={email.value}             
                onChange={(e) => { setEmail({value:e.target.value,error:''}) }}                              
              /> <span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(email.error)}</span>
</Box>

<Box sx={{clear:'both',position:'relative',marginTop:1}}>

             <InputBase
                required
                sx={{height:35,width:'100%' ,color:'#000', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                type="phone"
                placeholder="+123 8989 8989"
                value={phone.value}
                fullWidth                
                onChange={(e) => { setPhone({value:e.target.value,error:''}) }}                              
              /> <span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(phone.error)}</span>
</Box>

<Box sx={{clear:'both',position:'relative',marginTop:1}}>

             <InputBase
                required
                sx={{height:35,width:'100%' ,color:'#000', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                type="email"
                placeholder="My Address Line"
                value={address.value}
                fullWidth                
                onChange={(e) => { setAddress({value:e.target.value,error:''}) }}                              
              /> <span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(address.error)}</span>
</Box>

<Box sx={{clear:'both',position:'relative',marginTop:1}}>

             <InputBase
                required
                sx={{height:35,width:'100%' ,color:'#000', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                type="email"
                placeholder="11001"
                value={zip.value}
                fullWidth                
                onChange={(e) => { setZip({value:e.target.value,error:''}) }}                              
              /> <span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(zip.error)}</span>
</Box>

<Box sx={{clear:'both',zIndex:99,position:'relative',marginTop:1}}>

             

 <ReactCountrySelectComponent
        name={'countrytr'}
        isClearable={true}
        error={false}
        placeholder={'Choose your country'}
        borderRadius={6}
        onChange={(c) => setCountry({value:c.value,error:''})}
      />


          
           

            <span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(country.error)}</span>
</Box>

</Box>



<Box sx={{marginLeft:1,marginTop:1,marginRight:1,width:240,marginBottom:2}}>

<Box sx={{clear:'both',position:'relative'}}>

             <InputBase
                required
                sx={{height:35,width:'100%' ,color:'#000', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                type="text"
                placeholder="Credit Card No"
                fullWidth                
                value={cname.value}
                onChange={(e) => { setCName({value:e.target.value,error:''}) }}                              
              /> <span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(cname.error)}</span>
</Box>
<Box sx={{clear:'both',position:'relative',marginTop:1}}>

             <InputBase
                required
                sx={{height:35,width:'100%' ,color:'#000', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                type="email"
                placeholder="Company email"
                fullWidth   
                value={cemail.value}             
                onChange={(e) => { setCEmail({value:e.target.value,error:''}) }}                              
              /> <span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(cemail.error)}</span>
</Box>

<Box sx={{clear:'both',position:'relative',marginTop:1}}>

             <InputBase
                required
                sx={{height:35,width:'100%' ,color:'#000', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                type="phone"
                placeholder="Company phone"
                value={cphone.value}
                fullWidth                
                onChange={(e) => { setCPhone({value:e.target.value,error:''}) }}                              
              /> <span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(cphone.error)}</span>
</Box>

<Box sx={{clear:'both',position:'relative',marginTop:1}}>

             <InputBase
                required
                sx={{height:35,width:'100%' ,color:'#000', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                type="text"
                placeholder="My Address 5"
                value={caddress.value}
                fullWidth                
                onChange={(e) => { setCAddress({value:e.target.value,error:''}) }}                              
              /> <span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(caddress.error)}</span>
</Box>

<Box sx={{clear:'both',position:'relative',marginTop:1}}>

             <InputBase
                required
                sx={{height:35,width:'100%' ,color:'#000', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                type="text"
                placeholder="11001"
                value={czip.value}
                fullWidth                
                onChange={(e) => { setCZip({value:e.target.value,error:''}) }}                              
              /> <span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(czip.error)}</span>
</Box>

<Box sx={{clear:'both',position:'relative',marginTop:1}}>


<ReactCountrySelectComponent
        name={'ccountrytr'}
        isClearable={true}
        error={false}        
        placeholder={'Choose your country'}
        borderRadius={6}
        onChange={(c) => setCCountry({value:c.value,error:''})}
      />

<span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(ccountry.error)}</span>

 
</Box>

 </Box>


<Box sx={{marginLeft:1,marginRight:2,marginTop:1,width:240,marginBottom:2}}>
<Box sx={{position:'relative'}}>
             <InputBase
                required
                sx={{height:35,width:'100%' ,color:'#000', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                placeholder="Credit Card No"
                type="text"
                fullWidth                
                value={ccno.value}
                onChange={(e) => { setCcno({value:e.target.value,error:''}) }}                              
              /> 
  <span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(name.error)}</span>
</Box>
<Box sx={{clear:'both',position:'relative',marginTop:1}}>

             <InputBase
                required
                sx={{height:35,width:'48%' ,color:'#000', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2',marginRight:1}}
                size="small"
                type="email"
                placeholder="Expiry mm/yy"
                fullWidth   
                value={ccexp.value}             
                onChange={(e) => { setCcexp({value:e.target.value,error:''}) }}                              
              />

<InputBase
                required
                sx={{height:35,width:'48%' ,color:'#000', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                type="email"
                placeholder="CVV"
                fullWidth   
                value={cccvv.value}             
                onChange={(e) => { setCccvv({value:e.target.value,error:''}) }}                              
              />

               <span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(email.error)}</span>
</Box>


<Box sx={{position:'relative',marginTop:1}}>

 <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>

              Role</Typography>
           <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={openRoleSelect}
          size="small"
          className={classes.selectbox}
          sx={{height:40,width:'100%'}}
          onClose={handleCloseRoleSelect}
          onOpen={handleOpenRoleSelect}
          value={role.value}
          onChange={(e) => { setRole({value:e.target.value,error:''}) }}
        >
          <MenuItem value={'Customer'}><Typography sx={{fontSize:12, fontFamily:'AeonikBold'}}>Customer</Typography></MenuItem>
          <MenuItem value={'Employee'}><Typography sx={{fontSize:12, fontFamily:'AeonikBold'}}>Employee</Typography></MenuItem>
          <MenuItem value={'Owner'}><Typography sx={{fontSize:12, fontFamily:'AeonikBold'}}>Owner</Typography></MenuItem>
          <MenuItem value={'Partner'}><Typography sx={{fontSize:12, fontFamily:'AeonikBold'}}>Partner</Typography></MenuItem>
          <MenuItem value={'Supplier'}><Typography sx={{fontSize:12, fontFamily:'AeonikBold'}}>Supplier</Typography></MenuItem>
        
        </Select> <span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(role.error)}</span>
</Box>



</Box>



<Box sx={{width:250}}>

<Box sx={{display:'flex',height:20,width:200}}>
 <Typography noWrap sx={{fontSize:13,fontFamily:'AeonikBold'}}>

              Profile Photo</Typography>
</Box>             

<ListItem>
<ListItemAvatar>
<Avatar alt="Remy Sharp" sx={{marginTop:1,width:80,height:80,borderRadius:40}} 
src={profileimage.preview?profileimage.preview:require('../assets/images/avatar.png')} />
</ListItemAvatar>
<ListItemText>
      

<form onSubmit={handleProfileImageUpload}>


<label className={classes.fileinputbutton }>
<input className={classes.fileinput} type='file' name='file' onChange={handleFileChange}></input>
<Typography sx={{fontSize:13,fontFamily:'AeonikBold',color:''}}>&emsp;&nbsp;Select File</Typography>
</label>
        <Button style={{
                    width: 100,
                    height: 28,
                    marginTop:8,
                    zIndex:199,
                    marginLeft:15,
                    borderRadius: 6,
                    alignSelf: "flex-end",
                    color: "#000",
                    backgroundColor:"#f2f2f2",
                    fontSize: 13,
                    fontFamily: "AeonikBold",
                    textTransform: "none", 
                    '&:hover':{backgroundColor:'#000',color:'#fff'}                  
                  }} type='submit'>Upload</Button>
      
</form>
</ListItemText>
</ListItem>




<Box sx={{display:'flex',width:250}}>
 <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>

              Company Logo</Typography>
 </Box>             

<ListItem>
<ListItemAvatar>
 <Avatar alt="Remy Sharp" sx={{marginTop:1,width:80,height:80,borderRadius:40}} 
src={companyimage.preview?companyimage.preview:require('../assets/images/avatar.png')} />
</ListItemAvatar>

<ListItemText>
<form onSubmit={handleCompanyImageUpload}>

<label className={classes.fileinputbutton }>
<input className={classes.fileinput} type='file' name='file' onChange={handleCompanyLogoChange}></input>
<Typography sx={{fontSize:13,fontFamily:'AeonikBold',color:''}}>&emsp;&nbsp;Select File</Typography>
</label>
        <Button style={{
                    width: 100,
                    height: 30,
                    marginTop:8,
                    zIndex:199,
                    marginLeft:15,
                    borderRadius: 6,
                    alignSelf: "flex-end",
                    color: "#000",
                    backgroundColor:"#f2f2f2",
                    fontSize: 13,
                    fontFamily: "AeonikBold",
                    textTransform: "none", 
                    '&:hover':{backgroundColor:'#000',color:'#000'}                  
                  }} type='submit'>Upload</Button>
      
</form>

</ListItemText>
</ListItem>


</Box>      

</Box>

              <Box
                sx={{
                  display: "flex",
                  zIndex:99,
                  clear:'both',
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  marginTop:3

                }}
              >
                <Button aria-label="custom-btn"
                  onClick={() => {                    
                    createClient();
                  }}
                  sx={{
                    width: 150,
                    height: 30,
                    zIndex:99,
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
                  Create Client
                </Button>
              </Box>
              
            </Paper>














<Grid sx={{position:'relative',top:-150,left:205,display:'flex',flexDirection:'row'}} item xs={10}>


<Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    width:'95%',
                    flexDirection: 'column',
                    height: 600,
                  }}
                >

{clientsLoading?


 <TableContainer component={Paper} sx={{fontSize:13,fontFamily:'AeonikBold'}}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell align="right">Company Name</TableCell>
            <TableCell align="right">Email Address</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Income</TableCell>
            <TableCell align="right">Outcome</TableCell>            
          </TableRow>

        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? myclients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : myclients
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
              count={myclients.length}
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









</Grid>




</>


  );



}




export default Clients;