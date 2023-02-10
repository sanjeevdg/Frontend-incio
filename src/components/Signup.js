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
import {emailValidator} from '../utils/validators';


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

const [email, setEmail] = useState({value:'',error:''});
const [password,setPassword] = useState({value:'',error:''});

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
 const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };





const signup = () => {


const emailError = emailValidator(email.value);
//const mplaceError = requiredValidator(mplace.value);

   if (emailError) {
      setEmail({ ...email, error: emailError });
  //    setMPlace({ ...mplace, error: mplaceError });
    //  setTermAdding(false);
      return false;
    }




  createUserWithEmailAndPassword(fauth, email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    alert(user);
    notifysignup();
    setSignupLoading(false);
      navigate("/dashboard",'refresh');
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });


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

              Email</Typography>
             <InputBase
                required
                sx={{height:40,width:'100%' ,color:'black', fontSize:14,fontFamily:'AeonikBold',backgroundColor:'#f2f2f2'}}
                size="small"
                type="email"
                fullWidth                
                onChange={(e) => { setEmail({value:e.target.value,error:''}) }}                              
              /> <span color="red">{(email.error)}</span>
</Box>
<Box sx={{marginTop:3}}>
           <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>

              Password</Typography>
          <InputBase
            id="filled-adornment-password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            onChange={(e) => { setPassword(e.target.value) }}
            sx={{height:40,width:'100%', color:'black',backgroundColor:'#f2f2f2', fontSize:14,fontFamily:'AeonikBold'}}
            size="small"
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
                sx={{ mt:3,mx:'auto',display:'flex',justifyContent:'center',alignItems:'center',alignSelf:'center',width:'60%',fontFamily:'AeonikRegular',backgroundColor: '#9249F4'}}
              >
                Sign Up{ signupLoading && <CircularProgress color="info"/> }
              </Button></Box>
     </Box>         

 <Box elevation={1} sx={{width:330,p:2,m:1,backgroundColor:'white',display:'flex',justifyContent:'center',alignItems:'center',alignSelf:'center',flexDirection:'column'}}>
          <Typography style={{fontSize:13,fontFamily:'AeonikBold',marginTop:-10,marginBottom:10}}>or</Typography>
<Box onClick={() => signInWithGoogle()}><img src={require('../assets/images/google-login.png')} style={{width:350}}/></Box>
<Box onClick={() => signInWithGoogle()}><img src={require('../assets/images/apple-login.png')} style={{width:350}} /> </Box>
<Box onClick={() => signInWithGoogle()}><img src={require('../assets/images/linkedin-login.png')} style={{width:350}} /> </Box>



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