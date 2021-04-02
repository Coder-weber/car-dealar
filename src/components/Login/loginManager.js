import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

 export const initializeLoginFramework=()=>{
   if(!firebase.apps.length){
   firebase.initializeApp(firebaseConfig)
   }
  } 
export const handleGoogleSingIn=()=>{
    const googleprovider = new firebase.auth.GoogleAuthProvider();

  return firebase.auth().signInWithPopup(googleprovider)
    .then(res=>{
      const {displayName,email,photoURL} =res.user;
      const signedInUser={
      isSignIn:true,
        name:displayName,
        email:email,
        password:'',
        photo:photoURL,
        success:true
  
      }
      return signedInUser;
    //   console.log(displayName,email,photoURL);
    })
    .catch(err=>{
      console.log(err);
      console.log(err.message);
    })
  }
  

 export const handleGitHubSignIn=()=>{
    const githubprovider = new firebase.auth.GithubAuthProvider();
  
   return firebase.auth().signInWithPopup(githubprovider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
  
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      var token = credential.accessToken;
  
      // The signed-in user info.
      const user = result.user;
      return user
      console.log('git hub sign in ',user);
    //   setUser(user);
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('show error ',errorMessage);
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }
  
export  const handleFbSignIn=()=>{
    const fbprovider = new firebase.auth.FacebookAuthProvider();
    
  return  firebase.auth().signInWithPopup(fbprovider)
    .then((result) => {
      console.log(result);
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
  
      // The signed-in user info.
      var user = result.user;
      user.success=true;
      return user;
      console.log('fb sign in info ',user);
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var accessToken = credential.accessToken;
  
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      // The email of the user's account used.
      var email = error.email;
  
  
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
  
      // ...
    });
  
  }
  
export  const handleSingOut=()=>{
   return firebase.auth().signOut()
    .then(res=>{
      const signedOutUser={
       isSignIn:false,
       name:'',
       email:'',
       error:'',
       success:false,
       photo:'',
       
    }
      return signedOutUser;
      
    })
    .catch(err=>{ 
      console.log(err.message);
    })
    console.log('sign out clicked');
  }

  export const createUserWithEmailAndPassword=(name,email, password)=>{
   return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      // ...
    })
    .then(res=>{
      const newUserInfo =res.user;
      newUserInfo.error='';
      newUserInfo.success=true;
      updateUserName(name);
    return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo ={};
      newUserInfo.error=error.message;
      newUserInfo.success=false;
        return newUserInfo;
    });

  }
export const signInWithEmailAndPassword =(email,password)=>{
   return firebase.auth().signInWithEmailAndPassword(email,password)
    .then((res) => {
      // Signed in
      // var user = userCredential.user;
      // ...
      
    const newUserInfo =res.user;
    newUserInfo.error='';
    newUserInfo.success=true;
    return newUserInfo;
    })
    .catch((error) => {
    const newUserInfo ={};
    newUserInfo.error=error.message;
    newUserInfo.success=false;
    return newUserInfo;
});

}


const updateUserName=(name)=>{
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name
      }).then(()=> {
        console.log('user name updated successfully');
    }).catch((error)=> {
      console.log('error update', error);
  });
  
  }