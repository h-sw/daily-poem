import React from 'react';
import Typography from '@material-ui/core/Typography';
import PoemPostForm from './PoemPostForm';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Schedule from 'react-schedule-job';
import styled from "styled-components";

const KewordWrapper = styled.div`
  margin: 20;
  disply: flex;
  justify-Content: center;
  flex-Direction: cloumn;
`

const KeywordText = styled(Typography)`
  textAlign: center;
`

const Keyword = () => {
  const [open_content, setOpen_content] = React.useState(false);
  const [keyword, setKeyword] = React.useState("키워드");

  const callKeywordApi = async()=>{
    const response = await fetch('/Keyword');
    const body = await response.json();
    return body;
  }

  const callKeyword = () => {
    callKeywordApi()
    .then(res=>{
      //setKeyword(res.data[0].keyword);
      setKeyword("키워드");
    })
    .catch(err=>console.log(err));
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
      <Typography variant="caption">
        오늘은
      </Typography>

      <Schedule
        jobs={jobs}
        timeZone='Asia/Seoul'
        // "UTC", "local" or "YOUR PREFERRED TIMEZONE",
        dashboard={{
          hidden: true
          // if true, dashboard is hidden
        }}
      />
      <Button onClick={() => setOpen_content(!open_content)}>
        <KeywordText variant="h1">
          {keyword}
        </KeywordText>
      </Button>
 
      <Collapse in={open_content} timeout="auto" unmountOnExit>
        <PoemPostForm keyword={keyword} />
      </Collapse>
    </KewordWrapper> 
  )
}
export default Keyword;