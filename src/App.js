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
import Modal from './components/Modal/Modal';
import Profile from './components/Profile/Profile';
import makeApiCall from './utils/makeApiCall';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

const initialState = {
  input: "",
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  isProfileOpen: false,
  user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: '',
      age: 0,
      pet: ''
  }
}
class App extends Component {
  constructor() {
    super()
    this.state = initialState
  }

  componentDidMount() {
    const token = window.sessionStorage.getItem('token')
    console.log('token', token)
    if (token) {
      console.log('fetching profile embedded in token')
      makeApiCall('post','signin',token)
      .then(resp => resp.json())
      .then(data => {
        console.log('auto token response data', data);
        if (data && data.id) {
          makeApiCall('get', `profile/${data.id}`, token)
          .then(resp => resp.json())
          .then(user => { 
            console.log(user)
            if (user && user.email) {
              this.loadUser(user),
              this.onRouteChange('home')
            }
          })
        }
      })
      .catch(err => console.log(err))
    }
  }

  loadUser = (signInData) => {
    if (signInData.token) {
      makeApiCall('get',`profile/${signInData.userId}`, signInData.token)
      .then(res => res.json())
      .then(data => {
      this.setState({ user: 
        {
          id: data.id,
          name: data.name,
          email: data.email,
          entries: data.entries,
          joined: data.joined,
          age: data.age,
          pet: data.pet
        }
      })
    })
    return
  }
    const token = window.sessionStorage.getItem('token')
    if (token) {
      makeApiCall('get',`profile/${signInData.id}`, token)
      .then(res => res.json())
      .then(data => {
      this.setState({ user: 
        {
          id: data.id,
          name: data.name,
          email: data.email,
          entries: data.entries,
          joined: data.joined,
          age: data.age,
          pet: data.pet
        }
      })
    })
  }
}

  calculateFaceLocations = (data) => {
    if (data && data.outputs) {
      const detectedFaces = data.outputs[0].data.regions
      let faceCoordinates = [];
      faceCoordinates = detectedFaces.map(detectedFace => {
        return detectedFace.region_info.bounding_box
      })
      
      const image = document.getElementById('inputimage')
      const width = Number(image.width)
      const height = Number(image.height)
      console.log(`image dimensions: ${width}x${height}`)

      let faceBoxes = faceCoordinates.map(face => {
        return {
          leftCol: face.left_col * width,
          topRow: face.top_row * height,
          rightCol: width - (face.right_col * width),
          bottomRow: height - (face.bottom_row * height)
        }
      })

      return faceBoxes
    }
    return
  } 

  displayFaceBoxes = (boxes) => {
    if (boxes) {
      this.setState({boxes: boxes})
    }
  }
  
  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState( {input: event.target.value} )
  }

  onButtonSubmit = () => {
    console.log('click')
    this.setState( {imageUrl: this.state.input} )

  makeApiCall('post',`facedetect`, 
  window.sessionStorage.getItem('token'), 
  {input: this.state.input})
    .then(response => response.json())
    .then(response => {
      if (response) {
      makeApiCall('put',
      'image',
      window.sessionStorage.getItem('token'),
      {id: this.state.user.id})
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
      this.displayFaceBoxes(this.calculateFaceLocations(response))})
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
      window.sessionStorage.removeItem('token')
    }
  }

  toggleModal = () => {
    this.setState(prevState => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen
    })
    )
  }

  renderRoute = () => {
    const ifUserIsLoaded = (input) => {
      return this.state.user !== initialState.user && input
    }
    const { route, imageUrl, boxes } = this.state;
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
            <>
            { ifUserIsLoaded(<Rank name={this.state.user.name} entries={this.state.user.entries} />) }
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} activeUser={ this.state.user !== initialState.user ? this.state.user : null } />
            { ifUserIsLoaded(<FaceRecognition boxes={boxes} imageUrl={imageUrl} />) }
          </>
          
        </div>)
      default:
        return <h1>Unconfigured route - please sign out and sign back in again</h1>
    }
  }

  render() {
    const { isSignedIn, isProfileOpen, user} = this.state;  
    return (
      <div className="App">
        <ParticlesBackground />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} toggleModal={this.toggleModal}/>
        {isProfileOpen && 
          <Modal>
            <Profile 
              isProfileOpen={isProfileOpen}
              onRouteChange={this.onRouteChange} 
              toggleModal={this.toggleModal}
              loadUser={this.loadUser} 
              activeUser={user} />
          </Modal>}
        {this.renderRoute()}
      </div>
    );
  }
}

export default App;
