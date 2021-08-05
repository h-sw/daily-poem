import React from 'react';
import TextField from '@material-ui/core/TextField'
import axios from 'axios';

export default function Report({ row , isReply , setOpen}) {

  const [report, setReport] = React.useState({ 
    "replyId"   : row.replyId, 
    "poemId"    : row.poemId, 
    "reason"    : "" 
  });

  const handleReport = ( e ) => {
    let nextState = {
      "poemId"  : row.poemId,
      "replyId" : row.poemId,
      "reason"  : report.reason,
    };
    if( isReply ) {
      nextState["replyId"] = row.replyId;
    }
    
    nextState[e.target.name] = e.target.value;
    setReport( nextState );
  } 

  const handleSubmit = ( e ) => {
    if( report.reason === "" ){
      alert( "신고 사유를 입력해주세요" );
    }else if( report.reason.length < 10 ){
      alert( "10글자 이상 입력해주세요" );
    }else{
      if( isReply ) {
        alert( "신고가 완료 되었습니다." );
        axios.post('http://localhost:4000/poem/'+report.poemId+'/report/'+report.replyId,{ 
          "replyId"   : report.replyId, 
          "poemId"    : report.poemId, 
          "reason"    : report.reason 
        }) 
        .then( function (response) {
           console.log(response); 
        }) 
        .catch( error => {
          console.log('error : ',error.response) 
        });
        window.location.reload();
      }else{
        alert( "신고가 완료 되었습니다." );
        axios.post('http://localhost:4000/poem/'+report.poemId+'/report',{ 
          "replyId"   : null, 
          "poemId"    : report.poemId, 
          "reason"    : report.reason 
        }) 
        .then( function (response) {
           console.log(response); 
        }) 
        .catch( error => {
          console.log('error : ',error.response) 
        });
        setOpen(false);
      }
    }
  }

  return (
    <div>
      <TextField 
        id="outlined-basic"
        label="신고사유" 
        name="reason" 
        variant="outlined" 
        size="small" 
        value={report.reason} 
        onChange={handleReport}
      />
			<button onClick={handleSubmit} >
				신고
			</button>
    </div>
  )
}