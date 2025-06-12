import NavBar from "../Elements/NavBar"
import Footer from "../Elements/Footer"
import Login from "../Elements/Login"
import ImageSlider from "../Elements/ImageSlider"
import Content from "../Elements/Content"
import Awards from "../Elements/Awards"

import EventCardslider from "../Elements/EventCardSlider"
function Landing(){
    return(<>
      <NavBar/>
      <ImageSlider/>
      <Awards/>
      <EventCardslider/>
      <Content/>
      
     
      <Footer/>

      
    </>)
}

export default Landing