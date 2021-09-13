import React from 'react'
import { useSelector } from 'react-redux'
import Layout from '../../components/Layout'
import { Redirect } from 'react-router-dom'

const Admins = () => {

    const auth = useSelector(state => state.auth)
    
    if (auth.user.role !== 'super-admin') {
        return <Redirect to="/" />
    }
    return (
        <Layout sidebar >
            list of admins that only super admin can see
        </Layout>
    )
}

export default Admins
