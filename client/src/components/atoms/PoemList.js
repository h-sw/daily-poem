import { Typography } from '@material-ui/core';
import React from 'react';
import Slider from "react-slick";
import styled from 'styled-components'
import Row from './Row';
import Button from '@material-ui/core/Button';

const TextHint = styled(Typography)`
  text-align    : center;
  color         : #888888;
  font-size     : 14px;
`
const KeywordButton = styled(Button)`
  padding       : 5px;
  border-radius : 15px;
`
const PoemListContainer = ({ displayData }) => {
  var settings = {
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div>
      <KeywordButton onClick={() => window.location.href="/ranking/키워드"} >3행시 더보기</KeywordButton>
      <div>
        <TextHint>양 옆으로 슬라이드 해 보세요.</TextHint>
      </div>
      <Slider {...settings}>
        {displayData.map((row, idx) => (
          <Row key={idx} row={row} />
        ))}
      </Slider>
    </div>
  )
}

export default PoemListContainer;