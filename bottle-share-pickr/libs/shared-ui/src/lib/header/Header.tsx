import React from 'react';
import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface HeaderProps {}

const StyledHeader = styled.div``;

export const Header = (props: HeaderProps) => {
  return (
    <StyledHeader>
      <h1>Bottle-share Pickr App HEADER</h1>
    </StyledHeader>
  );
};

export default Header;
