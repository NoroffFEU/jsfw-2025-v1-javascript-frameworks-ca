import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
      <form
        className="contact-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {/* Full Name */}
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            type="text"
            {...register("fullName")}
            placeholder="Enter your full name"
          />
          <div>{errors.fullName?.message}</div>
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject">Subject</label>
          <input
            id="subject"
            type="text"
            {...register("subject")}
            placeholder="Enter subject"
          />
          <div>{errors.subject?.message}</div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="Enter your email"
          />
          <div>{errors.email?.message}</div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            {...register("message")}
            placeholder="Write your message..."
          />
          <div>{errors.message?.message}</div>
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
