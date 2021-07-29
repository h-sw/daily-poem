import React from 'react';
import Typography from '@material-ui/core/Typography';
import PoemPostForm from './PoemPostForm';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Schedule from 'react-schedule-job';
import styled from "styled-components";

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
    const response = await fetch('/Keyword');
    const body = await response.json();
    return body;
  }

  const callKeyword = () => {
    callKeywordApi()
    .then( res=>{
      //setKeyword(res.data[0].keyword);
      setKeyword( "민경훈" );
    })
    .catch( err=>console.log(err) );
  };

  const jobs = [
    {
      fn: callKeyword,
      id: '1',
      schedule: '0 0 * * *'
    }
  ]

  return (
    <KewordWrapper>
      <Schedule
        jobs={jobs}
        timeZone='Asia/Seoul'
        // "UTC", "local" or "YOUR PREFERRED TIMEZONE",
        dashboard={{
          hidden: true
          // if true, dashboard is hidden
        }}
      />
      <KeywordButton onClick={() => setOpen_content( !open_content )}>
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