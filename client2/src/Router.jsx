import {Routes, Route} from "react-router-dom";
import Branches from "./pages/Branches";
import Flavors from "./pages/Flavors";
import Prediction from "./pages/Prediction";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Flavors/>}/>
            <Route path="/flavors" element={<Flavors/>}/>
            <Route path="/branches" element={<Branches/>}/>
            <Route path="/prediction" element={<Prediction/>}/>
        </Routes>
    )
}
