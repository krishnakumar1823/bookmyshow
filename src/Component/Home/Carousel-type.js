import { Box, Container, Typography } from "@mui/material";
import { useSelector } from "react-redux"
import Slider from "react-slick";
import "./Home.scss"

export const CarouselType=()=>{
    const state=useSelector(
        ({data})=>data
    ) 

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: false,
              dots: false,
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              dots: false
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              dots: false
            }
          }
        ]
      };
  
      function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, background: "rgb(187 187 187)",height:"50px",width:"50px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center" }}
            onClick={onClick}
          />
        );
      }
      
      function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, background: "rgb(187 187 187)",height:"50px",width:"50px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center" }}
            onClick={onClick}
          />
        );
      }
  
      return (
        <Container>
            <Box sx={{padding: "5px 0px 5px 0px",marginTop:"3px"}} className="carousel-type">

            <Typography
                component="h1"  
                sx={{width:"100%",textAlign:"start",padding:"5px 0px 5px 10px",fontWeight:600,textTransform:"capitalize"}}
                > 
                The Best Of Live Events
            </Typography>

            <Slider {...settings}>
                {
                    state.LiveEvent.map((val,ind) => {
                        return(
                            <Box key={ind}>
                                <Box style={{padding:"0px 10px",cursor:"pointer"}} >
                                    <img src={val} style={{borderRadius: "6px",width: "100%"}} alt="img"/>
                                </Box>
                            </Box>
                        )
                    })
                }
            </Slider>
            </Box>
        </Container>
      );
    }