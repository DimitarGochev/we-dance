import { Box, Button, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import { LoginService } from "../services/login-service";


const Login = () => {
    const { loggedUser, setLoggedUser } = useContext(UserContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    
    const navigate = useNavigate();
    const onSubmit = (data: any) => {
        LoginService.login(data).then((user) => {
            sessionStorage.setItem('loggedUser', JSON.stringify(user));
            setLoggedUser(user);
            navigate('/home');
        }).catch(() => {});
    }
    const onRegister = () => {
        navigate('/register');
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
            <Typography variant='h4' mb={'20px'}>Login</Typography>
            <Box component={'form'} onSubmit={handleSubmit(onSubmit)} autoComplete='off' style={{
                display: 'flex',
                flexDirection: 'column',
                placeContent: 'center',
                alignItems: 'center',
                gap: '10px',
            }}>
                <TextField {...register("email", { required: true })} label="email" variant="outlined" />
                {errors.email && <span>This field is required</span>}
                <TextField {...register("password", { required: true })} label="Password" variant="outlined" type="password"/>
                {errors.password && <span>This field is required</span>}
                <Button type='submit' variant="outlined" sx={{ width: '100%' }}>Sign in</Button>
                <Button
                    size="medium"
                    variant="text"
                    sx={{ width: '100%' }}
                    onClick={() => onRegister()}
                >Register</Button>
            </Box>
        </Box>
    )
}

export default Login;