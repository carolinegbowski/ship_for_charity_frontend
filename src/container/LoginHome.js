import React, { useState } from 'react';

// styling imports
import { Flex, Box, Text, Image } from 'rebass';

// component import
import LoginInfo from '../components/LoginInfo';

// file imports
import './loginhome.css';
import waves from '../images/waves5.png';
import shipperIcon from '../images/shipper1.png';
import nonprofitIcon from '../images/ribbon.png';



// TODO: animation here onclick so that logo stays in the same spot 

function LoginHome(props) {

    const [hasChosen, setHasChosen] = useState('')

    const containerStyles = { 
          flexWrap: 'row',
          width: '100%',
          paddingTop: '10%',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center'
    };

    const boxStyles = {
          height: '310px',
          minWidth: '300px',
          // marginTop: '0px',
          // backgroundColor: '#eef5ff',
          backgroundColor: 'rgb(33,60,71)',

          // borderStyle: 'solid',
          // borderWidth: '1px',
          // borderRadius: '4px',
          // borderColor: '#bbbbbb',
          // boxShadow: '2px 2px 3px -1px rgb(120, 120, 120)',
    };

    const imageStyles = {
          height: '200px',
          marginTop: '30px'
    }
  
    const textStyles = {
          // padding: '10px 0px',
          color: 'white',
          // fontFamily: 'Raleway',
          fontSize: '45px',
          fontWeight: 'bold'
    };

    
    return ( 
      <div>

        { hasChosen ? <LoginInfo hasChosen={hasChosen} setID={props.setID} /> :

          <Flex style={containerStyles}>

            {/* <Box height='283px' width='50%' /> */}
            <Image src={waves} height='283px' width='50%' />

            <Box className='box-button' style={boxStyles}
                  onClick={(e)=>setHasChosen('shipper')}>
              <Image src={shipperIcon} style={imageStyles} />
              <Text style={textStyles}>SHIPPER</Text>
            </Box>

            <Box minWidth='50px' />

            <Box className='box-button' style={boxStyles}
                  onClick={(e)=>setHasChosen('np')}>
              <Image src={nonprofitIcon} style={imageStyles} />
              <Text style={textStyles}>NONPROFIT</Text>
            </Box>

            {/* <Box height='283px' width='50%' /> */}
            <Image src={waves} height='283px' width='50%' />

          </Flex>
        }
      </div>
    )
};
export default LoginHome;