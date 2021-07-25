import React from 'react';
import PoemList from '../components/atoms/PoemList';
import { RootWrapper } from '../styles/common';
//import AllPoemList from '../components/organisms/AllPoemList';
import Keyword from '../components/atoms/Keyword';

const MainPage = () => {
  const [displayData, setDisplayData]=React.useState([]);
  const callLatestApi = async()=>{
    const response = await fetch('/MainLatest');
    const body = await response.json();
    return body;
  }

  React.useEffect(()=>{
    callLatestApi()
    .then(res=>{
      setDisplayData(res.data)
    })
    .catch(err=>console.log(err));

  }, []);

  return (
    <RootWrapper>
      <Keyword />
      <PoemList displayData={displayData}/>
    </RootWrapper>
  )
}
export default MainPage;