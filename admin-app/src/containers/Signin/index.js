import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import Input from '../../components/UI/Input'
import { login } from '../../actions'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'

const Signin = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [error, setError] = useState('')
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)

    const userLogin = (e) => {
        e.preventDefault()
        if (email === "" || password === "") return
        const user = { email, password }
        dispatch(login(user))
    }

    if (auth.authenticate) {
        return <Redirect to="/" />
    }

    return (
        <Layout>
            <Container style={{ padding: '120px' }}>
                <Row>
                    <Col
                        style={{
                            backgroundColor: '#fff',
                            padding: '40px 20px 14px 20px',
                            border: ' 1px solid #cecece',
                            bordeRadius: '9px',
                            width: '396px',
                            margin: 'auto',
                            boxShadow: '0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)',
                        }}
                        md={{ span: 4, offset: 4 }}>
                        <Form onSubmit={userLogin}>
                            <Input
                                type="email"
                                label="Email"
                                placeholder="Email"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px'
                                }}
                            />
                            <Input
                                type="password"
                                label="Password"
                                placeholder="Enter password"
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px'
                                }}
                            />
                            <p style={{
                                color: '#f02849',
                                fontFamily: 'SFProText-Regular, Helvetica, Arial, sans-serif',
                                fontSize: '13px',
                                lineHeight: '16px',
                                textAlign: 'left',
                            }}>{auth.error}</p>
                            <Button style={{
                                width: '100%',
                                padding: '10px'
                            }} variant="primary" type="submit">
                                Signin
                            </Button>
                            <Form.Group style={{ float: 'right', marginTop: '2%' }} >
                                <Form.Text>
                                    <Link to="/signup" style={{ textDecoration: 'none' }}>
                                        Don't have an account? Sign up.
                                    </Link>
                                </Form.Text>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout >
    )
}

export default Signin
