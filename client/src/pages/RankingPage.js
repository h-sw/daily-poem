import React from 'react';
import {
  CardActionArea,
  Grid, 
  Typography,
} from '@material-ui/core'
import styled from 'styled-components';
import {
  RootWrapper,
  FlexWrapper,
} from '../styles/common';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';

const TitleWrapper = styled.div`
  margin  : 50px;
`

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

const CardContentWrapper = styled.div`
  position    : absolute;
  padding     : 20px;
  background  : rgba(0,0,0, 0.15);
  width       : 100%;
  height      : 100%;
  top         : 0;
  left        : 0;
`

const CardImg = styled.img`
  width   : 100%;
  display : block;
`

const CardTitle = styled(Typography)`
  font-weight : 600;
  font-size   : 28px;
  color       : #000;
`

const ThumbIcon = styled(ThumbUpAltIcon)`
  height        : 20px;
  width         : 20px;
  margin-right  : 5px;
  align-self    : center;
  color         : #FFFFFF;
`

const CardText = styled(Typography)`
  font-size   : 14px;
  align-self  : center;
  color       : #FFFFFF;
`

const CardSubContentWrapper = styled.div`
  position          : absolute;
  margin            : 20px;
  padding           : 5px 15px;
  border-radius     : 5px;
  background-color  : #4caf50;
  bottom            : 0;
  right             : 0;
  z-index           : 2;
`

const subject_dit = {
  '바나나' : 0,
  '복숭아' : 1,
  '청포도' : 2,
  '산딸기' : 3,
  '코코넛' : 4,
  '두리안' : 5,
  '무화과' : 6,
  '오렌지' : 7,
  '토마토' : 8,
  '한라봉' : 9,
}

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
      onClick={() => window.location.href="/ranking/"+data.subject}
    >
      <CardImg src={data.img_url} alt=""/>
      <CardContentWrapper>
        <CardTitle>
          {data.subject}
        </CardTitle>
        
      </CardContentWrapper>
      <CardSubContentWrapper>
        <FlexWrapper>
          <ThumbIcon /> 
          <CardText>
            {data.likes} 
          </CardText>
        </FlexWrapper>
      </CardSubContentWrapper>
    </Card>
  )
}

const RankingPage = () => {
  const [rankingList, setRankingList] = React.useState([]);
  

  const initRankingList = async () => {
    const res = await fetch('/HOfPage');
    return await res.json();
  }

  React.useEffect(() => {
    initRankingList()
      .then(res => {
        setRankingList(res.data)
      })
      .catch(err => {
        console.log(err)
      });
  }, []);

  return (
    <RootWrapper>
      <TitleWrapper>
        <Title>
          명예의 전당
        </Title>
        <Subtitle>
          가장 좋아요를 많이 받은 주제 10가지를 선정하여 보여줍니다.
        </Subtitle>
      </TitleWrapper>
      <Grid 
        container 
        spacing={3}
      >
        {rankingList.map((data, idx) => (
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
  );
}

export default RankingPage;