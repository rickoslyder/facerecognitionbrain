import './App.css';
import Navigation from './components/Navigation/Navigation';
// import Clarifai from 'clarifai';
import Logo from './components/Logo/Logo';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ParticlesBackground from './components/ParticleBackground/ParticleBackground';
import React, { Component } from "react"

const API_BASE_URL = process.env.API_BASE_URL

const initialState = {
  input: "",
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
  }
}
class App extends Component {
  constructor() {
    super()
    this.state = initialState
  }

  loadUser = (data) => {
      this.setState({ user: 
        {id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculateFaceLocation = (data) => {
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage')
    const width = Number(image.width)
    const height = Number(image.height)
    console.log(`image dimensions: ${width}x${height}`)

    return {
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - (face.right_col * width),
      bottomRow: height - (face.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }
  
  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState( {input: event.target.value} )
  }

  onButtonSubmit = () => {
    console.log('click')
    this.setState( {imageUrl: this.state.input} )

    fetch(`${API_BASE_URL}/facedetect`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          input: this.state.input,
      })
  })
    .then(response => response.json())
    .then(response => {
      if (response) {
        fetch(`${API_BASE_URL}/image`, {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              id: this.state.user.id,
          })
      })
      .then(response => response.json())
      .then(data => {
          console.log("/image response data -", data)
          if (data) {
            console.log('changing user entries state to', data)  
            this.setState({ user: {
                ...this.state.user,
                entries: data}})
              this.onRouteChange('home')
          }
      }).catch(console.log)
      }
      this.displayFaceBox(this.calculateFaceLocation(response))})
    .catch(error => console.log('error', error));
  }

  onRouteChange = (route) => {
    let currentState = this.state.route
    if (currentState === route) {
      return console.log((route === "signin" ? "You're already signed out" : `Your route is already ${route} - please choose a different destination`))
    } else {
      this.setState({route: route})
    }
    console.log(`Changing route from ${currentState} to ${route}`)
    if (route === "home") {
      this.setState({isSignedIn: true})
    }
    if (route === "signout") {
      this.setState(initialState)
    }
  }

  renderRoute = () => {
    const { route, imageUrl, box } = this.state;
    console.log("rendering", route)
    switch (route) {
      case "signin":
        return <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
      case "signout":
        return <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
      case "register":
        return <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
      case "home":
        return (<div>
          <Logo />
          <Rank name={this.state.user.name} entries={this.state.user.entries}/>
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </div>)
      default:
        return <h1>Unconfigured route - please sign out and sign back in again</h1>
    }
  }

  render() {
    const { isSignedIn } = this.state;  
    return (
      <div className="App">
        <ParticlesBackground />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        {this.renderRoute()}
      </div>
    );
  }
}

export default App;
