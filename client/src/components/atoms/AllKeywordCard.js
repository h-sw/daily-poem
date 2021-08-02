import React from 'react';
import {
  CardActionArea,
  Typography
} from '@material-ui/core'
import styled from 'styled-components';

const Card = styled(CardActionArea)`
  position     	 	: relative;
  border-radius 	: 10px;
  height        	: ${props => props.height / 1.8}px;
  overflow      	: hidden;
  box-shadow    	: 10px 10px 30px #d9d9d9, -10px -10px 30px #ffffff;
`

const CardImg = styled.div`
  width           : 100%;
  display         : block;
  background-color:#8EB695;
`

const CardContentWrapper = styled.div`
  position        : absolute;
  padding         : 20px;
  background      : rgba(0,0,0, 0.15);
  width           : 100%;
  height					: 100%;
  top            	: 0;
  left           	: 0;
`

const CardTitle = styled(Typography)`
  font-weight    	: 600;
  font-size      	: 28px;
  color          	: #000;
`

const AllKeywordCard = ({ data }) => {
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
      <CardImg />
      <CardContentWrapper>
        <CardTitle>
          {data.word}
        </CardTitle>
      </CardContentWrapper>
    </Card>
  )
}

export default AllKeywordCard;