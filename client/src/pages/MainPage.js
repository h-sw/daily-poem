import React from 'react';
import PoemList from '../components/atoms/PoemList';
import { RootWrapper } from '../styles/common';
//import AllPoemList from '../components/organisms/AllPoemList';

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
      <PoemList displayData={displayData}/>
    </RootWrapper>
  )
}
export default MainPage;