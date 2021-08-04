import React from 'react';
import {
  CardActionArea,
  Typography
} from '@material-ui/core'
import styled from 'styled-components';
import {
  FlexWrapper,
} from '../../styles/common'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';

const Card = styled(CardActionArea)`
  position        : relative;
  border-radius   : 10px;
  height          : ${props => props.height / 1.8}px;
  overflow        : hidden;
  box-shadow      : 10px 10px 30px #d9d9d9, -10px -10px 30px #ffffff;
`

const CardContentWrapper = styled.div`
  position        : absolute;
  padding         : 20px;
  background      : rgba(0,0,0, 0.15);
  width           : 100%;
  height          : 100%;
  top             : 0;
  left            : 0;
`

const CardTitle = styled(Typography)`
  font-weight     : 600;
  font-size       : 28px;
  color           : #000;
`

const ThumbIcon = styled(ThumbUpAltIcon)`
  height          : 20px;
  width           : 20px;
  margin-right    : 5px;
  align-self      : center;
  color           : #FFFFFF;
`

const CardText = styled(Typography)`
  font-size       : 14px;
  align-self      : center;
  color           : #FFFFFF;
`

const CardSubContentWrapper = styled.div`
  position        : absolute;
  margin          : 20px;
  padding         : 5px 15px;
  border-radius   : 5px;
  background-color: #4caf50;
  bottom          : 0;
  right           : 0;
  z-index         : 2;
`

const HofKeywordCard = ({ data }) => {
  const [cardWidth, setCardWidth] = React.useState(0);
  const cardRef = React.useRef()

  React.useEffect(() => {
    if(cardRef.current){
      setCardWidth(cardRef.current.offsetWidth)
    }
  }, [cardRef])

  return (
    <Card 
      ref={cardRef} 
      height={cardWidth}
      onClick={() => window.location.href="/keyword/"+data.word}
    >
      {/*<CardImg src={data.img_url} alt=""/>*/}
      <CardContentWrapper>
        <CardTitle>
          {data.word}
        </CardTitle>
      </CardContentWrapper>
      <CardSubContentWrapper>
        <FlexWrapper>
          <ThumbIcon /> 
          <CardText>
            {data.likes} 
          </CardText>
        </FlexWrapper>
      </CardSubContentWrapper>
    </Card>
  )
}

export default HofKeywordCard;