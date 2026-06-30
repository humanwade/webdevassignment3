import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Icon from "@mui/material/Icon";
import auth from "./auth-helper.js";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signin } from "./api-auth.js";

export default function Signin() {
    const location = useLocation();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        redirectToReferrer: false,
    });

    const clickSubmit = () => {
        const user = {
            email: values.email || undefined,
            password: values.password || undefined,
        };

        signin(user).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                auth.authenticate(data, () => {
                    navigate("/");
                    window.location.reload();
                });
            }
        });
    };

    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };

    return (
        <Card
            sx={{
                maxWidth: 600,
                margin: "auto",
                textAlign: "center",
                mt: 5,
                pb: 2,
            }}
        >
            <CardContent>
                <Typography variant="h6" sx={{ mt: 2, color: "text.primary" }}>
                    Sign In
                </Typography>

                <TextField
                    id="email"
                    type="email"
                    label="Email"
                    sx={{ mx: 1, width: 300 }}
                    value={values.email}
                    onChange={handleChange("email")}
                />

                <TextField
                    id="password"
                    type="password"
                    label="Password"
                    sx={{ mx: 1, width: 300, mt: 2 }}
                    value={values.password}
                    onChange={handleChange("password")}
                />

                {values.error && (
                    <Typography component="p" color="error" sx={{ mt: 2 }}>
                        <Icon color="error" sx={{ verticalAlign: "middle", mr: 0.5 }}>
                            error
                        </Icon>
                        {values.error}
                    </Typography>
                )}
            </CardContent>

            <CardActions
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                }}
            >
                <Button
                    color="primary"
                    variant="contained"
                    onClick={clickSubmit}
                    sx={{ margin: "auto", mb: 1 }}
                >
                    Submit
                </Button>
                <Link to="/signup" style={{ textDecoration: "none", width: "100%" }}>
                    <Button
                        color="secondary"
                        variant="outlined"
                        sx={{ width: "100%", mb: 2 }}
                    >
                        Don't have an account? Sign Up
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
}
