import React from 'react';

import NavBar from '../../Navbar';
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