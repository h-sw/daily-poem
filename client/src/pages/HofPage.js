import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grids from '../components/atoms/Grids'
import Header from '../components/atoms/Header';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
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
}));

function HofPage() {
  const classes = useStyles();

  return (
<React.Fragment>
  <CssBaseline />
  <main>
  {/* Hero unit */}
  <div className={classes.heroContent}>
      {/* 명예의 전당 텍스트 부분 */}
      <Header name="명예의 전당" description="가장 좋아요를 많이 받은 주제 10가지를 선정하여 보여줍니다."/>
  </div>
  <Container className={classes.cardGrid} maxWidth="md">
    {/* Grids는 격자를 나타내는 부분입니다 */}
      <Grids></Grids>
  </Container>
  </main>
  {/* <Footer classes={classes}></Footer> */}
</React.Fragment>
  );
}

export default HofPage;