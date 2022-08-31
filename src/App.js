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

const USER_ID = 'localblackguy';
// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = '2c8697350ea7401b889eea81bf05c715';
const APP_ID = 'my-first-application';
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'face-detection';
// const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    

class App extends Component {
  constructor() {
    super()
    this.state = {
      input: "",
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage')
    const width = Number(image.width)
    const height = Number(image.height)
    console.log(width, height)

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
    let IMAGE_URL = this.state.input;

    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
  });
  
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
    .then(response => response.json())
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
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
      this.setState({isSignedIn: false})
    }
  }

  renderRoute = () => {
    const { route, imageUrl, box } = this.state;  
    console.log("rendering")
    switch (route) {
      case "signin":
        return <SignIn onRouteChange={this.onRouteChange}/>
      case "signout":
        return <SignIn onRouteChange={this.onRouteChange}/>
      case "register":
        return <Register onRouteChange={this.onRouteChange}/>
      case "home":
        return (<div>
          <Logo />
          <Rank />
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
