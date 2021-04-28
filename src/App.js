import React, { useState, useEffect }  from 'react';
import './App.css'
import Login from './components/Login';
import Navbar from './components/Navbar'
import firebase from './firebase.config'
import 'firebase/auth';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core';



let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#607d8b",
      dark: "#435761",
      light: "#7f97a2"

    },
    secondary: {
      main: "#1de9b6",
      dark: "#7f97a2",
      light:"#4aedc4"
    },

  },
});


theme = responsiveFontSizes(theme);

function App() {

  const auth = firebase.auth()
  const [user, setUser] = useState(()=> auth.currentUser)
  const [email, setEmail] = useState()
  const [mdp, setMdp] = useState()
  const [error, setError] = useState('')
  const db = firebase.firestore(); //init bdd 
 
  const signInWithGoogle = async () => {
    //Connexion avec google
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.useDeviceLanguage();

    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //Renvoi l'utilisateur en instance
    const unsubscribe = auth.onAuthStateChanged((user) => {
      user? setUser(user):setUser(null)
        
    });

    return unsubscribe;
  }, []);



   const signOut = async () => { //Déconnexion utilisateur
    
    try{
      await firebase.auth().signOut();
      setError('')

    }catch(error){
      console.log(error.message);
    }
  };


  const createAccount = () =>  { // création de compte
   
      console.log(email, mdp);


      firebase.auth().createUserWithEmailAndPassword(email, mdp)
      .then((userCredential) => {
          
           setUser(userCredential.user)
          
      })
      .catch((error) => {
          
          let errorMessage = error.message;
          console.log(errorMessage)
          setError(errorMessage)
      });
  };


  const loginUser = () => { // login un user ou retourne une erreur
    firebase.auth().signInWithEmailAndPassword(email, mdp)
      .then((userCredential) => {
        
        setUser(userCredential.user)
     
      })
      .catch((error) => { 
        let errorMessage = error.message;
        console.log(errorMessage)
        setError(errorMessage)
      });
    }; 
  



  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      {user? <Navbar  signOut={signOut} db={db} user={user}/> : <Login loginUser={loginUser} signInWithGoogle = {signInWithGoogle} setEmail ={setEmail} setMdp ={setMdp} createAccount={createAccount} error={error}/>}     
    </div>
    </ThemeProvider>
  );
}

export default App;
