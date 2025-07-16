const Notification = ({ message ,notificationCss }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={notificationCss}>
      {message}
    </div>
  )
}

export default Notification