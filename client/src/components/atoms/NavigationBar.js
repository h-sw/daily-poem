import React from 'react';
import Title from './Title';
import {Button, Typography } from '@material-ui/core';
import styled from "styled-components";
import {
	Spacer	
} from '../../styles/common'

const NavigationWrapper = styled.div`
	height					: 60px;
	background-color: #8EB695;
`

const NavigationSubWrapper = styled.div`
	max-width 			: 1280px;
	margin	  			: 0px auto;
	height					: 100%;
	padding					: 0px 20px;
`

const ButtonWrapper = styled.div`
	display					: flex;
	align-items			: center;
	height					: 100%;
`

const MenuText = styled(Typography)`
	font-size				: 14px;
	font-weight 		: 500;
	color       		: #FFF;
`

const NavigationBar = () => {

  return (
    <NavigationWrapper>
      <NavigationSubWrapper>
        <ButtonWrapper>
          <Title/>
          <Spacer/>
          <div>
						<Button
							onClick={() => window.location.href="/notice"}
						>
							<MenuText>
								공지사항
							</MenuText>
						</Button>
						<Button
							onClick={() => window.location.href="/keyword"}
						>
							<MenuText>
								키워드
							</MenuText>
						</Button>
						<Button
							onClick={() => window.location.href="/rank"}
						>
							<MenuText>
								랭킹
							</MenuText>
						</Button>
          </div>
        </ButtonWrapper>
      </NavigationSubWrapper>
    </NavigationWrapper>
  )
}
export default NavigationBar;