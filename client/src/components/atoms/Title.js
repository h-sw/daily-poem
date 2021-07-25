import React from 'react';
import Typography from '@material-ui/core/Typography';
import styled from "styled-components";

const TitleText = styled(Typography)`
	font-size		: 20px;
	font-weight	: 700;
	cursor			: pointer;
	color				: #FFF;
  align-self  : center;
`

const Title = () => {

  return (  
    <TitleText
      onClick={()=>window.location.href="/"}
    >
      오늘의 3행시
    </TitleText>
  )
}
export default Title;