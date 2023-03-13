import React, {Component} from 'react';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCheckbox,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow
} from 'mdb-react-ui-kit';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            repeatPassword: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleInputChange(e) {
        const target = e.target;
        const name = target.name;
        this.setState({
            [name]: e.target.value
        })

    }

    handleSubmit() {
        if (this.state.password !== this.state.repeatPassword)
            return;
        var formdata = new FormData();
        formdata.append("name", "ali");
        formdata.append("email", "alim201381@gmail.com");
        formdata.append("password", "123456");

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://localhost:8000/api/register", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));


    }

    render() {
        return (
            <MDBContainer fluid>

                <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
                    <MDBCardBody>
                        <MDBRow>
                            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                <div className="d-flex flex-row align-items-center mb-4 ">
                                    <MDBIcon fas icon="user me-3" size='lg'/>
                                    <MDBInput label='Your Name' id='form1' type='text' className='w-100'
                                              onChange={this.handleInputChange}/>
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="envelope me-3" size='lg'/>
                                    <MDBInput label='Your Email' id='form2' type='email'/>
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="lock me-3" size='lg'/>
                                    <MDBInput label='Password' id='form3' type='password'/>
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="key me-3" size='lg'/>
                                    <MDBInput label='Repeat your password' id='form4' type='password'/>
                                </div>

                                <div className='mb-4'>
                                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault'
                                                 label='Subscribe to our newsletter'/>
                                </div>

                                <MDBBtn className='mb-4' size='lg'
                                        onClick={this.handleSubmit}>Register</MDBBtn>

                            </MDBCol>

                            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                                <MDBCardImage
                                    src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp'
                                    fluid/>
                            </MDBCol>
                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>

            </MDBContainer>
        );
    }
}

export default Login;