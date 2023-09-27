import { BrowserRouter,Routes,Route } from "react-router-dom"
import { Home } from "../Home/Home"
import { Details } from "../Detail/Details"
import { Theater } from "../Theater/Theater"
import { Ticket } from "../Ticket/Ticket"
import { Checkout } from "../Checkout/Checkout"

export const Router=()=>{

    return(
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/" exact element={<Home/>}></Route>
                <Route path="/details" element={<Details/>}></Route>
                <Route path="/theater" element={<Theater/>}></Route>
                <Route path="/ticket" element={<Ticket/>}></Route>
                <Route path="/checkout" element={<Checkout/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}