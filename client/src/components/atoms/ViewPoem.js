import React from 'react';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import BlockIcon from '@material-ui/icons/Block';
import styled from "styled-components";
import { RowContext } from './Row';
import dayjs from 'dayjs';
import Report from './Report';
import DeleteIcon from '@material-ui/icons/Delete';
import Delete from './Delete';
import Like from './Like';
import {
  Spacer,
  FlexWrapper,
  NoPaddingButton,
} from '../../styles/common'
import {
  Icon,
  IconText,
  IconWrapper,
} from '../../styles/icon'
import {
  PoemText,
  PoemWord,
  PostThemeText,
  PostCreatedDate,
} from '../../styles/poem'


const CardContainer = styled.div`
  margin          : 15px;
  padding         : 15px;
  border-radius   : 15px;
  background-color: #8EB695;
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
      {row.word && <>
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
          {/* 좋아요 기능 */}
          <Like submit = {submit} likes = {row.likes}></Like>
          {/* 댓글 수 표시 */}
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
          {/*삭제 기능 */}
          <NoPaddingButton  aria-label="delete" onClick={() => setOpenDelete( !openDelete )}>
            <DeleteIcon fontSize="small" />
          </NoPaddingButton>
          <Collapse in={openDelete} timeout="auto" unmountOnExit>
            <Delete row={row} isReply={false}/>
          </Collapse>
        </FlexWrapper>
      </>}
    </CardContainer>
    )
}

export default ViewPoem;