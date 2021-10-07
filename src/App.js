import React, { useRef } from 'react';
import { useHistory } from 'react-router';
import './App.css';
function App() {

  const filterRef = useRef()
  const history = useHistory()
  const onFilterChange = e => {
    history.replace({
      pathname: '/',
      search: '?color='
    })
  }

  return (
    <div className="App">
      <input onChange={onFilterChange} ref={filterRef} type="text" />
      <button onClick={e => console.log(filterRef.current.value)} >hit</button>
    </div>
  );
}

export default App;
