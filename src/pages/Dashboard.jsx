import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"

import Sidebar from "../components/core/Dashboard/Sidebar"
import { getUserDetails } from "../services/operations/profileAPI"

function Dashboard() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)

  useEffect(() => {
    if (token && !user) {
      dispatch(getUserDetails(token, navigate))
    }
  }, [token, user, dispatch, navigate])

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar />
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard