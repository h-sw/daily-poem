import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button'
import InputBase from '@material-ui/core/InputBase'
import axios from 'axios';
//import axios from 'axios';
import dayjs from 'dayjs';
import styled from "styled-components";
import {
  Spacer,
  FlexWrapper,
} from '../../styles/common'
//import DeleteForm from './DeleteForm';
import HistoryComment from './HistoryComment.js'

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  cursor: pointer;
  border: 1px solid #aaa;
`

const PostPreviewRow= styled(TableRow)`
  display: flex; 
  flex-grow: 5;
  flex-basis: 0;
  border-bottom: unset;
  align-items: center;
`

const Card = styled.div`
  margin: 15px;
  padding: 15px;
  border-radius: 15px;
  background-color: #8EB695;
`

const PostThemeText = styled(Typography)`
  color : #676A59;
  font-size: 20px;
  font-weight: 600;
`

const PostCreatedDate = styled(Typography)`
  font-size: 12px;
  color: #333333;
`

const PostWrapper = styled.div`
  display: flex;
  flex-basis: 30%;
`

const PoemDetailWrapper = styled.div`
  padding-top: 20px;
`

const CommentWrapper = styled.div`
  margin: 5;
  display: flex;
  flex-direction: row;
`

const PoemText = styled(Typography)`
  font-size: 16px;
  font-weight: 600;
  color: #FFFFFF;
`

const PoemWord = styled.span`
  font-size: 16px;
  font-weight: 600;
  border-radius: 100%;
  color : #676A59;
`

const Icon = styled.i`
  font-size: 14px;
  height: 14px;
  color: #333333;
  margin-right: 5px;
`

const IconText = styled(Typography)`
  font-size: 14px;
  color: #333333;
`

const IconWrapper = styled(FlexWrapper)`
  margin-right: 10px;
`

const ContentWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 40px;
`

const CommentContainer = styled.div`
  margin: 20px;
`

const Input = styled(InputBase)`
  border : 1px solid #EEE;
  font-size: 14px;
  padding-left: 10px;
  color: #333333;
`

const CommentSubmitButton = styled(Button)`
  position: absolute;
  bottom: 0px;
  right: 0px;
  font-size: 14px;
  color: #333333;
  border: 1px solid #EEE
`

const CommentFormWrapper = styled.div`
  position: relative;
  margin-top: 20px;
`

const EmptyText = styled(Typography)`
  padding: 20px 0px;
  text-align: center;
  font-size: 14px;
  color: #888888;

`

function Row({ row, onReply = true, onLike = true}) {
  const [values, setValues] = React.useState({ poemId:"", id: "", password: "", reply:"" });

  const  handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value,poemId:row.poemId });
  }

  const handleSubmit= (e) => {
    if(values.id==""||values.password==""||values.reply==""){
      if(values.reply==""){
        alert("댓글을 입력해주세요!");
      }
      else{
        alert('모두 입력해주세요!');
      }
      e.preventDefault();
  
    }else{
      alert('댓글이 등록되었습니다!');
      /*    
        axios.post('/postReply',{poemId:values.poemId,id:values.id, pwd:values.password, reply: values.reply}) 
        .then(function (response) { console.log(response); }) 
        .catch(error => { console.log('error : ',error.response) }); 
      */
    }
  } 

  const likeSubmit = (e) => {
    console.log("눈눈");
    axios.post('/postLike',{likes : parseInt(row.likes) + 1, poemId: row.poemId}) 
    .then(function (response) { console.log(response); }) 
    .catch(error => { console.log('error : ',error.response) }); 
    
  }

  return (
    <div>
      <Card>
        <FlexWrapper>
          <PostThemeText >{row.word}</PostThemeText >
          <Spacer />
          <PostCreatedDate>{dayjs(row.created).format("M.DD H:mm")}</PostCreatedDate>
        </FlexWrapper>
        <ContentWrapper>
          <PoemText>
            <PoemWord>{row.word.split('')[0]}</PoemWord>{row.poem_1.slice(1)}
          </PoemText>
          <PoemText>
            <PoemWord>{row.word.split('')[1]}</PoemWord>{row.poem_2.slice(1)}
          </PoemText>
          <PoemText>
            <PoemWord>{row.word.split('')[2]}</PoemWord>{row.poem_3.slice(1)}
          </PoemText>
        </ContentWrapper>
        <div>
          <FlexWrapper>
            <IconWrapper>
              <Icon className="fi-sr-user" />
              <IconText>{row.name}</IconText>
            </IconWrapper>
            <Spacer />
            <IconWrapper onClick={likeSubmit}>
              <Icon className="fi-sr-thumbs-up" />
              <IconText>{row.likes}</IconText>
            </IconWrapper>
            <IconWrapper>
              <Icon className="fi-sr-comment" />
              <IconText>{row.comment}</IconText>
            </IconWrapper>
          </FlexWrapper>
        </div>
      </Card>
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
            <Grid xs={6} md={6}>
              <Input 
                fullWidth
                name="id" 
                value={values.id} 
                onChange={handleChange}
                placeholder="닉네임"
              />
            </Grid>
            <Grid xs={6} md={6}>
              <Input 
                fullWidth
                name="password" 
                type="password"
                value={values.password} 
                onChange={handleChange}  
                placeholder="비밀번호"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Input 
                fullWidth
                multiline
                rows={5}
                name="reply"
                value={values.reply} 
                onChange={handleChange} 
                placeholder="이 곳에 댓글을 작성해주세요."
              />
            </Grid>
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