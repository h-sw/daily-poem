import React,{useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import styled from "styled-components"

import Typography from '@material-ui/core/Typography';

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';


const GridCard = styled(Card)`
height: '100%';
display: 'flex;
flex-Direction: 'column';
`

const GridButton = styled(Button)`
  display:'flex';
  justify-Content:'space-between';
  background-Color:'#f2f4f7';
  border-Color:'1px solid black;
`

const GridCardContent = styled(CardContent)`
  flex-Grow: 1;
`

const GridCardMedia = styled(CardMedia)`
  padding-Top: '56.25%'; 
` // 16:9

const Grids = (props) => {
const [hofDatas, setHofData] = React.useState([]);

const callApi = async()=>{
  const response = await fetch('/ranking');
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
        <GridCard>
          <GridButton 
            onClick={() => window.location.href="/ranking/"+hofData.subject}
          >
              <GridCardContent>
              <Hidden xsDown>
                  <GridCardMedia image={hofData.img_url} title="Image title"/>
              </Hidden>
              <Typography 
                gutterBottom variant="h4" 
                component="h2"
              > 
                {hofData.subject} 
                <ThumbUpAltIcon /> 
                {hofData.likes} 
              </Typography>
              </GridCardContent>
          </GridButton>
        </GridCard>        
      </Grid>
  ))}
  </Grid>
)
}
  export default Grids;
