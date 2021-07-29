import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import styled from "styled-components"
import Header from "../components/atoms/Header"
import Table from "../components/atoms/Table"
import dayjs from 'dayjs'
import Typography from '@material-ui/core/Typography';
import {
  RootWrapper,
  TitleWrapper,
	Padding
} from '../styles/common';

const PaginationWrapper = styled.div`
  flex-Shrink			: 0;
  margin-Left			: theme.spacing(2.5);
`

const NoticeWrapper = styled.div`
	border					: 1px solid #8EB695;
	border-radius		: 5px;
  padding         : 15px;
`

const NoticeTitle = styled(Typography)`
  font-size: 20px;
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

const PaginationSelector = styled(TablePagination)`
	min-width				: 100%;
	border-bottom		: none;
`

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <PaginationWrapper>
      {/* 맨 처음 페이지 이동 부분 */}
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
       {/* 이전 페이지 이동 */}
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      {/* 다음 페이지 이동 */}
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      {/* 맨 마지막 페이지 이동 */}
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </PaginationWrapper>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const NoticeTable = styled.div`
  min-Width: 500;
  flex: 1;
  flex-Direction:'row';
  align-Items:'flex-start';
`

export default function NoticePage() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [notice, setNotice]=React.useState([]);

  const callApi = async()=>{
    const response = await fetch('/notice');
    const body = await response.json();
    return body;
  }

  useEffect(()=>{
      callApi()
      .then(res => {
        setNotice(res.data)
      })
      .catch(err=>{
        console.log(err)
      });
  }, []);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, notice.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <RootWrapper>
      <TitleWrapper>
        <Header name={"공지사항"}></Header>
      </TitleWrapper>
      <div>
        <Table 
          rowsPerPage = {rowsPerPage} 
          page = {page} 
          emptyRows = {emptyRows}
          data = {notice} 
        >
        </Table>
        {emptyRows > 0 && (
          <Padding/>
        )}
        <PaginationSelector
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          colSpan={5}
          count={notice.length}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: { 'aria-label': 'notice per page' },
            native: true,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </div>
  	</RootWrapper>
  );
}