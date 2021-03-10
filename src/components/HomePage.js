import * as React from "react"

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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

const useStyles = makeStyles((theme) => ({
    root: {
      width: '50%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      margin: "auto",
      overflow: 'auto',
      maxHeight: 300,
    },
  }));

const HomePage = (props) => {
    const classes = useStyles();
    const [value, onChange] = React.useState(new Date());
    const [date, setDate] = React.useState("");
    const [timestamps, setTimestamps] = React.useState([""]);
    const [open, setOpen] = React.useState(false);

    const startDate = new Date(2021, 3, 10);

    const oneDay = 24 * 60 * 60 * 1000;
    const today = new Date();
    today.setHours(0,0,0,0);

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

    React.useEffect(
        () => {
            if(date != ""){
                setTimestamps(date.map(data => data.data().data.toDate().getTime()))
            }
        },
        [date],
      );

    async function firma(){
        let utente = props.user
        const data = {
            data: firebase.firestore.Timestamp.fromDate(today),
            user: utente,
          };
          
          await firebase.firestore().collection("bagno").doc(today.getTime().toString()).set(data).then(() => {
              setOpen(true);
              firebase.firestore().collection("bagno").orderBy('data', 'desc').limit(50).get()
                .then(collec => {
                    setDate(collec.docs)
                });
          });
    }
  
    return(
        <div style={{display:"block"}}>
            <div style={{minHeight: "100vh", display: "table"}}>
                <div style={{display: "table-cell",  verticalAlign: "middle"}}>
                    <Typography variant="h1" component="h2" gutterBottom style={{marginTop:"20px", marginBottom: "20px"}}>
                    {props.user !== "Laura" ? "Benvenuto" : "Benvenuta"} {props.user}
                    </Typography>
                    <Calendar
                        style={{magin:"auto"}}
                        locale="it-IT"
                        onChange={onChange}
                        value={value}
                        tileClassName={({ date, view }) => {
                            if(timestamps.includes(date.getTime())){
                                return "giornoFatto"
                            }
                            if(date.getTime() < today.getTime()){
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
                    <Typography variant="overline" component="overline" display="block"  align="center" gutterBottom style={{width:"100vw", marginTop: "20px", marginBottom:"20px", overflowX: "hidden"}}>
                    Giorno di {turnoDi(value)}
                    </Typography>
                    <Button variant="contained" color="primary" onClick={() => firma()}>
                        Ho pulito
                    </Button>
                </div>
            </div>

            <hr/>

            <Typography variant="h6" component="h6" display="block"  align="center" gutterBottom style={{width:"100vw", overflowX: "hidden"}}>
            Registro
            </Typography>

            <List dense={true} className={classes.root}>
              {date == "" ? 
              "Caricamento..." :
              date.map( data =>
                <ListItem>
                  <ListItemText
                    primary={Intl.DateTimeFormat('it-IT').format(data.data().data.toDate())}
                    secondary={data.data().user}
                  />
                </ListItem>,
              )}
            </List>

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
