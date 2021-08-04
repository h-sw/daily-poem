import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button'
import styled from "styled-components";
import { Grid, InputBase, Typography } from '@material-ui/core';

const FormWrapper = styled.div`
  background-color: #cfe8fc;
  max-width 	    : 600px;
	margin	  	    : 0px auto;
	height			    : 100%;
	padding			    : 5px 20px;
`

const ButtonWrapper = styled.div`
  display         : flex;
  justify-content : flex-end;
`

const PostWrapper = styled.div`
  margin          : 10px;
  display         : flex;
  flex-direction  : column;
`

const PoemInputWrapper = styled.div`
  display         : flex;
  margin          : 5px 0px;
  border-radius   : 5px;
  padding         : 0px 10px;
  border          : 1px solid #8FB896;
`

const PoemInput = styled(InputBase)`
  font-size       : 14px;
  color           : #565656;
  font-weight     : 600;
`

const PoemKeyword = styled(Typography)`
  align-self      : center;
  font-weight     : 700;
  color           : #676A59;
`

const InfoInput = styled(InputBase)`
  border          : 1px solid #8FB896;
  font-size       : 14px;
  padding         : 3px 10px;
  margin          : 10px 0px 5px 0px;
  color           : #676A59;
  border-radius   : 5px;
`

const SubmitButton = styled(Button)`
  background-color: #8FB896;
  color           : #FFFFFF;
  font-wieght     : 600;
  font-size       : 14px;
  &:hover {
    background-color : #8F8F8F;
  }
`

function PoemPostForm({ keyword }) {
  const [values, setValues] = React.useState({ 
    "id"        : "", 
    "password"  : "", 
    "word"      : keyword, 
    "poem_1"    : "", 
    "poem_2"    : "", 
    "poem_3"    : ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ 
      ...values, 
      [name]: value 
    });
  } 

  const handleSubmit= (e) => {
    if( values.id       ==="" ||
        values.password ==="" ||
        values.word     ==="" ||
        ( values.poem_1 ==="" && values.poem_2 ==="" && values.poem_3 ==="" )){
      if( values.poem_1 ==="" && values.poem_2 ==="" && values.poem_3 ==="" ){
        alert("3행시를 입력해주세요!");
      }else{
        alert('모두 입력해주세요!');
      }
      console.log(values);
      e.preventDefault();
    }else{
      alert('3행시가 등록되었습니다!');
      axios.post('http://localhost:4000/poem/', {
        "id"      : values.id, 
        "pwd"     : values.password, 
        "word"    : values.word, 
        "poem_1"  : values.poem_1, 
        "poem_2"  : values.poem_2, 
        "poem_3"  : values.poem_3
      }) 
      .then(function (response) {
        console.log(response); 
      }) 
      .catch(error => {
        console.log('error : ', error.response) 
      });
    }
  } 

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <InfoInput
              fullWidth
              name="id"
              placeholder="닉네임"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <InfoInput
              fullWidth
              name="password" 
              type="password"
              placeholder="비밀번호"
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <PostWrapper>
          {keyword.split('').map((item, idx) => {
            return (
              <PoemInputWrapper>
                <PoemKeyword>{item}</PoemKeyword>
                <PoemInput
                  key={idx} 
                  name={`poem_${idx+1}`} 
                  fullWidth
                  placeholder="이 곳에 입력해주세요."
                  onChange={handleChange}
                  inputProps={{
                    style : {
                      padding: 10,
                    }
                  }}
                />
              </PoemInputWrapper>
            )
          })}
        </PostWrapper>
        <ButtonWrapper>
          <SubmitButton type="submit">
            등록
          </SubmitButton>
        </ButtonWrapper>
      </form>
    </FormWrapper>
  )
}
export default PoemPostForm;