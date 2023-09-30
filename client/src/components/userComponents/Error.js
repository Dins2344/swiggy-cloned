import { useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  console.log(err);
  return (
    <>
      <h3>Ooops..!</h3>
      <h5>Something Went Wrong</h5>
      <h4>{err.status + " : " + err.statusText}</h4>
    </>
  );
};


export default Error
