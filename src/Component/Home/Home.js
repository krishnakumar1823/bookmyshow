import { Nav } from "./Nav"
import { CarouselImg } from "./Carousel_img"
import { CarouselRecommended } from "./Carousel_Recommended"
import { CarouselType } from "./Carousel-type"
import { Footer } from "./Footer" 

export const Home=()=>{
 
    return(
        <>
            <Nav/>
            <CarouselImg/>
            <CarouselRecommended/>
            <CarouselType/>
            <Footer/>
        </>
    )
}