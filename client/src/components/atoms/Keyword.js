import React from 'react';
import Typography from '@material-ui/core/Typography';
import PoemPostForm from './PoemPostForm';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import styled from "styled-components";
import axios from 'axios';

const KewordWrapper = styled.div`
  text-align    : center;
  margin-bottom : 40px;
`

const KeywordText = styled(Typography)`
  disply        : flex;
  font-size     : 48px;
  font-weight   : 700;
  flex-direction: column;
  line-height   : 1.1;
`

const Subtitle = styled(Typography)`
  line-height   : 1.1;
  font-size     : 16px;
`

const KeywordButton = styled(Button)`
  padding       : 5px 30px;
  border-radius : 15px;
`

const Keyword = ({ keyword, setKeyword }) => {
  const [open_content, setOpen_content] = React.useState(false);

  const callKeywordApi = async()=>{
    console.log("도착");
    const response = await axios.get('http://localhost:4000/keyword');
    console.log(response.data.data);
    //const body = await response.json();
    return response.data.data;
  }

  React.useEffect(()=>{
    callKeywordApi()
    .then( res=>{
      console.log(res);
      setKeyword(res.keyword);
    })
    .catch( err=>console.log(err) );
  }, []);


  return (
    <KewordWrapper>
      <KeywordButton onClick={() => setOpen_content(!open_content)}>
        <div>
          <Subtitle>
            오늘의 단어
          </Subtitle>
          <KeywordText>
            {keyword}
          </KeywordText>
          <Subtitle>
            나도 쓸래!
          </Subtitle>
        </div>
      </KeywordButton>
      <Collapse in={open_content} timeout="auto" unmountOnExit>
        <PoemPostForm keyword={keyword} />
      </Collapse>
    </KewordWrapper> 
  )
}
export default Keyword;