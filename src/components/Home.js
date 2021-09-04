import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Avatar from '@material-ui/core/Avatar';
import GoogleBtn from "./GoogleBtn";



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      NEOXIA copyright
    </Typography>
  );
}


const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    background  : "#0a2345"
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
    color: "#01f0be",
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor: "#0a2345",
    color: "white",
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const user = localStorage.getItem("userGrp");
console.log("user grps" + user) 
const isDAFMemb = user === "DAF"
const isDGMemb = user === "DG"
const isAG = user === "undefined"
console.log(isAG + "typeof"+ typeof isAG)
const tiers = [
  {
    title: 'Demande de congé',
    description: [
        'description',
        'description',
        'description',
        'description',
    ],
    buttonText: 'Commencer',
    buttonVariant: 'outlined',
    href: '#',
  },
  {
    title: 'Demande des documents administratifs',
    // subheader: 'docs',
    description: [
      'Demande des attestations',
      'Attestations de salaire',
      'Attestations de travail',
    ],
    buttonText: 'Commencer',
    buttonVariant: 'contained',
    ...((isDAFMemb && {href: '/listRequest'}) || (isDGMemb && {href: '/requestList'}) || (isAG && {href: '/request'})),
  },
  {
    title: 'Autre demande',
    description: [
      'description',
      'description',
      'description',
      'description',
    ],
    buttonText: 'Commencer',
    buttonVariant: 'outlined',
    href: '#',
  },
];

const footers = [
  {
    title: 'Company',
    description: ['something', 'something', 'Contact us', 'something'],
  },
  {
    title: 'Features',
    description: ['something', 'something', 'something', 'something', 'something'],
  },
  {
    title: 'Resources',
    description: ['something', 'something', 'something', 'something'],
  },
  {
    title: 'Legal',
    description: ['something', 'something'],
  },
];


  


function Home() {
  const classes = useStyles();
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const picture = localStorage.getItem("picture");

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            Company name
          </Typography>
          <nav>
            <Link variant="button" href="#" className={classes.link} style= {{textDecoration: 'none'}}>
              {username}
            </Link>
            <Link variant="button" color="textPrimary" href="#" className={classes.link} style= {{textDecoration: 'none'}}>
            {email}
            </Link>
          </nav>
          <label style={{
                    borderRadius: "50%",
                    width: 30,
                    height: 30,
                    display: "block",
                    background: `url(${picture})`,
                    backgroundPosition: "center",
                    backgroundSize: "auto 30px"
                }}>
                </label>
          <GoogleBtn />
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          NEOXIA - Plateforme des demandes 
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          Description pour cette plateforme Description pour cette plateforme.
          Description pour cette plateforme Description pour cette plateforme.
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={12} sm={tier.title === 'Autre demande' ? 12 : 6} md={4}>
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                              <Typography component="h2" variant="h3" color="textPrimary">
                                  <Avatar style={{
                                      backgroundColor: "#01f0be",
                                  }}>
                                      <AssignmentIcon />
                                  </Avatar>
                              </Typography>
                  </div>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography component="li" variant="subtitle1" align="center" key={line}>
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={tier.buttonVariant} color="primary" href={tier.href}>
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
export default Home