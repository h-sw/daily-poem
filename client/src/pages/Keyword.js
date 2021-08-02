import React from 'react';
import { 
  RootWrapper,
  TitleWrapper,
  BoldWrapper
} from '../styles/common';
import styled from 'styled-components';
import * as Hangul from 'hangul-js';
import dayjs from 'dayjs';
import axios from 'axios';
import CheckIcon from '@material-ui/icons/Check';
import AllKeywordCard from '../components/atoms/AllKeywordCard';
import AllSearch from '../components/atoms/AllSearch';
import {
  Grid, 
  Typography,
  Button,
  Box
} from '@material-ui/core'

const Title = styled(Typography)`
  color          	: #222222;
  font-weight    	: 600;
  text-align     	: center;
  font-size      	: 28px;
`

const Subtitle = styled(Typography)`
  color          	: #222222;
  font-weight    	: 500;
  text-align     	: center;
  font-size      	: 14px;
`

const ClassifyWrapper = styled.div`
  padding-bottom	: 5px;
`

const SORT_BY_WORD = 1; /*글자순*/
const SORT_BY_DATE = 2; /*날짜순*/

const Keyword = () => {
  const [allKeyword, setAllKeyword] = React.useState([]);
  const [values, setValues] = React.useState();
  const [display, setDisplay] = React.useState(allKeyword);
  const [sorting, setSorting] = React.useState(SORT_BY_WORD);
  const classifyWord = ['ㄱ','ㄴ','ㄷ','ㄹ','ㅁ','ㅂ','ㅅ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
  const [classifyDate, setClassifyDate] = React.useState([]);
  const [classify, setClassify] = React.useState(classifyWord);
  const initAll = async () => {
    const res = await axios.get('http://localhost:4000/keyword');
    return await res.data;
  }

  React.useEffect(() => {
    initAll()
      .then(res => {
        setAllKeyword(res.data);
        setDisplay(res.data);
        let tempClassify = [];
        let idx = 0;
        for(const d of res.data){
          if(!tempClassify.includes(dayjs(d.date).format('YYYY.MM'))){
            tempClassify[idx] = dayjs(d.date).format('YYYY.MM');
            idx += 1;
          }
        }
        setClassifyDate(tempClassify);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    try{
      var temp=[];
      if(values.length > 0){
        var searcher = new Hangul.Searcher(values);
        allKeyword.forEach((item) => {
          if(searcher.search(item.word)===0){
            temp.push(item);
          }
      })
        setDisplay(temp);
      }
      else{
        setDisplay(allKeyword);
      }
    }catch(e){

    }
  }, [values, allKeyword]);

  const handleSortingClick = (category) => {
    if(category === SORT_BY_WORD){
      setClassify(classifyWord);
    } 
    else if(category === SORT_BY_DATE){
      setClassify(classifyDate);
    }
    setSorting(category);
  };

   const CheckedButton = ({check}) => {
    if(check === SORT_BY_WORD){
    }
    else if(check === SORT_BY_DATE){
    }
    return(
      <>
        <CheckIcon/>
        <BoldWrapper>{check}</BoldWrapper>
      </>)
  }

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
      {/*키워드 검색창 */}
      <AllSearch setValues={setValues}/>
      {/*키워드 분류 버튼 */}
      <Box flexDirection="row">
        <Button onClick={() => handleSortingClick(SORT_BY_WORD)}>
          { sorting === SORT_BY_WORD ? <CheckedButton check={'글자순'} /> : '글자순' } 
        </Button>
        <Button onClick={() => handleSortingClick(SORT_BY_DATE)}>
          { sorting === SORT_BY_DATE ? <CheckedButton check={'날짜순'} /> : '날짜순' }
        </Button>
      </Box>
      <Grid 
        container 
        spacing={3}
      >
        {classify.map((item, idx) => (
          <Grid
            key={idx} 
            item 
            xs={12} 
            sm={12} 
            md={12}
          >
            <ClassifyWrapper>{item}</ClassifyWrapper>
            <Grid
              container 
              spacing={3}
            >
              {display.map((data, idx) => (
                sorting === SORT_BY_WORD ?
                //item은 ㄱ,ㄴ,ㄷ,ㄹ, 분류 , data는 현재 displaydata
                (Hangul.search(data.word,item)===0 ?
                <Grid
                  key={idx} 
                  item 
                  xs={12} 
                  sm={3} 
                  md={2}
                >
                <AllKeywordCard data={data} />
                </Grid> : <></>)
                :
                (dayjs(data.date).format('YYYY.MM')===item ?
                <Grid
                    key={idx} 
                    item 
                    xs={12} 
                    sm={3} 
                    md={2}
                >
                <AllKeywordCard data={data} />
                </Grid> : <></>)
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </RootWrapper>
  )
}
export default Keyword;