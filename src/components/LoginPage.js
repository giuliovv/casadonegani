import React from 'react';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

function LoginPage(props) {
    const classes = useStyles();
    function setLogin(user){
        props.setUser(user);
        localStorage.setItem('username', user);
    }

    return (
    <div className={classes.root}>
        <ButtonGroup
        orientation="vertical"
        color="primary"
        aria-label="vertical outlined primary button group"
        variant="text"
        >
        <Button onClick={() => setLogin("Fili")}>Fili</Button>
        <Button onClick={() => setLogin("Giulio")}>Giulio</Button>
        <Button onClick={() => setLogin("Laura")}>Laura</Button>
        </ButtonGroup>
    </div>
    );
}

export default LoginPage