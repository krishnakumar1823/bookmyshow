import { AppBar, Box, Container, Divider, Toolbar, Typography } from "@mui/material"
import { Nav } from "../Home/Nav"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Footer } from "../Home/Footer"
import { useNavigate, useSearchParams } from "react-router-dom"
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./Theater.scss"
import { PiSunHorizonLight,PiSunLight,PiMoonStarsLight,PiInfoLight } from "react-icons/pi";
import { AiOutlineHeart } from "react-icons/ai";
import { CiMobile3,CiBurger } from "react-icons/ci";
import { updateduplicateTheaterSeat } from "../Redux/Redux"
import { BsSearch } from "react-icons/bs";



export const Theater=()=>{
    const state=useSelector(
        ({data})=>data
    )   
    const[theaters,setTheaters]=useState([])
    const[movName,setmovName]=useState([])
    const[movType,setMtype]=useState([])
    const[param]=useSearchParams()
    const[dateArr,setDateArr]=useState([])
    const[dayArr,setDayArr]=useState([])
    const[yearArr,setYearArr]=useState([])
    const[todatDate,settodayDate]=useState(0)
    // const[gotbyParam,setGotByParam]=useState("")
    const[location,setLocation]=useState(true)
    const[theaterAvailability,setTheaterAvailability]=useState(true)
    const dispatch=useDispatch()

    //setting location true or false
    useEffect(()=>{
        if(state.defaultLocation==="Chennai"){
            setLocation(true)
        }
        else{
            setLocation(false)
        }
    },[state.defaultLocation]) 

    //setting theater availability true or false
    useEffect(()=>{
        if(theaters.length>0){
            setTheaterAvailability(true)
        }
        else{
            setTheaterAvailability(false)
        }
    },[theaters.length])   

    //setting time llive 
    useEffect(()=>{
        let x=[...state.theater]

        var gettingMovieFromParam=param.get('movId')
        // setGotByParam(gettingMovieFromParam)

        let y=[...state.array_recommended]
        let z=y.find((val)=>{
            return val.mid===gettingMovieFromParam ? val :""
        })
        setmovName(z)

        var viewCurrentdate=new Date()
        var currentHour=viewCurrentdate.getHours()
        var currentMins=viewCurrentdate.getMinutes()

        
        var a=currentHour.toString()
        var b=currentMins.toString()
        var c=a+b
        
        for(var timeChecking=c.length;timeChecking<4;timeChecking++){
            if(a.length===1){
                var splitA=a.split("")
                splitA.splice(0,0,"0")
                a=splitA.join("")
            }
            else{ 
                var splitB=b.split("")
                splitB.splice(0,0,"0")
                b=splitB.join("")
            }
        }
        //Resetting c again 
        c=a+b

        //see current time in console
        console.log(c)
        
        var theaterTimingUpdation=[]
        var renderCurrentTime=[]
        for(var i=0;i<x.length;i++){
            for(var j=0;j<x[i].movId.length;j++){
                if(x[i].movId[j].mid===gettingMovieFromParam){
                    var theaterMovieSeat=x[i].movId[j]
                    
                    for(var k=0;k<x[i].theaterTiming.length;k++){
                        if(c < x[i].theaterTiming[k]){ 
                            renderCurrentTime[renderCurrentTime.length]=x[i].theaterTimingString[k]
                        }
                    }
                    if(renderCurrentTime.length>0){
                        theaterTimingUpdation[theaterTimingUpdation.length]={
                            theaterName:x[i].theaterName,
                            theaterLocation:x[i].theaterLocation,
                            theaterTiming:x[i].theaterTiming,
                            theaterTimingString:renderCurrentTime,
                            movId:theaterMovieSeat
                        }
                    }
                }
            }
            renderCurrentTime=[]
        }

        setTheaters(theaterTimingUpdation) 
        
        let splitMtpye=z.mtype.split(",")
        setMtype(splitMtpye)
    },[param,state.array_recommended,state.theater]) 

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      }));
      
      const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));
      
      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
              width: '20ch',
            },
          },
        },
      }));

    //DATE TIME CAROUSEL
    useEffect(()=>{
        var dayArray=["SUN","MON","TUE","WED","THU","FRI","SAT"]
        let gettingDate=new Date()
        let day=gettingDate.getDay()
        var date=gettingDate.getDate()
        let year=gettingDate.getFullYear()
        
        //DAY
        var setCurrentday=[]
        var balanceday=[]
        for(var i=0;i<dayArray.length;i++){
            if(i>=day){
                setCurrentday[setCurrentday.length]=dayArray[i]
            }
            else{
                balanceday[balanceday.length]=dayArray[i]
            }
        }
        let resDay=setCurrentday.concat(balanceday)

        //DATE
        var dateArray=[]
        var count=0
        for(var j=0;j<7;j++){ 
            let duplicateDate=date+j
            if(duplicateDate<=31){
                dateArray[dateArray.length]=date+j
            }
            else{
                count++
            }
        }
        for(var k=1;k<=count;k++){
            dateArray[dateArray.length]=k
        }

        //Year
        var yearArray=[]
        for(var y=0;y<7;y++){ 
            yearArray[yearArray.length]=year
            
        }

        setDayArr(resDay)
        setDateArr(dateArray)
        setYearArr(yearArray) 
        settodayDate(date)
    },[])

    //SLIDDER
    var settings = {
        dots: false, 
        speed: 500,
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
                infinite: false,
                slidesToShow: 4,
                slidesToScroll: 1,
            }
          },
          {
            breakpoint: 600,
            settings: {
                infinite: false,
                slidesToShow: 4,
                slidesToScroll: 1,
            }
          }
        ]
      };
  
      function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block",backgroundColor:"gray",padding:"4px 3px",borderRadius:"50%"}}
            onClick={onClick}
          />
        );
      }
      
      function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block",backgroundColor:"gray",padding:"4px 3px",borderRadius:"50%"}}
            onClick={onClick}
          />
        );
    }

    //FILTER ONE
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (val) => {
        console.log(val)
        setAnchorEl(null);
    };

    //FILTER TWO
    const [show, setShow] = useState(null);
    const openn = Boolean(show);
    const handleShow = (event) => {
        setShow(event.currentTarget);
    };
    const handleShowClose = (val) => {
        console.log(val)
        setShow(null);
    };

    //SEE AVAILABILITY OF THEATERS ARRAY IN CONSOLE
    // console.log(theaters)

    useEffect(()=>{
        dispatch(updateduplicateTheaterSeat(theaters)) 
    })

    //PAGE RENDER
    const pageRender=useNavigate()
    // const movetoTicket=(getMovieObject)=>{
    //     pageRender(`/ticket?theaterName=${sendTheaterName}&movieId=${sendMovieId}`)
    // }

    const setMovieTiming=(getMovieObject,time)=>{
        let sendTheaterName=getMovieObject.theaterName
        let sendMovieId=getMovieObject.movId.mid 
        pageRender(`/ticket?theaterName=${sendTheaterName}&movieId=${sendMovieId}&movieTiming=${time}`)
    }
    return(
        <>
            <Nav/>
                
                <Box sx={{backgroundColor:"#333545"}}>
                    <Container>
                        <Box px={3} py={3}>
                            <Typography
                                component="p"
                                variant="h5"
                                sx={{color:"white"}}>
                                {movName.mname}
                            </Typography>

                            <Box sx={{display:"flex",flexWrap:"wrap",paddingTop:"10px"}}>
                                <Box sx={{width:{xs:"100%",sm:"10%",md:"10%",lg:"5%"}}}>
                                    <Typography
                                        component="p"
                                        variant="p"
                                        sx={{fontSize:"15px",color:"white",border:"1px solid white",width:{xs:"10%",sm:"50%",md:"30%",lg:"40%"},textAlign:"center",borderRadius:"50%"}}>
                                        A
                                    </Typography>
                                </Box>
                                <Box sx={{display:"flex",flexWrap:"wrap"}}>
                                    {movType.map((val,i)=>{ 
                                        return(
                                            <Typography
                                                component="p" 
                                                key={i}
                                                sx={{margin:{xs:"10px 10px 10px 0px",md:"0px 5px"},color:"gray",border:"1px solid gray",display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"center",fontSize:"10px",fontWeight:800,padding:"0px 15px",borderRadius:"20px",textTransform:"uppercase"}}>
                                                {val}
                                            </Typography>
                                        )
                                    })} 
                                </Box>
                            </Box>
                        </Box>
                    </Container>
                </Box>

                <Box className="active-scrol">
                    <Container>
                        <Box sx={{display:"flex",flexWrap:"wrap",alignItems:"center"}}>
                            <AppBar position="static" sx={{boxShadow:"0px 0px 0px",backgroundColor:"white",padding:{xs:"10px 0px",md:"5px"}}}>
                                <Box sx={{display:"flex",flexWrap:"wrap",justifyContent:"space-between"}}>
                                    <Box sx={{width:{xs:"80%",sm:"50%",md:"30%"},padding:"0px 30px"}}>
                                        <Slider {...settings}>
                                            {dayArr.map((val,ind)=>{
                                                return(
                                                    <Box className="dateCarousel" key={ind} sx={{textAlign:"center",color:todatDate===dateArr[ind] ? "white":"black",backgroundColor:todatDate===dateArr[ind] ? "rgb(236, 94, 113)":"",borderRadius:"6px",cursor:"pointer"}}>
                                                        <Typography 
                                                            component="p"
                                                            sx={{fontSize:"13px",fontWeight:600}}>
                                                            {dayArr[ind]}
                                                        </Typography>

                                                        <Typography 
                                                            component="p"
                                                            sx={{fontSize:"11px"}}>
                                                            {dateArr[ind]}
                                                        </Typography>


                                                        <Typography 
                                                            component="p"
                                                            sx={{fontSize:"11px"}}>
                                                            {yearArr[ind]}
                                                        </Typography>
                                                    </Box>
                                                )
                                            })}
                                        </Slider>
                                    </Box> 
                                    <Box sx={{flexWrap:"wrap",alignItems:"center",display: { xs: 'none', md: 'flex' } }}>
                                        <Box>
                                            <Typography
                                                component="p"
                                                sx={{color:"gray",fontSize:"13px",padding:"0px 10px",cursor:"pointer"}}>
                                            Tamil
                                            </Typography>
                                        </Box>
                                        
                                        <Box>
                                            <Button
                                                id="basic-button"
                                                aria-controls={open ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClick}
                                                sx={{color:"gray",fontSize:"13px",padding:"0px 10px",cursor:"pointer",textTransform:"capitalize"}}
                                            >
                                                Filter Price Range
                                            </Button>
                                            <Menu
                                                id="basic-menu"
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                                }}
                                            >
                                                <MenuItem onClick={()=>handleClose(1)} sx={{fontSize:"15px",color:"gray"}}>Rs: 0-200</MenuItem>
                                                <MenuItem onClick={()=>handleClose(2)} sx={{fontSize:"15px",color:"gray"}}>Rs: 200-400</MenuItem>
                                                <MenuItem onClick={()=>handleClose(3)} sx={{fontSize:"15px",color:"gray"}}>Rs: 400-600</MenuItem>
                                            </Menu> 
                                        </Box>
                                        
                                        <Box>
                                            <Button
                                                id="basic-button"
                                                aria-controls={openn ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={openn ? 'true' : undefined}
                                                onClick={handleShow}
                                                sx={{color:"gray",fontSize:"13px",padding:"0px 10px",cursor:"pointer",textTransform:"capitalize"}}
                                            >
                                                Filter Show Timing
                                            </Button>
                                            <Menu
                                                id="basic-menu"
                                                anchorEl={show}
                                                open={openn}
                                                onClose={handleShowClose}
                                                MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                                }}
                                            >
                                                <MenuItem onClick={()=>handleShowClose(1)} sx={{fontSize:"15px"}}>Morning <span style={{fontSize:"10px",color:"gray",padding:"0px 9px"}}>12:00-11:59AM</span> <PiSunHorizonLight/></MenuItem>
                                                <MenuItem onClick={()=>handleShowClose(2)} sx={{fontSize:"15px"}}>Afternoon <span style={{fontSize:"10px",color:"gray",padding:"0px 9px"}}>12:00-03:59PM</span> <PiSunLight/></MenuItem>
                                                <MenuItem onClick={()=>handleShowClose(3)} sx={{fontSize:"15px"}}>Evening <span style={{fontSize:"10px",color:"gray",padding:"0px 9px"}}>04:00-06:59AM</span> <PiSunHorizonLight/></MenuItem>
                                                <MenuItem onClick={()=>handleShowClose(4)} sx={{fontSize:"15px"}}>Night <span style={{fontSize:"10px",color:"gray",padding:"0px 9px"}}>07:00-11:59AM</span> <PiMoonStarsLight/></MenuItem>
                                            </Menu> 
                                        </Box>                                         
                                        
                                        <Toolbar>
                                            <Search sx={{color:"gray",border:"1px solid #808080cc"}}>
                                                <SearchIconWrapper>
                                                <SearchIcon sx={{color:"#8080803b"}}/>
                                                </SearchIconWrapper>
                                                <StyledInputBase
                                                placeholder="Search…"
                                                inputProps={{ 'aria-label': 'search' }}
                                                />
                                            </Search>
                                        </Toolbar> 
                                    </Box>
                                </Box> 
                            </AppBar>
                        </Box>
                    </Container>
                </Box>
                

                 {/* MAIN ARRAY */}
                 <Box sx={{backgroundColor:"#f2f2f2"}} py={2}>
                    <Container>
                        {
                            theaterAvailability ?
                        
                        <Box sx={{backgroundColor:"#fff",display:"flex",flexWrap:"wrap"}}>
                            <Box sx={{width:"100%"}}>
                                {
                                location ?
                                    theaters.map((val,ind)=>{
                                        return(
                                            <>
                                                <Box sx={{display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"start"}} key={ind} p={3}>
                                                    <Box sx={{width:{xs:"10%",sm:"10%",md:"5%"}}}>
                                                        <Typography 
                                                            component="i"
                                                            sx={{}}>
                                                            <AiOutlineHeart/>
                                                        </Typography>  
                                                    </Box>

                                                    <Box sx={{width:{xs:"90%",sm:"50%",md:"35%"},display:"flex",flexWrap:"wrap"}}>
                                                        <Typography 
                                                            component="p"
                                                            className="movieName"
                                                            // onClick={()=>movetoTicket(val)}
                                                            sx={{width:"100%",fontSize:"14px",cursor:"pointer"}}>
                                                            {val.theaterName}
                                                        </Typography>  

                                                        <Typography 
                                                            component="p"
                                                            py={1}
                                                            sx={{width:{xs:"50%",sm:"30%"},fontSize:"13px",color:"green"}}>
                                                                <CiMobile3/> Mobile
                                                        </Typography>  

                                                        <Typography 
                                                            component="p"
                                                            py={1}
                                                            sx={{width:{xs:"50%",sm:"50%"},fontSize:"13px",color:"orange"}}>
                                                                <CiBurger/> Food & Beverage
                                                        </Typography> 
                                                    </Box>

                                                    <Box sx={{width:{xs:"25%",md:"7%"},padding:{xs:"15px 0px"}}}>
                                                        <Typography 
                                                            component="h1"
                                                            sx={{display:"flex",flexWrap:"wrap",alignItems:"center"}}>
                                                            <PiInfoLight/> <span style={{color:"gray",fontSize:"12px",padding:"0px 5px"}}>INFO</span>
                                                        </Typography>  
                                                    </Box>

                                                    <Box sx={{width:{xs:"100%",md:"40%"},padding:{xs:"15px 0px"},display:"flex",flexWrap:"wrap"}} columnGap={"10px"}>
                                                        {val.theaterTimingString.map((v,i)=>{
                                                            return(
                                                                <Box sx={{width:{xs:"20%",lg:"15%"},cursor:"pointer"}} key={i}>
                                                                    <Typography 
                                                                        component="h1"
                                                                        onClick={()=>setMovieTiming(val,v)}
                                                                        sx={{padding:"10px 0px",justifyContent:"center",display:"flex",flexWrap:"wrap",alignItems:"center",fontSize:"12px",color:"green",border:"1px solid green",borderRadius:"12px"}}>
                                                                        {v}
                                                                    </Typography>  
                                                                </Box>
                                                            )
                                                        })}        
                                                    </Box>
                                                </Box>
                                            <Divider/>
                                        </>
                                        )
                                    })  
                                                        //IF location is false this box will appear
                                    :
                                        <Box sx={{width:"100%",height:"60vh",display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"center"}}>
                                            <Box sx={{width:"50%",border:"1px solid gray",borderRadius:"12px",padding:"20px",color:"rgb(236, 94, 113)",textAlign:"center"}}>
                                                <BsSearch style={{fontSize:"50px"}}/>
                                                <Typography
                                                    component="p"
                                                    sx={{fontSize:"15px",fontWeight:900}}>
                                                        SORRY NO THEATERS IN YOUR LOCATION
                                                </Typography>
                                            </Box>
                                        </Box>
                                }
                            </Box>
                        </Box>

                        :

                                                        // IF movie not available this box will appear

                            <Box sx={{backgroundColor:"white",width:"100%",height:"60vh",display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"center"}}>
                                <Box sx={{width:"50%",border:"1px solid gray",borderRadius:"12px",padding:"20px",color:"rgb(236, 94, 113)",textAlign:"center"}}>
                                    <BsSearch style={{fontSize:"50px"}}/>
                                    <Typography
                                        component="p"
                                        sx={{fontSize:"15px",fontWeight:900}}>
                                            SORRY NO MOVIES AVAILABLE IN THIS TIME
                                    </Typography>
                                </Box>
                            </Box>
                    }
                    </Container>
                </Box>
                
            <Footer/>
        </>
    )
}