import React, { useEffect } from 'react'
import Layout from '../../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, FormLabel, Button } from 'react-bootstrap'
import Card from '../../components/UI/Card'
import profilePicture from '../../images/profile.jpeg'
import { generatePublicUrl } from '../../urlConfig'
import { getProfile } from '../../actions'

const Profile = () => {

    const profile = useSelector(state => state.user.profile)

    const formatDate = (fullDate) => {
        if (fullDate) {
            const d = new Date(fullDate);
            let date = d.getDate()
            if (date >= 0 && date <= 9) date = "0" + date
            let month = d.getMonth() + 1
            if (month >= 0 && month <= 9) month = "0" + month
            return `${date}-${month}-${d.getFullYear()}`
        }
        return ""
    }

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProfile())
    }, [])

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
                                    borderRadius: '50%',
                                    width: '150px',
                                    maxWidth: '200px !important',
                                    marginTop: '10px',
                                    height: '150px'
                                }}

                                src={profile.profilePicture ? generatePublicUrl(profile.profilePicture) : profilePicture}>
                            </img>
                        </Col>
                        <Col sm={4}></Col>
                    </Row>
                    <Row>
                        <Col sm={4}></Col>
                        <Col sm={5}>
                            <p style={{ fontWeight: '600' }}>{profile.firstName}{' '}{profile.lastName}</p>
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
                            <Col style={{ fontSize: '12px', fontWeight: 'bold' }} sm={12}>{profile.username}</Col>
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
                            <Col style={{ fontSize: '12px', fontWeight: 'bold' }} sm={12}>{formatDate(profile.birthdate)}</Col>
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
                            <Col style={{ fontSize: '12px', fontWeight: 'bold' }} sm={12}>{profile.gender}</Col>
                        </Row>
                    </Row>
                </Card>
                <Card
                    headerLeft={<h6>Admin profile</h6>}
                >
                    <Row style={{ margin: '20px' }}>
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
                                value={profile.email}
                            />
                        </Col>
                    </Row>
                    <Row style={{ margin: '20px' }}>
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
                                value={profile}
                            />
                        </Col>
                    </Row>
                    <Row style={{ margin: '20px' }}>
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
                                value={profile}
                            />
                        </Col>
                    </Row>
                    <Row style={{ margin: '20px' }}>
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
                {profile.role === 'super-admin' ? (
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
