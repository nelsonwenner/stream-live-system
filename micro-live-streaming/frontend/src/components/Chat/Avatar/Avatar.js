import React from 'react';
import md5 from 'md5';
import './avatar.css';

const Avatar = ({email}) => {
  return (
    <img className="circle" src={`https://www.gravatar.com/avatar/${md5(email)}`} />
  )
}

export default Avatar;