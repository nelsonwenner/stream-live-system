import styled from 'styled-components';

export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: none;
  transition: all 0.4s;
  background: rgba(0, 0, 0, 0.7);
  
  ${({ sidebar }) =>
    sidebar &&
    `
		display: block;
		z-index: 5;	
	`}
`