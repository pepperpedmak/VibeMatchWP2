import React from "react";
 
const App = () => {
  return(
    <>
      <h1 className="text-red-600">Welcome Back!</h1>
      <form>
        <input type='number' name='number' placeholder='Phone Number' required></input>
        <button type='submit'>Submit</button>
      </form>

    </>
  );
};

export default App;