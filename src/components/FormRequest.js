import React, { Component } from 'react'
import { MDBCard, MDBCardBody } from "mdbreact";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Navbar from './nav/Navbar';
import Background from '../styles/images/background.jpg';
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Message } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'






const useStyles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
});

const documents = [
    {
        id: "ats-trav",
        value: "Attestation de travail"
    },
    {
        id: "ats-sal",
        value: "Attestation de salaire"
    },
];



class FormRequest extends Component {

    constructor() {
        super();
        this.state = {
            nom: "",
            prenom: "",
            documentType: "",
            comment: ""
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const firstname = localStorage.getItem("firstname");
        const lastname = localStorage.getItem("lastname");
        const email = localStorage.getItem("email");
        const owner = localStorage.getItem("user");

        console.log("after submiting")
        var data = {
            nom: lastname,
            prenom: firstname,
            email: email,
            owner : owner,
            documentType: this.state.documentType,
            comment: this.state.comment,
        };
        const token = localStorage.getItem("token");
        console.log(data)
        const headers = {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            'Authorization': `Bearer ${token}`
        }
        axios.post("http://localhost:8080/api/request/", data
            , {
                headers: headers
            }
        )
            .then(response => {

                console.log("after " + JSON.stringify(response.data));
                this.setState({
                    formConfirm: true
                });
            })
            .catch(e => {
                console.log(e);
            });

    }

    render() {
        //styling class component
        const { classes } = this.props
        return (
            <div>
                <Navbar />
                <div style={{
                    paddingTop: 120,
                    backgroundImage: `url(${Background})`,
                    height: "100vh",  //full screen
                }}>
                    <Container component="main" maxWidth="sm">
                        <MDBCard>
                            <MDBCardBody >
                                <div className={classes.paper}>
                                    <Typography component="h1" variant="h5">
                                        Formulaire des demandes
                                    </Typography>
                                    <form
                                        className={classes.form}
                                        onSubmit={this.onSubmit}
                                        autoComplete="off"
                                    >
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="document"
                                                    name="documentType"
                                                    select
                                                    label="Document"
                                                    fullWidth
                                                    required
                                                    value={this.state.documentType}
                                                    onChange={this.onChange}
                                                    SelectProps={{
                                                        native: true
                                                    }}
                                                    variant="outlined"
                                                >
                                                    <option
                                                        hidden
                                                        key={0}
                                                        value={0}
                                                    >
                                                        Document
                                                </option>
                                                    {documents.map(option => (
                                                        <option
                                                            key={option.id}
                                                            value={option.value}
                                                        >
                                                            {option.value}
                                                        </option>
                                                    ))}
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="comment"
                                                    name="comment"
                                                    label="Commentaire"
                                                    fullWidth
                                                    multiline
                                                    rows={3}
                                                    variant="outlined"
                                                    value={this.state.comment}
                                                    onChange={this.onChange}
                                                />

                                            </Grid>
                                        </Grid>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                        >
                                            Terminer
                                    </Button>
                                        {this.state.formConfirm && (
                                            <Message
                                                style={{
                                                    color: 'white', backgroundColor: '#0a2345',
                                            }}
                                                header="Votre demande est envoyé"
                                            />
                                         )} 
                                    </form>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </Container>
                </div>
            </div>
        )
    }
}

export default withStyles(useStyles, { withTheme: true })(FormRequest)