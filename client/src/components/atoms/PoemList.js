import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Row from './Row';

const PoemListContainer = ({ displayData }) => {
    return (
      <div>
        {displayData.map((row, idx) => (
          <Row key={idx} row={row} />
        ))}
      </div>
    )
  }
  export default PoemListContainer;