import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import Input from '../../components/UI/Input'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signup } from '../../actions'

const Signup = (props) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [birthdate, setBirthDate] = useState('')
    const [gender, setGender] = useState('')
    const [profilePicture, setProfilePicture] = useState('')
    const user = useSelector(state => state.user)
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const handleProfilePicture = (e) => {
        setProfilePicture(e.target.files[0])
    }

    useEffect(() => {
        if (!user.loading) {
            setFirstName("")
            setLastName("")
            setEmail("")
            setPassword("")
            setGender("")
            setBirthDate("")
            setProfilePicture("")
        }
    }, [user.loading])
    
    useEffect(() => {
        if (user.success !== "") {
            props.history.push('/signin')
        }
    }, [user.success])

    const userSignup = (e) => {
        e.preventDefault()

        const form = new FormData()
        form.append('firstName', firstName)
        form.append('lastName', lastName)
        form.append('email', email)
        form.append('password', password)
        form.append('gender', gender)
        form.append('birthdate', birthdate)
        form.append('profilePicture', profilePicture)

        dispatch(signup(form))
    }

    if (auth.authenticate) {
        return <Redirect to="/" />
    }

    if (user.loading) {
        return <p>Loading ...!</p>
    }



    return (
        <Layout>
            <Container style={{ padding: '90px' }}>
                <Row>
                    <Col md={{ span: 6, offset: 3 }} style={{ padding: '30px', border: '1px solid #cecece', borderRadius: '9%' }}>
                        <Form onSubmit={userSignup}>
                            <Row>
                                <Row>
                                    <Col md={12} style={{ textAlign: 'center' }}>
                                        <Form.Group className="mb-3">
                                            {
                                                user.error ? (
                                                    <p style={{ color: 'red' }}>{user.error}</p>
                                                ) : (
                                                    <p style={{ color: 'green' }}>{user.success}</p>
                                                )

                                            }

                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Col md={6}>
                                    <Input
                                        type="text"
                                        label="First Name"
                                        placeholder="First Name"
                                        value={firstName}
                                        required={true}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Input
                                        type="text"
                                        label="Last Name"
                                        placeholder="Last Name"
                                        value={lastName}
                                        required
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Input
                                type="email"
                                label="Email"
                                placeholder="Email"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                type="password"
                                label="Password"
                                placeholder="Enter password"
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Row>
                                <Col>
                                    <Form.Label style={{ fontWeight: '600' }}>
                                        <span style={{ color: 'red' }}>*</span>Gender
                                    </Form.Label>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={{ span: 2 }}>
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                name="gender"
                                                value={'Male'}
                                                onChange={e => setGender(e.target.value)}
                                            />
                                            Male
                                        </label>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                name="gender"
                                                value={'Female'}
                                                onChange={e => setGender(e.target.value)}
                                            />
                                            Female
                                        </label>
                                    </div>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col md={2}>
                                    <Form.Label style={{ fontWeight: '600' }}>
                                        <span style={{ color: 'red' }}>*</span>Birthdate
                                    </Form.Label>
                                </Col>
                                <Col md={5}>
                                    <Form.Control type="date" onChange={e => setBirthDate(e.target.value)} />
                                </Col>
                            </Row>
                            <br />
                            <Form.Group className="mb-3">
                                <Form.Label style={{ fontWeight: '600' }}>
                                    Upload profile picture
                                </Form.Label>
                                <Form.Control type="file" size="sm" onChange={handleProfilePicture} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Sign up
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default Signup
