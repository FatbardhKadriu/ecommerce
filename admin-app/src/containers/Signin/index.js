import React from 'react'
import Layout from '../../components/Layout'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import Input from '../../components/UI/Input'
import { login } from '../../actions'
import { useDispatch } from 'react-redux'


const Signin = () => {

    const dispatch = useDispatch()

    const userLogin = (e) => {
        e.preventDefault()
        const user = {
            email: 'fatbardh@gmail.com',
            password: 'bardhi'
        }
        dispatch(login(user))
    }
    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={userLogin}>
                            <Input
                                type="email"
                                label="Email"
                                placeholder="Email"
                                value=""
                                onChange={() => { }}
                            />
                            <Input
                                type="password"
                                label="Password"
                                placeholder="Enter password"
                                value=""
                                onChange={() => { }}
                            />
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
