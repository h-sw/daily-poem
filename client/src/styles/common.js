import styled from "styled-components";
import { IconButton } from '@material-ui/core';
export const Wrapper = styled.div`
  max-width : 1280px;
  margin    : 0px auto;
  padding   : 20px;
`

export const Spacer = styled.div`
  flex-grow: 1;
`

export const FlexWrapper = styled.div`
  display: flex;
`

export const RootWrapper = styled(Wrapper)`
  padding-top: 60px;
`

export const NoPaddingButton = styled(IconButton)`
   padding:0;
`