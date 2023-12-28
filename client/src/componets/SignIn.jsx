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
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <VStack>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input type="text" onChange={(e) => setName(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input type="email" onChange={(e) => setemail(e.target.value)} />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Box display="flex" gap="3">
          <Input
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
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
            onChange={(e) => setConfirmPassword(e.target.value)}
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

        <Input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files[0]}
        />
      </FormControl>
      <Button type="submit">Sign Up</Button>
    </VStack>
  );
};
export default SignIn;
