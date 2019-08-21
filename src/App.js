import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
class App extends Component {
  state = {
    gists: null
  }

  componentDidMount() {
    fetch("https://api.github.com/gists")
      .then(res => res.json())
      .then(gists => {
        this.setState({ gists })
      })
  }
  render() {
    const { gists } = this.state
    return (
      <Router>
        <Root>
          <Sidebar>
            {gists ? (
              gists.map(gist => (
                <SidebarItem key={gist.id}>
                  <Link to={`/g/${gist.id}`}>
                    {gist.description || 'NO DESCRIPTION}'}
                  </Link >
                </SidebarItem>
              ))
            ) : (
                <div>Loading...</div>
              )}
          </Sidebar>
          <Main>
            <Route exact={true} path="/" render={() => (
              <h1>Welcome</h1>
            )} />
            <Route path="/g/:gistId" component={Gist} />
          </Main>
        </Root>
      </Router>
    )
  }

}

const Gist = ({ match }) => (

  <div>
    {match.params.gistId}
  </div>
)






const Root = (props) => (
  <div style={{
    display: 'flex'
  }} {...props} />
)

const Sidebar = (props) => (
  <div style={{
    width: '33vw',
    height: '100vh',
    overflow: 'auto',
    background: "#eee"


  }} {...props} />
)

const SidebarItem = (props) => (
  <div style={{
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflox: 'hidden',
    padding: '5px 10px'

  }} {...props} />
)

const Main = (props) => (
  <div style={{
    flex: 1,
    height: '100vh',
    overflow: 'auto'

  }}>
    <div style={{ padding: '20px' }}{...props} />
  </div>
)



export default App;




