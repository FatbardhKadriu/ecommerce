import React, { useEffect } from 'react';
import Layout from '../../components/Layout'
import { DataGrid } from '@material-ui/data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../actions';

const columns = [
    { field: 'id', headerName: 'ID', hide: true },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 160,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 160,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 160,
    },
    {
        field: 'username',
        headerName: 'Username',
        width: 160,
    },
    {
        field: 'birthdate',
        headerName: 'Birthdate',
        width: 160,
    },
    {
        field: 'phoneNumber',
        headerName: 'Phone Number',
        width: 160,
    },
    {
        field: 'createdAt',
        headerName: 'Created at',
        width: 210,
    },
    {
        field: 'updatedAt',
        headerName: 'Updated at',
        width: 210,
    },

];

const Users = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllUsers())
    }, [])

    return (
        <Layout sidebar>
            <div style={{ width: '100%' }}>
                {
                    user.users?.length > 0 && (
                        <DataGrid
                            getRowId={row => row._id}
                            autoHeight
                            rows={user.users}
                            columns={columns}
                            pageSize={9}
                            onCellClick={(e) => console.log(e)}
                            disableSelectionOnClick
                        />
                    )
                }
            </div>
        </Layout>
    )
}


export default Users