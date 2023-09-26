import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import ParticlesBg from 'particles-bg'


function App() {
  // constructor() {
  //   super();
   
  //   this.state = {
  //     input: '',
  //   }
  // }

  const onInputChange = (event)=> {
    console.log(event.target.value);
  }

  const onSubmit = () => {
    console.log('click');
  }

    const setupAPI = (imageUrl) =>{
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

  return requestOptions, MODEL_ID;
    }
    
    

    

    
   

    

    // fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
    //     .then(response => response.JSON())
    //     .then(result => console.log(result))
    //     .catch(error => console.log('error', error));
  

  return (
    <div className="App">
      <>
        <div>...</div>
        <ParticlesBg type="cobweb" num={300} color='#FFFFFF' bg={true} />
      </>
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onSubmit}/>
      
      {/* <FaceRecognition /> */}
    </div>
  );
}

export default App;
