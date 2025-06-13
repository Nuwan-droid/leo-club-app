import NavBar from "../Elements/NavBar"
import Footer from "../Elements/Footer"
import Login from "../Elements/Login"
import ImageSlider from "../Elements/ImageSlider"
import Content from "../Elements/Content"
import Awards from "../Elements/Stat"
import EventCardSlider from "../Elements/EventCardSlider"
import StatsSection from "../Elements/StatSection"


function Landing(){
    return(<>
      <NavBar/>
      <ImageSlider/>
      <StatsSection/>
     
      <Awards/>
      <Content/>
      <EventCardSlider/>
      <Footer/>

      
    </>)
}

export default Landing