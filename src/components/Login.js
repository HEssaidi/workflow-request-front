import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import GoogleBtn from "./GoogleBtn";
import LogIn from "./../actions/services/Login";
import { withRouter } from 'react-router';


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        // backgroundColor : "#0a2345",
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        // backgroundColor: theme.palette.secondary.main,
        backgroundColor : "#01f0be"
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));




function Login() {
    const handleLogin = props => {     //handle Submit 
        props.preventDefault();
        LogIn.get()
            .then(response => {
                console.log(response.data)
                console.log(response.data.name)
                console.log(response.data.email)
            })
            .catch(e => {
                console.log(e);
            });
    };


    const classes = useStyles();   //for styling 

    return (
        <Grid container component="main" className={classes.root}>
            {/* <CssBaseline /> */}
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square >
                <div className={classes.paper}>

                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>

                    <form className={classes.form} onSubmit={handleLogin} noValidate>
                        <h6
                            style={{ color: "red" }}
                            className="text-center"
                        >
                        </h6>
                        {/* this is the google btn, "GoogleBtn.js file"  */}
                        {/* couldn't be customized, if that should use react-google-button  */}
                        <GoogleBtn />
                    </form>

                </div>
            </Grid>

        </Grid>

    )
}
export default withRouter(Login)
