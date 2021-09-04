import React, { Component } from 'react'
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { withStyles } from "@material-ui/core/styles";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { MDBCard, MDBCardBody } from "mdbreact";
import Typography from "@material-ui/core/Typography";
import Template from '../actions/services/Template';
import { Message } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'


const useStyles = theme => ({
    editorContainer: {
        width: "900px",
        marginLeft: "20%",
        marginTop: "50px",
        border : "3px solid #0a2345",
    },
    borderEditor: {
        border: '2px solid #0000CD',
        paddingRight: "20px",
        marginTop: '20px',
    },

});

class EditorContainer extends Component {
    constructor() {
        super();
        this.state = {
            ref: "",
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    state = {
        editorState: EditorState.createEmpty(),
    };

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())));
        console.log("submit template")
        var data = {
            ref: this.state.ref,
            content: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
        };
        Template.submitTemplate(data)
            .then(res => {
                console.log("template saved")
                this.setState({
                    formConfirm: true
                });
            });

    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    render() {
        const { classes } = this.props
        const { editorState } = this.state;
        return (
            <MDBCard className={classes.editorContainer}>
                <MDBCardBody>
                    <div>
                        <Typography component="h1" variant="h5">
                            Création des template - Email
                            </Typography>

                        <form
                            onSubmit={this.onSubmit}
                            autoComplete="off"
                        >
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="ref"
                                label="Reference"
                                name="ref"
                                value={this.state.ref}
                                onChange={this.onChange}
                                autoFocus
                            />
                            <div className={classes.borderEditor}>
                                <Editor
                                    editorState={editorState}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    onEditorStateChange={this.onEditorStateChange}
                                />
                            </div>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                style={{ marginTop: '20px' }}
                            >
                                Valider
                                </Button>
                                {this.state.formConfirm && (
                                <Message
                                    style={{ color: 'white', backgroundColor: '#0a2345' }}
                                    header="Template est créé"
                                />
                            )}
                        </form>
                    </div>
                </MDBCardBody>
            </MDBCard>
        );
    }
}
export default withStyles(useStyles, { withTheme: true })(EditorContainer)