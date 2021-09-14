import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout'
import { Redirect } from 'react-router-dom'
import { getAllAdmins } from '../../actions';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
    { field: 'id', headerName: 'ID', hide: true },
    {
        field: 'fullName',
        headerName: 'Full Name',
        width: 160,
    },
    {
        field: 'email',
        headerName: 'Email',
        type: 'email',
        width: 160,
    },
    {
        field: 'username',
        headerName: 'Username',
        width: 160,
    },
    {
        field: 'gender',
        headerName: 'Gender',
        width: 125,
    },
    {
        field: 'birthdate',
        headerName: 'Birthdate',
        width: 134,
    },
    {
        field: 'phoneNumber',
        headerName: 'Phone Number',
        width: 160,
    },
    {
        field: 'createdAt',
        headerName: 'Created on',
        type: 'date',
        width: 150,
    },
    {
        field: 'updatedAt',
        headerName: 'Updated on',
        width: 180,
    },
];

const Admins = () => {
    const user = useSelector(state => state.user)
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllAdmins())
    }, [])

    if (auth.user.role !== 'super-admin') {
        return <Redirect to="/" />
    }

    return (
        <Layout sidebar>
            <div style={{ width: '100%' }}>
                <DataGrid
                    loading={user.admins?.length === 0}
                    getRowId={row => row._id}
                    autoHeight
                    rows={user.admins}
                    columns={columns}
                    pageSize={9}
                    onCellClick={(e) => console.log(e)}
                    disableSelectionOnClick
                />
            </div>
        </Layout>
    )
}

export default Admins
