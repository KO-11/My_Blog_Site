import React, { useEffect, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

//Wrap the router in this component to ensure navigation between screen resets the scroll bar back to the top
function ScrollToTop({ history, children }) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    })
    return () => {
      unlisten()
    }
  }, [])

  return <>{children}</>
}

export default withRouter(ScrollToTop)