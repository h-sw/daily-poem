import React from 'react';
import Keyword from '../components/atoms/Keyword';
import PoemList from '../components/atoms/PoemList';
//import AllPoemList from '../components/organisms/AllPoemList';
import CheckIcon from '@material-ui/icons/Check';
import Header from '../components/atoms/Header';
import MenuSelector from '../components/atoms/MenuSelector';
import styled from "styled-components";
import {
	Wrapper,
  RootWrapper,
  FlexWrapper,
} from '../styles/common';

const TitleWrapper = styled.div`
  margin  		: 50px;
`

const MenuWrapper = styled.div`
  paddingTop	: 15;
`

const boldWrapper = styled.div`
	font-weight: bolder;
`
const MainPage = () => {
  const [likeList, setLikeList] = React.useState([]);
  const [latestList, setLatestList] = React.useState([]);
  const [plus, setPlus] = React.useState(false);
  const [displayData, setDisplayData]=React.useState([]);
  const [sorting, setSorting] = React.useState('실시간 좋아요순');

	const callLikeApi = async()=>{

    const response = await fetch('/MainLike');
    const body = await response.json();
    return body;
  }

  const callLatestApi = async()=>{
    const response = await fetch('/MainLatest');
    const body = await response.json();
    return body;
  }

  React.useEffect(()=>{

    callLikeApi()
    .then(res=>{
      setLikeList(res.data)
    })
    .catch(err=>console.log(err));

    callLatestApi()
    .then(res=>{
      setLatestList(res.data)
    })
    .catch(err=>console.log(err));

  }, []);

  const handleSortingClick = (category) => {
    if(category==='더보기'){
      setPlus(!plus);
    }else{
      setSorting(category);
    }
  };

  const CheckedButton = ({check}) => {
    if(check === '실시간 좋아요순'&&likeList){
      setDisplayData(likeList)
    }
    else if(check === '최신순'&&latestList){
      setDisplayData(latestList)
    }
    return(
      <>
        <CheckIcon/>
        <boldWrapper>{check}</boldWrapper>
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