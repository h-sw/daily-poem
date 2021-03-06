import React from 'react';
import styled from 'styled-components';
import {
  InputBase,
} from '@material-ui/core'
import { 
  Padding,
} from '../../styles/common';

const InputWrapper = styled.div`
  display       	: flex;
  margin        	: 0px;
  border-radius 	: 5px;
  padding       	: 5px;
  border        	: 1px solid #8FB896;
`

const Input = styled(InputBase)`
  font-size      	: 14px;
  color          	: #565656;
  font-weight    	: 600;
`

const Icon = styled.i`
  font-size      	:20px;
  height         	:20px;
  color          	:#8EB695;
  margin-right    :7px;
`

const AllSearch = ({ setValues }) => {

	const handleChange = (e) => {
    const {value } = e.target;
    setValues(value);
  }

  const handleSubmit= (e) => {
    e.preventDefault();
  } 

  return (
		<form onSubmit={handleSubmit} noValidate autoComplete="off">
			<InputWrapper>
				<Input
					name="search"
					fullWidth
					placeholder="이 곳에 입력해주세요."
					onChange={handleChange}
				/>
				<Icon className="fi-rr-search"/>
			</InputWrapper>
			<Padding/>
		</form>
  )
}

export default AllSearch;