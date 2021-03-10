import * as React from "react"
import { Link } from "gatsby"
import Typography from '@material-ui/core/Typography';

const HomePage = (props) => {

  return(
      <div style={{display:"block"}}>
        <Typography variant="h1" component="h2" gutterBottom>
        {props.user != "Laura" ? "Benvenuto" : "Benvenuta"} {props.user}
        </Typography>
        <Typography variant="body1" gutterBottom>
        body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
        unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
      </div>
  )
}

export default HomePage
