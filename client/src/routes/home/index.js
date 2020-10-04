import { h } from "preact";
import {useEffect, useState} from 'preact/hooks'
import {AES} from 'crypto-js'
import {Redirect} from 'react-router-dom'



const Home = () => {
  const [redirect, setRedirect] = useState('')
  useEffect(() => {
    document.getElementsByClassName('save-btn')[0].addEventListener('click', () => {
      let content = document.querySelector('textarea').value
      const encrypted = document.getElementById('encrypt').checked 
      let key = encrypted ? document.getElementById('key').value : ''
      if (!content) return
      if (encrypted) {
        content = AES.encrypt(content, key).toString()
        console.log([content, key])
        alert(key)
      }
      const saveSnippet = async () => {
        const snippet = await fetch(`http://localhost:3000/api/create`, {
          method: "POST",
          body: JSON.stringify({
            content,
            encrypted
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());
        setRedirect(snippet.id)
        console.log(snippet.id)
      };
      saveSnippet();
    })
    document.querySelector("textarea").addEventListener('keydown',function(e) {
      if(e.key === 'Tab') { 
          e.preventDefault();
          // tab was pressed
          // get caret position/selection
          let start = this.selectionStart;
          let end = this.selectionEnd;
  
          let target = e.target;
          let value = target.value;
  
          // set textarea value to: text before caret + tab + text after caret
          target.value = `${value.substring(0, start)
                       }\t${
                       value.substring(end)}`;
  
          // put caret at right position again (add one for the tab)
          this.selectionStart = this.selectionEnd = start + 1;
  
          // prevent the focus lose
          e.preventDefault();
      }
  });
  }, [])
  if (redirect) return <Redirect to={`/${redirect}`} />
  return (
    <div class='snippet-main'>
      <textarea className="snippet-editor" spellCheck='false' data-gramm='false' />
    </div>
  );
};

export default Home;
