import React from 'react';
import { Link } from 'react-router-dom';

// styling imports
import { Flex, Box, Text, Image } from 'rebass';

// components
import ShipperHeader from './ShipperHeader';
import NPHeader from './NPHeader';

// files
// import mapBanner from '../images/mapBanner.png';
import shipperIcon from '../images/shipper1.png';
import nonprofitIcon from '../images/ribbon.png';


function Header(props) {

  let userType = sessionStorage.getItem('user_type')

  const headerStyles = {
    // height: '70px',
    backgroundColor: 'rgb(33,60,71)',
    justifyContent: 'space-between',
    paddingTop: '10px'
    // padding: '12px 0 0 0',
    // justifyContent: 'center'
  };

  const companyNameStyles = {
    color: '#eef0ff',
    fontFamily: 'Raleway',
    // textShadow: 'white 1px 0 10px',
    // textShadow: '-2px 0px 0 #D9D9D9',
    fontSize: '40px',
    fontWeight: 'bold',
    textDecoration: 'none',
    paddingLeft: '15px',
  };

  const iconStyles = {
    height: '55px',
    width: '55px',
    marginTop: '5px',
    // marginRight: '15px',
    // marginLeft: '15px',
    backgroundColor: '#eef0ff',
    // borderStyle: 'solid',
    // borderColor: '#eef0ff',
    borderRadius: '3px'
  };

  const mapStyles = { 
    // flexWrap: 'row',
    // width: '100%',
    // textAlign: 'center',
    // justifyContent: 'center',
    // alignItems: 'center'
  };

  return (
    <header>

      {/* HEADER NAV BAR */}
      <Flex style={headerStyles}>
      {/* width='900px' justifyContent='space-between' */}
        {/* <Flex > */}
          <Text style={companyNameStyles}>Ship for Charity</Text>
        
        <Flex>
          <div>
            { (userType === 'shipper') && <ShipperHeader id={props.id} setID={props.setID}/> } 
            { (userType === 'np') &&  <NPHeader  id={props.id} setID={props.setID}/> }
          </div>
          <Box styles={iconStyles}>
            { (userType === null || userType === "logout") && 
                                    (<div>
                                      <Image src={shipperIcon} style={iconStyles} /> 
                                      <Image src={nonprofitIcon} style={iconStyles} />
                                    </div>) }
            { (userType === 'shipper') && <Image src={shipperIcon} style={iconStyles} /> } 
            { (userType === 'np') &&  <Image src={nonprofitIcon} style={iconStyles} /> }
          </Box>
        </Flex>
          
        {/* </Flex> */}
      </Flex>

      {/* MAP */}
      { props.id ?
          <Box style={mapStyles}>
            <iframe src="//www.shipmap.org" frameborder="0" height='400px' width='100%' >
            </iframe>
            <br/><br/>
          </Box> : <div></div>
      }

    </header>
  )
};
export default Header;