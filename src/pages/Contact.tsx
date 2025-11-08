import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ContactForm } from "../interfaces/contact";
import { contactSchema } from "../validation/contactSchema";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: yupResolver(contactSchema),
  });

  // Handle form submission
  const onSubmit: SubmitHandler<ContactForm> = (data) => {
    console.log("Form submitted:", data);
    reset();
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Submit Button */}
        <button type="submit" className="btn add-btn w-100 py-2 mt-3">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
