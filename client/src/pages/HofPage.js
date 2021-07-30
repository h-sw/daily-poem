import React from 'react';
import {
  Grid, 
  Typography,
} from '@material-ui/core'
import styled from 'styled-components';
import {
  RootWrapper,
  FlexWrapper,
  TitleWrapper,
} from '../styles/common';
import Button from '@material-ui/core/Button';
import HofKeywordCard from '../components/atoms/HofKeywordCard';

const Title = styled(Typography)`
  color           : #222222;
  font-weight     : 600;
  text-align      : center;
  font-size       : 28px;
`

const Subtitle = styled(Typography)`
  color           : #222222;
  font-weight     : 500;
  text-align      : center;
  font-size       : 14px;
`

const Icon = styled.i`
  font-size       : 24px;
  height          : 41px;
  color           : #333333;
  margin-top      : 10px;
`

const IconWrapper = styled(FlexWrapper)`
  cursor          : pointer;
`

const HofPage = () => {
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
      {/* 뒤로가기 버튼 */}
      <IconWrapper>
        <Button onClick={() => window.location.href="/rank"}>
          <Icon className="fi-rr-angle-double-left" />
        </Button>
      </IconWrapper>
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
          <HofKeywordCard data={data} />   
        </Grid>
      ))}
      </Grid>
    </RootWrapper>
  );
}

export default HofPage;