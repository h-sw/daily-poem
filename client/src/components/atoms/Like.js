import React from 'react';
import {
  Icon,
  IconText,
  IconWrapper,
} from '../../styles/icon';
import axios from 'axios';

function Like({ id, likes, isReply}) {

  const likeSubmit = (e) => {
    axios.post('http://localhost:4000/poem/' + id + '/like', {
      "likes"   : parseInt(likes) + 1, 
      "id"      : id
    }) 
    .then((response) => { 
      console.log(response); 
      alert("좋아요를 눌렀어요!")
      window.location.reload();
    }) 
    .catch(error => { 
      console.log('error : ', error.response) 
    }); 
  }
  const replyLikeSubmit = (e) => {
    axios.post('http://localhost:4000/poem/' + id + '/replyLike', {
      "likes"   : parseInt(likes) + 1, 
      "id"      : id
    }) 
    .then((response) => { 
      console.log(response); 
      alert("좋아요를 눌렀어요!")
      window.location.reload();
    }) 
    .catch(error => { 
      console.log('error : ', error.response) 
    }); 
  }
  return (
    <>
    { isReply ? 
      <>
      <IconWrapper onClick={replyLikeSubmit}>
        <Icon className="fi-sr-thumbs-up" />
        <IconText>{likes}</IconText>
      </IconWrapper>
      </>
    :
      <>
      <IconWrapper onClick={likeSubmit}>
        <Icon className="fi-sr-thumbs-up" />
        <IconText>{likes}</IconText>
      </IconWrapper>
      </>
    }
    </>
  );
}

export default Like;