import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles";
import Navbar from './nav/Navbar';
import { Card, Button } from 'react-bootstrap';
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Request from '../actions/services/Request';
import { FaFilePdf } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField";
import NoDataFound from '../exceptions/NoDataFound';
import Filter from './Filter';
import Remark from './Remark';



const useStyles = theme => ({
    header: {
        color: "#01f0be",
        borderColor: "#0a2345",
    },
    card: {
        borderColor: "#0a2345",
    },
    pad: {
        paddingTop: 66
    },
    icon: {
        color: "#778899",
    },
    btn: {
        margin: 5,
    },
    btnRight: {
        float: "right",
        margin: 5,

    },
    remarkIcon: {
        float: "right",
        color: "red",
    },
    remark: {
        color: "blue", 
        backgroundColor: "pink", 
        position:'absolute',
    },
    dialogPaper: {
        minWidth: '80vh',
        maxWidth: '80vh',
        border: "3px solid #ffcc00",
    },
});


class RequestList extends Component {
    intervalID;
    constructor() {
        super();
        this.state = {
            demandes: [],
            demandesKeys: [],
            files: [],
            remarks: [],
            taskID_v: "",
            selectedFile: "",
            remark_s: "",
            doc_OK: true,
            user: "",
            grp: "dirG",
            displayBtns: [],
        }

        this.valid = this.valid.bind(this);
        this.notvalid = this.notvalid.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onChange = this.onChange.bind(this);
        this.cancelRemark = this.cancelRemark.bind(this);
        this.claimTask = this.claimTask.bind(this);
        this.closeClaimDialog = this.closeClaimDialog.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleClose(e) {
        if (this.state.openRemarkDialog) {
            this.setState({
                openRemarkDialog: false,
            });
            console.log("remark is " + this.state.remark_s) //work with this
            console.log("clicked id is " + this.state.taskID_v)
            console.log("doc status " + this.state.doc_OK)
            var data = {
                remark: this.state.remark_s,
            }
            const formData = new FormData();
            formData.append("remark", data.remark)
            formData.append("docStatus", this.state.doc_OK)
            formData.append("taskId", this.state.taskID_v)
            Request.docNotValidDG(formData)
                .then(res => {
                    console.log("remark sent !!!!!!!.")
                    window.location.reload(true)
                });



        } else {
            this.setState({
                openConfirmDialog: false,
            });
            window.location.reload(true)
        }

    }
    getTasks() {
        const user = localStorage.getItem("user");
        console.log("user" + user)
        this.setState({
            user: user
        }, () => console.log(this.state.grp))
        Request.getTasksByGroupUsers("dirG")
            .then(response => {
                // console.log(response.data[0])
                const demande = response.data
                console.log(JSON.stringify(demande))
                console.log(Object.keys(demande))    //task ids
                console.log(Object.values(demande))  //demandes data
                console.log(Object.entries(demande))  //demandes data Object.entries(demande)[0]
                Object.values(demande).forEach((property) => {
                    // Access remarks for each object here by using response[property] or property.attribute...
                    if (property.AGremark) {
                        console.log(property.AGremark)
                        this.state.remarks.push(property.AGremark)
                        console.log("AG remark"+this.state.remarks)
                    }
                    if (property.DGremark) {
                        console.log(property.DGremark)
                        //execute the manipulations
                        this.state.remarks.push(property.DGremark)
                        console.log("DG remark"+this.state.remarks)
                    }
                })
                this.setState({
                    demandes: Object.values(demande),
                    demandesKeys: Object.keys(demande),
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    componentDidMount() {
        this.getTasks()
    }


    valid(e) {
        const formData = new FormData();
        var is_OK = true
        this.setState({
            doc_OK: is_OK,
        });
        console.log("e.target.id" + e.target.id)
        console.log("is_OK" + is_OK)
        formData.append('taskId', e.target.id);
        formData.append('docStatus', is_OK);
        console.log("user is " + this.state.user)
        Request.docValidDG(formData)
            .then(res => {
                this.setState({
                    openConfirmDialog: true,
                });
                console.log("email sent !!!!!!!.")
            });
    }

    claimTask(e) {
        const taskID_v = e.target.id        //get task id / demande id
        console.log("I'm " + this.state.user + ", I will claim task : " + taskID_v.slice(0, -1))
        console.log("index is " + e.target.attributes.index.value + "typeof " + typeof e.target.attributes.index.value)
        const formData = new FormData();
        formData.append('taskId', taskID_v.slice(0, -1));
        formData.append('userID', this.state.user);
        Request.claimTask(formData)
            .then(res => {
                this.setState({
                    openClaimDialog: true,
                    taskId: taskID_v.slice(0, -1),
                    index: e.target.attributes.index.value,
                });
            })
            .catch(e => {
                console.log("something went wrong!!!")
            });
    }

    closeClaimDialog() {
        //copy the arrays
        const selectedDemds = this.state.displayBtns.slice()
        //execute the manipulations
        selectedDemds[parseInt(this.state.index, 10)] = this.state.taskId
        this.setState({
            openClaimDialog: false,
            displayBtns: selectedDemds,  //to display btns
        }, () => {
            console.log(this.state.displayBtns);
        });
    }

    notvalid(e) {
        this.setState({
            openRemarkDialog: true,
            taskID_v: e.target.id,
            doc_OK: false,
        });
        console.log("selected id handleClick" + e.target.id)
    }

    cancelRemark(e) {
        this.setState({
            openRemarkDialog: false,
        });
        console.log("btn cancel")
    }

    handleFilter = (docTypeTasks) => {
        this.setState({filteredTasks: docTypeTasks})
        console.log("docType" + JSON.stringify(docTypeTasks))
        this.setState({
            demandes: Object.values(docTypeTasks),
            demandesKeys: Object.keys(docTypeTasks),

        });
    }


    render() {
        const { classes } = this.props
        return (
            // styling using bootstrap in src/index.js
            <div>
                <Navbar />
                <div style={{
                    paddingTop: 40,
                }}>

                    <Container component="main" maxWidth="lg">
                        <Grid className={classes.pad} container spacing={2}>
                            <Grid item md={4} xs={12}>
                                {/* get another data component --------- check filter component props */}
                                <Filter dataParentToChild = {this.state.grp} onFilter={this.handleFilter} />
                            </Grid>
                            <Grid item md={8} xs={12}>
                                {this.state.demandesKeys.map((value, index) => (
                                    <Card className={classes.card}>   
                                        <Card.Header className={classes.header} as="h5">{this.state.demandes[index].documentType} {(this.state.demandes[index].DGremark || this.state.demandes[index].AGremark) &&  <Remark  dataParentToChild= {value}  />}</Card.Header>
                                        <Card.Body>
                                            <Card.Title as="h6">{this.state.demandes[index].nom} {this.state.demandes[index].prenom}</Card.Title>
                                            {this.state.demandes[index].file ? (
                                                <Card.Text>
                                                    {this.state.demandes[index].commentaire && (   
                                                        <>
                                                            Commentaire  : {this.state.demandes[index].commentaire} <br />
                                                        </>
                                                    )}
                                                    <FaFilePdf />  <Link target="_blank" to={`//${this.state.demandes[index].file.substring('http://'.length)}`}>{this.state.demandes[index].documentType}</Link> <br /> <br />
                                                    {(this.state.displayBtns[index] === value) ?
                                                        <>
                                                            <Button variant="outline-success" id={value} onClick={this.valid} className={classes.btn}>Valider</Button>
                                                            <Button variant="outline-danger" id={value} onClick={this.notvalid} className={classes.btn}>Remarque</Button>
                                                        </>
                                                        :
                                                        <Button variant="outline-success" id={value + 1} onClick={this.claimTask} className={classes.btnRight} index={index}>Prendre en charge</Button>
                                                    }
                                                </Card.Text>
                                            ) : (
                                                    <Card.Text>Pas de pièce jointe pour cette demande</Card.Text>
                                                )}
                                        </Card.Body>
                                    </Card>
                                ))}
                                {/* when data not found  */}
                            {Object.keys(this.state.demandesKeys).length === 0 && (
                                <NoDataFound />
                            )}
                            </Grid>
                            <Dialog
                                open={this.state.openConfirmDialog}
                                onClose={this.handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                classes={{ paper: classes.dialogPaper }}
                            >
                                <DialogTitle id="alert-dialog-title">Validation du document</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Le document est bien envoyé
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleClose} variant="outline-warning">
                                        OK
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            <Dialog
                                open={this.state.openRemarkDialog}
                                onClose={this.handleClose}
                                aria-labelledby="form-dialog-title"
                                classes={{ paper: classes.dialogPaper }}

                            >
                                <DialogTitle id="form-dialog-title">Document Invalide</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Ce document est invalide, spécifiez votre remarque.
                                    </DialogContentText>
                                    <TextField
                                        id="remark_s"
                                        label="votre remarque"
                                        name="remark_s"
                                        type="text"
                                        autoFocus
                                        margin="dense"
                                        fullWidth
                                        value={this.state.remark_s}
                                        onChange={this.onChange}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleClose} variant="outline-warning">
                                        Valider
                                    </Button>
                                    <Button onClick={this.cancelRemark} variant="outline-warning">
                                        Annuler
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            <Dialog
                                open={this.state.openClaimDialog}
                                onClose={this.closeClaimDialog}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                classes={{ paper: classes.dialogPaper }}
                            >
                                <DialogTitle id="alert-dialog-title">Traitement des demandes</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Vous êtes attribuer à cette demande !!!
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.closeClaimDialog} variant="outline-warning">
                                        OK
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                    </Container>
                </div>
            </div>
        )
    }
}


export default withStyles(useStyles, { withTheme: true })(RequestList)