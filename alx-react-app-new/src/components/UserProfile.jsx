import React from 'react';

export default function UserProfile(props) {
  const { name, age, bio } = props;
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>{bio}</p>
    </div>
  );
}