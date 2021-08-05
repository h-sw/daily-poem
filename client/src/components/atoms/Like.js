import React from 'react';
import {
  Icon,
  IconText,
  IconWrapper,
} from '../../styles/icon'

function Like({ submit, likes }) {
  return (
    <IconWrapper onClick={submit}>
      <Icon className="fi-sr-thumbs-up" />
      <IconText>{likes}</IconText>
    </IconWrapper>
  );
}

export default Like;