import { object, string, boolean } from "yup";

const schema = object({
  email: string().required("Email is required").email("email is invalid"),
  password: string()
    .required("Password is required")
    .min(8, "Password must include at least 8 characters")
    .matches(/\d+/, "Password must contain at least one number"),
});

export default schema;
