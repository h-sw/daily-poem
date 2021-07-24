import React,{ useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Row from '../components/atoms/Row';
import Header from '../components/atoms/Header';
import {
  RootWrapper
} from '../styles/common';
import { useParams } from 'react-router-dom';

const HOFdataContainer = () => {
  const [rankData, setRankData] = React.useState([]);
  const { keyword } = useParams()

  const callWeeklyApi = async()=>{
    const response = await fetch('/ranking/'+ keyword);
    const body = await response.json();
    return body;
  }

  useEffect(()=>{
      callWeeklyApi()
      .then(res=>{
        console.log(res.data)
        setRankData(res.data)
      })
      .catch(err=>console.log(err));
  }, []);

  return (
    <RootWrapper>
      <Header name={keyword}></Header>
      <div>
        {rankData && 
          <div> 
            {rankData.map((row, idx) => (
              <Row key={idx} row={row} onReply={false} onLike={false}/>
            ))}
          </div>
        }
      </div>
    </RootWrapper>
  )
}
export default HOFdataContainer;