import React from 'react';

// styling imports
import { Flex, Box, Text } from 'rebass';

// Link-Header-Route
import { Link } from 'react-router-dom';
import { checkPropTypes } from 'prop-types';

const headerLinkStyles = {
  width: '150px',
  marginTop: '15px',
  padding: '4px 4px',
  background: '#white',
  color: 'rgb(33,60,71)',
  fontFamily: 'Raleway',
  fontSize: '15px',
  fontWeight: 'bold',
  borderWidth: '0px',
  // borderRadius: '3px',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  textAlign: 'center'
}

const buttonStyles = {
  width: '150px',
  backgroundColor: 'white',
  color: 'rgb(33,60,71)',
  borderRadius: '0px',
};
function NPHeader(props) {


  function logout() {
    sessionStorage.setItem('id', '')
    sessionStorage.setItem('user_type', "logout")
    props.setID('')
  }

  return (
    <nav>
      <Flex paddingRight='20px'>
        <Link to='/nonprofit/previousroutes' style={headerLinkStyles}>
          Previous Routes</Link>

        <Box width='20px' />

        <Link to='/nonprofit/newroute' style={headerLinkStyles}>
          New Route</Link>

        <Box width='20px' />

        <Link to='' onClick={(e)=>logout()} style={headerLinkStyles}>
          Logout</Link>
      </Flex>
    </nav>
  )
};
export default NPHeader;