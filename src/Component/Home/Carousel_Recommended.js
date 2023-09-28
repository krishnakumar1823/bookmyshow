import { useSelector } from "react-redux"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Box, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router";


export const CarouselRecommended=()=>{
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

      //PAGE RENDER
      const pageRender=useNavigate()
      const MovetoDetailPage=(movieId)=>{
        pageRender(`/details?mid=${movieId}`)
      }
      
      console.log(state)
      return (
          <Container className="carousel-recommended">
            <Box my={4}>
                <Typography 
                    component="img" 
                    src="https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-1440,h-120:q-80/icc-cwc-banner-collection-202308220156.png"
                    sx={{width:"100%",borderRadius:"12px"}}
                    > 
                </Typography> 
            </Box>

            <Box sx={{width:"100%",display:"flex",flexWrap:"wrap",justifyContent:"space-between",padding:"5px 0px"}}>
                <Typography 
                        component="h1"
                        alignItems={"center"}
                        sx={{textAlign:"start",padding:"5px 0px 5px 10px",fontWeight:600,textTransform:"capitalize"}}
                        >
                    Recommended Movies
                </Typography> 
                <Typography
                        component="a"
                        alignItems={"center"}
                        sx={{ color:"red",cursor:"pointer"}}
                        >
                    see all
                </Typography> 
                
            </Box>
            <Slider {...settings}>
                {state.array_recommended.map((val,ind) =>{
                        return(
                            <Box key={ind}>
                                <Box style={{padding:"0px 10px",cursor:"pointer"}} onClick={()=>MovetoDetailPage(val.mid)}>
                                    <Typography 
                                        component="img" 
                                        src={val.mimg}
                                        sx={{width:"100%",borderRadius:"12px"}}
                                        > 
                                    </Typography> 
                                    <Box>
                                        <Typography 
                                            component="h3"  
                                            sx={{width:"100%",textAlign:"start",padding:"10px 0px 10px 10px",fontWeight:600,textTransform:"capitalize"}}
                                            > 
                                            {val.mname}
                                        </Typography> 
                                        <Typography 
                                            component="p"  
                                            sx={{width:"80%",overflow:"hidden",fontSize:"12px",textAlign:"start",paddingLeft:"10px",fontWeight:300,textTransform:"capitalize"}}
                                            > 
                                            {val.mtype}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        )
                    })
                }
            </Slider>

            <Box my={4}>
                <Typography 
                    component="img" 
                    src="https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-1440,h-120:q-80/stream-leadin-web-collection-202210241242.png"
                    sx={{width:"100%",borderRadius:"12px"}}
                    > 
                </Typography> 
            </Box>
        </Container> 
    )
   
}