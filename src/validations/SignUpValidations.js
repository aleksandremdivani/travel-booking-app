import { object, string, boolean } from "yup";

const nameRules = (name) => string()
  .required(`${name} is required`)
  .matches(/^[a-zA-Z\s]+$/, `${name} cannot contain numbers or any special characters`);

const schema = object({
  firstName: nameRules("first name"),
  lastName: nameRules("last name"),
  email: string().required("Email is required").email("email is invalid"),
  password: string()
    .required("Password is required")
    .min(8, "Password must include at least 8 characters")
    .matches(/\d+/, "Password must contain at least one number"),
   terms: boolean()
   .oneOf([true], "You must accept the terms and conditions")
});

export default schema;
