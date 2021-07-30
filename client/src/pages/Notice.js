import React from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import styled from "styled-components"
import Header from "../components/atoms/Header"
import Table from "../components/atoms/Table"
import NoticePaginationActions from '../components/atoms/NoticePaginationActions';
import {
  RootWrapper,
  TitleWrapper,
	Padding
} from '../styles/common';

const PaginationSelector = styled(TablePagination)`
	min-width				: 100%;
	border-bottom		: none;
`

export default function Notice() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [notice, setNotice]=React.useState([]);

  const callApi = async()=>{
    const response = await fetch('/notice');
    const body = await response.json();
    return body;
  }

  React.useEffect(()=>{
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
          ActionsComponent={NoticePaginationActions}
        />
      </div>
  	</RootWrapper>
  );
}