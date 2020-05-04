const notificationReducer = (state = '', action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'CLEAR_NOTIFICATION':
      return ''
    
    default:
      return state
  }

}

let timeoutID;

export const setNotification = (notification, timeOutSec) => {
  return async dispatch => {

    clearTimeout(timeoutID)

    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })

    timeoutID = setTimeout(
      () => dispatch({
        type: 'CLEAR_NOTIFICATION'
      }),
      timeOutSec * 1000
    )
 

  }

}


export default notificationReducer