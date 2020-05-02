import React, { useState } from 'react';

// styling imports
import { Flex, Box, Text, Image, Button } from 'rebass';

// file imports
import '../container/loginhome.css';
import waves from '../images/waves5.png';
import shipperIcon from '../images/shipper1.png';
import nonprofitIcon from '../images/ribbon.png';

function SignUpInfo(props) {
    const [email, setEmail] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [company, setCompany] = useState(null);
    const [EIN, setEIN] = useState(null);
    const [invalidMessage, setInvalidMessage] = useState(null);

    
    let flaskEndpoint = props.hasChosen
    let data
    if (props.hasChosen === 'shipper') {
        data = {
            company: company,
            username: username, 
            password: password,
            email: email
        };
    } else {
        data = {
            EIN: EIN,
            username: username, 
            password: password,
            email: email
        };
    }

    async function EINFlask(EIN, flaskEndpoint, data) {
        try {
          const endpoint = `http://localhost:5000/api/np_check_EIN`
          const EINdata = {EIN: EIN}
          const configs = {
            method: 'POST',
            body: JSON.stringify(EINdata),
            mode: 'cors',
            headers: {'Content-type' : 'application/json'}
          }
          const res = await fetch(endpoint, configs);
          const json_res = await res.json();
          if (json_res['data']['EIN'] === "invalid") {
                setInvalidMessage("Invalid EIN. You must enter a valid Non Profit EIN number to continue.")
            } else {
                let companyName = json_res['data']['Company Name']
                data = {
                EIN: EIN,
                companyName: companyName,
                username: username, 
                password: password,
                email: email
                }
                props.flask((flaskEndpoint + "_create_account"), data)
            } 
        } catch (err) {
            
          console.log(err)
        }
    }

    // Search button works with keyboard ENTER or RETURN
    const onFormSubmit = e => {
        e.preventDefault();
        if (username && password && (company || EIN)) {
            if (props.hasChosen === 'shipper') {
                props.flask((flaskEndpoint + "_create_account"), data);
            } else {
                EINFlask(EIN, flaskEndpoint, data)
            }
        }
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
        height: '370px',
        minWidth: '650px',
        marginTop: '0px',
        padding: '1% 2%',
        textAlign: 'left',
        fontFamily: 'Raleway',
        backgroundColor: 'rgb(33,60,71)',
        // backgroundColor: '#eef5ff',
        // borderStyle: 'solid',
        // borderWidth: '1px',
        // borderRadius: '5px',
        // borderColor: '#bbbbbb',
        // boxShadow: '2px 2px 3px -1px rgb(120, 120, 120)',
    };

    const textStyles = {
        padding: '10px 0px 25px 0px',
        // color: 'rgb(33,60,71)',
        color: '#ffffff',
        fontSize: '34px',
        // fontWeight: 'bold'
    };

    const flexStyles = {
      width: '350px',
      justifyContent: 'space-between'
    };

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
    };

    const buttonStyles = {
        width: '150px',
        backgroundColor: 'white',
        color: 'rgb(33,60,71)',
        borderRadius: '0px',
    };


    return(
        <Flex style={containerStyles}>

        <Image src={waves} height='283px' width='50%' />

        <Box style={boxStyles}>
          <form onSubmit={e => onFormSubmit(e)}>
            <Flex justifyContent='space-between'>
                <div>
                    { (props.hasChosen === 'shipper') ? 
                        <Text style={textStyles}>Shipper Sign Up</Text> : 
                        <Text style={textStyles}>Nonprofit Sign Up</Text> }
                    
                    { (props.hasChosen === 'shipper') ? 
                        <Flex style={flexStyles}>
                            <label style={labelStyles}>Company:</label>
                            <input style={inputStyles} 
                                    onChange={(e)=>setCompany(String(e.target.value))} />
                        </Flex> :
                        <div>
                            <Flex style={flexStyles}>
                            <label style={labelStyles}>EIN:</label>
                            <input style={inputStyles} 
                                    onChange={(e)=>setEIN(String(e.target.value))} />
                            </Flex> 
                            <Flex>
                                {invalidMessage ? <p>{ invalidMessage }</p> : <p></p>}
                            </Flex>
                        </div>
                    }
                    
                    <br/>
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

                    <Flex style={flexStyles}>
                        <label style={labelStyles}>Email:</label>
                        <input type="email" style={inputStyles} 
                                onChange={(e)=>setEmail(String(e.target.value))} />
                    </Flex>
                    <br/>

                    <Flex justifyContent='space-between'>
                        <Button style={buttonStyles} type='submit'>
                            Create Account
                        </Button>
                        <Button style={buttonStyles}
                                onClick={(e) => window.location.reload()}>
                            Cancel
                        </Button>
                    </Flex>
                </div>

                { (props.hasChosen === 'shipper') ? 
                    <Image src={shipperIcon} style={imageStyles} /> : 
                    <Image src={nonprofitIcon} style={imageStyles} /> }
            </Flex>
          </form>
        </Box>
        
        <Image src={waves} height='283px' width='50%' />

        </Flex>
    )
}

export default SignUpInfo;
