import React, { useState } from 'react';
import { Flex, Box, Text, Button } from 'rebass';
import moment from 'moment';


// TODO
// add export as csv option
// add sorting capabilities on graph


function ShipperPrevRoutes() {
  const [previousRoutes, setPreviousRoutes] = useState(null)

  let flaskEndpoint = 'shipper_previous_routes'
  let shipperAccountID = sessionStorage.getItem('id')
  let data = {shipperAccountID: shipperAccountID}

  async function flask(flaskEndpoint, data) {
      try {
        const endpoint = `http://localhost:5000/api/${flaskEndpoint}`
        const configs = {
          method: 'POST',
          body: JSON.stringify(data),
          mode: 'cors',
          headers: {'Content-type' : 'application/json'}
        }
        const res = await fetch(endpoint, configs);
        const json_res = await res.json();
        setPreviousRoutes(json_res['Routes'])
      } catch (err) {
        console.log(err)
      }
  }

  const containerStyles = { 
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center'
  };

  const boxStyles = {
      minWidth: '600px',
      marginTop: '0px',
      textAlign: 'left',
      fontFamily: 'Raleway',
      justifyContent: 'center'
  };

  const textStyles = {
      padding: '35px 0px 0px 0px',
      color: 'rgb(33,60,71)',
      fontSize: '50px',
      fontWeight: 'bold'
  };

  const gridStyles = {
    flexDirection: 'column',
    width: '80%',
    margin: '20px auto',
    paddingTop: '10px',
    backgroundColor: '#427E96', 
    // or this #3A6D82
    fontSize: '15px',
  };

  const labelStyles = {
      padding: '5px',
      color: '#ffffff',
      fontSize: '20px',
      textAlign: 'left', 
      width: '100%',
      textAlign: 'center'
  };

  const cellStyles = {
      paddingTop: '10px',
      width: '100%',
      height: '30px',
      backgroundColor: '#ffffff',
      color: '#000000',
      fontSize: '16px',
      borderStyle: 'solid',
      borderColor: '#427E96',
      borderWidth: '0px 0px 1px 0px',
      textAlign: 'center'
  };

  let routeDisplay = <div></div>;
  if (previousRoutes) {
    console.log("Previous Routes")
    console.log(previousRoutes)
    routeDisplay = previousRoutes.map((data) => (
      
      <Box>
        <Flex >
          <div style={cellStyles}><p>{ data[3] }</p></div>
          <div style={cellStyles}><p>{ moment.unix(data[4]).format("MM/DD/YYYY") }</p></div>
          <div style={cellStyles}><p>{ data[5] }</p></div>
          <div style={cellStyles}><p>{ moment.unix(data[6]).format("MM/DD/YYYY") }</p></div>
          <div style={cellStyles}><p>{ data[7] }</p></div>
          <div style={cellStyles}><p>{ data[7] - data[8] }</p></div>
          <div style={cellStyles}><p>{ data[8] }</p></div>
        </Flex>
      </Box>

    ))
  } else {
    flask(flaskEndpoint, data)
  };


  return (
    <Flex style={containerStyles}>
      <div style={boxStyles}>

        <Box textAlign='center'>
          <Text style={textStyles}>Previous Routes</Text>
        </Box>
        
        <br/>

        <Flex style={gridStyles}>

          <Flex >
            <div style={labelStyles}>Departure Location</div>
            <br/>
            <div style={labelStyles}>Departure Date</div>
            <div style={labelStyles}>Arrival Location</div>
            <div style={labelStyles}>Arrival Date</div>
            <div style={labelStyles}>Available Containers</div>
            <div style={labelStyles}>Donated Containers</div>
            <div style={labelStyles}>Empty Containers</div>
          </Flex>
          
          { routeDisplay }

        </Flex>
        
       
      </div>
    </Flex>    
  )
};
export default ShipperPrevRoutes;