import { Typography, IconButton } from '@material-ui/core';
import React from 'react';
import Slider from "react-slick";
import Row from './Row';
import styled from 'styled-components'

const TextHint = styled(Typography)`
  text-align    : center;
  color         : #888888;
  font-size     : 14px;
`

const PrevArrowWrapper = styled(IconButton)`
  display: block;
  position: absolute;
  top: 12.5%;
  right: -135px;
  border-radius: 100%;
  transform : translate(-50%, 0);
  &:hover {
    background-color: #f3f7f3;
    cursor: pointer;
  }
`

const NextArrowWrapper = styled(IconButton)`
  display: block;
  position: absolute;
  top: 12.5%;
  left: -50px;
  border-radius: 100%;
  transform : translate(-50%, 0);
  &:hover {
    background-color: #f3f7f3;
    cursor: pointer;
  }
`

const ArrowIcon = styled.i`
  font-size: 20px;
  height: 20px;
  margin: 20px;
`


function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <PrevArrowWrapper onClick={onClick}>
      <ArrowIcon className="fi-rr-angle-right" />
    </PrevArrowWrapper>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <NextArrowWrapper onClick={onClick}>
      <ArrowIcon className="fi-rr-angle-left" />
    </NextArrowWrapper>
  );
}

const PoemListContainer = ({ displayData }) => {
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
        }
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
        }
      }
    ]
  };

  return (
    <div>
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