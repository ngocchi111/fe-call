import {useRef, useContext, useEffect}from 'react'
import {Button, ButtonGroup, Card} from 'react-bootstrap';
import {FaPhoneSlash, FaMicrophone, FaMicrophoneSlash }  from 'react-icons/fa';
import {BsCameraVideoFill, BsCameraVideoOffFill, BsFillChatRightDotsFill} from 'react-icons/bs';
import {MdOutlineScreenShare, MdOutlineStopScreenShare} from 'react-icons/md'
import './Video.css';
import Context from './Context'

function VideoCall () {
    const {
      userVideo,
      setVideo,
      isCall,
      iCall,
      acceptCall,
      video,
      myVideo
    } = useContext(Context);

    const myVideo1 = useRef();

    useEffect(async()=>{
      console.log(isCall);
      myVideo.current = {};
      await navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        console.log(currentStream);
          myVideo.current.srcObject = currentStream;
          myVideo1.current.srcObject = currentStream;
      })
      if (isCall)
        iCall()
        else
        acceptCall();
    }, [])

    return (
      <>
          <div className="grid">
          <div
          style={{ textAlign: "center" }}
          className="card"
        >
              <video
              playsInline = {true}
              muted = {true}
              ref={myVideo1}
              autoPlay= {true}
              className="video-active"
              style={{
                opacity: `${true ? "1" : "0"}`,
              }}
              />
            </div>
            <div className="card2">
              <video
              playsInline = {true}
              muted = {true}
              autoPlay= {true}
              ref={userVideo}
              className="video-active"
              style={{
                opacity: `${true ? "1" : "0"}`,
              }}
              />
            </div>
          </div>
        
      <div style={{textAlign: 'center', marginTop: '10px'}}>
        <ButtonGroup aria-label="Basic example" >
            <Button style={{width:'50px', height: '50px', margin: '10px', color: 'red', cursor:'pointer'}}><FaPhoneSlash /></Button>
            <Button variant="secondary" style={{width:'50px', height: '50px', margin: '10px', cursor:'pointer'}}><FaMicrophoneSlash/></Button>
            <Button variant="secondary" style={{width:'50px', height: '50px', margin: '10px', cursor:'pointer'}}><FaMicrophone/></Button>
            <Button variant="secondary" style={{width:'50px', height: '50px', margin: '10px', cursor:'pointer'}}><BsCameraVideoFill /></Button>
            <Button variant="secondary" style={{width:'50px', height: '50px', margin: '10px', cursor:'pointer'}}><BsCameraVideoOffFill/></Button>
            <Button variant="secondary" style={{width:'50px', height: '50px', margin: '10px', cursor:'pointer'}}><MdOutlineScreenShare/></Button>
            <Button variant="secondary" style={{width:'50px', height: '50px', margin: '10px', cursor:'pointer'}}><MdOutlineStopScreenShare /></Button>
            <Button variant="secondary" style={{width:'50px', height: '50px', margin: '10px', display: 'inline', cursor:'pointer'}}><BsFillChatRightDotsFill/>1</Button>
        </ButtonGroup>
      </div>
      </>
    )
    
}

export default VideoCall;