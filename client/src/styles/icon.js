import styled from "styled-components";
import Typography from '@material-ui/core/Typography';
import {
  FlexWrapper,
} from './common'

export const Icon = styled.i`
  font-size       : 14px;
  height          : 14px;
  color           : #333333;
  margin-right    : 5px;
`
export const IconText = styled(Typography)`
  font-size       : 14px;
  color           : #333333;
`
export const IconWrapper = styled(FlexWrapper)`
  margin-right    : 10px;
  cursor          : pointer;
`

