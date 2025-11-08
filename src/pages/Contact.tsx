import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ContactForm } from "../interfaces/contact";
import { contactSchema } from "../validation/contactSchema";
import "../styles/contact.css";

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
    <div className="container contact-form">
      <h1>Contact Us</h1>
      <hr className="mt-0"></hr>
      <form className="mt-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Full Name */}
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label fw-bold">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            {...register("fullName")}
            className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
            placeholder="Enter your full name"
          />
          <div className="invalid-feedback">{errors.fullName?.message}</div>
        </div>

        {/* Subject */}
        <div className="mb-3">
          <label htmlFor="subject" className="form-label fw-bold">
            Subject
          </label>
          <input
            id="subject"
            type="text"
            {...register("subject")}
            className={`form-control ${errors.subject ? "is-invalid" : ""}`}
            placeholder="Enter subject"
          />
          <div className="invalid-feedback">{errors.subject?.message}</div>
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-bold">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="Enter your email"
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>

        {/* Message */}
        <div className="mb-3">
          <label htmlFor="message" className="form-label fw-bold">
            Message
          </label>
          <textarea
            id="message"
            {...register("message")}
            className={`form-control ${errors.message ? "is-invalid" : ""}`}
            placeholder="Write your message..."
            rows={5}
          />
          <div className="invalid-feedback">{errors.message?.message}</div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn contact-btn w-100 py-2 mt-3">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
