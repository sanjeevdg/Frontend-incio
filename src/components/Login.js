import React, { useState } from 'react';

import { firebase, auth } from '../config/firebase-config';
import {useNavigate} from 'react-router-dom';

import {Avatar,Button,CssBaseline,TextField,FormControlLabel,Checkbox,Link,Paper,Box,Grid}
    from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { FacebookLoginButton } from "react-social-login-buttons";
import { GoogleLoginButton } from "react-social-login-buttons";

import 'react-phone-input-2/lib/style.css'
import PhoneInput from 'react-phone-input-2'

//import { app } from '../config/firebase-config';
import toast, { Toaster } from 'react-hot-toast';

import {getAuth, signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup} from 'firebase/auth';

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

function Login() {

let navigate = useNavigate();

const notifylogin = () => toast.success('Logged in successfully!');

const [mynumber, setnumber] = useState("");
  const [otp, setotp] = useState('');
  const [show, setshow] = useState(false);
  const [final, setfinal] = useState('');






const loginusingemail = () => {


/*
const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

*/
}












const signin = () => {

    if (mynumber === "" || mynumber.length < 10) return;
alert('mynumber=='+mynumber);

  var myn = mynumber.replace(/-/g,'');
      myn = '+'+myn;
console.log('myn=='+myn);

    let verify = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    // alert('phone'+myn);
    auth.signInWithPhoneNumber(myn, verify).then((result) => {
      setfinal(result);
      alert("code sent")
      setshow(true);
    })
      .catch((err) => {
        alert(err);
     //   window.location.reload()
      });
  }

  // Validate OTP
  const ValidateOtp = () => {
    if (otp === null || final === null)
      return;
    final.confirm(otp).then((result) => {

      navigate('/dashboard');
      // success
    }).catch((err) => {
      alert("Wrong code");
    })
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


const signInWithFacebook = async() => {

var provider = new FacebookAuthProvider();
// https://58ca-110-224-17-19.ngrok.io/people/auth/facebook/callback


//https://btauth-94c78.firebaseapp.com/__/auth/handler

https://www.facebook.com/v8.0/dialog/oauth?response_type=code%2Cgranted_scopes&client_id=478019230921376&redirect_uri=https%3A%2F%2Fbtauth-94c78.firebaseapp.com%2F__%2Fauth%2Fhandler&state=AMbdmDkex99fUmRM0TTMYk72reb514c1xzuFXUzIs0aiTup1jBi1dK9u1zdArqV7ueEDNniMM3-ahkSjAraDUJ3LNmMjgQuLqqvZEAJiQPSR06sxBrDxdmzw5jY4suKAikUVA7A60gQdjkItQOxpcnPHjB_1uaZ9E0EaPKaI5CT9CKNT0voBFrHvj1nVkDl0wbn0oBgqF0uMlrGaW9-dYL8PiMxBvWI4Q7DPVxBPgL82mmo9661jAOoX78CW4CaVswKYkDF6lWDSCVhbsL0MLmLXrD4ECkFfBPVf47qb9ZAU094cAjcqfxyZ0CMZgfArtjhG5mDI38csUiR7Vfh2&scope=public_profile%2Cemail&context_uri=https%3A%2F%2F58ca-110-224-17-19.ngrok.io

//firebase.auth().
   signInWithPopup(auth, provider)   
   .then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
    notifylogin();
      console.log(token)
      console.log(user)
   }).catch(function(error) {
      console.log(error.code);
      console.log(error.message);
   });
}


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
              Log In
            </Typography>
            <Box component="div" noValidate sx={{ mt: 3,mx:'auto'}}>
        {!show?       
              <Box sx={{mx:'auto',backgroundColor:'#f5f5f5',p:2,m:1,width:330,alignItems:'center',alignSelf:'center',justifyContent:'center'}}>


              <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>

              Phone Number</Typography>
              <PhoneInput
                margin="normal"
                required
                country={'in'}             
                onChange={(e) => {setnumber(e) }}
                value={mynumber}
                label="Phone Number"
                autoFocus
              /><Box  sx={{mt:1,mb:2}} id="recaptcha-container"></Box>
              <Button
               onClick={() => signin()}
                type="submit"
                variant="contained"
                sx={{ mt:3,mx:'auto',display:'flex',justifyContent:'center',alignItems:'center',alignSelf:'center',width:'60%',fontFamily:'AeonikRegular',backgroundColor: '#9249F4'}}
              >
                Get OTP
              </Button></Box>:<></>}
          {show?      
              <Box sx={{mx:'auto',backgroundColor:'#f5f5f5',p:2,m:1,width:330}}><TextField
                margin="normal"
                required
                fullWidth
                onChange={(e) => { setotp(e.target.value) }}
                label="Enter OTP"                
              /><Button
               onClick={() => {ValidateOtp();notifylogin();}}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 1 }}
              >
                Verify OTP
              </Button></Box>:<></>}
              
              
              
              <Box elevation={1} sx={{width:330,p:2,m:1,backgroundColor:'white',display:'flex',justifyContent:'center',alignItems:'center',alignSelf:'center',flexDirection:'column'}}>
          <Typography style={{fontSize:13,fontFamily:'AeonikBold',marginTop:-10,marginBottom:10}}>or</Typography>
<Box onClick={() => signInWithGoogle()}><img src={require('../assets/images/google-login.png')} style={{width:350}}/></Box>
<Box onClick={() => signInWithGoogle()}><img src={require('../assets/images/apple-login.png')} style={{width:350}} /> </Box>
<Box onClick={() => signInWithGoogle()}><img src={require('../assets/images/linkedin-login.png')} style={{width:350}} /> </Box>



              </Box>
              
                <Box sx={{flexDirection:'row',display:'flex',justifyContent:'center'}}>
                  <Typography sx={{fontSize:13,fontFamily:'AeonikBold'}}>
                    Dont have an account? &nbsp;</Typography>
                    <Typography onClick={() => navigate('/signup')} sx={{color:'#9249f4',fontSize:13,fontFamily:'AeonikBold'}}>
                     Sign up for FREE.
                     </Typography>
                
                  
                </Box>
                
                
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>

)


}

export default Login;