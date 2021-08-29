import React from 'react'
import Layout from '../../components/Layout'
import { useSelector } from 'react-redux'
import { Row, Col, FormLabel, Button } from 'react-bootstrap'
import Card from '../../components/UI/Card'
import profilePicture from '../../images/profile.jpeg'

const Profile = () => {

    const auth = useSelector(state => state.auth)

    return (
        <Layout sidebar>
            <p style={{ fontWeight: '700', fontSize: '15px' }}>Profile</p>
            <div className="flexRow sb" style={{
                padding: '20px',
                display: 'flex',
            }}>
                <Card
                    style={{
                        width: '55%'
                    }}
                >
                    <Row>
                        <Col sm={4}></Col>
                        <Col sm={4}>
                            <img
                                style={{
                                    borderRadius: '9%',
                                    width: '150px',
                                    maxWidth: '200px !important',
                                    marginTop: '10px',  
                                    height: '150px'
                                }}
                                src={profilePicture}>
                            </img>
                        </Col>
                        <Col sm={4}></Col>
                    </Row>
                    <Row>
                        <Col sm={4}></Col>
                        <Col sm={4}>
                            <p style={{ fontWeight: '600' }}>{auth.user.fullName}</p>
                        </Col>
                        <Col sm={4}></Col>
                    </Row>

                    <hr />
                    <Row style={{
                        marginLeft: '10px',
                    }}>                        <Row>
                            <Col style={{ fontSize: '11px' }} sm={12}>Username</Col>
                        </Row>
                        <Row>
                            <Col style={{ fontSize: '12px', fontWeight: 'bold' }} sm={12}>bardhi</Col>
                        </Row>
                    </Row>
                    <hr />
                    <Row style={{
                        marginLeft: '10px',
                    }}>
                        <Row>
                            <Col style={{ fontSize: '11px' }} sm={12}>Birthday</Col>
                        </Row>
                        <Row>
                            <Col style={{ fontSize: '12px', fontWeight: 'bold' }} sm={12}>10-04-1999</Col>
                        </Row>
                    </Row>
                    <hr />
                    <Row style={{
                        marginLeft: '10px',
                        marginBottom: '10px'
                    }}>
                        <Row>
                            <Col style={{ fontSize: '11px' }} sm={12}>Gender</Col>
                        </Row>
                        <Row>
                            <Col style={{ fontSize: '12px', fontWeight: 'bold' }} sm={12}>Male</Col>
                        </Row>
                    </Row>
                </Card>
                <Card
                    headerLeft={<h6>Admin profile</h6>}
                >
                    <Row style={{margin: '20px'}}>
                        <Col sm={4}>
                            <FormLabel>
                                Email
                            </FormLabel>
                        </Col>
                        <Col sm={8}>
                            <input
                                style={{ width: '90%' }}
                                className="form-control form-control-sm" type="email" 
                                readOnly
                                value={auth.user.email}
                                />
                        </Col>
                    </Row>
                    <Row style={{margin: '20px'}}>
                        <Col sm={4}>
                            <FormLabel>
                                Phone Number
                            </FormLabel>
                        </Col>
                        <Col sm={8}>
                            <input
                                style={{ width: '90%' }}
                                className="form-control form-control-sm" type="email" 
                                readOnly
                                value={auth.user}
                                />
                        </Col>
                    </Row>  
                    <Row style={{margin: '20px'}}>
                        <Col sm={4}>
                            <FormLabel>
                                Address
                            </FormLabel>
                        </Col>
                        <Col sm={8}>
                            <input
                                style={{ width: '90%' }}
                                className="form-control form-control-sm" type="email" 
                                readOnly    
                                value={auth.user}
                                />
                        </Col>
                    </Row>  
                    <Row style={{margin: '20px'}}>
                        <Col sm={9}>
                        </Col>
                        <Col sm={3}>
                            <Button onClick={() => alert("TODO")} variant="success">
                                Update profile
                            </Button>
                        </Col>
                    </Row>  
                </Card>
            </div>

            <Row style={{
                padding: '50px',
                textAlign: 'center'
            }}>
                {auth.user.role === 'super-admin' ? (
                    <Col sm={12}><h1>You are super admin. You have all the privileges.</h1> </Col>
                ) : (
                    <Col sm={12}><h1>You are admin. You have <span style={{ color: 'red' }}>limited</span> privileges.</h1></Col>
                )
                }
            </Row>

        </Layout >
    )
}

export default Profile
