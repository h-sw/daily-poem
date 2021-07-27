import React from 'react';
import PoemList from '../components/atoms/PoemList';
import { RootWrapper } from '../styles/common';
//import AllPoemList from '../components/organisms/AllPoemList';
import Keyword from '../components/atoms/Keyword';
import { Typography,Button } from '@material-ui/core';
import styled from 'styled-components'

const KeywordButton = styled(Button)`
  padding       : 5px;
  border-radius : 15px;

  &:hover {
    background-color: #8EB695;
  }
`

const Icon = styled.i`
  font-size     : 14px;
  height        : 14px;
  color         : #333333;
  margin-right  : 5px;
  margin-bottom : 7px;
`

const IconText = styled(Typography)`
  font-size : 14px;
  color     : #333333;
`

const MainPage = () => {
  const [displayData, setDisplayData]=React.useState([]);
  const callLatestApi = async()=>{
    const response = await fetch('/MainLatest');
    const body = await response.json();
    return body;
  }

  React.useEffect(()=>{
    callLatestApi()
    .then(res=>{
      setDisplayData(res.data)
    })
    .catch(err=>console.log(err));

  }, []);

  return (
    <RootWrapper>
      <Keyword />
      <KeywordButton onClick={() => window.location.href="/ranking/키워드"}>
        <i class="fi-rr-add" style={{fontSize:14, height:14,marginBottom:7,marginRight:5}}/>
        <IconText>3행시 더보기</IconText>
      </KeywordButton>
      <PoemList displayData={displayData}/>
    </RootWrapper>
  )
}
export default MainPage;