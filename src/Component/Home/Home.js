import { Nav } from "./Nav"
import { CarouselImg } from "./Carousel_img"
import { Carousel_Recommended } from "./Carousel_Recommended"
import { Carousel_Type } from "./Carousel-type"
import { Footer } from "./Footer"
import { useSelector } from "react-redux" 

export const Home=()=>{
    const state=useSelector(
        ({data})=>data
    )
 
    return(
        <>
            <Nav/>
            <CarouselImg/>
            <Carousel_Recommended/>
            <Carousel_Type/>
            <Footer/>
        </>
    )
}