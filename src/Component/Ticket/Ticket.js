import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Box, Container, Fade, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material"
import "./Ticket.scss"
import { useEffect, useState } from "react"
import { updateTicketArray } from "../Redux/Redux"
import { SlArrowLeft } from "react-icons/sl";
import Backdrop from '@mui/material/Backdrop';


export const Ticket=()=>{
    const state=useSelector(
        ({data})=>data
    ) 
    
    const[param]=useSearchParams()
    const[theaterSeats,setTheaterSeats]=useState([]) 
    const[movieIds,setMovieIds]=useState([])
    const[newTrueObjects,setnewTrueObjects]=useState([])
    const[iCount,setIcount]=useState(0)
    const[seatSoldList,setSeatSoldList]=useState([])
    const[movieNamePrinting,setMovieNamePrinting]=useState("")
    const[theaterNamePrinting,setTheaterNamePrinting]=useState("")
    const[movieTimePrinting,setMovieTimePrinting]=useState("")
    const [Count,setCount]=useState(0)
    const[val,setVal]=useState([])
    const [open, setOpen] = useState(true); 
    const dispatch=useDispatch()  
    const[newTrueSeats,setNewTrueSeats]=useState([])

    useEffect(()=>{
        var gettingMovieFromParam=param.get('movieId') 
        var gettingTheaterFromParam=param.get('theaterName')
        var gettingTimeFromParam=param.get('movieTiming')
        setMovieTimePrinting(gettingTimeFromParam)

        let theaterWithMovie=state.duplicateTheaterSeat
        let x=theaterWithMovie.filter((val)=>{
            return val.theaterName===gettingTheaterFromParam ? val : ""
        })  
        setTheaterSeats(x) 
        setTheaterNamePrinting(x[0].theaterName) 
        dispatch(updateTicketArray(x))    

        if(x[0].movId.seatSoldornot.length>0){
            var newY=x[0].movId.seatSoldornot
            for(var newI=0;newI<newY.length;newI++){ 
                if(newY[newI].availability===true){
                    var blockId=document.getElementById(newY[newI].keyy)
                    blockId.classList.remove("seatI")
                    blockId.classList.add("seat-booked")
                }
            }
        }

        let movNamePrint=state.array_recommended
        for(var mp=0;mp<movNamePrint.length;mp++){
            if(movNamePrint[mp].mid===gettingMovieFromParam){
                setMovieNamePrinting(movNamePrint[mp].mname)
                // console.log(movNamePrint)
            }
        } 
    },[param,state.array_recommended,state.duplicateTheaterSeat])   

 
    const book=(idd)=>{
        var makestr=idd.split('') 
        for(var de=0 ;de<4 ;de++){
            makestr.shift()
        }
        var search=parseInt(makestr.join(''))
        
        //ticketCount
        var i=Count
        setIcount(i) 

        var pay=document.getElementById("pay")
        pay.setAttribute("class","blockPayment")
        pay.innerHTML=`Pay Rs:${parseInt(i)*120}`

        // var storagetorf=state.ticketArray[0].movId.Ticket
        var z=movieIds
        if(z.length===0){ 
            i=i-1
            var a=[]
            for(var j=0;j<=i;j++){
                if(makestr.length===1){
                    var existingId=idd.split('')
                    existingId.pop()

                    existingId.push(search+j)
                    var joinn=existingId.join("")
                    var checkavailable=state.ticketArray[0].movId.Ticket
                    
                    for(var idCheck=0;idCheck<checkavailable.length;idCheck++){
                        if(checkavailable[idCheck].keyy===joinn){
                            a.push(joinn) 
                        }
                    }
                }
                else{
                    existingId=idd.split('')
                    existingId.pop()
                    existingId.pop()

                    existingId.push(search+j)
                    joinn=existingId.join("")
                    checkavailable=state.ticketArray[0].movId.Ticket

                    for(idCheck=0;idCheck<checkavailable.length;idCheck++){
                        if(checkavailable[idCheck].keyy===joinn){
                            a.push(joinn) 
                        }
                    }
                }
            }  
            setMovieIds(a)

            var x=[...state.ticketArray[0].movId.Ticket]
            var z=a 
            for(var c=0;c<=z.length-1;c++){ 
                for(var b=0;b<=x.length-1;b++){
                    if(x[b].keyy===z[c]){
                        var update={
                            ...x[b],
                            torf:true,
                            availability:true
                        }
                        x.splice(b,1,update)
                    }
                }
            }           
            setTheaterSeats([x])  
            setnewTrueObjects(x)

            var gettorf=[...x]
            for(var d=0;d<gettorf.length;d++){
                var makeBooking=document.getElementById(gettorf[d].keyy)
                if(gettorf[d].torf === true){
                    makeBooking.classList.add("booked")
                }
                else{
                    makeBooking.classList.remove("booked")
                }
            }                
        }

        else{
            var newcount=movieIds 
            if(newcount.length-1 === i-1){  
                i=i-1
                a=[]
                for(j=0;j<=i;j++){
                    if(makestr.length===1){
                        existingId=idd.split('')
                        existingId.pop()
    
                        existingId.push(search+j)
                        joinn=existingId.join("")
                        checkavailable=state.ticketArray[0].movId.Ticket
                        
    
                        for(idCheck=0;idCheck<checkavailable.length;idCheck++){
                            if(checkavailable[idCheck].keyy===joinn){
                                a.push(joinn) 
                            }
                        }
                    }
                    else{
                        existingId=idd.split('')
                        existingId.pop()
                        existingId.pop()
    
                        existingId.push(search+j)
                        joinn=existingId.join("")
                        checkavailable=state.ticketArray[0].movId.Ticket
    
                        for(idCheck=0;idCheck<checkavailable.length;idCheck++){
                            if(checkavailable[idCheck].keyy===joinn){
                                a.push(joinn) 
                            }
                        }
                    }
                } 
                setMovieIds(a)

                var x=[...state.ticketArray[0].movId.Ticket]
                var z=a 
                for(var c=0;c<=z.length-1;c++){ 
                    for(var b=0;b<=x.length-1;b++){
                        if(x[b].keyy===z[c]){
                            var update={
                                ...x[b],
                                torf:true,
                                availability:true
                            }
                            x.splice(b,1,update)
                        }
                    }
                }           
                setTheaterSeats([x])  
                setnewTrueObjects(x)

                var gettorf=[...x]
                for(var d=0;d<gettorf.length;d++){
                    var makeBooking=document.getElementById(gettorf[d].keyy)
                    if(gettorf[d].torf === true){
                        makeBooking.classList.add("booked")
                    }
                    else{
                        makeBooking.classList.remove("booked")
                    }
                }                   
            }
            else{
                i=i-movieIds.length
                a=[]

                for(j=0;j<i;j++){
                    if(makestr.length===1){
                        existingId=idd.split('')
                        existingId.pop()

                        existingId.push(search+j)
                        joinn=existingId.join("") 
                        checkavailable=state.ticketArray[0].movId.Ticket
                        

                        for(idCheck=0;idCheck<checkavailable.length;idCheck++){
                            if(checkavailable[idCheck].keyy===joinn){
                                a.push(joinn) 
                            }
                        }
                    }
                    else{
                        existingId=idd.split('')
                        existingId.pop()
                        existingId.pop()

                        existingId.push(search+j)
                        joinn=existingId.join("") 
                        checkavailable=state.ticketArray[0].movId.Ticket

                        for(idCheck=0;idCheck<checkavailable.length;idCheck++){
                            if(checkavailable[idCheck].keyy===joinn){
                                a.push(joinn) 
                            }
                        }
                    }
                }
                setMovieIds(movieIds.concat(a))
                var x=[...state.ticketArray[0].movId.Ticket]
                var z=movieIds.concat(a) 
                for(var c=0;c<=z.length-1;c++){ 
                    for(var b=0;b<=x.length-1;b++){
                        if(x[b].keyy===z[c]){
                            var update={
                                ...x[b],
                                torf:true,
                                availability:true
                            }
                            x.splice(b,1,update)
                        }
                    }
                }           
                setTheaterSeats([x])  
                setnewTrueObjects(x)

                var gettorf=[...x]
                for(var d=0;d<gettorf.length;d++){
                    var makeBooking=document.getElementById(gettorf[d].keyy)
                    if(gettorf[d].torf === true){
                        makeBooking.classList.add("booked")
                    }
                }                
            }
        }  
    }
    useEffect(()=>{          
        access()  
    },[movieIds])

    const access=()=>{ 
        var gettorf=newTrueObjects
        var newTrue=[]
        if(gettorf.length>0){ 
            for(var d=0;d<gettorf.length;d++){ 
                if(gettorf[d].torf === true){ 
                    newTrue[newTrue.length]=gettorf[d]
                }
            
            }
            setNewTrueSeats(newTrue) 
        }
        // console.log(newTrue)
    }



    const pageRender=useNavigate()
    const moveToCheckout=()=>{
        if(iCount===movieIds.length){
            // console.log(newTrueSeats)
            var trueSeats=[...state.ticketArray[0].movId.seatSoldornot]
            for(var d=0;d<newTrueObjects.length;d++){ 
                if(newTrueObjects[d].torf === true){ 
                    trueSeats[trueSeats.length]=newTrueObjects[d]
                }
            } 
            var obj={
                movId:
                    {
                        mid:state.ticketArray[0].movId.mid,
                        Ticket:newTrueObjects,
                        movIds:movieIds,
                        store:state.ticketArray[0].movId.store,
                        seatSoldornot:trueSeats
                    },
                    theaterLocation:state.ticketArray[0].theaterLocation,
                    theaterName:state.ticketArray[0].theaterName,
                    theaterTiming:state.ticketArray[0].theaterTiming,
                    theaterTimingString:state.ticketArray[0].theaterTimingString
                } 
            // console.log(obj)
            dispatch(updateTicketArray([obj]))

            var gettingMovieFromParam=param.get('movieId') 
            var gettingTheaterFromParam=param.get('theaterName')
            pageRender(`/checkout?theaterName=${gettingTheaterFromParam}&movieId=${gettingMovieFromParam}`)
        }
        else{
            alert(`only ${movieIds.length} has been selected`)
        }
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: {xs:300,sm:350,md:400},
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius:"12px",
        p: 4,
    };      

    const moveBack=()=>{
        pageRender(`/`)
    }

    window.addEventListener("load", () => {
        pageRender("/")
    });





    //IMAGE 
    const imgshow=(val)=>{  
        let d=state.arrayTicketCount.map((v)=>{
            return v.keyy===val ? {...v,seattorf:true}:{...v,seattorf:false}
        })
        setVal(d) 
    }
    useEffect(()=>{
        runImg(val)
    },[val])
    const runImg=(imgVal)=>{
        if(imgVal){
            var e=imgVal.filter((v)=>{
                if(v.seattorf===true){
                    var setcount=document.getElementById(v.keyy)
                    setcount.setAttribute("class","inputadd")
                    return v
                }
                else{
                    var setcountt=document.getElementById(v.keyy)
                    setcountt.setAttribute("class","")
                    return ""
                }
            }) 
            if(e[0]){ 
                setCount(parseInt(e[0].keyy))
            }
        }
    }
    useEffect(()=>{
        accessImg(Count)
    },[Count])
    const accessImg=()=>{
        var setImg=document.getElementById("setImg")
        if(Count>0){  
            switch(Count){
                case 1:
                    setImg.setAttribute("src",`${require("../Image/cycle.png")}`)
                    break;

                case 2:
                    setImg.setAttribute("src",`${require("../Image/newscooter.png")}`)
                    break;
                
                case 3:
                    setImg.setAttribute("src",`${require("../Image/newauto.png")}`)
                    break;

                case 4:
                    setImg.setAttribute("src",`${require("../Image/newcar.png")}`)
                    break;

                case 5:
                    setImg.setAttribute("src",`${require("../Image/newcar2.png")}`)
                    break;
                
                case 6:
                    setImg.setAttribute("src",`${require("../Image/newcar2.png")}`)
                    break;

                case 7:
                    setImg.setAttribute("src",`${require("../Image/newcar2.png")}`)
                    break;
                
                case 8:
                    setImg.setAttribute("src",`${require("../Image/van.png")}`)
                    break;

                case 9:
                    setImg.setAttribute("src",`${require("../Image/van.png")}`)
                    break;

                case 10:
                    setImg.setAttribute("src",`${require("../Image/van.png")}`)
                    break;
            }
        }
    } 
    const seatConform=()=>{
        setCount(Count)
        setOpen(false)
    }
    const changeSeatCount=()=>{
        setOpen(true)

        var x=[...state.ticketArray[0].movId.Ticket]
        
        var x_mapping_false=x.map((val)=>{
            return val!=="" ? {...val,torf:false,availability:false} : ""
        })

        var obj={
            movId:
                {
                    mid:state.ticketArray[0].movId.mid,
                    Ticket:x_mapping_false,
                    movIds:[],
                    store:state.ticketArray[0].movId.store,
                    seatSoldornot:state.ticketArray[0].movId.seatSoldornot
                },
                theaterLocation:state.ticketArray[0].theaterLocation,
                theaterName:state.ticketArray[0].theaterName,
                theaterTiming:state.ticketArray[0].theaterTiming,
                theaterTimingString:state.ticketArray[0].theaterTimingString
            } 
        dispatch(updateTicketArray([obj]))
        setTheaterSeats([obj])
        setMovieIds([])
    }
    
    return(
        <>
            <Box position={"sticky"} sx={{backgroundColor:"#1f2533",top:"0px"}} py={2}>
                <Container maxWidth="xl">
                    <Box sx={{display:"flex",alignItems:"center",flexWrap:"wrap",justifyContent:"space-around"}}>
                        <Box sx={{width:{xs:"100%",md:"45%"},display:"flex",alignItems:"center",flexWrap:"wrap",justifyContent:"center"}} columnGap={"10px"}>
                            <Box sx={{width:"5%"}}>
                                    <Typography
                                        component="i"
                                        onClick={()=>moveBack()}
                                        sx={{color:"white",fontSize:"25px",cursor:"pointer"}}>
                                            <SlArrowLeft/>
                                    </Typography>
                            </Box>
                            <Box sx={{width:"90%",display:"flex",alignItems:"center",flexWrap:"wrap"}}>
                                <Box sx={{width:"100%",display:"flex",alignItems:"center",flexWrap:"wrap"}}>
                                    <Box sx={{width:"100%",display:"flex",alignItems:"center",flexWrap:"wrap"}}>
                                    <Typography
                                            component="p"
                                            sx={{margin:"0px 10px 0px 0px",fontSize:"12px",color:"gray",height:"20px",width:"20px",borderRadius:"50%",border:"1px solid gray",display:"flex",alignItems:"center",flexWrap:"wrap",justifyContent:"center"}}>
                                        A
                                        </Typography>

                                        <Typography
                                            component="h1"
                                            sx={{color:"gray",width:"80%"}}>
                                            {movieNamePrinting}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{width:"100%",display:"flex",flexWrap:"wrap"}} py={1}>
                                    <Typography
                                        component="p"
                                        px={1}
                                        sx={{fontSize:"12px",color:"gray",display:"flex",alignItems:"center",flexWrap:"wrap",borderRight:"3px solid gray"}}> 
                                       {theaterNamePrinting!==undefined || theaterNamePrinting!=="" ? theaterNamePrinting : ""}
                                    </Typography>
                                    <Typography
                                        component="p"
                                        px={1}
                                        sx={{fontSize:"12px",color:"gray",display:"flex",alignItems:"center",flexWrap:"wrap"}}> 
                                       {movieTimePrinting!==undefined || movieTimePrinting!=="" ? movieTimePrinting : ""}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Box sx={{width:{xs:"100%",md:"45%"},display:"flex",alignItems:"center",flexWrap:"wrap",justifyContent:"end"}}>
                            <Typography
                                component="p"
                                onClick={()=>changeSeatCount()}
                                sx={{color:"gray",fontSize:"13px",border:"1px solid gray",padding:"5px 15px",borderRadius:"12px",cursor:"pointer"}}>
                            {Count} tickets
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Box>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open} 
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                    }}
                >
                    <Fade in={open}>
                    <Box sx={style}> 
                        <Typography
                            component="p"
                            sx={{textAlign:"center"}} py={2}>
                        How Many Seats?
                        </Typography> 
                        <Box sx={{display:"flex",justifyContent:"center"}} py={2}>
                            <Typography
                                component="img"
                                id="setImg"
                                src={require("../Image/cycle.png")}
                                sx={{width:"250px",height:"130px"}}>

                            </Typography>
                        </Box>
                        <Box sx={{display:"flex",justifyContent:"center"}} className="seat-count" py={2}>
                            <input onMouseEnter={()=>imgshow("1")} id="1" value="1" readOnly></input>
                            <input onMouseEnter={()=>imgshow("2")} id="2" value="2" readOnly></input>
                            <input onMouseEnter={()=>imgshow("3")} id="3" value="3" readOnly></input>
                            <input onMouseEnter={()=>imgshow("4")} id="4" value="4" readOnly></input>
                            <input onMouseEnter={()=>imgshow("5")} id="5" value="5" readOnly></input>
                            <input onMouseEnter={()=>imgshow("6")} id="6" value="6" readOnly></input>
                            <input onMouseEnter={()=>imgshow("7")} id="7" value="7" readOnly></input>
                            <input onMouseEnter={()=>imgshow("8")} id="8" value="8" readOnly></input>
                            <input onMouseEnter={()=>imgshow("9")} id="9" value="9" readOnly></input>
                            <input onMouseEnter={()=>imgshow("10")} id="10" value="10" readOnly></input>
                        </Box>
                        <Box className="seat-count" sx={{textAlign:"center"}}>
                            <button className="col-5" type="submit" onClick={()=>seatConform()}>Select Seats</button>
                        </Box>
                    </Box>
                    </Fade>
                </Modal>
            </Box>

            <Box sx={{backgroundColor:"#f2f2f2"}} py={4}>
                <Paper sx={{ width: '90%',margin:"auto"}}>
                    <TableContainer>
                        <Table>
                            <TableBody  p={3}>
                                {
                                    state.theaterAplhabet.map((val)=>{ 
                                    return(
                                            <TableRow> 
                                                <TableCell className="seatRow" sx={{borderWidth:"0px"}}>{Object.keys(val)[0]}</TableCell> 
                                                {
                                                    Object.values(val)[0].map((v,i)=>{
                                                        return v.keyy==="empty" ?

                                                            <TableCell sx={{padding:"0px",borderWidth:"0px"}}>
                                                                <Box className="Emptyspace">
                                                
                                                                </Box>    
                                                            </TableCell> 
                                                        :
                                                            <TableCell className="hoverSeat" sx={{padding:"0px",borderWidth:"0px"}}>
                                                                <Box id={v.keyy} className="seatI" onClick={()=>book(v.keyy)}>
                                                                    <a style={{cursor:"pointer"}}>{v.number}</a>
                                                                </Box>    
                                                            </TableCell> 
                                                        
                                                    })
                                                } 
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>

            <Box position="sticky" sx={{backgroundColor:"white",boxShadow:"0px 0px 10px #ccc",bottom:"0px"}} py={3}>
                <Container>
                    <Box sx={{width:"100%",display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"center"}}>
                        <Box>
                            <Typography 
                                component="a"
                                id="pay"
                                onClick={()=>moveToCheckout()}
                                className="paymentNone">
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </>
    )
}