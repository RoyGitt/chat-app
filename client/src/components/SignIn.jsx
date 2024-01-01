import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("No input");
      return;
    }

    try {
      setLoading(true);
      setError(false);
      const config = { "Content-Type": "application/json" };
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: config,
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(false);
      console.log(data);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <VStack>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input type="email" id="email" onChange={handleChange} />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Box display="flex" gap="3">
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            onChange={handleChange}
          />
          <Button
            onClick={() => {
              setShowPassword((prev) => !prev);
            }}
          >
            {showPassword ? "Hide" : "Show"}
          </Button>
        </Box>
      </FormControl>

      <Button type="submit" onClick={handleSignIn}>
        Sign In
      </Button>
      {error && <p>{error}</p>}
    </VStack>
  );
};
export default SignUp;
