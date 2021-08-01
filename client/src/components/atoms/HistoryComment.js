import React from 'react';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import dayjs from 'dayjs';
import DeleteIcon from '@material-ui/icons/Delete';
import styled from "styled-components";
import {
  NoPaddingButton,
  FlexWrapper,
  Padding
} from '../../styles/common';
import Delete from './Delete'

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

  return (
    <Padding>
      <FlexWrapper>
        <WriterText>{historyComment.name}</WriterText>
        <CreatedDate>{dayjs(historyComment.created).format("MM.DD HH:mm")}</CreatedDate>
        <NoPaddingButton  aria-label="delete" onClick={() => setOpenDeleteRpy( !openDeleteRpy )}>
          <DeleteIcon fontSize="small" />
        </NoPaddingButton>
    	</FlexWrapper>
      <WriterText>{historyComment.reply}</WriterText>
      <Collapse in={openDeleteRpy} timeout="auto" unmountOnExit>
        <Delete row={historyComment} isReply={true}/>
      </Collapse>
    </Padding>
  )
}

export default HistoryComment;