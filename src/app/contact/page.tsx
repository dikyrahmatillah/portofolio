"use client";
import { useState } from "react";
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from "react-icons/fa";
import "./contact.css";
import { SocialIconLink } from "@/components/SocialIconLink";
import { Field } from "@/components/Field";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod schema for validation
const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(2, "Message is required"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const [showPopup, setShowPopup] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  // Handler to update field values
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.name as keyof ContactForm, e.target.value, {
      shouldValidate: true,
    });
  };

  const onSubmit = (data: ContactForm) => {
    const { name, email, subject, message } = data;
    const mailtoLink = `mailto:diky@email.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;
    window.location.href = mailtoLink;
    setShowPopup(false);
    reset();
  };

  return (
    <div id="contact">
      <section className="w-full h-screen">
        <div className="absolute z-0 h-screen w-screen p-4 md:p-8 flex justify-center items-center">
          <div
            className="bg-gradient relative w-11/12 max-w-md md:w-3/6 md:h-2/8 border-[6px] md:border-[12px] border-black rounded-full flex flex-col justify-center gap-2 shadow-[6px_6px_0px_3px_#000] md:shadow-[10px_10px_0px_5px_#000] overflow-hidden cursor-pointer"
            onClick={() => setShowPopup(true)}
          >
            <div className="relative flex flex-col items-center py-2">
              <p className="text-sm">Ready for collaboration?</p>
              <h1 className="text-4xl">Hit Me Up</h1>
            </div>
          </div>
        </div>
      </section>

      {showPopup && (
        <section
          className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="border-animate relative w-[90vw] max-w-[500px] bg-zinc-800 border border-black rounded-xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-shrink-0 flex justify-between items-center px-6 py-3 border-b border-zinc-200/30">
              <h2 className="text-xl text-zinc-200 font-semibold m-0">
                Contact Me
              </h2>
              <button
                className="text-2xl text-zinc-400 hover:bg-zinc-100 hover:text-zinc-800 rounded-full w-8 h-8 flex items-center justify-center transition cursor-pointer"
                onClick={() => setShowPopup(false)}
              >
                ×
              </button>
            </div>
            <form
              className="flex flex-col gap-2 px-6 py-4"
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off"
            >
              <Field
                label="Name"
                id="name"
                name="name"
                value={watch("name") || ""}
                onChange={handleChange}
                required
                error={errors.name?.message}
              />
              <Field
                label="Email"
                id="email"
                name="email"
                type="email"
                value={watch("email") || ""}
                onChange={handleChange}
                required
                error={errors.email?.message}
              />
              <Field
                label="Subject"
                id="subject"
                name="subject"
                value={watch("subject") || ""}
                onChange={handleChange}
                required
                error={errors.subject?.message}
              />
              <Field
                label="Message"
                id="message"
                name="message"
                textarea
                rows={2}
                value={watch("message") || ""}
                onChange={handleChange}
                required
                error={errors.message?.message}
              />
              <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium"
              >
                <p className="relative">Send Message</p>
              </button>
            </form>

            <div className="flex-shrink-0 pt-2 px-6 pb-3 border-t border-white/10 text-center mt-auto">
              <p className="text-white/80 text-sm mb-2">
                Or connect with me on:
              </p>
              <div className="flex justify-center gap-4">
                <SocialIconLink
                  href="https://linkedin.com/in/dikyrahmatillah"
                  hoverBg="hover:bg-blue-500/30"
                >
                  <FaLinkedin size={18} />
                </SocialIconLink>
                <SocialIconLink
                  href="https://github.com/dikyrahmatillah"
                  hoverBg="hover:bg-gray-800/60"
                >
                  <FaGithub size={18} />
                </SocialIconLink>
                <SocialIconLink
                  href="https://twitter.com/dikyrahmatillah"
                  hoverBg="hover:bg-blue-400/40"
                >
                  <FaTwitter size={18} />
                </SocialIconLink>
                <SocialIconLink
                  href="mailto:diky@email.com"
                  hoverBg="hover:bg-cyan-400/40"
                >
                  <FaEnvelope size={18} />
                </SocialIconLink>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
