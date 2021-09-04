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
import htmlToDraft from 'html-to-draftjs';
import { ContentState } from 'draft-js';

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

class EditorUpdate extends Component {
    constructor() {
        super();
        this.state = {
            ref: "",
            templates: [],
            templatesKeys: [],
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getTemps = this.getTemps.bind(this);
    }


    state = {
        editorState: EditorState.createEmpty(),
    };



    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        if (e.target.value) {
            console.log(e.target.value)
            Template.getByRef(e.target.value)
                .then(res => {
                    //make it readable by Editor
                    const contentBlock = htmlToDraft(res.data.content);
                    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);

                    const editorState = EditorState.createWithContent(contentState);
                    console.log("editorState" + JSON.stringify(editorState));
                    this.setState({
                        editorState: editorState
                    });
                });
        }
    }


    getTemps() {
        Template.getTemplates()
            .then(response => {
                const ref = response.data
                // console.log(ref)
                console.log(Object.keys(ref))
                console.log(Object.values(ref))
                this.setState({
                    templates: Object.values(ref),
                    templatesKeys: Object.keys(ref),
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    componentDidMount() {
        this.getTemps()
    }


    onSubmit(e) {
        e.preventDefault();
        // console.log(draftToHtml(convertToRaw((this.state.editorState.getCurrentContent()))))
        const formData = new FormData();
        formData.append('content', draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())))
        formData.append('ref', this.state.ref)

        Template.updateTemplate(formData)
            .then(res => {
                console.log("template updated")
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


        return (
            <>
            {/* <Navbar /> */}
            <MDBCard className={classes.editorContainer}>
                <MDBCardBody>
                    <div >
                        <Typography component="h1" variant="h5" style = {{color : "#0a2345"}}>
                            Mise à jour des template - Email
                        </Typography>
                        <form
                            onSubmit={this.onSubmit}
                            autoComplete="off"
                        >
                            <TextField
                                id="ref"
                                name="ref"
                                select
                                label="References"
                                margin="normal"
                                fullWidth
                                required
                                value={this.state.ref}
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
                                    Reference
                                </option>
                                {this.state.templatesKeys.map((value, index) => (
                                    <option
                                        key={index}
                                    >
                                        {this.state.templates[index].ref}
                                    </option>
                                ))}
                            </TextField>
                            <div className={classes.borderEditor}>
                                <Editor
                                    editorState={this.state.editorState}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    onEditorStateChange={this.onEditorStateChange}
                                />
                                {/* <textarea
                                    disabled
                                    value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                                ></textarea> */}
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
                                    header="Template est mis à jour"
                                />
                            )}
                        </form>
                    </div>
                </MDBCardBody>
            </MDBCard>
            </>
        );
    }
}
export default withStyles(useStyles, { withTheme: true })(EditorUpdate)