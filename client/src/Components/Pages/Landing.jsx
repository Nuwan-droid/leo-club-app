import NavBar from "../Elements/NavBar"
import Footer from "../Elements/Footer"

import ImageSlider from "../Elements/ImageSlider"
import Content from "../Elements/Content"
import Stat from "../Elements/Stat"
import EventCardSlider from "../Elements/EventCardSlider"
import StatsSection from "../Elements/StatSection"




function Landing(){
    return(<>
     
      <ImageSlider/>
      <StatsSection/>
      <Stat/>
      <Content/>
      <EventCardSlider/>
     

      
    </>)
}

export default Landing