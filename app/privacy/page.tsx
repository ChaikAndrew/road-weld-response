import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <section className="w-full bg-black py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/80 hover:text-warning-yellow transition-colors mb-8"
            >
              <span>← Back to Home</span>
            </Link>

            {/* Privacy Policy Content */}
            <div className="bg-dark-gray border border-white/10 p-8 lg:p-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-6">
                Privacy Policy
              </h1>
              
              <p className="text-white/70 mb-8 text-sm">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>

              <div className="space-y-8 text-white/80 leading-relaxed">
                <section>
                  <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">
                    1. Introduction
                  </h2>
                  <p>
                    LLC Labida ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our mobile roadside welding and heavy equipment services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">
                    2. Information We Collect
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Personal Information</h3>
                      <p>
                        We may collect personal information that you voluntarily provide to us when you:
                      </p>
                      <ul className="list-disc list-inside ml-4 space-y-2 mt-2">
                        <li>Contact us through our website contact form</li>
                        <li>Request a service quote or emergency service</li>
                        <li>Communicate with us via phone, email, or other means</li>
                        <li>Subscribe to our newsletter or marketing communications</li>
                      </ul>
                      <p className="mt-4">
                        This information may include your name, email address, phone number, company name, service location, and any other information you choose to provide.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Automatically Collected Information</h3>
                      <p>
                        When you visit our website, we may automatically collect certain information about your device, including:
                      </p>
                      <ul className="list-disc list-inside ml-4 space-y-2 mt-2">
                        <li>IP address</li>
                        <li>Browser type and version</li>
                        <li>Operating system</li>
                        <li>Pages visited and time spent on pages</li>
                        <li>Referring website addresses</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">
                    3. How We Use Your Information
                  </h2>
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc list-inside ml-4 space-y-2 mt-2">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Respond to your inquiries and service requests</li>
                    <li>Send you service-related communications</li>
                    <li>Process transactions and send related information</li>
                    <li>Send you marketing and promotional communications (with your consent)</li>
                    <li>Monitor and analyze usage patterns and trends</li>
                    <li>Detect, prevent, and address technical issues</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">
                    4. Information Sharing and Disclosure
                  </h2>
                  <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
                  <ul className="list-disc list-inside ml-4 space-y-2 mt-2">
                    <li><strong>Service Providers:</strong> We may share information with third-party service providers who perform services on our behalf, such as payment processing, data analysis, and customer service.</li>
                    <li><strong>Legal Requirements:</strong> We may disclose your information if required by law or in response to valid requests by public authorities.</li>
                    <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
                    <li><strong>With Your Consent:</strong> We may share your information with your explicit consent.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">
                    5. Data Security
                  </h2>
                  <p>
                    We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">
                    6. Your Rights
                  </h2>
                  <p>Depending on your location, you may have the following rights regarding your personal information:</p>
                  <ul className="list-disc list-inside ml-4 space-y-2 mt-2">
                    <li>Access and receive a copy of your personal data</li>
                    <li>Rectify inaccurate or incomplete data</li>
                    <li>Request deletion of your personal data</li>
                    <li>Object to processing of your personal data</li>
                    <li>Request restriction of processing</li>
                    <li>Data portability</li>
                    <li>Withdraw consent at any time</li>
                  </ul>
                  <p className="mt-4">
                    To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">
                    7. Cookies and Tracking Technologies
                  </h2>
                  <p>
                    Our website may use cookies and similar tracking technologies to track activity and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">
                    8. Third-Party Links
                  </h2>
                  <p>
                    Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">
                    9. Children's Privacy
                  </h2>
                  <p>
                    Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal information, please contact us, and we will take steps to delete such information.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">
                    10. Changes to This Privacy Policy
                  </h2>
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">
                    11. Contact Us
                  </h2>
                  <p>
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

