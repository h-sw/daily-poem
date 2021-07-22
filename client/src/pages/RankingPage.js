import React from 'react';
import Container from '@material-ui/core/Container';
import Grids from '../components/atoms/Grids'
import Header from '../components/atoms/Header';
import styled from 'styled-components';
import {
  RootWrapper
} from '../styles/common';

const RankingPage = () => {
  return (
    <RootWrapper>
        <main>
        {/* Hero unit */}
        <div>
            {/* 명예의 전당 텍스트 부분 */}
            <Header name="명예의 전당" description="가장 좋아요를 많이 받은 주제 10가지를 선정하여 보여줍니다."/>
        </div>
        <Grids></Grids>
      </main>
      {/* <Footer classes={classes}></Footer> */}
    </RootWrapper>
  );
}

export default RankingPage;