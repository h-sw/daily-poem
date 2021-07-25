import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import styled from "styled-components"
import Header from "../components/atoms/Header"
import dayjs from 'dayjs'

const NoticeWrapper = styled.div`
  flex-Shrink: 0;
  margin-Left: theme.spacing(2.5);
`

const columns = [
  { id: 'name', 
    label: '내용', 
    minWidth: 470 
  },
  {
    id: 'size',
    label: '등록일',
    minWidth: 170,
    align: 'right',
  },
];

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
    <NoticeWrapper>
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
    </NoticeWrapper>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const NoticeTable = styled(Table)`
  min-Width: 500;
  flex: 1;
  flex-Direction:'row';
  align-Items:'flex-start';
`

const NoticeTableCell = styled(TableCell)`
  width: 160;
`
const NoticeTableContainer = styled(TableContainer)`
  width: 55%;
  margin: 30px auto;
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
        console.log("resdata:", res.data)
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
  <React.Fragment>
    {/* 페이지 제목 나타내는 부분 */}
    <Header name={"공지사항"}></Header>
    {/* 공지사항 테이블 */}
    <NoticeTableContainer component={ Paper }>
      <NoticeTable aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <NoticeTableCell
                key={column.id}
                align={column.align}
              >
                {column.label}
              </NoticeTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? notice.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : notice
          ).map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">
                <div>{dayjs(notice.date).format("YYYY년 MM월 DD일 HH:mm")}</div>
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
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
          </TableRow>
        </TableFooter>
      </NoticeTable>
    </NoticeTableContainer>
  </React.Fragment>
  );
}