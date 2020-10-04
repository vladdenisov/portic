import { h } from 'preact'
import Footer from './footer'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import style from '../style/index.css'
import Home from '../routes/home'
import Snippet from '../routes/snippet'

const App = () => {
  return (
    <div id="app" className={style.app}>
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            component={Home}
            key={Math.random().toString(36).substring(7)}
          />
          <Route path="/:id" exact component={Snippet} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
