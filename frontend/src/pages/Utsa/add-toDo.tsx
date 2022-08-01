import { Button, Grid } from '@mui/material'
import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react'
import MyTextfield from '../../components/form-components/my-textfield'
import { useLocation } from 'react-router-dom';
import MyTable, { onRowAdd, onRowUpdate, onRowDelete } from '../../components/my-table';

export default function AddToDo() {
    const [description, setDescription] = useState('');
    const [showTable, setShowTable] = useState(true);
    const { enqueueSnackbar } = useSnackbar();
    const { state }: { state: any } = useLocation(); //inline class , {state} is an object

    const [todolists, setState] = useState({
        columns: [
            { title: "ID", field: "id" },
            { title: "Customer Name", field: "customer.name" },
            { title: "Description", field: "description" },
        ],
        data: [
        ],
    });

    return (
        <Grid container direction="row" spacing={10}>
            <Grid container item direction="row" spacing={10} justifyContent="space-around">
                <Grid item >
                    <MyTextfield
                        label="Task Description"
                        value={description}
                        onChange={(event) => { setDescription(event.target.value) }}
                    />
                </Grid>
            </Grid>
            <Grid container item justifyContent='center' spacing={10}>
                <Grid item>
                    <Button variant='contained' onClick={event => {
                        axios.post('http://localhost:7982/add-toDo', { description: description, customer: state }).then(res => {
                            if (res.data) {
                                enqueueSnackbar('Task added successfully', { variant: 'success' });
                            }
                            else {
                                enqueueSnackbar('Task not added', { variant: 'error' });
                            }

                        })
                    }}>Add ToDo</Button>
                </Grid>

                <Grid item>
                    <Button variant='contained' onClick={event => {
                        setShowTable(true);
                        axios.get('http://localhost:7982/get-all-todo-by-customer/' + state.id).then(res => {
                            if (res.data) {
                                setState({...todolists,data:res.data});
                            }
                            else {
                                //enqueueSnackbar('Task not added', { variant: 'error' });
                            }

                        })
                    }}>Show ToDo</Button>
                </Grid>
            </Grid>

            {
                showTable && 
            
            <Grid item>
                <MyTable
                    // @ts-ignore
                    columns={todolists.columns}
                    data={todolists.data}
                    editable={{
                        onRowAdd: onRowAdd(todolists.data, (newData) =>
                            setState({ ...todolists, data: newData })
                        ),
                        onRowUpdate: onRowUpdate(state.data, (newData) =>
                            setState({ ...todolists, data: newData })
                        ),
                        onRowDelete: onRowDelete(state.data, (newData) =>
                            setState({ ...todolists, data: newData })
                        ),
                    }}
                />
            </Grid>
        }
        </Grid>
    )
}
