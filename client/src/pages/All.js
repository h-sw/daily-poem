import React from 'react';
import { RootWrapper,TitleWrapper,Padding } from '../styles/common';
import styled from 'styled-components';
import * as Hangul from 'hangul-js';
import {
  CardActionArea,
  Grid, 
  Typography,
	Button,
	InputBase
} from '@material-ui/core'

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

const CardImg = styled.div`
  width   : 100%;
  display : block;
	background-color:#8EB695;
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

const CardTitle = styled(Typography)`
  font-weight : 600;
  font-size   : 28px;
  color       : #000;
`

const PoemInputWrapper = styled.div`
  display       : flex;
  margin        : 5px 0px;
  border-radius : 5px;
  padding       : 0px 0px;
  border        : 1px solid #8FB896;
`

const PoemInput = styled(InputBase)`
  font-size   : 14px;
  color       : #565656;
  font-weight : 600;
`

const PoemKeyword = styled(Typography)`
  align-self  : center;
  font-weight : 700;
  color       : #676A59;
`

const SubmitButton = styled(Button)`
  background-color  : #8FB896;
  color             : #FFFFFF;
  font-wieght       : 600;
  font-size         : 14px;
  &:hover {
    background-color  : #8FB896;
  }
`
const ButtonWrapper = styled.div`
  display         : flex;
  justify-Content : flex-end;
`

const SearchResultContainer = ({ search, keyword }) => {
  const [data,  setData] = React.useState([]);
  
  React.useEffect(() => {
    try{
			var temp=[];
      if(search.length > 0){
				var searcher = new Hangul.Searcher(search);
				keyword.forEach((item) => {
					if(searcher.search(item.word)==0){
						temp.push(item.word);
					}
				})
				setData(temp);
				console.log(temp);
      }
			else{
				setData([]);
			}
    }catch(e){

    }
  }, [search]);

  const handleClickButton = (item) => {
		setData([])
		window.location.href=`/ranking/${item}`
  }

  return (
    <div>
      {data.map((item, idx) => {
        return(
          <div onClick={()=>handleClickButton(item)} style={{cursor:'pointer'}}>
            <CardActionArea style={{padding: 9, borderBottom: '1px solid #eee'}}>
              <Typography>{item}</Typography>
            </CardActionArea>
          </div>
        )
      })}
    </div>
  );
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

  const initAll = async () => {
    const res = await fetch('/all');
    return await res.json();
  }

  React.useEffect(() => {
		console.log(Hangul.disassemble('가나다'));
    initAll()
      .then(res => {
        setAllKeyword(res.data)
      })
      .catch(err => {
        console.log(err)
      });
  }, []);

	
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(value);
  } 

  const handleSubmit= (e) => {
		console.log(values);
		e.preventDefault();
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
					<ButtonWrapper>
						<SubmitButton type="submit">
							검색
						</SubmitButton>
					</ButtonWrapper>
        </PoemInputWrapper>
      </form>
			<div style={{maxHeight: 300, overflow:'auto', }}>
        <SearchResultContainer search={values} keyword={allKeyword} />
      </div>

			<Padding/>
			<Grid 
        container 
        spacing={3}
      >
        {allKeyword.map((data, idx) => (
            <Grid
              key={idx} 
              item 
              xs={12} 
              sm={3} 
              md={2}
            >
              <KeywordCard data={data} />   
            </Grid>
        ))}
        </Grid>
    </RootWrapper>
  )
}
export default All;