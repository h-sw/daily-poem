import React from 'react';
import Keyword from '../components/atoms/Keyword';
import PoemList from '../components/atoms/PoemList';
//import AllPoemList from '../components/organisms/AllPoemList';
import CheckIcon from '@material-ui/icons/Check';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../components/atoms/Header';
import MenuSelector from '../components/atoms/MenuSelector';
import styled from "styled-components";
import {
	Wrapper,
  RootWrapper,
  FlexWrapper,
} from '../styles/common';

const TitleWrapper = styled.div`
  margin  : 50px;
`

const useStyles = makeStyles((theme)=>({
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
}));

const MenuWrapper = styled.div`
  paddingTop: 15;
`

const MainPage = () => {
  const classes = useStyles();
  const [likeList, setLikeList] = React.useState([1]);
  const [latestList, setLatestList] = React.useState([2]);
  const [plus, setPlus] = React.useState(false);
  const [displayData, setDisplayData]=React.useState([{
    poemId: 61,
    name: 'test23',
    password: '123',
    word: '니그로',
    poem_1: 'dddd',
    poem_2: '',
    poem_3: '',
    created: '2021-07-21T01:54:43.000Z',
    likes: 0,
    comment: 0,
    replyList: []
  },
  {
    poemId: 59,
    name: 'test',
    password: '123',
    word: '리시버',
    poem_1: '본',
    poem_2: '발자동차',
    poem_3: '스',
    created: '2021-07-21T01:27:39.000Z',
    likes: 0,
    comment: 0,
    replyList: []
  }]);
  const [sorting, setSorting] = React.useState('실시간 좋아요순');

  const handleSortingClick = (category) => {
    if(category==='더보기'){
      setPlus(!plus);
    }else{
      setSorting(category);
    }
  };

  const CheckedButton = ({check}) => {
    if(check === '실시간 좋아요순'&&likeList){
      //setDisplayData(likeList)
    }
    else if(check === '최신순'&&latestList){
      //setDisplayData(latestList)
    }
    return(
      <>
        <CheckIcon/>
        <div style={{fontWeight:'bolder'}}>{check}</div>
      </>)
  }

  return (
    <div>
        {plus===true ?        
        <div>
          <RootWrapper>
						<TitleWrapper>
							<Header name="실시간 3행시" description=" "/>
						</TitleWrapper>
            <MenuSelector 
                handleSortingClick={handleSortingClick} 
                CheckedButton={CheckedButton} 
                sorting={sorting} 
                plus={plus}/>
          </RootWrapper>
          {/* <AllPoemList displayData={displayData}/> */}
        </div> :
        <RootWrapper>
          <Keyword />
          <MenuSelector 
                handleSortingClick={handleSortingClick} 
                CheckedButton={CheckedButton} 
                sorting={sorting} 
                plus={plus}/>
          <MenuWrapper />
          
          <PoemList displayData={displayData}/>
        </RootWrapper>
        }
    </div>
  )
}
export default MainPage;