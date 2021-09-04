import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import Navbar from './nav/Navbar';
import { Card, Button } from 'react-bootstrap';
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Request from '../actions/services/Request';
import NoDataFound from '../exceptions/NoDataFound';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from 'react-router-dom'
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
    table: {
        minWidth: 600
    },
    btnRight: {
        float: "right",
        margin: 5,
    },
    remarkIcon: {
        float: "right",
        color: "red",
    },
    dialogPaper: {
        minWidth: '80vh',
        maxWidth: '80vh',
        borderColor: "#ffcc00",
        borderStyle: "solid",
    },
});


class ListRequest extends Component {
    constructor() {
        super();
        this.state = {
            demandes: [],
            demandesKeys: [],
            files: [],
            remarks: [],
            selectedFile: "",
            selectedDemande: [],
            fileDownloadUri: [],
            user: "",
            grp: "dirAF",
            displayAttachIcon: [],
        }

        this.onFileChangeHandler = this.onFileChangeHandler.bind(this);
        this.getTasks = this.getTasks.bind(this);
        this.claim = this.claim.bind(this);
        this.complete = this.complete.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCompleteDiagClose = this.handleCompleteDiagClose.bind(this);
    }

    getTasks() {
        const user = localStorage.getItem("user");
        console.log("user" + user)
        this.setState({
            user: user, 
        }, () => console.log(this.state.grp))
        const formData = new FormData();
        formData.append("assignee", user)   //get groups !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        Request.getTasksByGroupUsers("dirAF")
            .then(response => {
                const demande = response.data
                console.log(JSON.stringify(demande))
                console.log(Object.keys(demande))    //task ids
                console.log(Object.values(demande))  //demandes data
                console.log(Object.entries(demande))  //demandes data Object.entries(demande)[0]
                console.log(typeof this.state.displayAttachIcon)  //demandes data Object.entries(demande)[0]
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


    onFileChangeHandler = (e) => {
        e.preventDefault();
        const file_v = e.target.files[0]  //get file 
        const taskID_v = e.target.id        //get task id / demande id
        const formData = new FormData();
        formData.append('file', file_v);
        console.log("set file " + e.target.files[0].name)
        formData.append('taskId', taskID_v);
        console.log("taskId " + JSON.stringify(formData.get('taskId')))
        console.log("index is " + e.target.attributes.index.value + "typeof " + typeof e.target.attributes.index.value)
        Request.upload(formData)
            .then(res => {
                const fileUris = this.state.fileDownloadUri.slice()
                const selectedDemds = this.state.selectedDemande.slice()
                //execute the manipulations
                fileUris[parseInt(e.target.attributes.index.value, 10)] = res.data.fileDownloadUri
                selectedDemds[parseInt(e.target.attributes.index.value, 10)] = taskID_v
                //set the new state
                this.setState
                    ({
                        fileDownloadUri: fileUris,
                        selectedDemande: selectedDemds
                    }, () => {
                        console.log(this.state.fileDownloadUri);
                        console.log(this.state.selectedDemande);
                    })

            })

            .catch(e => {
                console.log("task already claimed");
            });


    };

    claim(e) {
        const taskID_v = e.target.id        //get task id / demande id
        console.log("I'm " + this.state.user + ", I will claim task : " + taskID_v.slice(0, -1))
        console.log("index is " + e.target.attributes.index.value + "typeof " + typeof e.target.attributes.index.value)
        const formData = new FormData();
        formData.append('taskId', taskID_v.slice(0, -1));
        formData.append('userID', this.state.user);
        Request.claimTask(formData)
            .then(res => {
                this.setState({
                    openConfirmDialog: true,
                    taskId: taskID_v.slice(0, -1),
                    index: e.target.attributes.index.value,
                });
            })
            .catch(e => {
                console.log("something went wrong!!!")
            });
    }

    complete(e) {
        const taskID_v = e.target.id        //get task id / demande id
        console.log("I'm " + this.state.user + ", I will complete task : " + taskID_v.slice(0, -1))
        const formData = new FormData();
        formData.append('taskId', taskID_v.slice(0, -1));
        Request.completeFilAttachm(formData)
            .then(res => {
                this.setState({
                    openCompleteDialog: true,
                    taskId: taskID_v.slice(0, -1),
                });
            })
            .catch(e => {
                console.log("something went wrong!!!")
            });
    }

    handleClose() {
        console.log("index" + this.state.index)
        this.setState({
            openConfirmDialog: false,
        });
        this.state.displayAttachIcon[parseInt(this.state.index, 10)] = this.state.taskId
        console.log(this.state.displayAttachIcon[parseInt(this.state.index, 10)])
    }

    handleCompleteDiagClose() {
        this.setState({
            openCompleteDialog: false,
        });
        window.location.reload(true)
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
                                        <Card.Header className={classes.header} as="h5">{this.state.demandes[index].documentType}  {(this.state.demandes[index].DGremark || this.state.demandes[index].AGremark) &&  <Remark  dataParentToChild= {value}  />} </Card.Header>
                                        <Card.Body>
                                            <Card.Title as="h6">{this.state.demandes[index].nom} {this.state.demandes[index].prenom}</Card.Title>
                                            <Card.Text>
                                                {this.state.demandes[index].commentaire && (   //review 
                                                    <>
                                                        Commentaire  : {this.state.demandes[index].commentaire} <br />
                                                    </>
                                                )}
                                                {this.state.fileDownloadUri[index] && (   //review 
                                                    <>
                                                        <Link target="_blank" to={`//${this.state.fileDownloadUri[index].substring('http://'.length)}`}>{this.state.demandes[index].documentType}</Link> <br />
                                                    </>
                                                )}
                                            </Card.Text>
                                            {this.state.displayAttachIcon[index] === value && (   
                                                <>
                                                    <label htmlFor={value}>
                                                        <AttachFileIcon style={{
                                                            color: this.state.selectedDemande[index] === value ? "red" : ""
                                                        }}
                                                        />
                                                    </label>
                                                </>
                                            )}
                                            {(this.state.displayAttachIcon[index] === value) ?
                                                <Button variant="outline-success" id={value + 1} onClick={this.complete} className={classes.btnRight}>Compléter</Button> :
                                                <Button variant="outline-success" id={value + 1} onClick={this.claim} className={classes.btnRight} index={index}>Prendre en charge</Button>
                                            }
                                            <input type="file" id={value} className="form-control" style={{ display: 'none' }} name="file" onChange={this.onFileChangeHandler} index={index} />
                                        </Card.Body>
                                    </Card>
                                ))}
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
                                // style = {{ borderColor : "#ffcc00" }}
                            >
                                <DialogTitle id="alert-dialog-title">Traitement des demandes</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Vous êtes attribuer à cette demande !!!
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleClose} variant="outline-warning">
                                        OK
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            <Dialog
                                open={this.state.openCompleteDialog}
                                onClose={this.handleCompleteDiagClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                classes={{ paper: classes.dialogPaper }}
                            >
                                <DialogTitle id="alert-dialog-title">Statut de la demande</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Document est envoyé !!!
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleCompleteDiagClose} variant="outline-warning">
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


export default withStyles(useStyles, { withTheme: true })(ListRequest)