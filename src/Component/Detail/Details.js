import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useNavigate, useSearchParams } from "react-router-dom"
import { Footer } from "../Home/Footer"
import { Nav } from "../Home/Nav"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Box, Container, Divider, Typography } from "@mui/material"  
import { BsFillPlayFill,BsStarFill } from "react-icons/bs";
import "./Details.scss" 

export const Details=()=>{

    const[param]=useSearchParams()
    const[movId,setMovId]=useState("")
    const[obj,setObj]=useState({})
    const[movieCast,setmovieCast]=useState([])
    const[movieCastName,setmovieCastName]=useState([])
    const[movieCastRole,setmovieCastRole]=useState([])
    // const[castLength,setCastLength]=useState(0)
    const[movieCrew,setmovieCrew]=useState([])
    const[movieCrewName,setmovieCrewName]=useState([])
    const[movieCrewRole,setmovieCrewRole]=useState([])


    const state=useSelector(
        ({data})=>data
    )

    //INITIAL PHASE
    useEffect(()=>{
        //MOVIE OBJECT SEARCHING
        var gettingIdUsingParam=param.get("mid")
        let globalArray=[...state.array_recommended]
        let x=globalArray.find((val)=>{
            return val.mid === gettingIdUsingParam ? val :""
        })
        setObj(x)   
        setMovId(gettingIdUsingParam)

        //MOVIE CAST
        let cast=[...state.array_cast]
        let y=cast.find((val)=>{
            return val.mcastid===gettingIdUsingParam ? val: ""
        })
        setmovieCast(y.cast)
        setmovieCastName(y.castName)
        setmovieCastRole(y.castrole)
        // setCastLength(y.cast.length)

        //MOVIE CREW
        setmovieCrew(y.crewImg)
        setmovieCrewName(y.crewName)
        setmovieCrewRole(y.crewrole)
    },[param,state.array_cast,state.array_recommended]) 
    

    //SCROLL FUNCTION
    const [offset, setOffset] = useState(0);
    useEffect(() => {
        const onScroll = () => setOffset(window.pageYOffset);
        // clean up code
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    },[]);
    const myfun=()=>{
        var scrollblock=document.getElementById("stickyScroll")
        if (offset>585){
            scrollblock.setAttribute("class","active-scrol")
        }
        else{
            scrollblock.setAttribute("class","sticky-dnone")
        }
    }
    useEffect(()=>{
        myfun()
    })

    //PAGE RENDER
    const pageRender=useNavigate()
    const MovetoTheater=()=>{
        pageRender(`/theater?movId=${movId}`)
    }

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
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

    return(
    <>
        <Nav/>

        <Box sx={{background:
                `linear-gradient(90deg, rgb(26, 26, 26) 24.97%, rgb(26, 26, 26) 38.3%, rgba(26, 26, 26, 0.04) 80%, rgb(26, 26, 26) 100%),
                url(${obj.mbackimg})`,
                backgroundRepeat:"no-repeat",
                backgroundPosition:"right center",
                backgroundSize:"cover"
            }}
            
            >
            <Container>
                <Box sx={{display:"flex",flexWrap:"wrap",alignItems:"center"}} py={4}>
                    <Box sx={{width:{xs:"100%",sm:"100%",md:"35%",lg:"28%"},order:{xs:2,md:0},color:"white",padding:{xs:"30px 0px",md:"0px"},display:"flex",justifyContent:{xs:"center"}}}>
                        <Box px={4} sx={{position:"relative",width:{xs:"70%",sm:"40%",md:"100%"}}}>
                            <Typography
                                component="img"
                                src={obj.mimg}
                                sx={{width:"100%",height:"400px",borderRadius:"12px"}}>
                            </Typography>
                            
                            <Typography
                                component="p"
                                sx={{backgroundColor:"#0000009c",position:"absolute",top:"45%",left:"42%",padding:"5px 10px",borderRadius:"12px",fontSize:"12px",cursor:"pointer",display:"flex",flexWrap:"wrap",alignItems:"center"}}>
                                Trailer <BsFillPlayFill/>
                            </Typography>
                        </Box>
                        
                    </Box>
                    <Box sx={{width:{xs:"100%",sm:"100%",md:"62%",lg:"72%"},order:{xs:1,md:0},color:"white",display:"flex",flexWrap:"wrap"}}>
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{textTransform:"capitalize",fontWeight:400,padding:"10px 0px",width:"100%"}}>
                        {obj.mname}
                        </Typography>

                        <Typography
                            component="h1"
                            variant="h5"
                            sx={{textTransform:"capitalize",padding:"10px 0px",fontSize:"18px",cursor:"pointer",width:"100%"}}>
                            <BsStarFill style={{color:"rgb(236, 94, 113)"}}/> {obj.mrating}/10 <span style={{paddingLeft:"5px"}}>{obj.mvotes} Votes</span>
                        </Typography>

                        <Box sx={{display:"flex",flexWrap:"wrap",alignItems:"center",width:{xs:"90%",sm:"60%",md:"75%",lg:"60%"},backgroundColor:"rgb(51, 51, 51)",padding:"10px 15px",borderRadius:"6px"}}>
                            <Box sx={{width:"60%"}}>
                                <Typography
                                    component="p"
                                    sx={{textTransform:"capitalize",padding:"5px 0px",fontSize:"14px"}}>
                                    Add your rating & review
                                </Typography>
                                <Typography
                                    component="p" 
                                    sx={{textTransform:"capitalize",padding:"5px 0px",color:"gray",fontSize:"14px"}}>
                                    Your ratings matter
                                </Typography>
                            </Box>
                            <Box sx={{width:"40%",textAlign:"center"}}>
                                <Typography
                                    component="a"
                                    sx={{backgroundColor:"white",borderRadius:"12px",color:"black",padding:"10px 15px",fontSize:"14px",cursor:"pointer"}}>
                                    Rate Now
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{display:"flex",flexWrap:"wrap",alignItems:"center",width:{xs:"100%",sm:"60%",md:"80%",lg:"60%"},padding:"10px 0px"}} columnGap="15px">
                            <Typography
                                component="p" 
                                sx={{textTransform:"capitalize",padding:"5px 5px",width:"40%",backgroundColor:"whitesmoke",color:"black",borderRadius:"6px",fontSize:"14px",cursor:"pointer"}}>
                                {obj.mdimension}
                            </Typography>

                            <Typography
                                component="p" 
                                sx={{textTransform:"capitalize",padding:"5px 5px",width:"40%",backgroundColor:"whitesmoke",color:"black",borderRadius:"6px",fontSize:"14px",cursor:"pointer"}}>
                                {obj.mlanguage}
                            </Typography>
                        </Box>

                        <Box sx={{display:"flex",flexWrap:"wrap",alignItems:"center",width:{xs:"100%",sm:"100%",md:"80%"},padding:"10px 0px"}} columnGap="15px">
                            <Typography
                                component="p" 
                                sx={{textTransform:"capitalize",padding:"5px 0px",color:"white",fontSize:"14px",cursor:"pointer"}}>
                                {obj.mtime} <span style={{padding:"0px 10px",fontSize:"20px"}}>.</span>
                            </Typography>

                            <Typography
                                component="p" 
                                sx={{textTransform:"capitalize",padding:"5px 0px",color:"white",fontSize:"14px",cursor:"pointer"}}>
                                {obj.mtype} <span style={{padding:"0px 10px",fontSize:"20px"}}>.</span>
                            </Typography>

                            <Typography
                                component="p" 
                                sx={{textTransform:"capitalize",padding:"5px 0px",color:"white",fontSize:"14px",cursor:"pointer"}}>
                                A <span style={{padding:"0px 10px",fontSize:"20px"}}>.</span>
                            </Typography>

                            <Typography
                                component="p" 
                                sx={{textTransform:"capitalize",padding:"5px 0px",color:"white",fontSize:"14px",cursor:"pointer"}}>
                                {obj.mreleasedate}
                            </Typography>
                        </Box>

                        <Box sx={{width:"100%"}}>
                            <Typography
                                component="a"
                                onClick={()=>MovetoTheater()}
                                sx={{backgroundColor:"rgb(236, 94, 113)",padding:"10px 15px",borderRadius:"6px",cursor:"pointer"}}>
                            Book Ticket
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box> 

        <Box className="sticky-dnone" id="stickyScroll" sx={{display:{xs:"none",md:"block"}}}>
            <Box>
            <Container>
                <Box sx={{display:{xs:"none",md:"flex"},flexWrap:"wrap",justifyContent:"space-between",alignItems:"center"}}>
                    <Box width="25%">
                        <Typography
                            component="h1"
                            sx={{textTransform:"capitalize",fontSize:"20px",padding:"10px 0px 0px 0px"}}>
                        {obj.mname}
                        </Typography>

                        <Typography
                            component="h1"
                            sx={{textTransform:"capitalize",padding:"10px 0px",fontSize:"14px",cursor:"pointer"}}>
                            <BsStarFill style={{color:"rgb(236, 94, 113)"}}/> {obj.mrating}/10 <span style={{paddingLeft:"5px"}}>{obj.mvotes} Votes</span>
                        </Typography>
                    </Box>

                    <Box width="25%" sx={{textAlign:"end"}}>
                        <Typography
                            component="a"
                            onClick={()=>MovetoTheater()}
                            sx={{backgroundColor:"rgb(236, 94, 113)",padding:"10px 15px",borderRadius:"6px",cursor:"pointer"}}>
                        Book Ticket
                        </Typography>
                    </Box>
                </Box>
            </Container>
            </Box>
        </Box>

        <Box my={4}>
            <Container>
                <Typography
                    component="h2"
                    variant="p"
                    sx={{}}>
                About the movie 
                </Typography>

                <Typography
                    component="p"
                    sx={{padding:"15px 0px",fontSize:"15px",color:"gray"}}>
                {obj.aboutmovie} 
                </Typography>
            </Container>
        </Box>

        <Box>
            <Container>
                <Divider/>
                <Box sx={{width:{xs:"100%",sm:"80%",md:"70%",lg:"70%"}}}>
                    <Typography 
                            component="h1"
                            variant="h5"
                            sx={{borderRadius: "6px",fontWeight:600,color:"black"}}
                            pt={2}
                        > 
                        Cast
                        </Typography> 
                    <Box mx={3}>
                        <Slider {...settings}>
                            {
                                movieCast.map((val,ind) => {
                                    return(
                                    <Box key={ind}> 
                                        <Box sx={{cursor:"pointer",textAlign:"center"}} my={3}>
                                        <Typography 
                                            component="img"
                                            src={movieCast[ind].cast}
                                            sx={{width: "130px",height:"130px",borderRadius:"50%",margin:"0px auto"}}
                                        >
                                        </Typography>     

                                        <Typography 
                                            component="p"
                                            sx={{borderRadius: "6px",color:"black"}}
                                            pt={2}
                                        >
                                        {movieCastName[ind].castName}
                                        </Typography>       

                                        <Typography 
                                            component="p"
                                            sx={{borderRadius: "6px",color:"gray",fontSize:"12px"}}
                                        >
                                        {movieCastRole[ind].castrole}
                                        </Typography>    
                                        </Box>                       
                                    </Box>
                                    )
                                })
                            }
                        </Slider>
                    </Box>
                </Box>

                <Divider/>
                <Box sx={{width:{xs:"100%",sm:"80%",md:"70%",lg:"70%"}}}>
                    <Typography 
                            component="h1"
                            variant="h5"
                            sx={{borderRadius: "6px",fontWeight:600,color:"black"}}
                            pt={2}
                        > 
                        Crew
                    </Typography> 
                    <Box mx={3}>
                        <Slider {...settings} width="0px">
                            {
                                movieCrew.map((val,ind) => {
                                    return(
                                    <Box key={ind}> 
                                        <Box sx={{cursor:"pointer",textAlign:"center"}} my={3}>
                                        <Typography 
                                            component="img"
                                            src={movieCrew[ind].crewImg}
                                            sx={{width: "130px",height:"130px",borderRadius:"50%",margin:"0px auto"}}
                                        >
                                        </Typography>     

                                        <Typography 
                                            component="p"
                                            sx={{borderRadius: "6px",color:"black"}}
                                            pt={2}
                                        >
                                        {movieCrewName[ind].crewName}
                                        </Typography>       

                                        <Typography 
                                            component="p"
                                            sx={{borderRadius: "6px",color:"gray",fontSize:"12px"}}
                                        >
                                        {movieCrewRole[ind].crewrole}
                                        </Typography>    
                                        </Box>                       
                                    </Box>
                                    )
                                })
                            }
                        </Slider>
                    </Box>
                </Box>
            </Container>
        </Box>

        <Footer/>
    </>)
}