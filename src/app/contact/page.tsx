"use client";
import { useState } from "react";
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from "react-icons/fa";
import "./contact.css";
import { SocialIconLink } from "@/components/SocialIconLink";
import { Field } from "@/components/Field";

export default function Contact() {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
    const mailtoLink = `mailto:diky@email.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;
    window.location.href = mailtoLink;
    setShowPopup(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section className="w-full h-screen">
      <div className="absolute z-0 h-screen w-screen p-4 md:p-8 flex justify-center items-center">
        <div
          className="bg-gradient relative w-11/12 max-w-md md:w-3/6 md:h-2/8 border-[6px] md:border-[12px] border-black rounded-full flex flex-col justify-center gap-2 shadow-[6px_6px_0px_3px_#000] md:shadow-[10px_10px_0px_5px_#000] overflow-hidden cursor-pointer"
          onClick={() => setShowPopup(true)}
        >
          <div className="relative flex flex-col items-center">
            <p className="text-sm md:text-lg">Ready for collaboration?</p>
            <h1 className="text-4xl md:text-[7rem]">Hit Me Up</h1>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="border-animate relative w-[90vw] max-w-[500px] bg-zinc-800 border border-black rounded-xl flex flex-col">
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

            <div className="flex flex-col overflow-y-auto max-h-[calc(90vh-120px)]">
              <form
                className="flex-1 px-6 py-4 flex flex-col gap-3"
                onSubmit={handleSubmit}
              >
                <Field
                  label="Name"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <Field
                  label="Email"
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <Field
                  label="Subject"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
                <Field
                  label="Message"
                  id="message"
                  name="message"
                  textarea
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={2}
                />
                <button
                  type="submit"
                  className="relative bg-gradient text-white font-semibold py-2 rounded-lg shadow transition hover:-translate-y-1 hover:shadow-lg mt-2"
                >
                  <p className="relative">Send Message</p>
                </button>
              </form>
            </div>

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
        </div>
      )}
    </section>
  );
}
