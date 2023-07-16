// sections
import { ResultTeacher, ResultStudent } from '../sections/@dashboard/result';
// components
import useToken from '../components/useToken';

export default function ResultPage() {

  const { token } = useToken()

  if (token && token.account.role === 'teacher')
    return <ResultTeacher token={token}/>
  
  return <ResultStudent token={token}/>
}
