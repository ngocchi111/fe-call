import React, { useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import {Card, Modal, Button} from "react-bootstrap"
import {NavLink} from 'react-router-dom'

import Context from "./Context";

function State(){
    const {onlineList,
    receiveCall,
    idCall,
    setReceiveCall,
    decline,
    callUser,
    acceptCall,
    myVideo
    
    } = useContext(Context);
      return (
        <>
        {onlineList && onlineList.map((item, index)=>(<Card>
            <div>{item.id}</div>
            <NavLink to={`/call/${item.id}`} onClick={()=>callUser(item.id)}>Call</NavLink>
        </Card>
      ))}
      <div style={{textAlign:"center"}}>
      <Modal
            title="Chat"
            footer={null}
            show = {receiveCall}
            onHide = {receiveCall}
            style={{ maxHeight: "100px" }}
            >
              <label>{idCall} calling</label>
              <Button ><NavLink to={`/call/${idCall}`}>Accept</NavLink></Button>
              <Button onClick={()=> {setReceiveCall(false); decline();}}>Decline</Button>
            </Modal>
      </div>
        </>
      );
}

export default State;