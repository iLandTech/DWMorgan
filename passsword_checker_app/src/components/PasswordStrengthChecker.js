import { useEffect, useState } from 'react';
import { passwordChecker } from '../helpers/password_helpers';

const PasswordStrengthChecker = () => {

  const [password, setPassword] = useState('');
  const [score, setScore] = useState(null);
  const [, setGuessTime] = useState(0);
  const [guessTimeString, setGuessTimeString] = useState('');
  const [strength, setStrength] = useState('');
  const [warning, setWarning] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    let payload = {
      password: password,
    }
    if (password === '') {
      setScore(null);
      setStrength('');
      setGuessTimeString('');
      setSuggestions('');
    }
    if (password !== '') {
      passwordChecker(payload)
        .then((response) => {
          console.log(response?.guessTimeString)
          setScore(response?.score)
          setGuessTime(response?.guessTime)
          setGuessTimeString(response?.guessTimeString)
          if (response?.score < 2) {
            setStrength(`${score === 0 ? 'too weak' : 'weak'}`);
            setWarning(response?.warning);
            setSuggestions(response?.suggestions);
          }
          else if (response?.score === 2) {
            setStrength('fair');
            setWarning('');
            setSuggestions(response?.suggestions);
          }
          else if (response?.score > 2) {
            setStrength(`${score === 3 ? 'strong' : 'very strong'}`);
            setWarning('');
            setSuggestions('');
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }


    }, [password, score])
    


  return (
    <>
      <div className="container">
        <form>

          <header>Is your password <br/>strong enough?</header>
          
          <div className="form-group w-100">
            <input type={`${show ? 'text' : 'password'}`} className="form-control w-100" placeholder="Type a password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
            <span className="showBtn" onClick={() => { setShow(!show) }}>{ show ? `HIDE` : `SHOW`}</span>
          </div>
          
          <div className="indicator d-flex align-items-center justify-content-between">
            <span className={`very-weak score-${score}`}></span>
            <span className={`weak score-${ score>0 ? score : ''}`}></span>
            <span className={`medium score-${ score>1 ? score : ''}`}></span>
            <span className={`strong score-${ score>2 ? score : ''}`}></span>
            <span className={`very-strong score-${ score > 3 ? score : ''}`}></span>
          </div>


        </form>
    </div>
    <div className='text-group'>
          {/* { strength && */}
            <div className="strength">Your password is {strength}!</div>
          {/* { guessTimeString && */}
            <div className="guess-time">It takes {guessTimeString} to guess your password. {warning} </div>
          {/* { suggestions && */}
            <div className="suggestion">{suggestions}</div>
          
    </div>
    </>
  )
}

export default PasswordStrengthChecker