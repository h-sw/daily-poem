import React from 'react';
import Button from '@material-ui/core/Button';

const MenuSelector = ({handleSortingClick, CheckedButton, sorting, plus}) => {

  return (
    <div style={{display:'flex',justifyContent:'space-between'}}>
        <div style={{display:'flex'}}>
        <Button onClick={() => handleSortingClick('실시간 좋아요순')} style={{borderRight:'1px solid #EEE'}}>
            {sorting=== '실시간 좋아요순' ? <CheckedButton check={'실시간 좋아요순'}/> : '실시간 좋아요순' } 
        </Button>
        <Button onClick={() => handleSortingClick('최신순')}>
            {sorting=== '최신순' ? <CheckedButton check={'최신순'}/> : '최신순' } 
        </Button>
        </div>
        <Button onClick={() => handleSortingClick('더보기')}>
            {plus ? '메인화면으로 돌아가기' : '더보기' } 
        </Button>    
    </div>
  )
}
export default MenuSelector;