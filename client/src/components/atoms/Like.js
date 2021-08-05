import React from 'react';
import {
  Icon,
  IconText,
  IconWrapper,
} from '../../styles/icon';
import axios from 'axios';

function Like({ id, likes, isReply}) {

  const [like, setLike] = React.useState(likes);
  const likeSubmit = (e) => {
    axios.post('http://localhost:4000/poem/' + id + '/like', {
      "likes"   : parseInt(like) + 1, 
      "id"      : id
    }) 
    .then((response) => { 
      axios.get('http://localhost:4000/poem/' + id + '/read') 
      .then((res) => { 
        setLike(res.data.data[0].likes);
      }) 
      .catch(error => { 
        console.log('error : ', error.response) 
      }); 
    }) 
    .catch(error => { 
      console.log('error : ', error.response) 
    }); 
  }
  const replyLikeSubmit = (e) => {
    axios.post('http://localhost:4000/poem/' + id + '/likeReply', {
      "likes"   : parseInt(like) + 1, 
      "id"      : id
    }) 
    .then((response) => { 
      axios.get('http://localhost:4000/poem/' + id + '/readReply') 
      .then((res) => { 
        setLike(res.data.data[0].likes);
      }) 
      .catch(error => { 
        console.log('error : ', error.response) 
      }); 
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
        <IconText>{like}</IconText>
      </IconWrapper>
      </>
    :
      <>
      <IconWrapper onClick={likeSubmit}>
        <Icon className="fi-sr-thumbs-up" />
        <IconText>{like}</IconText>
      </IconWrapper>
      </>
    }
    </>
  );
}

export default Like;