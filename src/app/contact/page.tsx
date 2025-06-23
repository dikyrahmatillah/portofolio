export default function Contact() {
  return (
    <section
      className="fixed inset-0 w-full h-screen z-0"
      style={{ backgroundColor: "#1f2937" }}
    >
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
