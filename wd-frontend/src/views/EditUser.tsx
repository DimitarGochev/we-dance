import { useForm } from "react-hook-form";
import { UsersClientService } from "../services/users-service";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { User } from "../models/User";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
    const [currentUser, setCurrentUser] = useState<User>();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (user: any) => {
        UsersClientService.update({...currentUser, ...user}).then((res: any) => navigate('/users')).catch((error) => console.log(error));
    }

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id)
            UsersClientService.findById(id).then((user: User) => setCurrentUser(user)).catch(error => console.log(error));
    }, [id]);

    return (
        <Box sx={{ minHeight: 'calc(100vh - 128px)' }}>
            {(currentUser && <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                placeContent: 'center',
                alignItems: 'center',
                gap: '10px',
                width: 500,
                minWidth: 300,
                height: 'fit-content',
                backgroundColor: 'white',
                boxShadow: '0px 0px 15px 0px rgba(0,0,0,0.42)',
                borderRadius: '10px',
                padding: '20px',
                mt: '20px',
                mb: '20px'
            }}>
                <Typography variant='h4' mb={'20px'}>Edit user</Typography>
                <Box component={'form'} onSubmit={handleSubmit(onSubmit)} autoComplete='off' style={{
                    display: 'flex',
                    flexDirection: 'column',
                    placeContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                }}>
                    <TextField {...register("firstName", { required: true, minLength: 2 })} defaultValue={currentUser.firstName} label="First name" variant="outlined" />
                    {errors.firstName && <span>This field is required</span>}
                    <TextField {...register("lastName", { required: true, minLength: 2 })} defaultValue={currentUser.lastName} label="Last name" variant="outlined" />
                    {errors.lastName && <span>This field is required</span>}
                    <TextField {...register("email", { required: true })} defaultValue={currentUser.email} label="Email" variant="outlined"/>
                    {errors.password && <span>This field is required</span>}
                    <FormControl fullWidth>
                        <InputLabel id="role-select-label">Role</InputLabel>
                        <Select
                            labelId="role-select-label"
                            label="Role"
                            {...register("role", { required: true })}
                            defaultValue={currentUser.role}
                        >
                            <MenuItem value={'user'}>User</MenuItem>
                            <MenuItem value={'admin'}>Admin</MenuItem>
                            <MenuItem value={'trainer'}>Trainer</MenuItem>
                        </Select>
                    </FormControl>
                    {errors.role && <span>This field is required</span>}
                    <TextField {...register("avatar")} defaultValue={currentUser.avatar} label="Image" variant="outlined" />
                    <FormControl fullWidth>
                        <InputLabel id="status-select-label">Status</InputLabel>
                        <Select
                            labelId="status-select-label"
                            label="Status"
                            {...register("status", { required: true })}
                            defaultValue={currentUser.status}
                        >
                            <MenuItem value={'active'}>Active</MenuItem>
                            <MenuItem value={'suspended'}>Suspended</MenuItem>
                            <MenuItem value={'deactivated'}>Deactivated</MenuItem>
                        </Select>
                    </FormControl>
                    {errors.status && <span>This field is required</span>}

                    <Button type='submit' variant="outlined" sx={{ width: '100%' }}>Save</Button>
                </Box>
            </Box>)}
        </Box>
    )

};

export default EditUser;