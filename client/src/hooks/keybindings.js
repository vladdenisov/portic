import {useEffect} from 'preact/hooks' 

const handleKeybindings = (e) => {
  const binEditor = document.getElementsByClassName("binEditor")[0]
  console.log(e.key)
  if (e.ctrlKey) {
    if (binEditor && e.key === "s") {
      // Ctrl + S -> Save
      e.preventDefault()
      return document.getElementsByClassName("save-btn")[0].click()
    } 
    if (e.altKey) {
      if (e.key === "n" || e.key === "a" || e.key === "Dead") {
        // Ctrl + Alt + {N|A} -> New
        e.preventDefault()
        return document.getElementsByClassName("new-btn")[0].click()
      }

      if (e.key === "f" || e.key === "ƒ") {
        // Ctrl + Alt + F -> Fork
        e.preventDefault()
        return document.getElementsByClassName('fork-btn')[0].click()
      }
    }
  }
}
const useKeybindings = () => {
    useEffect(() => {
        document.addEventListener('keydown' , (e) => handleKeybindings(e))
        return document.removeEventListener('keydown' , (e) => handleKeybindings(e))
    }, [])
}
export default useKeybindings