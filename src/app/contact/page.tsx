import "./contact.css";
export default function Contact() {
  return (
    <section className="w-full h-screen ">
      <div className="contact-cta">
        <div className="contact-button">
          <div className="contact-text-small">
            <p>Ready for collaboration?</p>
          </div>
          <div className="contact-text-large">
            <h1>Hit Me Up</h1>
          </div>
          <a href="mailto:diky@email.com"></a>
        </div>
      </div>
    </section>
  );
}
