import React from 'react';
import Title from './Title';
import {Button, Typography } from '@material-ui/core';
import styled from "styled-components";
import {
	Spacer	
} from '../../styles/common'

const NavigationWrapper = styled.div`
	height			: 60px;
	background	: linear-gradient(315deg, #20bf55 0%, #01baef 74%);
`

const NavigationSubWrapper = styled.div`
	max-width 	: 1080px;
	margin	  	: 0px auto;
	height			: 100%;
	padding			: 0px 20px;
`

const ButtonWrapper = styled.div`
	display			: flex;
	align-items	: center;
	height			: 100%;
`

const MenuText = styled(Typography)`
	font-size		: 14px;
	font-weight : 500;
	color       : #FFF;
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
							onClick={() => window.location.href="/ranking"}
						>
							<MenuText>
								명예의 전당
							</MenuText>
						</Button>
						<Button
							//onClick={() => window.location.href="/RankingPage"}
						>
							<MenuText>
								주간/월간/연간 랭킹
							</MenuText>
						</Button>
          </div>
        </ButtonWrapper>
      </NavigationSubWrapper>
    </NavigationWrapper>
  )
}
export default NavigationBar;