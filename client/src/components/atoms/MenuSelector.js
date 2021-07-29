import React from 'react';
import Button from '@material-ui/core/Button';
import {
  Spacer,
  FlexWrapper,
} from '../../styles/common'
import styled from "styled-components";

const MSWrapper = styled(FlexWrapper)`
  justify-content : space-between;
`
const LikeButton = styled(Button)`
  border-right : 1px solid #EEE;
`

const MenuSelector = ({handleSortingClick, CheckedButton, sorting, plus}) => {

  return (
    <MSWrapper>
      <FlexWrapper>
        <LikeButton onClick={() => handleSortingClick('실시간 좋아요순')}>
            {sorting=== '실시간 좋아요순' ? <CheckedButton check={'실시간 좋아요순'}/> : '실시간 좋아요순' } 
        </LikeButton>
        <Button onClick={() => handleSortingClick('최신순')}>
            {sorting=== '최신순' ? <CheckedButton check={'최신순'}/> : '최신순' } 
        </Button>
      </FlexWrapper>
      <Button onClick={() => handleSortingClick('더보기')}>
          {plus ? '메인화면으로 돌아가기' : '더보기' } 
      </Button>    
    </MSWrapper>
  )
}
export default MenuSelector;