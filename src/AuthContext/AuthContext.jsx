import { createContext, useState } from "react"



const initialState = {
    search : "",
    loading: false
}

export const AuthContext = createContext(initialState)
const data = localStorage.getItem("user_name")

const AuthContextProvider = ({children}) => {
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(data)
    const [applyCoupon, setApplyCoupon] = useState({})
    const [total_Price, setTotalPrice] = useState("")
    const [shippingCharges, setShippingCharges] = useState("")
    const [catShop, setCatShop] = useState([])

    return(
        <AuthContext.Provider value={{search, setSearch, loading, setLoading, isLoggedIn, applyCoupon,setApplyCoupon, total_Price, setTotalPrice , shippingCharges, setShippingCharges, catShop, setCatShop}}>
            {children}
        </AuthContext.Provider>
    )
}
    
export default AuthContextProvider;