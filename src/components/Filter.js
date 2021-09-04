import React, { Component } from 'react'
import { MDBCard, MDBCardBody } from "mdbreact";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Request from '../actions/services/Request';


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

const useStyles = theme => ({
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    card: {
        border : "2px solid #0a2345",
    },
});

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            documentType: "",
            grp: this.props.dataParentToChild
        };
        this.onChange = this.onChange.bind(this);
        this.filter = this.filter.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    filter = () => {
        console.log(this.state.documentType)
        console.log(this.state.grp)
        const formData = new FormData();
        formData.append('docType', this.state.documentType);
        formData.append('grp', this.state.grp);
        
        for (var value of formData.values()) {
            console.log(value);
         }


        Request.getTasksByDocType(formData)
            .then(res => {
                console.log(res.data)
                console.log('res.data.length'+Object.entries(res.data).length)
                this.props.onFilter(res.data);
            })          
    }
    render() {
        const { classes } = this.props
        return (
            <div style={{
                paddingTop: 90,
            }}>
                <MDBCard className={classes.card}>
                    <MDBCardBody>
                        <div>
                            <Grid align="center" item xs={12} >
                                <Typography
                                    style={{ marginBottom: 10, color : "#01f0be" }}
                                    component="h1"
                                    variant="h6"
                                >
                                    Critères de filtration 
                                        </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
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
                                                        Type d'attestaion
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

                                                <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                            onClick={this.filter}
                                        >
                                            Filtrer
                                    </Button>
                            </Grid>
                        </div>
                    </MDBCardBody>
                </MDBCard>
            </div>
        )
    }
}
export default withStyles(useStyles, { withTheme: true })(Filter)

