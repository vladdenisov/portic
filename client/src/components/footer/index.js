import { h } from 'preact'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'preact/hooks'
import style from './style.css'
import useKeybindings from '../../hooks/keybindings'
import { AES } from 'crypto-js'

function randomString(len, charSet) {
  charSet =
    charSet ||
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!+{}()[];,.<>/'
  let randomString = ''
  for (let i = 0; i < len; i++) {
    let randomPoz = Math.floor(Math.random() * charSet.length)
    randomString += charSet.substring(randomPoz, randomPoz + 1)
  }
  return randomString
}
const Footer = () => {
  useKeybindings()
  const [encrypt, setEncrypt] = useState(false)
  let loc = useLocation()
  const history = useHistory()
  const handleSave = () => {
    const saveSnippet = async () => {
      let content = document.querySelector('textarea').value
      const encrypted = document.getElementById('encrypt').checked
      let key = encrypted ? document.getElementById('key').value : ''
      if (!content) return
      if (encrypted) {
        content = AES.encrypt(content, key).toString()
      }
      const snippet = await fetch(
        '/api/create',
        {
          method: 'POST',
          body: JSON.stringify({
            content,
            encrypted,
          }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      ).then((res) => res.json())
      history.push(`/${snippet.id}`)
    }
    saveSnippet()
  }
  const handleFork = () => {
	const lines = Array.from(document
	.getElementsByClassName('line-text'))
	.reduce((acc, val) => {
	  return acc += `${val.innerText  }\n`
	}, '')
    history.push('/', {
      content: 
        lines
    })
  }
  useEffect(() => {
    setEncrypt(false)
    if (loc.pathname === '/')
      document.getElementById('encrypt').addEventListener('change', (e) => {
        setEncrypt(e.target.checked)
      })
  }, [loc.pathname])
  return (
    <footer className="footer" class={style.footer}>
      <div className="controls">
        <div className="keybindings">
          <Link to="/">
            <span className="btn new-btn">
              New snippet
              <span className="keybinding-text">: Ctrl + Alt + A</span>
            </span>
          </Link>
          <span> &gt; </span>
          {loc.pathname === '/' ? (
            <span
              className="btn save-btn"
              id="save-btn"
              onClick={() => handleSave()}
            >
              Save<span className="keybinding-text">: Ctrl + S</span>
            </span>
          ) : (
            ''
          )}
          {loc.pathname !== '/' ? (
            <span
              className="btn fork-btn"
              id="fork-btn"
              onClick={() => handleFork()}
            >
              Fork<span className="keybinding-text">: Ctrl + Alt + F</span>
            </span>
          ) : (
            ''
          )}
        </div>
        {loc.pathname === '/' ? (
          <div className="encrypt-div">
            <input id="encrypt" type="checkbox" className="encrypt-checkbox" />{' '}
            <label className="encrypt-label" for="encrypt">
              Encrypt
            </label>
            {loc.pathname === '/' && encrypt ? (
              <input type="text" id="key" defaultValue={randomString(20)} />
            ) : (
              ''
            )}{' '}
          </div>
        ) : (
          ''
        )}
      </div>
    </footer>
  )
}
export default Footer
