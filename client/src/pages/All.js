import React from 'react';
import { RootWrapper,TitleWrapper,Padding } from '../styles/common';
import styled from 'styled-components';
import * as Hangul from 'hangul-js';
import dayjs from 'dayjs';
import CheckIcon from '@material-ui/icons/Check';
import {
  CardActionArea,
  Grid, 
  Typography,
   Button,
   InputBase,
   Box
} from '@material-ui/core'

const Title = styled(Typography)`
  color          : #222222;
  font-weight    : 600;
  text-align     : center;
  font-size      : 28px;
`

const Subtitle = styled(Typography)`
  color          : #222222;
  font-weight    : 500;
  text-align     : center;
  font-size      : 14px;
`

const Card = styled(CardActionArea)`
  position      : relative;
  border-radius : 10px;
  height        : ${props => props.height / 1.8}px;
  overflow      : hidden;
  box-shadow    : 10px 10px 30px #d9d9d9, -10px -10px 30px #ffffff;
`

const CardImg = styled.div`
  width            : 100%;
  display             : block;
   background-color:#8EB695;
`

const CardContentWrapper = styled.div`
  position       : absolute;
  padding        : 20px;
  background     : rgba(0,0,0, 0.15);
  width          : 100%;
  height         : 100%;
  top            : 0;
  left           : 0;
`

const CardTitle = styled(Typography)`
  font-weight    : 600;
  font-size      : 28px;
  color          : #000;
`

const PoemInputWrapper = styled.div`
  display       : flex;
  margin        : 5px 0px;
  border-radius : 5px;
  padding       : 0px 0px;
  border        : 1px solid #8FB896;
`

const PoemInput = styled(InputBase)`
  font-size      : 14px;
  color          : #565656;
  font-weight    : 600;
`

const ClassifyWrapper = styled.div`
   padding-bottom: 5px;
`

const Icon = styled.i`
   font-size         :20px;
   height            :20px;
   color               :#8EB695;
   marginRight      :5;
`

const BoldWrapper = styled.div`
   font-weight   : bolder;
`

const SORT_BY_WORD = 1; /*글자순*/
const SORT_BY_DATE = 2; /*날짜순*/

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
      onClick={() => window.location.href="/ranking/"+data.word}
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
  const [values, setValues] = React.useState();
  const [display, setDisplay] = React.useState(allKeyword);
  const [sorting, setSorting] = React.useState(SORT_BY_WORD);
  const classifyWord = ['ㄱ','ㄴ','ㄷ','ㄹ','ㅁ','ㅂ','ㅅ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
  const [classifyDate, setClassifyDate] = React.useState([]);
  const [classify, setClassify] = React.useState(classifyWord);
  const initAll = async () => {
    const res = await fetch('/all');
    return await res.json();
  }

  React.useEffect(() => {
    initAll()
      .then(res => {
        setAllKeyword(res.data);
        setDisplay(res.data);
        let tempClassify = [];
        let idx = 0;
        for(const d of res.data){
          console.log('d: ', d.date);
          if(!tempClassify.includes(dayjs(d.date).format('YYYY.MM'))){
            tempClassify[idx] = dayjs(d.date).format('YYYY.MM');
            idx += 1;
          }
        }
        setClassifyDate(tempClassify);
        console.log("data", tempClassify);
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
          if(searcher.search(item.word)==0){
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
  }, [values]);
   
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(value);
  }

  const handleSubmit= (e) => {
    e.preventDefault();
  } 

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
      console.log('글자순');
    }
    else if(check === SORT_BY_DATE){
      console.log('날짜순');
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

      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <PoemInputWrapper>
          <PoemInput
            name="search"
            fullWidth
            placeholder="이 곳에 입력해주세요."
            onChange={handleChange}
          />
          <Icon className="fi-rr-search"/>
        </PoemInputWrapper>
      </form>
      <Padding/>
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
                (Hangul.search(data.word,item)==0 ?
                <Grid
                  key={idx} 
                  item 
                  xs={12} 
                  sm={3} 
                  md={2}
                >
                <KeywordCard data={data} />
                </Grid> : <></>)
                :
                (dayjs(data.date).format('YYYY.MM')==item ?
                <Grid
                    key={idx} 
                    item 
                    xs={12} 
                    sm={3} 
                    md={2}
                >
                <KeywordCard data={data} />
                </Grid> : <></>)
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </RootWrapper>
  )
}
export default All;