import * as yup from "yup";

/**
 * Yup validation schema for the Contact form.
 *
 * Validates:
 * - fullName: required, minimum 3 characters
 * - subject: required, minimum 3 characters
 * - email: required, must be a valid email format
 * - message: required, minimum 10 characters
 *
 * @example
 * contactSchema.validate({ fullName: "John", subject: "Hi", email: "a@b.com", message: "Hello world" })
 */
export const contactSchema = yup
  .object({
    fullName: yup
      .string()
      .min(3, "Full name must be at least 3 characters long.")
      .required("Full name is required."),
    subject: yup
      .string()
      .min(3, "Subject must be at least 3 characters long.")
      .required("Subject is required."),
    email: yup
      .string()
      .email("Please enter a valid email address.")
      .required("Email is required."),
    message: yup
      .string()
      .min(10, "Message must be at least 10 characters long.")
      .required("Message is required."),
  })
  .required();
