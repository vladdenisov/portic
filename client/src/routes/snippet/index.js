import { h, Fragment } from 'preact'
import { useLayoutEffect, useState } from 'preact/hooks'
import { useParams } from 'react-router-dom'
import { AES, enc } from 'crypto-js'
import Prism from 'prismjs'
const Snippet = () => {
  // useKeybingings()
  let { id } = useParams()
  const [content, setContent] = useState(null)
  useLayoutEffect(() => {
    const fetchData = async () => {
      const snippet = await fetch('http://localhost:3000/api/get', {
        method: 'POST',
        body: JSON.stringify({
          id,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json())
      if (snippet.encrypted) {
        setContent('Enter key to decrypt!')
        let key = prompt('Enter Key to decrypt:')
        setContent(AES.decrypt(snippet.content, key).toString(enc.Utf8))
      } else setContent(snippet.content)
    }
    fetchData()
  }, [id])
  const generateContent = () => {
    if (content === '') return 'Nothing here, maybe you entered wrong password'
    if (content) {
      let lines = content.split('\n')
      console.log(lines)
      let html = []
      lines.map((e, i) => {
      html.push(<tr><td className="line-number">{i}.</td><td className='line-text'>{e}</td></tr>)
      })
      return html
    }
    
  }
  return (
    <div className="snippet-main">
      <code className="snippet"><table><tbody>{generateContent()}</tbody></table></code>
    </div>
  )
}

export default Snippet
