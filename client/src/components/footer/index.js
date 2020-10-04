import { h } from 'preact';
import { Link, useLocation } from 'react-router-dom';
import {useEffect, useState} from 'preact/hooks'
import style from './style.css';
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
	const [encrypt, setEncrypt] = useState(false)
	let loc = useLocation()
	console.log(loc)
	useEffect(() => {
		document.getElementById('encrypt').addEventListener('change', (e) => {
			setEncrypt(e.target.checked)
		})
		
	}, [])
	return (
	<footer className='footer' class={style.footer}> 
		<div className="contols">
			<div className="keybindings">
				<Link to='/'><span className='btn'>New snippet: Ctrl + Alt + A</span></Link>
				<span> &gt; </span>
				{loc.pathname === '/' ? <span className='btn save-btn'>Save: Ctrl + S</span> : <span className='btn fork-btn'>Fork: Ctrl + Alt + F</span>}
				
			</div>
			
			{loc.pathname === '/' ? (<div><input id='encrypt' type='checkbox' className='encrypt-checkbox' /> <label for='encrypt'>Encrypt</label> </div>) : ''}
			{loc.pathname === '/' && encrypt ? <input type='text' id='key' defaultValue={randomString(20)} /> : ''}
		</div>
	</footer>
)};
export default Footer;
