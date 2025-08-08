import { useState } from "react";
import { useLocation, useNavigate } from "react-router"

const Verify = () => {
    const location = useLocation()
    const naviator = useNavigate()
    const [email] = useState(location.state);
    if (!email) {
       naviator("/") 
    }
  return (
    <div>
      <h1>Here is the verify page</h1>
    </div>
  )
}

export default Verify
