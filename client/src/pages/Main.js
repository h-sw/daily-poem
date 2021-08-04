import React from 'react';
import PoemList from '../components/atoms/PoemList';
import { RootWrapper } from '../styles/common';
import Keyword from '../components/atoms/Keyword';
import { Typography,Button } from '@material-ui/core';
import styled from 'styled-components'
import axios from 'axios';

const KeywordButton = styled(Button)`
  padding       : 5px 15px;
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
  font-size     : 14px;
  color         : #333333;
`

const Main = () => {
  const [displayData, setDisplayData]=React.useState([]);
  const [keyword, setKeyword] = React.useState([]);
  const callLatestApi = async()=>{
    const response = await axios.get('http://localhost:4000/ranking');
    return response.data.data;
  }

  React.useEffect(()=>{
    callLatestApi()
    .then(res=>{
      setDisplayData(res)
    })
    .catch( err=>console.log(err) );
  }, []);

  return (
    <RootWrapper>
      <Keyword keyword={keyword} setKeyword={setKeyword}/>
      <KeywordButton onClick={() => window.location.href="/keyword/"+keyword}>
        <Icon className="fi-rr-add"/>
        <IconText>3행시 더보기</IconText>
      </KeywordButton>
      <PoemList displayData={displayData}/>
    </RootWrapper>
  )
}
export default Main;