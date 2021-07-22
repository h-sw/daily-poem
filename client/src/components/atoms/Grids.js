import React,{useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  button: {
    display:'flex',
    justifyContent:'space-between',
    backgroundColor:'#f2f4f7',
    borderColor:'1px solid black'
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const Grids = (props) => {
const classes = useStyles();
const [open, setOpen] = React.useState(false);
const [hofDatas, setHofData] = React.useState([]);

const callApi = async()=>{
  const response = await fetch('/HOfPage');
  const body = await response.json();
  return body;
}

useEffect(()=>{
  callApi()
  .then(res=>{
    setHofData(res.data)
  })
  .catch(err=>console.log(err));
}, []);

return (
  <Grid container spacing={5}>
  {hofDatas.map((hofData) => (
      <Grid item key={hofData.subject} xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <Button className={classes.button} 
          onClick={() => window.location.href="/HofDataPage"}>
              <CardContent className={classes.cardContent}>
              <Hidden xsDown>
                  <CardMedia className={classes.cardMedia} image={hofData.img_url} title="Image title"/>
              </Hidden>
              <Typography gutterBottom variant="h4" component="h2"> {hofData.subject} <ThumbUpAltIcon /> {hofData.likes} </Typography>
              </CardContent>
          </Button>
        </Card>        
      </Grid>
  ))}
  </Grid>
)
}
  export default Grids;
