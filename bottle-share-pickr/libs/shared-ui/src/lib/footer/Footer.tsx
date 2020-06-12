import React from 'react';
import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface FooterProps {}

const StyledFooter = styled.div``;

export const Footer = (props: FooterProps) => {
  return (
    <StyledFooter>
      <h3>
        Developed by <a href="https://github.com/ptaranto">Pedro Taranto</a> |
        Powered by Untappd API
      </h3>
    </StyledFooter>
  );
};

export default Footer;
