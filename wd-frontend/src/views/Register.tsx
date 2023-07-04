import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { UsersClientService } from "../services/users-service";
import { useNavigate } from "react-router-dom";
import { RegisterService } from "../services/register-service";

const Register = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const onSubmit = (user: any) => {
        RegisterService.register(user).then((res: any) => navigate('/login')).catch((error) => console.log(error));
    }
    const onLogin = () => {
        navigate('/login');
    };

    return (
        <Box sx={{
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
            padding: '20px'
        }}>
            <Typography variant='h4' mb={'20px'}>Register</Typography>
            <Box component={'form'} onSubmit={handleSubmit(onSubmit)} autoComplete='off' style={{
                display: 'flex',
                flexDirection: 'column',
                placeContent: 'center',
                alignItems: 'center',
                gap: '10px',
            }}>
                <TextField {...register("firstName", { required: true })} label="First name" variant="outlined" />
                {errors.firstName && <span>This field is required</span>}
                <TextField {...register("lastName", { required: true })} label="Last name" variant="outlined" />
                {errors.lastName && <span>This field is required</span>}
                <TextField {...register("email", { required: true, maxLength: 15 })} label="Email" variant="outlined" />
                {errors.email && <span>This field is required</span>}
                <TextField {...register("password", { required: true })} label="Password" variant="outlined" type="password" />
                {errors.password && <span>This field is required</span>}
                <TextField {...register("avatar")} label="Avatar" variant="outlined" />

                <Button type='submit' variant="outlined" sx={{ width: '100%' }}>Sign up</Button>
                <Button
                    size="medium"
                    variant="text"
                    sx={{ width: '100%' }}
                    onClick={() => onLogin()}
                >Login</Button>
            </Box>
        </Box>
    )
}

export default Register;