import * as React from "react"

import Typography from '@material-ui/core/Typography';

import Calendar from 'react-calendar';
import moment from 'moment';
import "../components/calendar.css"

const HomePage = (props) => {
    const [value, onChange] = React.useState(new Date());

    const startDate = new Date(2021, 3, 10);

    const oneDay = 24 * 60 * 60 * 1000;
    const today = new Date();

    function turnoDi(date){
        let diff = Math.round(Math.abs((startDate - date) / oneDay))
        if(Math.ceil(diff/4) % 3 == 0){
            return "Laura"
        } else if(Math.ceil(diff/4) % 2 == 0){
            return "Fili"
        } else {
            return "Giulio"
        }
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
                    if(Math.ceil(diff/4) % 3 == 0){
                        return "highlightlaura"
                    } else if(Math.ceil(diff/4) % 2 == 0){
                        return "highlightfili"
                    } else {
                        return "highlightgiulio"
                    }
                }}
                minDate={
                    new Date()
                  }
            />
            <Typography variant="body1" component="body1" gutterBottom>
            Giorno di {turnoDi(value)}
            </Typography>
        </div>
    )
}

export default HomePage
