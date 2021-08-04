import React from 'react';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import BlockIcon from '@material-ui/icons/Block';
import styled from "styled-components";
import { RowContext } from './Row';
import dayjs from 'dayjs';
import Report from './Report';
import DeleteIcon from '@material-ui/icons/Delete';
import Delete from './Delete'
import {
  NoPaddingButton,
  Spacer,
  FlexWrapper,
} from '../../styles/common'

const CardContainer = styled.div`
  margin          : 15px;
  padding         : 15px;
  border-radius   : 15px;
  background-color: #8EB695;
`
const PostThemeText = styled(Typography)`
  color           : #676A59;
  font-size       : 20px;
  font-weight     : 600;
`
const PostCreatedDate = styled(Typography)`
  font-size       : 12px;
  color           : #333333;
`
const PoemText = styled(Typography)`
  font-size       : 16px;
  font-weight     : 500;
  color           : #676A59;
`
const PoemWord = styled.span`
  font-size       : 16px;
  font-weight     : 700;
  border-radius   : 100%;
  color           : #676A59;
`
const Icon = styled.i`
  font-size       : 14px;
  height          : 14px;
  color           : #333333;
  margin-right    : 5px;
`
const IconText = styled(Typography)`
  font-size       : 14px;
  color           : #333333;
`
const IconWrapper = styled(FlexWrapper)`
  margin-right    : 10px;
  cursor          : pointer;
`
const ContentWrapper = styled.div`
  margin-top      : 10px;
  margin-bottom   : 40px;
`

const ViewPoem = ( { submit }) => {
  const [open, setOpen] = React.useState(false);
  const row = React.useContext(RowContext);
  const [openDelete, setOpenDelete] = React.useState(false);
  return (
    <CardContainer>
      <FlexWrapper>
        <PostThemeText>{row.word}</PostThemeText>
        <Spacer />
        <PostCreatedDate>{dayjs(row.created).format("M.DD H:mm")}</PostCreatedDate>
      </FlexWrapper>
      <ContentWrapper>
        <PoemText>
          <PoemWord>{row.word.split('')[0]}</PoemWord>{row.poem_1}
        </PoemText>
        <PoemText>
          <PoemWord>{row.word.split('')[1]}</PoemWord>{row.poem_2}
        </PoemText>
        <PoemText>
          <PoemWord>{row.word.split('')[2]}</PoemWord>{row.poem_3}
        </PoemText>
      </ContentWrapper>
      <FlexWrapper>
        <IconWrapper>
          <Icon className="fi-sr-user" />
          <IconText>{row.name}</IconText>
        </IconWrapper>
        <Spacer />
        <IconWrapper onClick={submit}>
          <Icon className="fi-sr-thumbs-up" />
          <IconText>{row.likes}</IconText>
        </IconWrapper>
        <IconWrapper>
          <Icon className="fi-sr-comment" />
          <IconText>{row.comment}</IconText>
        </IconWrapper>
        {/* 신고 기능 */}
        <IconWrapper onClick={() => setOpen(!open)}>
          <BlockIcon></BlockIcon>
        </IconWrapper>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Report row={row} isReply={false}></Report>
        </Collapse>
        {/**삭제기능 */}
        <NoPaddingButton  aria-label="delete" onClick={() => setOpenDelete( !openDelete )}>
          <DeleteIcon fontSize="small" />
        </NoPaddingButton>
        <Collapse in={openDelete} timeout="auto" unmountOnExit>
          <Delete row={row} isReply={false}/>
        </Collapse>
      </FlexWrapper>
    </CardContainer>
    )
}

export default ViewPoem;