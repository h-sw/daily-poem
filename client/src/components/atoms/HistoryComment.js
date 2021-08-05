import React from 'react';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import dayjs from 'dayjs';
import DeleteIcon from '@material-ui/icons/Delete';
import styled from "styled-components";
import BlockIcon from '@material-ui/icons/Block';
import Report from './Report';
import {
  NoPaddingButton,
  FlexWrapper,
  Padding
} from '../../styles/common';
import Delete from './Delete';
import Like from './Like';

const WriterText = styled(Typography)`
  font-size    : 12px;
  margin-right : 1rem;
`

const CreatedDate = styled(Typography)`
  font-size    : 12px;
  color        : #888;
`

function HistoryComment({ historyComment }) {

  const [openDeleteRpy, setOpenDeleteRpy] = React.useState(false);
  const [openReport, setOpenReport] = React.useState(false);

  
  return (
    <Padding>
      <FlexWrapper>
        <WriterText>{historyComment.name}</WriterText>
        <CreatedDate>{dayjs(historyComment.created).format("MM.DD HH:mm")}</CreatedDate>
        {/* 좋아요 기능 */}
        {/* 일단 임시로 style 해놨음 */}
        <div style = {{marginLeft: 10}}>
        <Like id = {historyComment.replyId} likes = {historyComment.likes} isReply = {true}></Like>
        </div>
        <NoPaddingButton  aria-label="delete" onClick={() => setOpenDeleteRpy( !openDeleteRpy )}>
          <DeleteIcon fontSize="small" />
        </NoPaddingButton>
        <NoPaddingButton onClick={() => setOpenReport(!openReport)}>
          <BlockIcon/>
        </NoPaddingButton>
    	</FlexWrapper>
      <WriterText>{historyComment.reply}</WriterText>
      <Collapse in={openDeleteRpy} timeout="auto" unmountOnExit>
        <Delete row={historyComment} isReply={true}/>
      </Collapse>
      <Collapse in={openReport} timeout="auto" unmountOnExit>
        <Report row={historyComment} isReply={true}></Report>
      </Collapse>
    </Padding>
  )
}

export default HistoryComment;