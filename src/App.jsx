import "./App.css";
import {useState, useEffect, useCallback, useRef} from "react";


function App() {
  const [length, setLength] = useState(8);
  const [isNum, setIsNum] = useState(false);
  const [isChar, setIsChar] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const PasswordGenerator = useCallback(()=>{
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(isNum) str += "1234567890";
    if(isChar) str += "~`!@#$%^&*()_+-=[]{};:',.<>/?";
    let pass = "";

    for(let i = 0; i<=length; i++){
      let r = Math.floor(Math.random() * str.length);
      pass += str.charAt(r);
    }

    setPassword(pass);

  }, [length, isNum, isChar]);

  useEffect(PasswordGenerator, [length, isNum, isChar]);

  const copyPassword = useCallback(()=>{
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 5);
    window.navigator.clipboard.writeText(password);
  }, [password]);



  return (
    <div className="page">
      <div className="box">
        <h1>Password Generator</h1>
        <input type="text" className="input" value={password} ref={passwordRef} readOnly/>
        <button className="input" onClick={copyPassword}>
          Copy
        </button>
        <div>
        <input type="range" name="" id="range" max="20" min="8" value={length} onChange={(e)=>{setLength(e.target.value)}} />
        <label htmlFor="range">Length ({length})</label>
        <input type="checkbox" name="" id="num" value={isNum} onClick={()=>{setIsNum(!isNum)}}/>
        <label htmlFor="num">Numbers</label>
        <input type="checkbox" name="" id="char" value={isChar} onClick={()=>{setIsChar(!isChar)}} />
        <label htmlFor="char" >Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App
