import React from 'react';
import './index.css';
import SelectBox from './SelectBox';

class App extends React.Component{
  state = {
    year:2020,
    month:1,
  }

  render(){
    console.log('RENDERED!')
    return(
        <SelectBox/>
    )
  }
}

export default App;
