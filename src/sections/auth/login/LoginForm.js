import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField, Snackbar, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import useToken from '../../../components/useToken';

// ----------------------------------------------------------------------

export default function LoginForm() {

  const { setToken } = useToken()
  const navigate = useNavigate()

  const [loginForm, setloginForm] = useState({
    user: "",
    password: ""
  })

  const [message, setMessage] = useState({
    Success: true,
    Content: ""
  });
  const [open, setOpen] = useState(false);

  const showMessage = (isSuccess, msg) => {
    setMessage({
      Success: isSuccess,
      Content: msg
    })
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [showPassword, setShowPassword] = useState(false);

  const logIn = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginForm)
    }
    const rootUrl = process.env.NODE_ENV === "production" ? "https://thehaoag.pythonanywhere.com" : ""
    fetch(`${rootUrl}/login`, requestOptions)
      .then((res) => res.json()
      .then((result) => {
        if (result.success)
        {
          setToken(result)
          navigate('/dashboard', { replace: true });
        }
        else
        {
          showMessage(result.success, result.msg)
        }
        
      }));
  };

  const handleChange = (event) => { 
    const {value, name} = event.target
    setloginForm(prevNote => ({
        ...prevNote, [name]: value}))
  }

  return (
    <>
      <Stack spacing={3}  sx={{ my: 2 }}>
        <TextField name="user" label="UserName" value={loginForm.user} onChange={handleChange}/>

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={loginForm.password}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={logIn}>
        Login
      </LoadingButton>

      <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'right'}} open={open} autoHideDuration={5000} onClose={handleClose}>
          <Alert onClose={handleClose} variant="filled" severity={message.Success ? "success" : "error"} sx={{ width: '100%' }}>
            {message.Content}
          </Alert>
        </Snackbar>
    </>
  );
}
