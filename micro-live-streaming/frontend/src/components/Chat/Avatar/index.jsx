import React from 'react';
import md5 from 'md5';
import './styles.css';

const Avatar = ({email, classes}) => {
  return (
    <img 
      className={`circle ${classes}`} 
      src={`https://www.gravatar.com/avatar/${md5(email)}`} 
      alt="avatar"
    />
  )
}

export default Avatar;