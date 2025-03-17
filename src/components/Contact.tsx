import { useState, FormEvent } from "react";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Alamat email yang akan menerima pesan
  const recipientEmail = "gunturw79@gmail.com";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validasi input dasar
    if (!email || !message) {
      setError("Please fill all fields");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address");
      return;
    }

    // Buat subjek email
    const subject = `Contact Form: Message from ${email}`;

    // Buat isi email dengan formatnya
    const emailBody = `
From: ${email}

Message:
${message}
    `;

    // Buat mailto URL dengan parameter yang diencode
    const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

    // Buka aplikasi email default pengguna
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-20 px-4 bg-light-navy scroll-mt-20">
      <div className="max-w-6xl mx-auto text-center">
        <div className="space-y-2 mb-8">
          <h3 className="text-3xl font-bold text-lightest-slate">
            Get In Touch
          </h3>
          <p className="text-slate max-w-xl mx-auto">
            Let&apos;s connect! Whether for opportunities or just to say hi.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
          <div>
            <label htmlFor="email" className="sr-only">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full bg-navy rounded-lg px-4 py-3 text-lightest-slate
                border border-slate/20 focus:border-green/50 focus:ring-1 focus:ring-green/30
                transition-all placeholder:text-slate/60"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="sr-only">
              Your Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message..."
              rows={4}
              className="w-full bg-navy rounded-lg px-4 py-3 text-lightest-slate
                border border-slate/20 focus:border-green/50 focus:ring-1 focus:ring-green/30
                transition-all placeholder:text-slate/60 resize-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full border border-green text-green px-8 py-3 rounded-lg
              hover:bg-green/10 transition-all"
          >
            Open Email App
          </button>

          {error && <p className="text-red-400 mt-4">{error}</p>}

          <p className="text-slate text-sm mt-2">
            This will open your default email application to send your message.
          </p>
        </form>

        {/* Manual Scroll Link ke Section Lain */}
        <div className="mt-12">
          <a
            href="#hero"
            className="text-slate hover:text-green transition inline-block"
            aria-label="Go back to projects section"
          >
            ↑ Back to Home
          </a>
        </div>
      </div>
    </section>
  );
}
