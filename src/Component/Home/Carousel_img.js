import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export const CarouselImg=()=>{
    const state=useSelector(
        ({data})=>data
    )

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '100px',
        autoplay: true,
        autoplaySpeed: 3500,
        pauseOnHover: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: true,
              centerMode: true,
              centerPadding: '50px'
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode: true,
              centerPadding: '50px'
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode: true,
              centerPadding: '0px'
            }
          }
        ]
      };
  
      function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style,
                     background: "rgba(0, 0, 0, 0.8)",
                    padding:"15px 15px 15px 15px",
                    borderTopLeftRadius:"12px",
                    borderBottomLeftRadius:"12px",
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center"
                  }}
            onClick={onClick}
          />
        );
      }
      
      function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style,
                     background: "rgba(0, 0, 0, 0.5)",
                     padding:"15px 15px 15px 10px",
                     borderTopRightRadius:"12px",
                     borderBottomRightRadius:"12px",
                     display:"flex",
                     alignItems:"center",
                     justifyContent:"center" 
                  }}
            onClick={onClick}
          />
        );
      }
  
  return (
    <Box sx={{backgroundColor:"rgb(229, 229, 229)",padding: "5px 0px 5px 0px",marginTop:"3px"}} className="car-Container">
      <Slider {...settings}>
          {
            state.CarouselOneImg.map((val,ind) => {
                return(
                <Box className="col res-carosel-one" key={ind}>
                    <Typography 
                        component="img"
                        src={val}
                        sx={{borderRadius: "6px",width: "100%"}}
                      >
                    </Typography>
                </Box>
                )
            })
          }
      </Slider>
    </Box>
  );
}