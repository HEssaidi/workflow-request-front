import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles";
import Navbar from './nav/Navbar';
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Request from '../actions/services/Request';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link } from 'react-router-dom'


const useStyles = theme => ({
    header: {
        color: "#00BFFF",
    },
    pad: {
        paddingTop: 66
    },
    icon: {
        color: "#778899",
    },
    table: {
        minWidth: 600,
    },
    tableCell: {
        backgroundColor: "#0a2345",
        fontSize: "14px",
        color: "#01f0be",
    },
    tableRes: {
        fontSize: "14px",
    },
});


class HistoryTask extends Component {
    constructor() {
        super();
        this.state = {
            demandes: [],
        }
        this.getHistory = this.getHistory.bind(this);
    }

    componentDidMount() {
        this.getHistory()
    }

    getHistory() {
        const email = localStorage.getItem("email");
        Request.getHistoryByOwner(email)
            .then(response => {
                response.data.forEach((property) => {
                    // Access each object here by using response[property] or property.attribute...
                    console.log(property.varList)
                    this.state.demandes.push(property.varList)
                })
                console.log(Object.values(this.state.demandes))
                console.log(Object.keys(this.state.demandes))
                this.setState({
                    demandes: this.state.demandes
                })

            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { classes } = this.props
        return (
            <div>
                <Navbar />
                <div style={{
                    paddingTop: 50,
                    // backgroundImage:  `url(${Background})`  
                }}>
                    <Container component="main" maxWidth="lg">
                        <Grid className={classes.pad} container >
                            {/* <Grid item md={4} xs={12}> */}
                            <h2 style={{color: "#01f0be"}}> Historique des demandes</h2> <br/>
                            <TableContainer
                                style={{ width: "100%", margin: "0 10px" }}
                                component={Paper}
                            >
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" className={classes.tableCell}>Nom du collaborateur</TableCell>
                                            <TableCell align="center" className={classes.tableCell}>Prenom du collaborateur</TableCell>
                                            <TableCell align="center" className={classes.tableCell}>Document demandé</TableCell>
                                            <TableCell align="center" className={classes.tableCell}>Date de création de la demande</TableCell>
                                            <TableCell align="center" className={classes.tableCell}>Etat de la demande</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.demandes.map(demande => (
                                            <TableRow >
                                                <TableCell align="center" className={classes.tableRes}>{demande.nom}</TableCell>
                                                <TableCell align="center" className={classes.tableRes}>{demande.prenom}</TableCell>
                                                <TableCell align="center" className={classes.tableRes}><Link target="_blank" to={demande.file && `//${demande.file.substr('http://'.length)}`}>{demande.documentType}</Link></TableCell>
                                                <TableCell align="center" className={classes.tableRes}>{demande.creationTime}</TableCell>
                                                {demande.taskStatus && (
                                                    <TableCell align="center" style={{ color: "blue" }} className={classes.tableRes}>{demande.taskStatus}</TableCell>
                                                )}
                                                { !demande.taskStatus && (
                                                    <TableCell align="center" style={{ color: "green" }} className={classes.tableRes}>Acceptée</TableCell>
                                                )}   
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {/* </Grid> */}
                        </Grid>
                    </Container>
                </div>
            </div>
        )
    }
}
export default withStyles(useStyles, { withTheme: true })(HistoryTask)