import React,{ useEffect } from 'react';
import Row from '../components/atoms/Row';
import Button from '@material-ui/core/Button';
import Header from '../components/atoms/Header';
import styled from 'styled-components';

import {
  RootWrapper,
  FlexWrapper,
} from '../styles/common';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const IconWrapper = styled(FlexWrapper)`
  cursor          : pointer;
`
const Icon = styled.i`
  font-size       : 24px;
  height          : 41px;
  color           : #333333;
  margin-top      : 10px;
`

export default function AllPoemViewer({history}){
  const [rankData, setRankData] = React.useState([]);
  const { keyword } = useParams()
  
  const callWeeklyApi = async()=>{
    const response = await axios.get('http://localhost:4000/keyword/'+ keyword);
    return response.data;
  }

  useEffect(()=>{
    console.log(history);
    callWeeklyApi()
    .then(res=>{
      setRankData(res.data)
    })
    .catch(err=>console.log(err));
  }, []);

  const back =()=>{
    history.goBack();
  }
  return (
    <RootWrapper>
      {/* 뒤로가기 버튼 */}
      <IconWrapper>
        <Button onClick={back}>
          <Icon className="fi-rr-angle-double-left" />
        </Button>
      </IconWrapper>
      <Header name={keyword}></Header>
        {rankData && 
          <> 
          {rankData.map((row, idx) => (
            <Row key={idx} row={row}/>
          ))}
          </>
        }
    </RootWrapper>
  )
}
