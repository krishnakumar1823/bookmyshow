import { Box, Container, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { updateTheater, updateTicketArray } from "../Redux/Redux"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { SlArrowLeft } from "react-icons/sl";
import { useSearchParams } from "react-router-dom"
import { BsCurrencyRupee } from "react-icons/bs";
import { CiCircleChevDown } from "react-icons/ci";


export const Checkout=()=>{
    const state=useSelector(
        ({data})=>data
    ) 
    const dispatch=useDispatch()
    // const[dupliacte,setDuplicate]=useState(state.theater)
    const[modifiedOriginalArray,setModifiedOriginalArray]=useState([])
    const[movieNamePrinting,setMovieNamePrinting]=useState("")
    const[theaterNamePrinting,setTheaterNamePrinting]=useState("")
    const[param]=useSearchParams()
    const[ticketsPrinting]=useState(state.ticketArray[0].movId.movIds)
    const[bookingStatus,setbookingStatus]=useState(true)

    // console.log(ticketsPrinting)
    
    const proceed=()=>{
        var amt= 120*ticketsPrinting.length+70.80
		var options = {
			key: "rzp_test_BcLelq9LhqgLDh", 
            key_secret:"u77S5UVhRxXXvc9LRdb13Dda", 
			amount: amt*100 ,  
			currency:"INR",
			name: "Book My Show Payment",  
			description: "Test Transaction",
			image: "https://tse1.mm.bing.net/th?id=OIP.9AYmKZc1L7auvVNBeGxLzQHaEK&pid=Api&P=0&h=180", 
			handler: function (response){
				if(response.razorpay_payment_id!==""){

                    //deleting the original array if availability is true
                    var deleteBlockedIds=[...state.ticketArray[0].movId.seatSoldornot]
                    console.log(deleteBlockedIds)
                    var make=[...state.ticketArray[0].movId.Ticket]

                    // for(var i=0;i<deleteBlockedIds.length;i++){
                    deleteBlockedIds.map((val,i)=>(    
                        make.filter((v,ind)=>{
                            if(v.keyy===deleteBlockedIds[i].keyy){
                                make.splice(ind,1)
                            }
                            return false
                        })
                    ))
                    // } 
                    // setTicketsPrinting(make)

                    //TICKET ARRAY MODIFICATION
                    var obj={
                        movId:
                            {
                                mid:state.ticketArray[0].movId.mid,
                                Ticket:make,
                                movIds:state.ticketArray[0].movId.movIds,
                                store:state.ticketArray[0].movId.store,
                                seatSoldornot:state.ticketArray[0].movId.seatSoldornot
                            },
                            theaterLocation:state.ticketArray[0].theaterLocation,
                            theaterName:state.ticketArray[0].theaterName,
                            theaterTiming:state.ticketArray[0].theaterTiming,
                            theaterTimingString:state.ticketArray[0].theaterTimingString
                        } 
                    dispatch(updateTicketArray([obj]))
                    // console.log(obj)

                    //ORIGINAL ARRAY MODIFICATION
                    var movIdd=state.ticketArray[0].movId.mid
                    var theaterNameSingle=state.ticketArray[0].theaterName

                    var theaterCount=state.theater 

                    for(var i=0;i<theaterCount.length;i++){ 
                        if(theaterCount[i].theaterName===theaterNameSingle){
                            
                            var movIdCount=state.theater[i].movId
                            for(var j=0;j<movIdCount.length;j++){
                                if(movIdCount[j].mid===movIdd){ 
                                    var objj={
                                                mid:state.ticketArray[0].movId.mid,
                                                Ticket:make,
                                                movIds:state.ticketArray[0].movId.movIds,
                                                store:state.ticketArray[0].movId.store,
                                                seatSoldornot:state.ticketArray[0].movId.seatSoldornot
                                            }
                                var newX=[...state.theater[i].movId]
                                newX.splice(j,1,objj) 

                                var newY=Object.assign({},state.theater[i]) 
                                newY.movId=newX

                                var newZ=[...state.theater]
                                newZ.splice(i,1,newY)

                                //see console the original array is modified
                                // console.log(newZ)
                                setModifiedOriginalArray(newZ)
                                }
                            }
                        }
                    } 
                    setbookingStatus(false)
                }
			}
			
		};
		var rzp1 = new window.Razorpay(options);
        rzp1.open(); 
    }
 
    const pageRender=useNavigate()
    const home=()=>{
        pageRender("/") 
        dispatch(updateTheater(modifiedOriginalArray))
    }

    useEffect(()=>{
        var gettingMovieFromParam=param.get('movieId') 
        var gettingTheaterFromParam=param.get('theaterName')

        let theaterWithMovie=state.duplicateTheaterSeat
        let x=theaterWithMovie.filter((val)=>{
            return val.theaterName===gettingTheaterFromParam ? val : ""
        })  
        setTheaterNamePrinting(x[0].theaterName)

        let movNamePrint=state.array_recommended
        for(var i=0;i<movNamePrint.length;i++){
            if(movNamePrint[i].mid===gettingMovieFromParam){
                setMovieNamePrinting(movNamePrint[i].mname)
                // console.log(movNamePrint)
            }
        } 
    },[param,state.array_recommended,state.duplicateTheaterSeat])   

    const moveBack=()=>{
        pageRender(`/`)
    }
    return(
        <>
             <Box position={"sticky"} sx={{backgroundColor:"#1f2533",top:"0px",zIndex:999}} py={2}>
                <Container maxWidth="xl">
                    <Box sx={{display:"flex",alignItems:"center",flexWrap:"wrap",justifyContent:"start"}}>
                        <Box sx={{width:{xs:"100%",md:"45%"},display:"flex",alignItems:"center",flexWrap:"wrap"}}>
                            <Box sx={{width:"10%"}}>
                                    <Typography
                                        component="i"
                                        onClick={()=>moveBack()}
                                        sx={{color:"white",fontSize:"25px",cursor:"pointer"}}>
                                            <SlArrowLeft/>
                                    </Typography>
                            </Box>
                            <Box sx={{width:"85%",display:"flex",alignItems:"center",flexWrap:"wrap"}}>
                                <Box sx={{width:"100%",display:"flex",alignItems:"center",flexWrap:"wrap"}}>
                                    <Box sx={{width:"95%",display:"flex",alignItems:"center",flexWrap:"wrap"}}>
                                    <Typography
                                            component="p"
                                            sx={{margin:"0px 10px 0px 0px",fontSize:"12px",color:"gray",height:"20px",width:"20px",borderRadius:"50%",border:"1px solid gray",display:"flex",alignItems:"center",flexWrap:"wrap",justifyContent:"center"}}>
                                        A
                                        </Typography>

                                        <Typography
                                            component="h1"
                                            sx={{color:"gray",width:"90%"}}>
                                            {movieNamePrinting}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{width:"100%"}} py={1}>
                                    <Typography
                                        component="p"
                                        sx={{fontSize:"12px",color:"gray",display:"flex",alignItems:"center",flexWrap:"wrap"}}> 
                                       {theaterNamePrinting!==undefined || theaterNamePrinting!=="" ? theaterNamePrinting : ""}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>

                <Box py={2} sx={{backgroundColor:"#f2f2f2"}}>
                    <Container>
                    { 
                        bookingStatus ?

                            <Box sx={{display:"flex",flexWrap:"wrap",justifyContent:{xs:"center",lg:"space-between"},alignItems:"center"}}>
                                <Box sx={{width:{xs:"100",md:"70%"},order:{xs:2,md:0}}}>
                                    <Box>
                                        <Typography
                                            component="img"
                                            src="https://assets-in.bmscdn.com/promotions/cms/creatives/1688188454571_855x95.jpg"
                                            sx={{width:"100%",borderRadius:"6px"}}></Typography>
                                    </Box>

                                    <Box my={1} sx={{width:"100%",backgroundColor:"white"}}>
                                        <Box>
                                            <Typography
                                                component="h1"
                                                sx={{fontFamily:"cursive",fontSize:"18px",textAlign:"center"}} py={1}>
                                                    Grab a <span style={{color:"#c02c39"}}>bite!</span>
                                            </Typography>
                                            <Typography
                                                component="h1"
                                                sx={{color:"gray",fontSize:"14px",textAlign:"center"}} py={1}>
                                                    Prebook Your Meal and Save More!
                                            </Typography>
                                        </Box>
                                        
                                        <Box sx={{width:"100%",height:"70vh",display:"flex",flexWrap:"wrap",justifyContent:"space-around",overflowY:"scroll"}}>
                                            {
                                                state.snackList.map((val,ind)=>{
                                                    return(
                                                        <Box key={ind} sx={{width:{xs:"100%",sm:"45%",md:"40%"},display:"flex",flexWrap:"wrap",alignItems:"center",boxShadow:"0 4px 8px 1px rgba(0,0,0,.25)",borderRadius:"12px"}} my={2} p={2} py={4}>
                                                            <Box sx={{width:"20%"}} position={"relative"}>
                                                                <Typography
                                                                    component="img"
                                                                    src={val.snackImg}
                                                                    sx={{width:"100%"}}>
                                                                </Typography>

                                                                <Typography
                                                                    component="img"
                                                                    src="https://tse1.mm.bing.net/th?id=OIP.ziAJTKtxn2RmrsjYIBylswHaHW&pid=Api&rs=1&c=1&qlt=95&w=122&h=121"
                                                                    sx={{position:"absolute",top:"0px",left:"0px",height:"20px",width:"20px"}}>
                                                                </Typography>
                                                            </Box>

                                                            <Box sx={{width:"70%"}} pl={3}>
                                                                <Typography
                                                                    component="h1"
                                                                    sx={{fontSize:"14px",fontWeight:600,color:"black"}} py={1}>
                                                                    {val.snackType}
                                                                </Typography>
                                                                <Typography
                                                                    component="h1"
                                                                    sx={{fontSize:"12px",color:"gray"}} py={1}>
                                                                    {val.snackPackage}
                                                                </Typography>
                                                                <Typography
                                                                    component="h1"
                                                                    sx={{fontSize:"14px",fontWeight:600,color:"black"}}pt={3}>
                                                                    <BsCurrencyRupee style={{paddingRight:"5px"}}/>{val.snackPrice}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    )
                                                })
                                            }
                                        </Box>
                                    </Box>
                                </Box>

                                <Box sx={{width:{xs:"100%",sm:"50%",md:"25%"},order:{xs:1,md:0},backgroundColor:"white",padding:{xs:"10px 15px"},height:"auto",borderRadius:"12px",marginBottom:{xs:"50px",md:"0px"}}}>
                                    <Box>
                                        <Typography
                                            component="h1"
                                            sx={{color:"#c02c39",letterSpacing:"3px",textTransform:"uppercase",fontSize:"14px",textAlign:"center"}}>
                                        Booking summary
                                        </Typography>
                                    </Box>

                                    <Box sx={{display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"center"}}>
                                        <Box sx={{width:"80%"}}>
                                            <Typography
                                                component="p"
                                                sx={{fontSize:"12px",color:"gray",textAlign:"center"}} pt={2}>
                                            Your Tickets
                                            </Typography>
                                            <ul style={{fontSize:"12px",color:"gray",listStyleType:"none",display:"flex",flexWrap:"wrap",padding:"0px"}}>
                                                {
                                                    ticketsPrinting.map((val,ind)=>{
                                                        return(
                                                            <li style={{width:"20%",borderLeft:"1px solid red",borderRight:"1px solid red",margin:"5px 5px",textAlign:"center"}}>
                                                                {val}
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </Box>
                                        <Box sx={{width:"20%"}}>
                                            <Typography
                                                component="p"
                                                sx={{fontSize:"14px",color:"black"}} pt={2}>
                                            Rs:{ticketsPrinting.length*120}.0
                                            </Typography>
                                        </Box>
                                        
                                        <Box sx={{width:"80%"}}>
                                            <Typography
                                                component="p"
                                                sx={{fontSize:"16px",color:"gray"}} pt={2}>
                                            <CiCircleChevDown/> Convenience fees
                                            </Typography>
                                        </Box>

                                        <Box sx={{width:"20%"}}>
                                            <Typography
                                                component="p"
                                                sx={{fontSize:"14px",color:"black"}} pt={2}>
                                            Rs:70.80
                                            </Typography>
                                        </Box>
                                    </Box>
                                    
                                    <Box onClick={()=>proceed()} id="rzp-button1" sx={{cursor:"pointer",color:"white",backgroundColor:"#f84464",display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",borderRadius:"6px"}} py={1} px={2} mt={5}>
                                        <Typography
                                            component="a"
                                            sx={{fontSize:"13px"}}
                                            >
                                        Pay Rs:{(120*ticketsPrinting.length)+70.80}
                                        </Typography>

                                        <Typography
                                            component="a"
                                            sx={{fontSize:"13px"}}
                                            >
                                        Proceed
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                        :

                            <Box sx={{width:"100%",height:"80vh",display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"center"}}>
                                <Box sx={{width:"50%",border:"1px solid gray",borderRadius:"12px",padding:"20px",color:"rgb(236, 94, 113)",textAlign:"center"}}>
                                    <Typography
                                        component="img"
                                        src="https://cdn.pixabay.com/photo/2020/06/07/11/34/good-luck-5269978_1280.png"
                                        sx={{width:"100%"}}>
                                    </Typography>

                                    <Box onClick={()=>home()} my={2} sx={{textTransform:"capitalize",cursor:"pointer",color:"white",backgroundColor:"green",display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",borderRadius:"6px"}} py={1} px={2}>
                                        <Typography
                                            component="p"
                                            sx={{width:"100%",fontSize:"13px",textAlign:"center"}}>
                                        return home
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                    }
                    </Container>
                </Box> 

        </>
    )
}