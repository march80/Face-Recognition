import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
// import Clarifai from 'clarifai';

// const app = new Clarifai.App({
//   apiKey: '8dfe43d3e2f1434988ff2857177161d6'
// })

const setupClarifai = (imageUrl) =>{
  const PAT = '8dfe43d3e2f1434988ff2857177161d6';
  const USER_ID = 'dd2lcgswen42';       
  const APP_ID = 'Face-Recognition';
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = 'face-detection';
  const IMAGE_URL = imageUrl;

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
 return requestOptions;

}



class App extends Component {
  constructor() {
    super();
   
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signIn',
      isSignedIn: false
    }
  }
calculateFaceLocation = (data) =>{
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);
  console.log(width, height);
  return{
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height)
  }
}

displayFaceBox = (box) =>{
  this.setState({box: box});
}

  onInputChange = (event)=> {
    this.setState({input: event.target.value});
    console.log(event.target.value);
  }

  onButtonSubmit = (MODEL_ID) => {
   this.setState({imageUrl: this.state.input})
   
   //app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
   fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", setupClarifai(this.state.input))
   
    .then(response => response.json())     
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    
    .catch(err => console.log(err));
   
    }
  

  

    
  onRouteChange = (route) =>{
    if(route === 'signout'){
      this.setState({isSignedIn: false})
    }else if(route === 'home'){
      this.setState({isSignedIn: true})
    } 
    this.setState({route: route})
    
  }


  
  render(){
    const {imageUrl, box, isSignedIn, route} = this.state;
  return (
    <div className="App">
      <>
        <div>...</div>
        <ParticlesBg type="cobweb" num={300} color='#FFFFFF' bg={true} />
      </>
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {route === 'home' 
        ? <div>
          <Logo />
          <Rank />
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
          
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </div>
        : (
        route === 'signIn'
        ? <SignIn onRouteChange={this.onRouteChange}/>
        : <Register onRouteChange={this.onRouteChange}/>
        )
  }
    </div>
  );
}
}

export default App;
