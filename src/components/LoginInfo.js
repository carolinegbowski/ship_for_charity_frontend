import React, { useState } from 'react';

// styling imports
import { Flex, Box, Text, Image, Button } from 'rebass';

// file imports
import '../container/loginhome.css';
import waves from '../images/waves5.png';
import shipperIcon from '../images/shipper1.png';
import nonprofitIcon from '../images/ribbon.png';

// component imports
import SignUpInfo from './SignUpInfo'


function LoginInfo(props) {
    // const [company, setCompany] = useState('')
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [newClient, setNewClient] = useState(false)

    let flaskEndpoint = props.hasChosen

    const data = {
        // company: company,
        username: username, 
        password: password
    }


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
          if (json_res) {
            sessionStorage.setItem("id", json_res['pk'])
            sessionStorage.setItem("user_type", props.hasChosen )
            props.setID(json_res['pk'])
          }
        } catch (err) {
          console.log(err)
        }
    }

    const onFormSubmit = e => {
      e.preventDefault();
      if (username && password) {
        flask((flaskEndpoint + "_login"), data);
      };
    };

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
          minWidth: '650px',
          marginTop: '0px',
          padding: '1% 2%',
          textAlign: 'left',
          fontFamily: 'Raleway',
          backgroundColor: 'rgb(33,60,71)',
          // borderStyle: 'solid',
          // borderWidth: '1px',
          // borderRadius: '5px',
          // borderColor: '#bbbbbb',
          // boxShadow: '2px 2px 3px -1px rgb(120, 120, 120)',
    };

    const textStyles = {
        padding: '10px 0px 25px 0px',
        // color: 'rgb(33,60,71)',
        color: 'white',
        fontSize: '34px',
        // fontWeight: 'bold'
    };

    const flexStyles = {
        width: '350px',
        justifyContent: 'space-between'
    }

    const labelStyles = {
        width: '100px',
        paddingRight: '10px',
        color: 'white',
        fontFamily: 'Raleway',
        fontSize: '20px'
    };

    const inputStyles = {
        height: '30px',
        width: '200px',
        borderStyle: 'solid',
        borderWidth: '2px',
        borderColor: '#aaaaaa'
    };

    const imageStyles = {
        height: '160px',
        marginTop: '30px',
        paddingBottom: '0px',
    }
    // need to fix color onclick 
    const buttonStyles = {
        width: '100px',
        backgroundColor: 'white',
        color: 'rgb(33,60,71)',
        borderRadius: '0px',



  }

    return(
      <div>
        { newClient ? <SignUpInfo flask={flask} setID={props.setID} hasChosen={props.hasChosen}/> : 
          <Flex style={containerStyles}>

            <Image src={waves} height='283px' width='50%' />

            <Box style={boxStyles}>
              <form onSubmit={e => onFormSubmit(e)}>
                <Flex justifyContent='space-between'>
                  <div>

                    { (props.hasChosen === 'shipper') ? 
                        <Text style={textStyles}>SHIPPER LOGIN</Text> : 
                        <Text style={textStyles}>Nonprofit Login</Text> }
                    
                    <Flex style={flexStyles}>
                        <label style={labelStyles}>Username:</label>
                        <input style={inputStyles} 
                                onChange={(e)=>setUsername(String(e.target.value))} />
                    </Flex>
                    <br/>

                    <Flex style={flexStyles}>
                        <label style={labelStyles}>Password:</label>
                        <input type="password" style={inputStyles} 
                                onChange={(e)=>setPassword(String(e.target.value))} />
                    </Flex>
                    <br/>
                  </div>

                  { (props.hasChosen === 'shipper') ? 
                      <Image src={shipperIcon} style={imageStyles} /> : 
                      <Image src={nonprofitIcon} style={imageStyles} /> }
                </Flex>

                <Flex width={3/5} justifyContent='space-between' marginTop='40px'>
                    <Button type='submit' style={buttonStyles}>
                      Login
                    </Button>
                    <Button style={buttonStyles}
                            onClick={(e)=>setNewClient(true)}>
                      Sign Up
                    </Button>
                    <Button style={buttonStyles}
                            onClick={(e) => window.location.reload()}>
                      Cancel
                    </Button>
                </Flex>
              </form>
            </Box>
            
            <Image src={waves} height='283px' width='50%' />

          </Flex>
          }
      </div> 
    )
};
export default LoginInfo;
