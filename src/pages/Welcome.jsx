import { useSelector } from 'react-redux';
import { selectCurrentUser, selectCurrentToken } from '../redux/selectors';
import { Link } from 'react-router-dom';
import { useLogoutMutation } from '../redux/auth/authApiSlice';

const Welcome = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const [logout, { isLoading }] = useLogoutMutation();

  const welcome = user ? `Welcome ${user.Email}!` : 'Welcome!';
  const tokenAbbr = `${token.slice(0, 9)}...`;

  const handleLogOut = async () => {
    try {
      await logout().unwrap();
    } catch (err) {
      console.error('Failed to log out:', err);
    }
  };

  const content = (
    <section className="welcome">
      <h1>{welcome}</h1>
      <p>Token: {tokenAbbr}</p>
      <p>
        <Link to="/assetList">Go to the Assets List</Link>
      </p>
      <button type="button" onClick={handleLogOut} disabled={isLoading}>
        LogOut
      </button>
    </section>
  );

  return content;
};
export default Welcome;
