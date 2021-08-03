import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import axios from 'axios';
import GridInput from '../atoms/GridInput'
import ViewPoem from './ViewPoem'
import styled from "styled-components";
import HistoryComment from './HistoryComment.js'

export const RowContext = React.createContext();

const CommentContainer = styled.div`
  margin          : 20px;
`

const CommentSubmitButton = styled(Button)`
  position        : absolute;
  bottom          : 0px;
  right           : 0px;
  font-size       : 14px;
  color           : #333333;
  border          : 1px solid #EEE
`

const CommentFormWrapper = styled.div`
  position        : relative;
  margin-top      : 20px;
`

const EmptyText = styled(Typography)`
  padding         : 20px 0px;
  text-align      : center;
  font-size       : 14px;
  color           : #888888;
`

const PostWrapper = styled.div`
  margin          : 10;
  display         : flex;
  flex-Direction  : column;
`


function Row({ row, onReply = true, onLike = true }) {
  const [open_report, setOpen_report] = React.useState(false);
  const [values, setValues] = React.useState({ 
    "poemId"    : "", 
    "id"        : "", 
    "password"  : "", 
    "reply"     : "" 
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ 
      ...values, 
      [name] : value, 
      poemId : row.poemId 
    });
  }

  const handleSubmit = (e) => {
    if( values.id       === "" ||
        values.password === "" ||
        values.reply    === "" ){
      if( values.reply  === "" ){
        alert("댓글을 입력해주세요!");
      }
      else{
        alert('모두 입력해주세요!');
      }
    }else{
      axios.post('http://localhost:4000/poem/'+values.poemId+'/reply',{
        "poemId"  : values.poemId, 
        "id"      : values.id, 
        "pwd"     : values.password, 
        "reply"   : values.reply
      }) 
      .then((response) => { 
        console.log(response)
        alert('댓글이 등록되었습니다!');
        window.location.reload();
      }) 
      .catch(error => { 
        console.log('error : ', error.response) 
      }); 
    }
  } 

  const likeSubmit = (e) => {
    axios.post('/postLike', {
      "likes"   : parseInt(row.likes) + 1, 
      "poemId"  : row.poemId
    }) 
    .then((response) => { 
      console.log(response); 
      alert("좋아요를 눌렀어요!")
      window.location.reload();
    }) 
    .catch(error => { 
      console.log('error : ', error.response) 
    }); 
  }
  return (
    <div>
      <RowContext.Provider value={row}>
        <ViewPoem
          submit={likeSubmit}
        >
        </ViewPoem>
      </RowContext.Provider>
      <CommentContainer>
        {row.replyList && row.replyList.map((historyComment, idx) => {
          return(
            <HistoryComment key={idx} historyComment={historyComment}/>
          )
        })}
        {row.replyList && row.replyList.length === 0 &&
          <EmptyText>아직 댓글이 없습니다.</EmptyText>
        }
        <CommentFormWrapper>
          <Grid container>
            <GridInput 
              xs={6} 
              md={6} 
              name={"id"} 
              value={values.id} 
              onChange={handleChange} 
              placeholder={"닉네임"}
            />
            <GridInput 
              xs={6} 
              md={6} 
              name={"password"} 
              type={"password"}
              value={values.password} 
              onChange={handleChange} 
              placeholder={"비밀번호"}
            />
            <GridInput 
              xs={12} 
              md={12} 
              rows = {5}
              name={"reply"} 
              value={values.reply} 
              onChange={handleChange} 
              placeholder={"이 곳에 댓글을 작성해주세요."}
              multiline={true}
            />
          </Grid>
          <CommentSubmitButton onClick={handleSubmit}>
            등록
          </CommentSubmitButton>
        </CommentFormWrapper>
      </CommentContainer>
    </div>
  );
}

export default Row;