import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
//import {Card, Modal, Button} from "react-bootstrap"
//import {NavLink} from 'react-router-dom'
import Context from "./Context";
import {useParams, useNavigate } from "react-router-dom";
import Peer from "simple-peer";

//import VideoContext from "./videoContext";

const URL = "https://apinc.herokuapp.com/";
export const socket = io(URL);

function State({children}){
    

    const [onlineList, setOnlineList] = useState([]);
    const [receiveCall, setReceiveCall] = useState(false);
    const [idCall, setIdCall] = useState();

   // const history = useNavigate ();
    //const [stream, setStream] = useState();
    const [signalCall, setSignalCall] = useState({});
    const [video, setVideo] = useState({});
    const [isCall, setIsCall] = useState(false);

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();
    const screenTrackRef = useRef();

    //let id;

    useEffect(()=>{myVideo.current={};},[])

    useEffect(()=>{
        socket.on('online', (list)=>{
            for (let t of list)
            if (t.id === socket.id)
            list.splice(list.indexOf(t), 1);
            setOnlineList(list);
        })
        socket.emit('online');
        socket.on('callToUser', ({from}) =>{
          setReceiveCall(true);
          setIdCall(from);
        })
        socket.on("endCall", () => {
            //history.push('/');
            window.location.href('/');
          });

          socket.on("iCallUser", ({ signal }) => {
            setSignalCall(signal);
          });
    })

/*    const callSuccess= () =>{
        const peer = new Peer({ initiator: true, trickle: false, stream });
        peer.on("signal", (data) => {
        socket.emit("iCallUser", {
            userToCall: idCall,
            signalData: data,
            from: socket.id,
            name: socket.id,
        });
        console.log(data);
        });

        peer.on("stream", (currentStream) => {
            userVideo.current.srcObject = currentStream;
            console.log('stream');
        });

        socket.on("iCallUser", ({ signal }) => {
        peer.signal(signal);
        console.log(signal);
        
        //setCall({ isReceivingCall: true, from: idCall, name: socket.id, signal });
        });

        connectionRef.current = peer;
        console.log(connectionRef.current);
    }

 */   

      const leaveCall = () => {
    
        connectionRef.current.destroy();
        socket.emit("endCall", { id: idCall });
        //history.push('/');
      };


    const callUser = async (id) =>{
      /*console.log(1);
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
            setStream(currentStream);
            console.log(currentStream)
            myVideo.current.srcObject = currentStream;
            console.log(myVideo)
        });
      console.log(myVideo)*/
      setIdCall(id);
      setIsCall(true);
      socket.emit('callToUser', ({from: socket.id, to: id}));
      console.log(1);
    };

    const iCall = () =>{
      const stream = myVideo.current.srcObject;
      const peer = new Peer({ initiator: true, trickle: false, stream });
        peer.on("signal", (data) => {
        socket.emit("iCallUser", {
            userToCall: idCall,
            signalData: data,
            from: socket.id,
            name: socket.id,
        });
        console.log(data);
        });

        peer.on("stream", (currentStream) => {
            userVideo.current.srcObject = currentStream;
            console.log('stream');
        });

        socket.on("iCallUser", ({ signal }) => {
        peer.signal(signal);
        console.log(signal);
        
        //setCall({ isReceivingCall: true, from: idCall, name: socket.id, signal });
        });

    connectionRef.current = peer;
    console.log(connectionRef.current);
      
    }
    const decline = () =>{
      socket.emit('decline', ({to: idCall}));
    }

    const acceptCall = (id) =>{
      /*
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
            setStream(currentStream);
            myVideo.current.srcObject = currentStream;
        });*/
        const stream = myVideo.current.srcObject;
        const peer = new Peer({ initiator: false, trickle: false, stream });
        peer.on("signal", (data) => {
        socket.emit("iCallUser", {
            userToCall: idCall,
            signalData: data,
            from: socket.id,
            name: socket.id,
        });
        console.log(data);
        });

        peer.on("stream", (currentStream) => {
            userVideo.current.srcObject = currentStream;
            console.log('stream1');
        });

        peer.signal(signalCall);
        console.log(signalCall)

        connectionRef.current = peer;
        console.log(connectionRef.current);
    }

      return (
        <Context.Provider value={{
          onlineList,
          receiveCall,
          idCall,
          acceptCall,
          setReceiveCall,
          //callSuccess,
          decline,  
          callUser,
          myVideo,
          userVideo,
          leaveCall,
          setVideo,
          iCall,
          isCall,
          video,
        }}>
          {children}
        </Context.Provider>
      );
}

export default State;
