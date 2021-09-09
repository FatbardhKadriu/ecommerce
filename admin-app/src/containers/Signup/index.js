import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import Input from '../../components/UI/Input'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signup } from '../../actions'
import { ToastContainer, toast } from 'react-toastify'
import { userConstants } from '../../actions/constants'
import { Link } from 'react-router-dom'

const Signup = (props) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [birthdate, setBirthDate] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [gender, setGender] = useState('')
    const [profilePicture, setProfilePicture] = useState('')
    const [optionalPart, setOptionalPart] = useState(false)
    const user = useSelector(state => state.user)
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const handleProfilePicture = (e) => {
        setProfilePicture(e.target.files[0])
    }

    // useEffect(() => {
    //     if (!user.loading) {
    //         setFirstName("")
    //         setLastName("")
    //         setEmail("")
    //         setPassword("")
    //         setGender("")
    //         setBirthDate("")
    //         setProfilePicture("")
    //     }
    // }, [user.loading])

    useEffect(() => {
        if (user.success) {
            toast.success(user.success, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        if (user.error) {
            toast.error(user.error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored'
            });
        }
        dispatch({ type: userConstants.RESET_MESSAGES })

    }, [user.success, user.error])

    useEffect(() => {
        if (user.success !== null) {
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
        form.append('phoneNumber', phoneNumber)
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
            <ToastContainer />
            <Container style={{ padding: '90px' }}>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}

                        style={{
                            padding: '40px 20px 14px 20px',
                            border: '1px solid #cecece',
                            borderRadius: '9px',
                            boxShadow: '0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)',
                            backgroundColor: 'white',
                        }}>
                        <Form onSubmit={userSignup}>
                            <Row>
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
                            <Form.Check
                                type={'checkbox'}
                                label={`Optional`}
                                onClick={() => optionalPart ? setOptionalPart(false) : setOptionalPart(true)}
                                checked={optionalPart}
                            />
                            <br />
                            {
                                optionalPart && (
                                    <>
                                        <Row>
                                            <Col>
                                                <Form.Label style={{ fontWeight: '600' }}>
                                                    Gender
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
                                            <Col md={4}>
                                                <Form.Label style={{ fontWeight: '600' }}>
                                                    Birthdate
                                                </Form.Label>
                                            </Col>
                                            <Col md={5}>
                                                <Form.Control type="date" onChange={e => setBirthDate(e.target.value)} />
                                            </Col>
                                        </Row>
                                        <br />
                                        <Row>
                                            <Col md={4}>
                                                <Form.Label style={{ fontWeight: '600' }}>
                                                    Phone number
                                                </Form.Label>
                                            </Col>
                                            <Col md={5}>
                                                <input
                                                    className="form-control form-control-sm"
                                                    type={'tel'}
                                                    pattern="04[4-6 | 9]{1}-[0-9]{3}-[0-9]{3}"
                                                    value={phoneNumber}
                                                    maxlength={11}
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                />
                                                <small
                                                    style={{ fontSize: '11px' }}
                                                    class="form-text text-muted">Format: 045-123-123</small>

                                            </Col>
                                        </Row>
                                        <br />
                                        <Form.Group className="mb-3">
                                            <Form.Label style={{ fontWeight: '600' }}>
                                                Upload profile picture
                                            </Form.Label>
                                            <Form.Control type="file" size="sm" onChange={handleProfilePicture} />
                                        </Form.Group>
                                    </>
                                )
                            }
                            <Button style={{ float: 'right', padding: '10px 20px' }} variant="success" type="submit">
                                Sign up
                            </Button>
                            <Form.Group>
                                <Form.Text>
                                    <Link to="/signin" style={{ textDecoration: 'none' }}>
                                        Already signed up? Sign in.
                                    </Link>
                                </Form.Text>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default Signup
