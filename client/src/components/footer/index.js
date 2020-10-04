import { h } from 'preact';
import { Link, useLocation, useHistory } from 'react-router-dom';
import {useEffect, useState} from 'preact/hooks'
import style from './style.css';
import useKeybindings from '../../hooks/keybindings'
import { AES } from "crypto-js"

function randomString(len, charSet) {
	charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!+{}()[];,.<>/';
	let randomString = '';
	for (let i = 0; i < len; i++) {
		let randomPoz = Math.floor(Math.random() * charSet.length);
		randomString += charSet.substring(randomPoz,randomPoz+1);
	}
	return randomString;
  }
const Footer = () => {
	useKeybindings()
  const [encrypt, setEncrypt] = useState(false)
  let loc = useLocation()
  const history = useHistory()
	const handleSave = () => {
		const saveSnippet = async () => {
			console.log('saving')
			let content = document.querySelector("textarea").value
			const encrypted = document.getElementById("encrypt").checked
			let key = encrypted ? document.getElementById("key").value : ""
			if (!content) return
			if (encrypted) {
			  content = AES.encrypt(content, key).toString()
			  alert(key)
			}
			const snippet = await fetch(`http://localhost:3000/api/create`, {
			  method: "POST",
			  body: JSON.stringify({
				content,
				encrypted,
			  }),
			  headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			  },
			}).then((res) => res.json())
			  history.push(`/${snippet.id}`)
		  }
		  saveSnippet()
  }
  const handleFork = () => {
   history.push('/', {content: document.querySelector("textarea").value })
  }
	useEffect(() => {
    setEncrypt(false)
		if (loc.pathname === '/') document.getElementById('encrypt').addEventListener('change', (e) => {
			setEncrypt(e.target.checked)
		})
	}, [loc.pathname])
	return (
	<footer className='footer' class={style.footer}> 
		<div className="contols">
			<div className="keybindings">
				<Link to='/'><span className='btn new-btn'>New snippet: Ctrl + Alt + A</span></Link>
				<span> &gt; </span>
				{loc.pathname === '/' ? <span className='btn save-btn' id='save-btn' onClick={() => handleSave()}>Save: Ctrl + S</span> : ""}
				{loc.pathname !== '/' ? <span className='btn fork-btn' id='fork-btn' onClick={() => handleFork()}>Fork: Ctrl + Alt + F</span> : ""}
			</div>
			{loc.pathname === '/' ? (<div><input id='encrypt' type='checkbox' className='encrypt-checkbox' /> <label for='encrypt'>Encrypt</label> </div>) : ''}
			{loc.pathname === '/' && encrypt ? <input type='text' id='key' defaultValue={randomString(20)} /> : ''}
		</div>
	</footer>
)};
export default Footer;
