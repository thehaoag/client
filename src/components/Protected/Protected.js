import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types';
import useToken from '../useToken';


Protected.propTypes = {
  title: PropTypes.string,
  children: PropTypes.object
};

export default function Protected({title, children}) {
  const { token } = useToken()
  switch(title){
    case 'login':
      if (token)
        return <Navigate to="/dashboard" replace />
      return children
    case 'result':
      if (!token)
        return <Navigate to="/login" replace />
      return children
    case 'attendance':
      if (!token)
        return <Navigate to="/login" replace />
      if (token && token.account.role === 'student')
        return <Navigate to="/dashboard" replace />
      return children
    default:
      return children
  }
}
