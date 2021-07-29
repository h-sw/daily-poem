import React from 'react';
import styled from "styled-components"
import dayjs from 'dayjs'
import Typography from '@material-ui/core/Typography';
import {
	Padding
} from '../../styles/common';

const NoticeTable = styled.div`
  min-Width: 500;
  flex: 1;
  flex-Direction:'row';
  align-Items:'flex-start';
`
const NoticeTitle = styled(Typography)`
  font-size: 20px;
`
const NoticeWrapper = styled.div`
	border					: 1px solid #8EB695;
	border-radius		: 5px;
  padding         : 15px;
`
const ContentWrapper = styled.div`
	height  : 80px;
  color   : #565656;
`
const CreatedDateWrapper = styled.div`
	display					: flex;
	justify-content	: flex-end;
	font-size 			: 14px;
	align-items			: flex-end;
  color           : #888888;
`

const Table = ({ rowsPerPage, page, emptyRows, data }) => {

  return (
    <NoticeTable>
    {(rowsPerPage > 0
      ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : data
    ).map((row,index) => (
      <div>
        <Padding/>
        <NoticeWrapper key={index}>
          <NoticeTitle>
            {row.title}
          </NoticeTitle>
          <ContentWrapper>
            {row.content}
          </ContentWrapper>
          <CreatedDateWrapper>
            {dayjs(data.date).format("YYYY.MM.DD HH:mm")}
          </CreatedDateWrapper>
        </NoticeWrapper>
      </div>
    ))}
    {emptyRows > 0 && (
      <Padding/>
    )}
  </NoticeTable>
    )
}

export default Table;