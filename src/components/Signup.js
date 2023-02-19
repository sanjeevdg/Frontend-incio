import React, { useState } from 'react';

import { firebase, auth } from '../config/firebase-config';
import {useNavigate} from 'react-router-dom';

import {CircularProgress,Avatar,Button,CssBaseline,TextField,FormControlLabel,Checkbox,Link,Paper,Box,Grid}
    from '@mui/material';

import {LockOutlinedIcon,Visibility,VisibilityOff} from '@mui/icons-material';
import Typography from '@mui/material/Typography';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import {InputBase,FormControl,InputLabel,FilledInput,InputAdornment,IconButton} from '@mui/material';

import { FacebookLoginButton } from "react-social-login-buttons";
import { GoogleLoginButton } from "react-social-login-buttons";

import 'react-phone-input-2/lib/style.css'
import PhoneInput from 'react-phone-input-2'

//import { app } from '../config/firebase-config';
import toast, { Toaster } from 'react-hot-toast';
import {requiredValidator,emailValidator} from '../utils/validators';


// import {GoogleAuthProvider, FacebookAuthProvider, signInWithPopup} from 'firebase/auth';
import {getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Signup() {

let navigate = useNavigate();

let fauth = getAuth();


const [signupLoading,setSignupLoading] = useState(false);


const notifysignup = () => toast.success('Signed Up successfully!');
const notifylogin = () => toast.success('Logged in successfully!');
const notifyuseremailexists = () => toast.error('Email Already Exists! Please use another!!');

const [email, setEmail] = useState({value:'',error:''});
const [password,setPassword] = useState({value:'',error:''});
const [name,setName] = useState({value:'',error:''});

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
 const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };





const signup = () => {


const emailError = emailValidator(email.value);
const nameError = requiredValidator(name.value);
const passwordError = requiredValidator(password.value);

   if (emailError || nameError || passwordError) {
      setName({ ...name, error: nameError });
      setPassword({ ...password, error: passwordError });
      setEmail({ ...email, error: emailError });

  //    setMPlace({ ...mplace, error: mplaceError });
    //  setTermAdding(false);
      return false;
    }

// check for email before creating account








try {

const body = {
   "email": email.value,    
};


var formBody = [];
for (var key in body) {
   var encodedKey = encodeURIComponent(key);
   var encodedValue = encodeURIComponent(body[key]);
   formBody.push(encodedKey + '=' + encodedValue);
}
formBody = formBody.join('&');

fetch('http://localhost:5000/checkEmailExists', {

   method: 'POST', 
   headers: {
        'Content-Type': 'application/x-www-form-urlencoded',              
      } ,
   body:formBody     
}).then((resp) => {
  resp.json().then((data) => {
  
//alert('datamess'+data.message);

if (data.message==="email can be used") {



  createUserWithEmailAndPassword(fauth, email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    alert(JSON.stringify(user));

// create user in our system 


// backend-incio.onrender.com


const body = {
   "name": name.value, 
   "email": email.value, 
   "password": password.value,
   "fireb_uid": user.uid,   
};


console.log('mmbody==',body);

var formBody = [];
for (var key in body) {
   var encodedKey = encodeURIComponent(key);
   var encodedValue = encodeURIComponent(body[key]);
   formBody.push(encodedKey + '=' + encodedValue);
}
formBody = formBody.join('&');



try{
  fetch('http://localhost:5000/createUser', {

   method: 'POST', 
   headers: {
        'Content-Type': 'application/x-www-form-urlencoded',              
      } ,
   body:formBody     
}).then((resp) => {
  resp.json().then((data) => {
  let adata = data;

    notifysignup();
    setSignupLoading(false);

console.log('adata=',adata);
      navigate("/dashboard",'refresh');

     });
});


} catch(e) { console.log('caught err'+e.message); }




// now proceed user to dashboard

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;

    const errorMessage = error.message;

    console.log('trycatcherror::'+errorCode+'msg=='+errorMessage);
    // ..
  });


  }
else {
   notifyuseremailexists();
}
   });
});

} catch(e) { console.log('caught signup err'+e.message); }





  }

 const signInWithGoogle = async(e) => {


const googleAuthProvider = new GoogleAuthProvider();

// e.preventDefault();
    try {
      await signInWithPopup(auth, googleAuthProvider);
      notifylogin();
      navigate("/dashboard",'refresh');
    } catch (error) {
      console.log(error.message);
    }
} 

/*
"& .MuiOutlinedInput-root": {
      "& > fieldset": { borderColor: "#f2f2f2",backgroundColor:"#f2f2f2",color:'black'},}
      */


return (



        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square>


<Typography sx={{marginLeft:4,marginTop:2,fontSize:22,fontFamily:'AeonikBold'}}>incio.io</Typography>

          <Box
            sx={{
              mt: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            
            <Typography  sx={{fontSize:30,fontFamily:'AeonikBold'}} component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="div" noValidate sx={{ mt: 3,mx:'auto'}}>
           
              <Box sx={{mx:'auto',backgroundColor:'white',p:2,m:1,width:330,alignItems:'center',alignSelf:'center',justifyContent:'center'}}>


<Box sx={{width:'100%'}}>
              <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>

              Name</Typography>
             <InputBase
                required
                sx={{height:40,width:'100%' ,color:'black', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                type="text"
                value={name.value}
                fullWidth                
                onChange={(e) => { setName({value:e.target.value,error:''}) }}                              
              /> <span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(name.error)}</span>
</Box>


<Box sx={{width:'100%',marginTop:3}}>
              <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>

              Email</Typography>
             <InputBase
                required
                sx={{height:40,width:'100%' ,color:'black', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                type="email"
                value={email.value}
                fullWidth                
                onChange={(e) => { setEmail({value:e.target.value,error:''}) }}                              
              /> <span style={{float:'left',color:"#FF3B30",fontSize:12, fontFamily:'AeonikBold'}}>{(email.error)}</span>
</Box>
<Box sx={{marginTop:3}}>
           <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>

              Password</Typography>
          <InputBase
            id="filled-adornment-password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            onChange={(e) => { setPassword({value:e.target.value,error:''}) }}
            sx={{height:40,width:'100%', color:'black',backgroundColor:'#f2f2f2', fontSize:14,fontFamily:'AeonikBold'}}
            size="small"
            value={password.value}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  sx={{marginLeft:-1}}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>&nbsp;&nbsp;
              </InputAdornment>
            }
          />
</Box>
<Box>
              <Button
               onClick={() => {setSignupLoading(true);signup();}}
                type="submit"
                variant="contained"
                sx={{boxShadow:'none',"&:hover":{backgroundColor:'#000',color:'#fff'},color:'#000',fontWeight:'bold',width:130,textTransform:'none', mt:3,mx:'auto',display:'flex',justifyContent:'center',alignItems:'center',alignSelf:'center',fontFamily:'AeonikRegular',backgroundColor: '#f2f2f2'}}
              >
                Sign Up{ signupLoading && <CircularProgress size="small" color="info"/> }
              </Button></Box>
     </Box>         

 <Box elevation={1} sx={{width:330,p:2,m:1,backgroundColor:'white',display:'flex',justifyContent:'center',alignItems:'center',alignSelf:'center',flexDirection:'column'}}>
          <Typography style={{fontSize:13,fontFamily:'AeonikBold',marginTop:-10,marginBottom:10}}>or</Typography>



<Box onClick={() => signInWithGoogle()} sx={{display:'flex',height:50,marginLeft:-5,marginRight:-5,width:330,marginBottom:5,backgroundColor:'#f2f2f2',alignItems:'center'}}>
<img src={require('../assets/images/google.png')} style={{marginLeft:10,width:30,height:30}}/>
<Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>&emsp;Log In with Google</Typography>

</Box>

<Box onClick={() => signInWithGoogle()} sx={{marginTop:-3,display:'flex',height:50,marginLeft:-5,marginRight:-5,width:330,marginBottom:5,backgroundColor:'#f2f2f2',alignItems:'center'}}>
<img src={require('../assets/images/appleicon.png')} style={{marginLeft:10,width:30,height:30}}/>
<Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>&emsp;Log In with Apple</Typography>

</Box>


<Box onClick={() => signInWithGoogle()} sx={{marginTop:-3,display:'flex',height:50,marginLeft:-5,marginRight:-5,width:330,marginBottom:5,backgroundColor:'#f2f2f2',alignItems:'center'}}>
<img src={require('../assets/images/linkedin.png')} style={{marginLeft:10,width:30,height:30}}/>
<Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>&emsp;Log In with LinkedIn</Typography>

</Box>



              </Box>


                <Box sx={{flexDirection:'row',display:'flex',justifyContent:'center'}}>
                  <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>
                    Already have an account? &nbsp;</Typography>
                    <Typography onClick={() => navigate('/login')} sx={{color:'#9249f4',fontSize:13,fontFamily:'AeonikBold'}}>
                     Sign in.
                     </Typography>
                
                  
                </Box>
                
                
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>

)


}

export default Signup;