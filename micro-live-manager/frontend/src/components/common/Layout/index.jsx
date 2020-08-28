import React from 'react';

import NavBar from '../../navbar';
import { Wrapper } from './styles';

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <Wrapper>
        { children }
      </Wrapper>
    </>
  )
}

export default Layout;