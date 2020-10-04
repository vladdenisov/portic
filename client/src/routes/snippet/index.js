import { h } from "preact";
import { useLayoutEffect, useState } from "preact/hooks";
import { useParams } from "react-router-dom";
import { AES, enc } from "crypto-js";

const Snippet = () => {
  let { id } = useParams();
  const [content, setContent] = useState(null);
  useLayoutEffect(() => {
    const fetchData = async () => {
      const snippet = await fetch(`http://localhost:3000/api/get`, {
        method: "POST",
        body: JSON.stringify({
          id,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      console.log(snippet);
      if (snippet.encrypted) {
        let key = prompt("Enter Key to decrypt:");
        console.log(AES.encrypt(snippet.content, key).toString());
        setContent(AES.decrypt(snippet.content, key).toString(enc.Utf8));
      } else setContent(snippet.content);
    };
    fetchData();
  }, []);
  const generateContent = () => {
    if (content === null) return "Enter password";
    if (content === "")
      return "Nothing here, maybe you entered wrong password";
    return content
  }
  return (
    <div className="snippet-main">
      <textarea readonly className='snippet-editor'>{generateContent()}</textarea>
    </div>
  );
};

export default Snippet;
