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

  const clearValues= () => {
    setScore(null);
    setGuessTime(0);
    setGuessTimeString('');
    setStrength('');
    setWarning('');
    setSuggestions('')
  }

  useEffect(() => {
    let payload = {
      password: password,
    }
    if (password) {
      passwordChecker(payload)
        .then((response) => {
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
    else if (password === '') {
      clearValues();
    }


    }, [password, score])



  return (
    <>
    <div className="main-container d-flex justify-content-center align-items-center row">
      <div className="container justify-content-center align-items-center">
          <form onSubmit={(e) => { e.preventDefault(); }} className="">

          <header>Is your password <br/>strong enough?</header>

            <div className="form-group d-flex justify-content-center align-items-center">
              <input type={`${show ? 'text' : 'password'}`} className="form-control" placeholder="Type a password" value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                
              />
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

        <div className='text-group'>
        {strength && password &&
          <div className="strength">Your password is {strength}!</div>
        }
        {guessTimeString && password &&
          <div className="guess-time">It takes {guessTimeString} to guess your password. {warning} </div>
        }
        {suggestions && password &&
          <div className="suggestion">{suggestions}</div>
        }
        </div>

      </div>

      </div>
    </>
  )
}

export default PasswordStrengthChecker