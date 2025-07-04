import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";
import { SocialIconLink } from "@/components/SocialIconLink";
import {
  FieldErrors,
  UseFormRegister,
  UseFormHandleSubmit,
} from "react-hook-form";
import { ContactForm } from "@/app/contact/page";

type ContactPopupProps = {
  show: boolean;
  onClose: () => void;
  onSubmit: ReturnType<UseFormHandleSubmit<ContactForm>>;
  register: UseFormRegister<ContactForm>;
  errors: FieldErrors<ContactForm>;
};

export function ContactPopup({
  show,
  onClose,
  onSubmit,
  register,
  errors,
}: ContactPopupProps) {
  if (!show) return null;

  return (
    <section
      className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
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
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <form
          className="flex flex-col gap-2 px-6 py-4"
          onSubmit={onSubmit}
          autoComplete="off"
        >
          <label htmlFor="name" className="text-zinc-200 font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="input-style"
            {...register("name")}
            required
          />
          {errors.name && (
            <span className="text-red-400 text-sm">{errors.name.message}</span>
          )}

          <label htmlFor="email" className="text-zinc-200 font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="input-style"
            {...register("email")}
            required
          />
          {errors.email && (
            <span className="text-red-400 text-sm">{errors.email.message}</span>
          )}

          <label htmlFor="subject" className="text-zinc-200 font-medium">
            Subject
          </label>
          <input
            id="subject"
            type="text"
            className="input-style"
            {...register("subject")}
            required
          />
          {errors.subject && (
            <span className="text-red-400 text-sm">
              {errors.subject.message}
            </span>
          )}

          <label htmlFor="message" className="text-zinc-200 font-medium">
            Message
          </label>
          <textarea
            id="message"
            rows={2}
            className="input-style"
            {...register("message")}
            required
          />
          {errors.message && (
            <span className="text-red-400 text-sm">
              {errors.message.message}
            </span>
          )}

          <button
            type="submit"
            className="relative bg-gradient text-white font-semibold py-2 rounded-lg shadow hover:scale-102 hover:shadow-lg transition-all mt-2 cursor-pointer"
          >
            Send Message
          </button>
        </form>

        <div className="flex-shrink-0 pt-2 px-6 pb-3 border-t border-white/10 text-center mt-auto">
          <p className="text-white/80 text-sm mb-2">Or connect with me on:</p>
          <div className="flex justify-center gap-4">
            <SocialIconLink
              href="https://www.linkedin.com/in/diky-rahmatillah-370532112/"
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
              href="https://x.com/diky0807"
              hoverBg="hover:bg-blue-400/40"
            >
              <FaTwitter size={18} />
            </SocialIconLink>
            <SocialIconLink
              href="https://www.instagram.com/diky.rahmatillah/"
              hoverBg="hover:bg-pink-500/30"
            >
              <FaInstagram size={18} />
            </SocialIconLink>
          </div>
        </div>
      </div>
    </section>
  );
}
