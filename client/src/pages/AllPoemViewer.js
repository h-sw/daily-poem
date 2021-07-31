import React,{ useEffect } from 'react';
import Row from '../components/atoms/Row';
import Header from '../components/atoms/Header';
import {
  RootWrapper
} from '../styles/common';
import { useParams } from 'react-router-dom';

export default function AllPoemViewer(){
  const [rankData, setRankData] = React.useState([]);
  const { keyword } = useParams()
  
  const callWeeklyApi = async()=>{
    const response = await fetch('/all/'+ keyword);
    const body = await response.json();
    return body;
  }

  useEffect(()=>{
    callWeeklyApi()
    .then(res=>{
      setRankData(res.data)
    })
    .catch(err=>console.log(err));
  }, []);

  return (
    <RootWrapper>
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
