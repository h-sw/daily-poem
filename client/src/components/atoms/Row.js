import React ,{useEffect}from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PersonIcon from '@material-ui/icons/Person';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CommentIcon from '@material-ui/icons/Comment';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
//import axios from 'axios';
import dayjs from 'dayjs';
import styled from "styled-components";
import IconButton from '@material-ui/core/IconButton';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Spacer,
  FlexWrapper,
} from '../../styles/common'
//import DeleteForm from './DeleteForm';
//import Report from './Report';
import HistoryComment from './HistoryComment.js'
import {
  FacebookShareButton,
  InstapaperShareButton,
  TwitterShareButton,
  FacebookIcon,
  InstapaperIcon,
  TwitterIcon,
} from "react-share";

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

const PostThemeText = styled(Typography)`
  color : #4caf50;
  font-size: 20px;
  font-weight: 600;
  flex-basis: 20%;
`

const PostCreatedDate = styled(Typography)`
  margin-right: 5px;
  font-size: 12px;
  color: #888;
  flex-basis: 20%;
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
  margin-bottom: 10px;
  color: #565656;
`

const PoemWord = styled.span`
  font-size: 28px;
  font-weight: 600;
  padding: 5px;
  border-radius: 100%;
  color : #4caf50;
`


function Row({ row, onReply = true, onLike = true}) {
  let on = onReply;
  let onLikes = onLike;
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);    
  const [openReport, setOpenReport] = React.useState(false);
  const [openReply, setOpen_reply] = React.useState(false);
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
/*    axios.post('/postReply',{poemId:values.poemId,id:values.id, pwd:values.password, reply: values.reply}) 
      .then(function (response) { console.log(response); }) 
      .catch(error => { console.log('error : ',error.response) }); */
    }
  } 

  const likeSubmit = (e) => {
  /*axios.post('/postLike',{likes : parseInt(row.likes) + 1, poemId: row.poemId}) 
    .then(function (response) { console.log(response); }) 
    .catch(error => { console.log('error : ',error.response) }); */
  }

  return (
    <div>
      <TableWrapper> 
        <PostPreviewRow onClick={() => setOpen(!open)}>
          <PostCreatedDate>{dayjs(row.created).format("M월DD일 H시mm분")}</PostCreatedDate>
          <PostThemeText >{row.word}</PostThemeText >
          <PostWrapper>
            <PersonIcon />
            <Typography >{row.name}</Typography>
          </PostWrapper>
          <Spacer />
          <FlexWrapper>
            <ThumbUpAltIcon />
            <Typography>{row.likes}</Typography>
          </FlexWrapper>
          <FlexWrapper>
            <CommentIcon />
            <Typography>{row.comment}</Typography>
          </FlexWrapper>
        </PostPreviewRow>
        <TableRow>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <div>
              <PoemDetailWrapper>
                <PoemText>
                  <PoemWord>{row.word.split('')[0]}</PoemWord>{row.poem_1.slice(1)}
                </PoemText>
                <PoemText>
                  <PoemWord>{row.word.split('')[1]}</PoemWord>{row.poem_2.slice(1)}
                </PoemText>
                <PoemText>
                  <PoemWord>{row.word.split('')[2]}</PoemWord>{row.poem_3.slice(1)}
                </PoemText>
                <div style={{display:'flex',justifyContent:'center'}}>
                  <Typography variant="caption" gutterBottom component="div">공유하기</Typography>
                    {/* 공유하기 버튼 들 */}
                  <FacebookShareButton url={"https://localhost:3000"} title={"facebook"}>
                    <FacebookIcon size={26} round={true}/>
                  </FacebookShareButton>
                  <TwitterShareButton url={"https://localhost:3000"} title={"facebook"}>
                    <TwitterIcon size={26} round={true}/>
                  </TwitterShareButton>
                  <InstapaperShareButton url={"https://localhost:3000"} title={"facebook"}>
                    <InstapaperIcon size={26} round={true}/>
                  </InstapaperShareButton>
                    {/*  삭제 기능 */}
                  <IconButton aria-label="delete" onClick={() => setOpenDelete(!openDelete)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                  <Collapse in={openDelete} timeout="auto" unmountOnExit>
                    냥?
                    {/* <DeleteForm row={row} isReply={false}/> */}
                  </Collapse>
                    {/* 신고 부분 */}
                  <IconButton aria-label="delete" onClick={() => setOpenReport(!openReport)}>
                    <RemoveCircleIcon color="error" fontSize="small"></RemoveCircleIcon>
                  </IconButton>
                  <Collapse in={openReport} timeout="auto" unmountOnExit>
                    냥?
                    {/* <Report row={row}/> */}
                  </Collapse>
                </div>
                {/* 좋아요 */}
                {Boolean(onLikes) && 
                <div>
                  <form onSubmit ={likeSubmit} noValidate autoComplete="off">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      type="submit"
                      startIcon={<ThumbUpAltIcon />}
                    >
                      Like
                    </Button>
                  </form>
                </div>}
              </PoemDetailWrapper>

              <Table size="small" aria-label="comments">
                <TableBody>
                  {row.replyList && row.replyList.map((historyComment, idx) => (
                    <HistoryComment key={idx} historyComment={historyComment}/>
                  ))}
                  {Boolean(on) && 
                  <div>
                    <PostWrapper >
                      <Button onClick={() => setOpen_reply(!openReply)}>
                        댓글쓰기
                      </Button>
                    </PostWrapper >
                    <Collapse in={openReply} timeout="auto" unmountOnExit>
                      <form onSubmit ={handleSubmit} noValidate autoComplete="off">
                        <CommentWrapper>
                          <TextField id="outlined-basic" label="닉네임" name="id" variant="outlined" size="small" value={values.id} onChange={handleChange}/>
                          <TextField id="outlined-basic" label="비밀번호" name="password" variant="outlined" size="small" value={values.password} onChange={handleChange}  />
                          <TextField id="outlined-basic" label="내용" name="reply" variant="outlined" size="small" value={values.reply} onChange={handleChange}  />
                          <button type="submit" >
                            등록
                          </button>
                        </CommentWrapper>
                      </form>
                    </Collapse>
                  </div>
                  }
                </TableBody>
              </Table>
            </div>
          </Collapse>
        </TableRow>
      </TableWrapper>
    </div>
    );
  }

  export default Row;