import {Outlet, Navigate} from 'react-router-dom'

const ProtectedRoutesComponent = () => {
    const auth = false
    return auth? <Outlet/> : <Navigate to="/login" />
}

export default ProtectedRoutesComponent