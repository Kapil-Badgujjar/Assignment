export default function User(props) {
  return (
    <>
        <p>Username: <span>{props.user.username}</span></p>
        <p>Email: <span>{props.user.email}</span></p>
    </>
  )
}
