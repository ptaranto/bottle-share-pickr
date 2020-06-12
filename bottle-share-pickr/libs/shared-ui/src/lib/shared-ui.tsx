import React from 'react';

import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface SharedUiProps {}

const StyledSharedUi = styled.div`
  color: pink;
`;

export const SharedUi = (props: SharedUiProps) => {
  return (
    <StyledSharedUi>
      <h1>Welcome to shared-ui!</h1>
    </StyledSharedUi>
  );
};

export default SharedUi;
