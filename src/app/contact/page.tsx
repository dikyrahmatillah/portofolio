"use client";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactPopup } from "@/components/ContactPopup";
import { toast } from "react-toastify";

const contactSchema = z.object({
  name: z.string().min(3, "Please enter your name (at least 3 characters)."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(3, "Please enter a subject (at least 3 characters)."),
  message: z.string().min(5, "Please enter a message (at least 5 characters)."),
});

export type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const [showPopup, setShowPopup] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      toast.success("Message sent! Thank you 🙌");
      setShowPopup(false);
      reset();
    } else {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div id="contact">
      <section className="w-full h-screen">
        <div className="absolute z-0 h-screen w-screen p-4 md:p-8 flex justify-center items-center">
          <div
            className="bg-gradient relative w-11/12 max-w-md md:w-3/6 md:h-2/8 border-[6px] md:border-[12px] border-black rounded-full flex flex-col justify-center gap-2 shadow-[6px_6px_0px_3px_#000] md:shadow-[10px_10px_0px_5px_#000] overflow-hidden hover:scale-105 cursor-pointer"
            onClick={() => setShowPopup(true)}
          >
            <div className="relative flex flex-col items-center py-2">
              <p className="text-sm">Ready for collaboration?</p>
              <h2 className="text-4xl">Hit Me Up</h2>
            </div>
          </div>
        </div>
      </section>

      <ContactPopup
        show={showPopup}
        onClose={() => setShowPopup(false)}
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
      />
    </div>
  );
}
