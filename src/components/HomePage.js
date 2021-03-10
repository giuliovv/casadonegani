import * as React from "react"

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';

import CloseIcon from '@material-ui/icons/Close';

import Calendar from 'react-calendar';
import "../components/calendar.css"

import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDZW57QvcounH23bpX2wTF2Hvkh75DF8j4",
    authDomain: "casadoneganimilano.firebaseapp.com",
    projectId: "casadoneganimilano",
    storageBucket: "casadoneganimilano.appspot.com",
    messagingSenderId: "17925739572",
    appId: "1:17925739572:web:c7cfe66d400b05b1da6661"

  };

if (typeof window!== "undefined" && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const HomePage = (props) => {
    const [value, onChange] = React.useState(new Date());
    const [date, setDate] = React.useState("");
    const [open, setOpen] = React.useState(false);

    const startDate = new Date(2021, 3, 10);

    const oneDay = 24 * 60 * 60 * 1000;
    const today = new Date();

    function turnoDi(date){
        let diff = Math.round(Math.abs((startDate - date) / oneDay))
        if(Math.ceil(diff/4) % 3 === 0){
            return "Laura"
        } else if(Math.ceil(diff/4) % 2 === 0){
            return "Fili"
        } else {
            return "Giulio"
        }
    }

    if (date===""){
        firebase.firestore().collection("bagno").orderBy('data', 'desc').limit(50).get()
            .then(collec => {
                setDate(collec.docs)
            })
    }

    async function firma(){
        let utente = props.user
        const data = {
            data: firebase.firestore.Timestamp.fromDate(today),
            user: utente,
          };
          
          // Add a new document in collection "cities" with ID 'LA'
          await firebase.firestore().collection("bagno").doc(today.getTime().toString()).set(data).then(setOpen(true));
    }
  
    return(
        <div style={{display:"block"}}>
            <Typography variant="h1" component="h2" gutterBottom>
            {props.user !== "Laura" ? "Benvenuto" : "Benvenuta"} {props.user}
            </Typography>
            <Calendar
                style={{magin:"auto"}}
                locale="it-IT"
                onChange={onChange}
                value={value}
                tileClassName={({ date, view }) => {
                    if(date.getTime() < today.getTime()-oneDay){
                        return
                    }
                    let diff = Math.round(Math.abs((startDate - date) / oneDay))
                    if(Math.ceil(diff/4) % 3 === 0){
                        return "highlightlaura"
                    } else if(Math.ceil(diff/4) % 2 === 0){
                        return "highlightfili"
                    } else {
                        return "highlightgiulio"
                    }
                }}
                minDate={
                    new Date()
                  }
            />
            <Typography variant="overline" component="overline" display="block"  align="center" gutterBottom style={{width:"100vw", marginTop: "20px", marginBottom:"20px"}}>
            Giorno di {turnoDi(value)}
            </Typography>
            {
                turnoDi(today) === props.user ?
                <Button variant="contained" color="primary" onClick={() => firma()}>
                    Fatto
                </Button> :
                null
            }
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
                message="Registrato"
                action={
                <React.Fragment>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={() => setOpen(false)}>
                    <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
                }
            />
        </div>
    )
}

export default HomePage
