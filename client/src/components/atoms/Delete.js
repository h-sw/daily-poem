import React from 'react';
import TextField from '@material-ui/core/TextField'
import axios from 'axios';

function Delete({ row, isReply }) {

  const [poemDelete, setPoemDelete] = React.useState({
    "poemId"   : row.poemId, 
    "replyId"  : row.poemId, 
    "name"     : "", 
    "password" : ""
  })

  const  handleDeleteChange = (e) => {
    let nextState = {
      "poemId"  : row.poemId,
      "replyId" : row.poemId,
      "name"    : poemDelete.name,
      "password": poemDelete.password,
    };
    if( isReply ) {
      nextState["replyId"] = row.replyId;
    }
    nextState[e.target.name] = e.target.value;
    setPoemDelete( nextState );
  } 

  const handleSubmit = (e) => {
    e.preventDefault();
    if( poemDelete.name ==="" || poemDelete.password ==="" ){
      alert( "삭제 정보를 입력해주세요." );
    }else if( poemDelete.name     != row.name ||
              poemDelete.password != row.password) {
      alert( "삭제 정보가 틀렸습니다." );
    }else{
      if( isReply ) {
        alert( '댓글이 삭제되었습니다!' );
        axios.post( '/deleteReply' , {
          "id"    : poemDelete.poemId,
          "rpyId" : poemDelete.replyId,
          "name"  : poemDelete.name,
          "pwd"   : poemDelete.password
        }) 
        .then( function ( response ) {
          console.log( response ); 
        }) 
        .catch( error => {
          console.log( 'error : ', error.response ) 
        });
      } else {
        alert('3행시가 삭제되었습니다!');
        axios.post( '/deletePoem' , {
          "id"    : poemDelete.poemId,
          "name"  : poemDelete.name, 
          "pwd"   : poemDelete.password
        }) 
        .then(function ( response ) { 
          console.log( response ); 
        }) 
        .catch(error => { 
          console.log( 'error : ',error.response ) 
        });
      }
    }
    window.location.reload();
  }

  return (
  	<form onSubmit ={handleSubmit} noValidate autoComplete="off">
      <TextField 
        id="outlined-basic" 
        label="닉네임" 
        name="name" 
        variant="outlined" 
        size="small" 
        value={poemDelete.name} 
        onChange={handleDeleteChange}
      />
      <TextField 
        id="outlined-basic" 
        label="비밀번호" 
        name="password" 
        variant="outlined" 
        size="small"
        value={poemDelete.password} 
        onChange={handleDeleteChange}
      />
      <button type="submit" >
        삭제
      </button>
    </form>
    )
}

export default Delete;