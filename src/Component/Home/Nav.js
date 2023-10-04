import SearchIcon from '@mui/icons-material/Search'; 
import MenuIcon from '@mui/icons-material/Menu';
import { styled} from '@mui/material/styles'; 
import { AppBar, Box, Button, Container, DialogContentText, DialogTitle, Divider, Drawer, IconButton, Input, List, Slide, Toolbar, Typography } from "@mui/material";
import React, {useState } from "react";
import Dialog from '@mui/material/Dialog'; 
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoBagOutline,IoChatbubblesOutline } from "react-icons/io5";
import { MdKeyboardArrowRight,MdOutlineOndemandVideo } from "react-icons/md";
import { BsTicket,BsGift,BsSearch } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { HiOutlineCreditCard } from "react-icons/hi";
import { AiOutlineSetting,AiFillApple,AiFillCaretDown } from "react-icons/ai";
import "./Home.scss"
import { useDispatch, useSelector } from 'react-redux';
import { updatedefaultLocation } from '../Redux/Redux';
import { useNavigate } from 'react-router';


export const Nav=()=>{
    const stateLoc=useSelector(
        ({data})=>data
    )

    const[SearchMoviesListt,setSearchMoviesListt]= useState("")
    const[searchStateTrue,setsearchStateTrue]=useState(false)
    const[nothingMatched,setNothingMatched]=useState(false)

     //searchbar
     const searchMovies=(e)=>{  
        var a=stateLoc.array_recommended 
        var b=e.target.value 
        if(b.length>0){
            setsearchStateTrue(true)
            var obj=[]
            var count=0
            for(var i=0;i<a.length;i++){
                count=0
                for(var j=0;j<b.length;j++){
                    if(a[i].mname[j]!==undefined){
                        var nme=a[i].mname[j].toLowerCase()
                        if(nme===b[j]){
                            ++count
                        }
                    }
                } 
                if(count===b.length){
                    obj[obj.length]=a[i] 
                    setSearchMoviesListt(obj)
                }         
            }
            if(obj.length>0){
                setNothingMatched(false)
            } 
            else{
                setNothingMatched(true)
            }
        }
        else{
            setsearchStateTrue(false)
            setSearchMoviesListt([])
        }
    }
    console.log(nothingMatched)

      const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
          padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
          padding: theme.spacing(1),
        },
      }));

        const [open, setOpen] = React.useState(false);

        const handleClickOpen = () => {
            setOpen(true);
        };
        const handleClose = () => {
            setOpen(false);
        };
      
      const [state, setState] = React.useState({
        right: false
      });
    
      const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };
    
      const list = (anchor) => (
        <Box
          sx={{ width:{xl:400,lg:400,md:400,sm:350,xs:330}}}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
          className="nav"
        >
            <List sx={{padding:"0px"}}>
            <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        alignItems={"center"}
                        sx={{ display: { xs: 'block', sm: 'block' },padding:"10px 0px 10px 30px",backgroundColor:"rgb(46, 49, 71)",color:"white"}}
                    >
                Hey!
            </Typography>
            </List>
          <Divider />
          <List className="rightBar" sx={{cursor:"pointer",padding:"0px"}}>
            <Box sx={{fontSize:"15px",display:"flex",flexWrap:"wrap",alignItems:"center",backgroundColor:"white"}}>
                <Box sx={{width:"20%",textAlign:"center"}}>
                    <img src="https://in.bmscdn.com/webin/movies/superstar/rewards_login.png" height={"40px"} width={"40px"} alt="img"/>
                </Box>
                <Box sx={{width:"40%"}}>
                    <p>Unlock special offers & great benifits</p>
                </Box>
                <Box sx={{width:"30%"}}>
                    <a href="/#" onClick={handleClickOpen} style={{cursor:"pointer",textDecoration:"none",color:"red",border:"1px solid red",padding:"10px 15px",borderRadius:"12px"}}>Login/Register</a>
                </Box>
            </Box>
          </List>
          <Divider />
          <List className="rightBar" sx={{cursor:"pointer",padding:"0px"}}>
            <Box sx={{fontSize:"15px",display:"flex",flexWrap:"wrap",alignItems:"center"}}>
                <Box sx={{width:"20%",textAlign:"center",fontSize:"20px"}}>
                    <IoIosNotificationsOutline/>
                </Box>
                <Box sx={{width:"70%"}}>
                    <p>notification</p>
                </Box>
                <Box sx={{width:"10%",fontSize:"20px"}}>
                    <MdKeyboardArrowRight/>
                </Box>
            </Box>
          </List>
          <Divider />
          <List className="rightBar" sx={{cursor:"pointer",padding:"0px"}}>
            <Box sx={{fontSize:"15px",display:"flex",flexWrap:"wrap",alignItems:"center",padding:"10px 0px"}}>
                <Box sx={{width:"20%",textAlign:"center",fontSize:"20px"}}>
                    <IoBagOutline/>
                </Box>
                <Box sx={{width:"70%"}}>
                    <p style={{margin:"0px",fontSize:"16px"}}>your orders</p>
                    <p style={{margin:"0px",fontSize:"12px"}}>view all your booking & purchases</p>
                </Box>
                <Box sx={{width:"10%",fontSize:"20px"}}>
                    <MdKeyboardArrowRight/>
                </Box>
            </Box>
          </List>
          <Divider />
          <List className="rightBar" sx={{cursor:"pointer",padding:"0px"}}>
            <Box sx={{fontSize:"15px",display:"flex",flexWrap:"wrap",alignItems:"center",padding:"10px 0px"}}>
                <Box sx={{width:"20%",textAlign:"center",fontSize:"20px"}}>
                    <MdOutlineOndemandVideo/>
                </Box>
                <Box sx={{width:"70%"}}>
                    <p style={{margin:"0px",fontSize:"16px"}}>stream library</p>
                    <p style={{margin:"0px",fontSize:"12px"}}>Rentend & purchased movies</p>
                </Box>
                <Box sx={{width:"10%",fontSize:"20px"}}>
                    <MdKeyboardArrowRight/>
                </Box>
            </Box>
          </List>
          <Divider />
          <List className="rightBar" sx={{cursor:"pointer",padding:"0px"}}>
            <Box sx={{fontSize:"15px",display:"flex",flexWrap:"wrap",alignItems:"center",padding:"10px 0px"}}>
                <Box sx={{width:"20%",textAlign:"center",fontSize:"20px"}}>
                    <HiOutlineCreditCard/>
                </Box>
                <Box sx={{width:"70%"}}>
                    <p style={{margin:"0px",fontSize:"16px"}}>Play credit card</p>
                    <p style={{margin:"0px",fontSize:"12px"}}>view your play credit crad details and offers</p>
                </Box>
                <Box sx={{width:"10%",fontSize:"20px"}}>
                    <MdKeyboardArrowRight/>
                </Box>
            </Box>
          </List>
          <Divider />
          <List className="rightBar" sx={{cursor:"pointer",padding:"0px"}}>
            <Box sx={{fontSize:"15px",display:"flex",flexWrap:"wrap",alignItems:"center",padding:"10px 0px"}}>
                <Box sx={{width:"20%",textAlign:"center",fontSize:"20px"}}>
                    <IoChatbubblesOutline/>
                </Box>
                <Box sx={{width:"70%"}}>
                    <p style={{margin:"0px",fontSize:"16px"}}>Help & support</p>
                    <p style={{margin:"0px",fontSize:"12px"}}>view commonly asked queries & chats</p>
                </Box>
                <Box sx={{width:"10%",fontSize:"20px"}}>
                    <MdKeyboardArrowRight/>
                </Box>
            </Box>
          </List>
          <Divider />
          <List className="rightBar" sx={{cursor:"pointer",padding:"0px"}}>
            <Box sx={{fontSize:"15px",display:"flex",flexWrap:"wrap",alignItems:"center",padding:"10px 0px"}}>
                <Box sx={{width:"20%",textAlign:"center",fontSize:"20px"}}>
                    <AiOutlineSetting/>
                </Box>
                <Box sx={{width:"70%"}}>
                    <p style={{margin:"0px",fontSize:"16px"}}>Accounts & Settings</p>
                    <p style={{margin:"0px",fontSize:"12px"}}>Location,payment,permission & more</p>
                </Box>
                <Box sx={{width:"10%",fontSize:"20px"}}>
                    <MdKeyboardArrowRight/>
                </Box>
            </Box>
          </List>
          <Divider />
          <List className="rightBar" sx={{cursor:"pointer",padding:"0px"}}>
            <Box sx={{fontSize:"15px",display:"flex",flexWrap:"wrap",alignItems:"center",padding:"10px 0px"}}>
                <Box sx={{width:"20%",textAlign:"center",fontSize:"20px"}}>
                    <BsGift/>
                </Box>
                <Box sx={{width:"70%"}}>
                    <p style={{margin:"0px",fontSize:"16px"}}>Rewards</p>
                    <p style={{margin:"0px",fontSize:"12px"}}>view yoour rewards and unlock new ones</p>
                </Box>
                <Box sx={{width:"10%",fontSize:"20px"}}>
                    <MdKeyboardArrowRight/>
                </Box>
            </Box>
          </List>
          <Divider />
          <List className="rightBar" sx={{cursor:"pointer",padding:"0px"}}>
            <Box sx={{fontSize:"15px",display:"flex",flexWrap:"wrap",alignItems:"center",padding:"10px 0px"}}>
                <Box sx={{width:"20%",textAlign:"center",fontSize:"20px"}}>
                    <BsTicket/>
                </Box>
                <Box sx={{width:"70%"}}>
                    <p style={{margin:"0px",fontSize:"16px"}}>BookASmile</p> 
                </Box>
                <Box sx={{width:"10%",fontSize:"20px"}}>
                    <MdKeyboardArrowRight/>
                </Box>
            </Box>
          </List>
        </Box>
      );

      const ariaLabel = { 'aria-label': 'description' };
      const[button,setButton]=useState(true)

      const signinInput=(e)=>{ 
            let lenValue=e.target.value
            if(lenValue.length>0){
                setButton(false)
            }
            else{
                setButton(true)
            }
      }
      
    const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
    });
       
    const [openLocation, setOpenLocation] = React.useState(false);
    
    const handleClickOpenLocation = () => {
        setOpenLocation(true);
    };
    
    const handleCloseLocation = () => {
        setOpenLocation(false);
    };

    //Setting loaction as global
    const dispatch=useDispatch()
    const settingLocation=(val)=>{
        setOpenLocation(false); 
        dispatch(updatedefaultLocation(val))     
    }

    //search movies page render
    const pageRender=useNavigate()
    const MovetoDetailPage=(movieId)=>{
        pageRender(`/details?mid=${movieId}`)
      }
 
    return( 
        <Box sx={{ flexGrow: 1 ,zIndex:1000,position:"relative"}}>
            <AppBar position="static" sx={{backgroundColor:"rgb(51, 53, 69)"}}>
                <Container>
                    <Toolbar>
                    <Box sx={{ width:{md:"18%"}}}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            alignItems={"center"}
                            sx={{mt:2 }}
                        >
                            <a href="/#" style={{cursor:"pointer"}}>
                                <svg viewBox="0 0 88 26" height="38" xmlns="http://www.w3.org/2000/svg">
                                <title>BookMyShow</title>
                                    <g fill="none">
                                    <path d="M55.433 7.383l-1.444-2.43-2.583 1.213-1.444-2.43L47.38 4.95l-1.445-2.43-2.582 1.215-1.445-2.43-2.582 1.212L37.88.087 35.3 1.3l-5.476 17.591 6.643 2.005a3.516 3.516 0 0 1 3.363-2.45c1.944 0 3.52 1.557 3.52 3.478l-.001.07c.016.315-.021.634-.118.946l6.756 2.042 5.446-17.6" fill="#C4242B"></path>
                                    <path d="M35.52 17.438a.705.705 0 0 1-.591-.705V8.122a.715.715 0 0 1 .724-.717h6.297c.164 0 .329.016.489.043a2.798 2.798 0 0 1 2.336 2.749v6.536a.705.705 0 0 1-.217.51.73.73 0 0 1-.641.195.704.704 0 0 1-.59-.705v-6.536a1.363 1.363 0 0 0-1.377-1.358h-1.372v7.894a.723.723 0 0 1-.86.705.705.705 0 0 1-.59-.705V8.838h-2.75v7.895a.704.704 0 0 1-.216.51.728.728 0 0 1-.642.195M45.99 21.19a.704.704 0 0 1-.592-.706c0-.195.074-.377.209-.51a.73.73 0 0 1 .516-.206c.61 0 1.14-.39 1.315-.97l.748-2.462-2.448-8.083a.722.722 0 0 1 .483-.904.742.742 0 0 1 .896.473l1.82 6.03 1.839-6.026c.091-.34.46-.556.839-.49l.051.011c.392.121.608.528.489.907l-2.52 8.295-.796 2.655c-.206.61-.56 1.106-1.022 1.44-.5.365-1.086.557-1.694.557a.708.708 0 0 1-.133-.012M1.614 15.87h1.428c.788 0 1.43-.633 1.43-1.413v-4.141c0-.687-.498-1.272-1.183-1.391a1.501 1.501 0 0 0-.247-.022l-1.43.001.002 6.965zM.72 17.347a.732.732 0 0 1-.616-.734V3.758c0-.203.077-.391.218-.53a.751.751 0 0 1 .666-.203c.362.062.624.37.624.734v3.656h1.43a2.91 2.91 0 0 1 2.938 2.901l-.001 4.141c0 1.601-1.318 2.902-2.938 2.902H.86a.676.676 0 0 1-.14-.011zM11.096 8.839a1.478 1.478 0 0 0-.246-.02c-.801 0-1.43.62-1.43 1.412v4.313a1.413 1.413 0 0 0 1.43 1.412c.788 0 1.429-.632 1.43-1.412l-.001-4.313c0-.688-.498-1.272-1.183-1.392m-.763 8.564a2.905 2.905 0 0 1-2.42-2.86V10.23c0-.778.304-1.507.858-2.054a2.94 2.94 0 0 1 2.079-.847 2.91 2.91 0 0 1 2.938 2.902l-.001 4.313c0 .775-.308 1.504-.867 2.055a2.94 2.94 0 0 1-2.07.847 2.948 2.948 0 0 1-.517-.043M18.902 8.839a1.47 1.47 0 0 0-.245-.02c-.802 0-1.428.62-1.428 1.412v4.313a1.412 1.412 0 0 0 1.428 1.412c.378 0 .733-.146 1.005-.41.273-.268.424-.624.424-1.002V10.23c0-.687-.498-1.27-1.184-1.391m-.762 8.564a2.907 2.907 0 0 1-2.42-2.859v-4.313c0-1.601 1.317-2.903 2.937-2.903.17 0 .34.014.506.043a2.91 2.91 0 0 1 2.431 2.86v4.313c0 .777-.308 1.504-.867 2.055a2.94 2.94 0 0 1-2.07.847c-.174 0-.348-.014-.517-.043M24.142 17.434a.733.733 0 0 1-.614-.733V3.758a.735.735 0 0 1 .753-.745.746.746 0 0 1 .754.745v7.66l3.474-3.843a.766.766 0 0 1 .697-.228c.139.024.27.085.379.175.309.28.33.75.052 1.048l-2.615 2.88 2.717 4.902a.705.705 0 0 1 .066.553.732.732 0 0 1-.37.443.755.755 0 0 1-.5.082.749.749 0 0 1-.526-.356l-2.444-4.433-.93 1.013v3.047c0 .202-.08.39-.225.532a.758.758 0 0 1-.668.201M57.41 17.426a2.782 2.782 0 0 1-1.96-1.355.75.75 0 0 1-.068-.569.739.739 0 0 1 .346-.45c.15-.084.33-.114.505-.084a.75.75 0 0 1 .525.358c.199.335.509.546.895.614.42.066.803-.048 1.116-.316.29-.267.442-.648.404-1.016a1.22 1.22 0 0 0-.548-.964l-2.031-1.425a2.708 2.708 0 0 1-1.155-2.013 2.642 2.642 0 0 1 .884-2.152 2.754 2.754 0 0 1 2.24-.694h.001c.856.15 1.555.63 1.95 1.323a.746.746 0 0 1 .07.563.747.747 0 0 1-.348.454.757.757 0 0 1-.504.083.747.747 0 0 1-.526-.357c-.172-.3-.482-.51-.856-.575a1.189 1.189 0 0 0-1.021.296c-.26.238-.403.596-.382.96.019.351.22.694.523.894l2.032 1.404a2.729 2.729 0 0 1 1.177 2.101 2.651 2.651 0 0 1-.906 2.214 2.84 2.84 0 0 1-2.307.714l-.055-.008M63.246 17.447a.75.75 0 0 1-.625-.735V3.77c0-.202.08-.39.226-.533a.762.762 0 0 1 .667-.2.733.733 0 0 1 .615.733v3.655h1.43c.174 0 .348.015.516.045a2.902 2.902 0 0 1 2.42 2.857l.001 6.385a.741.741 0 0 1-.883.734.747.747 0 0 1-.625-.735v-6.384a1.41 1.41 0 0 0-1.43-1.412h-1.429v7.797a.742.742 0 0 1-.754.746.781.781 0 0 1-.13-.01M73.609 8.85a1.429 1.429 0 0 0-1.26.39c-.268.265-.416.62-.416 1v4.316c0 .686.494 1.27 1.173 1.388a1.43 1.43 0 0 0 1.261-.388c.274-.268.424-.622.424-1.001V10.24c0-.687-.497-1.272-1.182-1.391m-.763 8.563a2.903 2.903 0 0 1-2.42-2.857V10.24c-.001-1.6 1.317-2.902 2.937-2.902.169 0 .34.013.506.043a2.91 2.91 0 0 1 2.43 2.859v4.315a2.856 2.856 0 0 1-.867 2.054 2.938 2.938 0 0 1-2.586.803M87.892 8.254a.712.712 0 0 0-.077-.545.781.781 0 0 0-.49-.342.747.747 0 0 0-.864.546 920.42 920.42 0 0 1-1.452 5.726l-.014.056-.013-.056c-.62-2.458-1.447-5.69-1.456-5.724a.706.706 0 0 0-.58-.55.75.75 0 0 0-.85.548c-.01.03-.819 3.268-1.454 5.726l-.014.056-.014-.056c-.618-2.458-1.447-5.695-1.455-5.726a.74.74 0 0 0-.889-.536.73.73 0 0 0-.542.877l2.185 8.632a.754.754 0 0 0 .714.556.708.708 0 0 0 .715-.557c.008-.033.837-3.27 1.456-5.73l.013-.054.016.054c.64 2.483 1.451 5.73 1.452 5.732a.754.754 0 0 0 .715.556.71.71 0 0 0 .714-.559l2.184-8.63" fill="#FFF"></path>
                                    </g>
                                </svg>
                            </a>
                        </Typography>
                    </Box>
                    <Box sx={{ display: { lg:'flex', md: 'flex',sm:'flex',xs:'none'},backgroundColor:"white",color:"black",marginLeft:{sm:"40px",md:"30px"},width:{sm:"50%",md:"40%",lg:"35%"},justifyContent:"center",alignItems:"center",borderRadius:"6px",padding:"1px"}} columnGap={"10px"}>
                        <BiSearch sx={{width:{sm:"10%",md:"10%"}}}/>
                        <Input 
                            type="text" 
                            placeholder="Search..."
                            onChange={(e)=>searchMovies(e)}
                            sx={{width:{sm:"85%",md:"85%"},borderBottom:"0px"}}
                        />
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />

                    <Box sx={{ display: { lg:'flex', md: 'flex',sm:'none',xs:'none'}}}>
                    <Button onClick={handleClickOpenLocation} sx={{color:"white",fontSize:"13px",textTransform:"capitalize",marginRight:"30px"}}>
                            {stateLoc.defaultLocation}<AiFillCaretDown/>
                        </Button>
                        <BootstrapDialog
                            open={openLocation}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleCloseLocation}
                            aria-describedby="alert-dialog-slide-description"
                            maxWidth={"xl"}
                        >
                            <DialogTitle sx={{position:"relative"}}>
                                <input className="searchCity" type="search" placeholder='Search city' style={{width:"100%",padding:"10px 0px 10px 30px",border:"1px solid gray",borderRadius:"3px"}}/>
                                <SearchIcon sx={{position:"absolute",left:"28px",top:"26px",color:"gray",fontSize:"18px"}}/>
                            </DialogTitle>
                            <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                <p style={{textAlign:"center"}}>Popular cities</p>
                                <Box px={3} sx={{display:"flex",flexWrap:"wrap"}} columnGap={"25px"}>
                                    <List>
                                        <a href="/#" style={{fontSize:"12px",textDecoration:"none",color:"black"}} onClick={()=>settingLocation("Mumbai")}>
                                            <img src={stateLoc.defaultLocation==="Mumbai" ? "https://in.bmscdn.com/m6/images/common-modules/regions/mumbai-selected.png":"https://in.bmscdn.com/m6/images/common-modules/regions/mumbai.png"} alt="location"/>
                                            <p style={{margin:"0px",textAlign:"center"}}>Mumbai</p>
                                        </a>
                                    </List>
                                    <List>
                                    <a href="/#" style={{fontSize:"12px",textDecoration:"none",color:"black"}} onClick={()=>settingLocation("Delhi")}>
                                            <img src={stateLoc.defaultLocation==="Delhi" ?  "https://in.bmscdn.com/m6/images/common-modules/regions/ncr-selected.png":"https://in.bmscdn.com/m6/images/common-modules/regions/ncr.png"} alt="location"/>
                                            <p style={{margin:"0px",textAlign:"center"}}>Delhi</p>
                                        </a>
                                    </List>
                                    <List>
                                    <a href="/#" style={{fontSize:"12px",textDecoration:"none",color:"black"}} onClick={()=>settingLocation("Bengaluru")}>
                                            <img  src={stateLoc.defaultLocation==="Bengaluru" ? "https://in.bmscdn.com/m6/images/common-modules/regions/bang-selected.png": "https://in.bmscdn.com/m6/images/common-modules/regions/bang.png"} alt="location"/>
                                            <p style={{margin:"0px",textAlign:"center"}}>Bengaluru</p>
                                        </a>
                                    </List>
                                    <List>
                                    <a href="/#" style={{fontSize:"12px",textDecoration:"none",color:"black"}} onClick={()=>settingLocation("Hyderabad")}>
                                            <img src={stateLoc.defaultLocation==="Hyderabad" ? "https://in.bmscdn.com/m6/images/common-modules/regions/hyd-selected.png":"https://in.bmscdn.com/m6/images/common-modules/regions/hyd.png"} alt="location"/>
                                            <p style={{margin:"0px",textAlign:"center"}}>Hyderabad</p>
                                        </a>
                                    </List> 
                                    <List>
                                        <a href="/#" style={{fontSize:"12px",textDecoration:"none",color:"black"}} onClick={()=>settingLocation("Ahmedabad")}>
                                            <img  src={stateLoc.defaultLocation==="Ahmedabad" ? "https://in.bmscdn.com/m6/images/common-modules/regions/ahd-selected.png":"https://in.bmscdn.com/m6/images/common-modules/regions/ahd.png"} alt="location"/>
                                            <p style={{margin:"0px",textAlign:"center"}}>Ahmedabad</p>
                                        </a>
                                    </List>
                                    <List>
                                    <a href="/#" style={{fontSize:"12px",textDecoration:"none",color:"black"}} onClick={()=>settingLocation("Chandigarh")}>
                                            <img src={stateLoc.defaultLocation==="Chandigarh" ? "https://in.bmscdn.com/m6/images/common-modules/regions/chd-selected.png":"https://in.bmscdn.com/m6/images/common-modules/regions/chd.png"} alt="location"/>
                                            <p style={{margin:"0px",textAlign:"center"}}>Chandigarh</p>
                                        </a>
                                    </List>
                                    <List>
                                    <a href="/#" style={{fontSize:"12px",textDecoration:"none",color:"black"}} onClick={()=>settingLocation("Chennai")}>
                                            <img src={stateLoc.defaultLocation==="Chennai" ? "https://in.bmscdn.com/m6/images/common-modules/regions/chen-selected.png":"https://in.bmscdn.com/m6/images/common-modules/regions/chen.png"} alt="location"/>
                                            <p style={{margin:"0px",textAlign:"center"}}>Chennai</p>
                                        </a>
                                    </List> 
                                    <List>
                                        <a href="/#" style={{fontSize:"12px",textDecoration:"none",color:"black"}} onClick={()=>settingLocation("Pune")}>
                                            <img src={stateLoc.defaultLocation==="Pune" ? "https://in.bmscdn.com/m6/images/common-modules/regions/pune-selected.png":"https://in.bmscdn.com/m6/images/common-modules/regions/pune.png"} alt="location"/>
                                            <p style={{margin:"0px",textAlign:"center"}}>Pune</p>
                                        </a>
                                    </List>
                                    <List>
                                    <a href="/#" style={{fontSize:"12px",textDecoration:"none",color:"black"}} onClick={()=>settingLocation("Kolkata")}>
                                            <img src={stateLoc.defaultLocation==="Kolkata" ? "https://in.bmscdn.com/m6/images/common-modules/regions/kolk-selected.png":"https://in.bmscdn.com/m6/images/common-modules/regions/kolk.png"} alt="location"/>
                                            <p style={{margin:"0px",textAlign:"center"}}>Kolkata</p>
                                        </a>
                                    </List>
                                    <List>
                                    <a href="/#" style={{fontSize:"12px",textDecoration:"none",color:"black"}} onClick={()=>settingLocation("Kochi")}>
                                            <img src={stateLoc.defaultLocation==="Kochi" ? "https://in.bmscdn.com/m6/images/common-modules/regions/koch-selected.png":"https://in.bmscdn.com/m6/images/common-modules/regions/koch.png"} alt="location"/>
                                            <p style={{margin:"0px",textAlign:"center"}}>Kochi</p>
                                        </a>
                                    </List>
                                </Box>
                            </DialogContentText>        
                            </DialogContent>
                        </BootstrapDialog>
                    </Box>

                    <Box sx={{ display: { lg:'flex', md: 'flex',sm:'none',xs:'none'}}}>
                        <Button onClick={handleClickOpen} sx={{backgroundColor:"rgb(248, 68, 100)",color:"white",padding:"0px",fontSize:"12px"}}>
                            sign in
                        </Button>
                        <BootstrapDialog 
                            aria-labelledby="customized-dialog-title"
                            open={open}
                            maxWidth={"xs"}
                        >
                            <DialogTitle sx={{ m: 0, p: 2,textAlign:"center" }} id="customized-dialog-title">
                            Get Started
                            </DialogTitle>
                            <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                            >
                            <CloseIcon />
                            </IconButton>
                            <DialogContent className="nav">
                                <Box className="signin-hover" sx={{display:"flex",flexWrap:"wrap",justifyContent:"space-around",margin:"20px 50px",border:"1px solid gray",borderRadius:"6px",padding:"10px 30px",cursor:"pointer"}}>
                                    <img src="https://in.bmscdn.com/webin/common/icons/googlelogo.svg" alt="location"/>
                                    <p style={{margin:"0px",paddingLeft:"30px"}}>Continue with Google</p> 
                                </Box>

                                <Box className="signin-hover" sx={{display:"flex",flexWrap:"wrap",justifyContent:"space-around",margin:"20px 50px",border:"1px solid gray",borderRadius:"6px",padding:"10px 30px",cursor:"pointer"}}>
                                    <img src="https://in.bmscdn.com/webin/common/icons/email.svg" alt="location"/>
                                    <p style={{margin:"0px",paddingLeft:"30px"}}>Continue with Mail</p> 
                                </Box>

                                <Box className="signin-hover" sx={{display:"flex",flexWrap:"wrap",justifyContent:"space-around",margin:"20px 50px",border:"1px solid gray",borderRadius:"6px",padding:"10px 30px",cursor:"pointer"}}>
                                     <AiFillApple style={{fontSize:"20px"}}/>
                                    <p style={{margin:"0px",paddingLeft:"30px"}}>Continue with Apple</p> 
                                </Box>
                                
                                <Box>
                                    <p style={{color:"gray",textAlign:"center"}}>OR</p>
                                </Box>

                                <Box sx={{display:"flex",flexWrap:"wrap",alignItems:"center",padding:"0px 30px"}}>
                                    <img src="https://in.bmscdn.com/webin/common/icons/indianflag.svg" alt="location"/>
                                    <span>+91</span>
                                    <Input type="number" onChange={(e)=>signinInput(e)} inputProps={ariaLabel} sx={{width:"80%",fontSize:"14px"}}/>
                                </Box>
                            </DialogContent>


                            <DialogActions sx={{justifyContent:"center"}}>
                                {button ?   
                                          <p style={{color:"gray",fontSize:"13px"}}>
                                            i agree to the 
                                                <a href="/#" style={{color:"gray",padding:"0px 5px"}}>Terms & condition</a>
                                                &
                                                <a href="/#" style={{color:"gray",paddingLeft:"5px"}}>Privacy policy</a>
                                            </p>
                                            :
                                            <Button className="signinButton" sx={{backgroundColor:"red",color:"white",fontSize:"13px"}}>Continue</Button>
                                        }
                            </DialogActions>
                        </BootstrapDialog>
                    </Box>


                        <React.Fragment key={'right'}>
                        <Button onClick={toggleDrawer('right', true)} sx={{color:"white"}}>
                            <Box sx={{ display: { lg:'flex', md: 'flex',sm:'flex',xs:'flex'}}}>
                            <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            >
                                <MenuIcon />
                            </IconButton>
                            </Box>
                        </Button>
                        <Drawer
                            anchor={'right'}
                            open={state['right']}
                            onClose={toggleDrawer('right', false)}
                        >
                            {list('right')}
                        </Drawer>
                        </React.Fragment>                    
                    </Toolbar>
                </Container>

                <Box sx={{backgroundColor:"rgb(34, 37, 57)"}}>
                    <Container>
                        <Box sx={{display:"flex",flexWrap:"wrap",justifyContent:"space-between"}}>
                            <Box px={3} sx={{display:{ lg:'flex', md: 'flex',sm:'none',xs:'none' },flexWrap:"wrap"}} columnGap={"25px"}>
                                <List>
                                    <a href="/#" style={{fontSize:"12px",textDecoration:"none",color:"white"}}>Movies</a>
                                </List>
                                <List>
                                    <a href="/#" style={{fontSize:"12px",textDecoration:"none",color:"white"}}>Stream</a>
                                </List>
                                <List>
                                    <a href="/#" style={{fontSize:"12px",textDecoration:"none",color:"white"}}>Events</a>
                                </List>
                                <List>
                                    <a href="/#" style={{fontSize:"12px",textDecoration:"none",color:"white"}}>Play</a>
                                </List>
                                <List>
                                    <a href="/#" style={{fontSize:"12px",textDecoration:"none",color:"white"}}>Sports</a>
                                </List>
                                <List>
                                    <a href="/#" style={{fontSize:"12px",textDecoration:"none",color:"white"}}>Activities</a>
                                </List>
                                <List>
                                    <a href="/#" style={{fontSize:"12px",textDecoration:"none",color:"white"}}>Buzz</a>
                                </List>
                            </Box>

                            <Box px={3} sx={{display:{ lg:'flex', md: 'flex',sm:'none',xs:'none' },flexWrap:"wrap"}} columnGap={"25px"}>
                                <List>
                                    <a href="/#" style={{fontSize:"12px",textDecoration:"none",color:"white"}}>ListYourShow</a>
                                </List>
                                <List>
                                    <a href="/#" style={{fontSize:"12px",textDecoration:"none",color:"white"}}>Corporate</a>
                                </List>
                                <List>
                                    <a href="/#" style={{fontSize:"12px",textDecoration:"none",color:"white"}}>Offers</a>
                                </List>
                                <List>
                                    <a href="/#" style={{fontSize:"12px",textDecoration:"none",color:"white"}}>Gift Cards</a>
                                </List> 
                            </Box>
                        </Box>
                    </Container>
                </Box>
            </AppBar>

            {
                searchStateTrue 
                    ?
                    <Box sx={{backgroundColor:"whitesmoke",position:"absolute",top:"100%",height:"auto",width:"100%"}}>
                        <Container>
                            <Box sx={{display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"center"}}>
                                {
                                    nothingMatched 
                                        ?     
                                        <Box sx={{width:"100%",height:"60vh",display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"center"}}>
                                            <Box sx={{width:"50%",border:"1px solid gray",borderRadius:"12px",padding:"20px",color:"rgb(236, 94, 113)",textAlign:"center"}}>
                                                <BsSearch style={{fontSize:"50px"}}/>
                                                <Typography
                                                    component="p"
                                                    sx={{fontSize:"15px",fontWeight:900}}>
                                                        SORRY THAT MOVIE IS NOT AVAILABLE
                                                </Typography>
                                            </Box>
                                        </Box>
                                        :               
                                            SearchMoviesListt.map((val,ind)=>{
                                                return (<Box key={ind} sx={{width:"20%",padding:"10px"}}>
                                                    <Box style={{cursor:"pointer",border:"1px solid gray",borderRadius:"12px",backgroundColor:"white"}} onClick={()=>MovetoDetailPage(val.mid)}>
                                                        <Typography 
                                                            component="img" 
                                                            src={val.mimg}
                                                            sx={{width:"100%",borderRadius:"12px"}}
                                                            > 
                                                        </Typography> 
                                                        <Box>
                                                            <Typography 
                                                                component="h3"  
                                                                sx={{width:"100%",overflow:"hidden",textAlign:"start",padding:"10px 0px 10px 10px",fontWeight:600,fontSize:"12px",textTransform:"capitalize"}}
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
                                                </Box>)
                                            })

                                }
                            </Box>
                        </Container>
                    </Box>

                    :
                    ""
            }
        </Box>
    )
}