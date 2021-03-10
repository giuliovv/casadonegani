import * as React from "react"

import Typography from '@material-ui/core/Typography';

import Calendar from 'react-calendar';
import "../components/calendar.css"

const HomePage = (props) => {
    const [value, onChange] = React.useState(new Date());

    return(
        <div style={{display:"block"}}>
            <Typography variant="h1" component="h2" gutterBottom>
            {props.user !== "Laura" ? "Benvenuto" : "Benvenuta"} {props.user}
            </Typography>
            <Calendar
                style={{magin:"auto"}}
                locale="it-IT"
                onChange={onChange}
                showWeekNumbers
                value={value}
            />
        </div>
    )
}

export default HomePage
