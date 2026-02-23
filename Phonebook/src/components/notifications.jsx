const Notification = ({ message, newPerson, showNotification,notificationType}) => {
  if (showNotification === false) {
    return null
  }

  return (
    <div className={notificationType}>
      {message} {newPerson}
    </div>
  )
}

export default Notification