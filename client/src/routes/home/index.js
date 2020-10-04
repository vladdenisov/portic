import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import {useLocation, useHistory } from 'react-router-dom'
const Home = () => {
  // useKeybingings()
  const {state} = useLocation()
  const [content] = useState(state ? state.content : '')
  const history = useHistory()
  useEffect(() => {
    document
      .querySelector('textarea')
      .addEventListener('keydown', function (e) {
        if (e.key === 'Tab') {
          e.preventDefault()
          // tab was pressed
          // get caret position/selection
          let start = this.selectionStart
          let end = this.selectionEnd

          let target = e.target
          let value = target.value

          // set textarea value to: text before caret + tab + text after caret
          target.value = `${value.substring(0, start)}\t${value.substring(end)}`

          // put caret at right position again (add one for the tab)
          this.selectionStart = this.selectionEnd = start + 1

          // prevent the focus lose
          e.preventDefault()
        }
      })
      history.replace()
  }, [history])
  return (
    <div class="snippet-main">
      <textarea
        className="snippet binEditor"
        spellCheck="false"
        data-gramm="false"
        defaultValue={content}
      />
    </div>
  )
}

export default Home
