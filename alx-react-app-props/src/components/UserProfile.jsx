import { useContext } from 'react';
import UserContext from '../../UserContext'; // <-- update path

function UserDetails() {
  const userData = useContext(UserContext);
  return (
    <div>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
}

export default UserDetails;