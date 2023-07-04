import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RegisterService } from "../services/register-service";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const Register = () => {
    yup.setLocale({
        mixed: {
            required: 'Required Field'
        },
        string: {
            min: 'Please enter at least 1 character',
            max: 'Max accepted lenght exceeded',
            email: 'Please enter a valid email',
            matches: 'The passsword must contain at least 6 characters, 1 lower case and 1 capital case letters and 1 special character.'
        }
    });
    const schema = yup
        .object({
            firstName: yup.string().required().min(1).max(20),
            lastName: yup.string().required().min(1).max(20),
            email: yup.string().required().email(),
            password: yup.string().required().matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20}/),
            avatar: yup.string().url()
        })
        .required()

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const [error, setError] = useState<{ message: string }>();
    const navigate = useNavigate();
    const onSubmit = (user: any) => {
        RegisterService.register(user).then((res: any) => navigate('/login')).catch((error) => setError(error));
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
                {errors.firstName && <span style={{ textAlign: 'center' }}>{errors.firstName.message}</span>}
                <TextField {...register("lastName", { required: true })} label="Last name" variant="outlined" />
                {errors.lastName && <span style={{ textAlign: 'center' }}>{errors.lastName.message}</span>}
                <TextField {...register("email", { required: true, maxLength: 15 })} label="Email" variant="outlined" />
                {errors.email && <span style={{ textAlign: 'center' }}>{errors.email.message}</span>}
                <TextField {...register("password", { required: true })} label="Password" variant="outlined" type="password" />
                {errors.password && <span style={{ textAlign: 'center' }}>{errors.password.message}</span>}
                <TextField {...register("avatar")} label="Avatar" variant="outlined" />
                {errors.avatar && <span style={{ textAlign: 'center' }}>{errors.avatar.message}</span>}

                <Button type='submit' variant="outlined" sx={{ width: '100%' }}>Sign up</Button>
                <Button
                    size="medium"
                    variant="text"
                    sx={{ width: '100%' }}
                    onClick={() => onLogin()}
                >Login</Button>
            </Box>
            {error && <Typography variant='subtitle1' color='red' mb={'20px'}>{error.message}</Typography>}
        </Box>
    )
}

export default Register;