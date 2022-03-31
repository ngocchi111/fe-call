import State from "./State";
import Option from "./Option";
import VideoCall from './videoCall'
import {
    BrowserRouter,
    Routes as Switch,
    Route,
  } from "react-router-dom";


function Home(){

    return (
        <State>
            <BrowserRouter>
            <Switch>
                <Route path='/' element={<Option/>}></Route>
                <Route path='/call/:id' element={<VideoCall/>}></Route>
            </Switch>
        </BrowserRouter>
        </State>
        
        //<State/>
    )
}

export default Home;