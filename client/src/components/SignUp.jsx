import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    pic: "",
  });

  const handleChange = (e) => {
    if (e.target.id === "pic") {
      setFormData((prev) => {
        return { ...prev, pic: e.target.files[0] };
      });
    }

    setFormData((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  console.log(formData);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.username) {
      setError("No input");
      return;
    }

    if (formData.confirmPassword !== formData.password) {
      setError("Confirmed password does not matches with password");
      return;
    }

    try {
      setLoading(true);
      setError(false);
      const config = { "Content-Type": "application/json" };
      const res = await fetch("/api/auth/sign-up", {
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
        <FormLabel>Name</FormLabel>
        <Input type="text" id="username" onChange={handleChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input type="email" onChange={handleChange} id="email" />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Box display="flex" gap="3">
          <Input
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            id="password"
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
      <FormControl>
        <FormLabel>Confirm Password</FormLabel>
        <Box display="flex" gap="3">
          <Input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            onChange={handleChange}
          />
          <Button
            onClick={() => {
              setShowConfirmPassword((prev) => !prev);
            }}
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </Button>
        </Box>
      </FormControl>
      <FormControl>
        <FormLabel>Upload your picture</FormLabel>

        <Input type="file" accept="image/*" onChange={handleChange} id="pic" />
      </FormControl>
      <Button type="submit" onClick={handleSignUp}>
        Sign Up
      </Button>
      {error && <p>{error}</p>}
    </VStack>
  );
};
export default SignIn;
