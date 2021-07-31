import React from 'react';
import { Grid } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase'
import styled from "styled-components";

const Input = styled(InputBase)`
  border          : 1px solid #EEE;
  font-size       : 14px;
  padding-left    : 10px;
  color           : #333333;
`
const GridInput = ({ xs, md, rows, name, type, value, onChange, placeholder, multiline=false}) => {

  return (
    <>
    {multiline ?
      <Grid xs={xs} md={md}>
        <Input 
          fullWidth
          multiline
          rows={rows}
          name={name}
          type={type}
          value={value} 
          onChange={onChange}
          placeholder={placeholder}
        />
      </Grid>
      : 
      <Grid xs={xs} md={md}>
        <Input 
          fullWidth
          name={name}
          rows={rows}
          type={type}
          value={value} 
          onChange={onChange}
          placeholder={placeholder}
        />
      </Grid>
    }
    </>
  )
}

export default GridInput;