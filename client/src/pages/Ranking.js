import React from 'react';
import Header from '../components/atoms/Header';
import styled from "styled-components";
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Row from '../components/atoms/Row';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import TableContainer from '@material-ui/core/TableContainer';
import axios from 'axios';
import {
  RootWrapper,
  Padding,
  BoldWrapper
} from '../styles/common';

const SORT_BY_WEEK = 1;
const SORT_BY_MONTH = 2;
const SORT_BY_YEAR = 3;

const TitleWrapper = styled.div`
  margin  		: 50px;
`

const Rank = () => {

	const [sorting, setSorting] = React.useState(SORT_BY_WEEK);
  const [rankData, setRankData] = React.useState([]);
  const [Weeklylist, setWeeklyList] = React.useState([]);
  const [monthlylist, setMonthlyList] = React.useState([]);
  const [yearlylist, setYearlyList] = React.useState([]);

	const callWeeklyApi = async()=>{
    const res = await axios.get('http://localhost:4000/ranking/weekly');
    const body = await res.data;
    return body;
  }

  const callMonthlyApi = async()=>{
    const res = await axios.get('http://localhost:4000/ranking/monthly');
    const body = await res.data;
    return body;
  }

  const callYearlyApi = async()=>{
    const res = await axios.get('http://localhost:4000/ranking/yearly');
    const body = await res.data;
    return body;
  }

  React.useEffect(()=>{

    callWeeklyApi()
    .then(res=>{
      setWeeklyList(res.data)
    })
    .catch(err=>console.log(err));

    callMonthlyApi()
    .then(res=>{
      setMonthlyList(res.data)
    })
    .catch(err=>console.log(err));

    callYearlyApi()
    .then(res=>{
      setYearlyList(res.data)
    })
    .catch(err=>console.log(err));

  }, []);

  const handleSortingClick = (category) => {
    setSorting(category);
  };

	const CheckedButton = ({check}) => {
    if(check === SORT_BY_WEEK&& Weeklylist){
      setRankData(Weeklylist)
      return(
        <>
          <CheckIcon/>
          <BoldWrapper>{"??????"}</BoldWrapper>
        </>)
    }
    else if(check === SORT_BY_MONTH&& monthlylist){
      setRankData(monthlylist)
      return(
        <>
          <CheckIcon/>
          <BoldWrapper>{"??????"}</BoldWrapper>
        </>)
    }
    else if(check === SORT_BY_YEAR&& yearlylist){
      setRankData(yearlylist)
      return(
        <>
          <CheckIcon/>
          <BoldWrapper>{"??????"}</BoldWrapper>
        </>)
    }
  

  }

  return (
    <RootWrapper>
			<TitleWrapper>
				<Header name="??????/??????/????????????" description="??????/??????/????????? TOP10??? ???????????????."/>
			</TitleWrapper>
			<div>
				<Box flexDirection="row" style={{display: 'inline-flex'}}>
					<Button onClick={() => handleSortingClick(SORT_BY_WEEK)}>
						{sorting === SORT_BY_WEEK  ? <CheckedButton check={SORT_BY_WEEK}/>   : "??????" } 
					</Button>
					<Button onClick={() => handleSortingClick(SORT_BY_MONTH)}>
						{sorting === SORT_BY_MONTH ? <CheckedButton check={SORT_BY_MONTH}/>  : "??????" } 
					</Button>
					<Button onClick={() => handleSortingClick(SORT_BY_YEAR)}>
						{sorting === SORT_BY_YEAR  ? <CheckedButton check={SORT_BY_YEAR}/>   : "??????" }
					</Button> 
          <Button
						onClick={() => window.location.href="/hof"}
					>
						????????? ??????
					</Button>
				</Box>
				<Padding/>
				<TableContainer component={Paper}>
					<Table aria-label="Ranking table">
						<TableBody>
							{rankData.slice(0,10).map((row, idx) => (
								<Row key={idx} row={row}/>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</RootWrapper>
  )
}
export default Rank;