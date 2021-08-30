import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import Input from '../../components/UI/Input'
import { login } from '../../actions'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'


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
                    <Col md={{ span: 4, offset: 4 }} style={{ padding: '40px', border: '1px solid #cecece', borderRadius: '9%' }}>
                        <Form onSubmit={userLogin}>
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
                            <Form.Group className="mb-3">
                                <Form.Text className="text-danger">
                                    {auth.error}
                                </Form.Text>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Signin
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default Signin
