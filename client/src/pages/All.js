import React from 'react';
import { RootWrapper,TitleWrapper } from '../styles/common';
import styled from 'styled-components';
import {
  CardActionArea,
  Grid, 
  Typography,
	Button
} from '@material-ui/core'

const Title = styled(Typography)`
  color       : #222222;
  font-weight : 600;
  text-align  : center;
  font-size   : 28px;
`

const Subtitle = styled(Typography)`
  color       : #222222;
  font-weight : 500;
  text-align  : center;
  font-size   : 14px;
`

const Card = styled(CardActionArea)`
  position      : relative;
  border-radius : 10px;
  height        : ${props => props.height / 1.8}px;
  overflow      : hidden;
  box-shadow    : 10px 10px 30px #d9d9d9, -10px -10px 30px #ffffff;
`

const CardImg = styled.div`
  width   : 100%;
  display : block;
	background-color:#8EB695;
`

const CardContentWrapper = styled.div`
  position    : absolute;
  padding     : 20px;
  background  : rgba(0,0,0, 0.15);
  width       : 100%;
  height      : 100%;
  top         : 0;
  left        : 0;
`

const CardTitle = styled(Typography)`
  font-weight : 600;
  font-size   : 28px;
  color       : #000;
`

const KeywordCard = ({ data }) => {
  const [cardWidth, setCardWidth] = React.useState(0);
  const cardRef = React.useRef()

  React.useEffect(() => {
    if(cardRef.current){
      setCardWidth(cardRef.current.offsetWidth)
    }
  }, [cardRef.current])

  return (
    <Card 
      ref={cardRef} 
      height={cardWidth}
    >
      <CardImg />
      <CardContentWrapper>
        <CardTitle>
          {data.word}
        </CardTitle>
      </CardContentWrapper>
    </Card>
  )
}

const All = () => {
  const [allKeyword, setAllKeyword] = React.useState([]);
  
  const initAll = async () => {
    const res = await fetch('/all');
    return await res.json();
  }

  React.useEffect(() => {
    initAll()
      .then(res => {
        setAllKeyword(res.data)
      })
      .catch(err => {
        console.log(err)
      });
  }, []);

  return (
    <RootWrapper>
      <TitleWrapper>
        <Title>
          3행시의 기록
        </Title>
        <Subtitle>
          현재까지 제시된 모든 3행시를 보여줍니다. 
        </Subtitle>
      </TitleWrapper>
			<Grid 
        container 
        spacing={3}
      >
        {allKeyword.map((data, idx) => (
            <Grid
              key={idx} 
              item 
              xs={12} 
              sm={6} 
              md={4}
            >
              <KeywordCard data={data} />   
            </Grid>
        ))}
        </Grid>
    </RootWrapper>
  )
}
export default All;