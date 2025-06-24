import { ArrowLeft, Shield, Eye, Lock, Database, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import LogoWhite from "../assets/LogoWhite.png";

interface PrivacyPolicyProps {
  onBack: () => void;
}

export default function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  const lastUpdated = new Date('2024-01-01').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="relative size-full bg-white">
      {/* Header */}
      <div className="bg-[#167dda] h-16 overflow-clip relative shrink-0 w-full">
        <div className="flex flex-row items-center relative size-full px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-white hover:bg-white/20 p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="flex-1 flex justify-center">
            <h1 className="text-xl font-bold text-white">Privacy Policy</h1>
          </div>
          
          <div className="w-10"></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Header Info */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-green-900 mb-2">Your Privacy Matters</h3>
                <p className="text-green-700 mb-3">
                  We are committed to protecting your personal information and your right to privacy. This policy explains how we collect, use, and safeguard your data.
                </p>
                <div className="flex items-center text-sm text-green-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Last updated: {lastUpdated}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Content */}
          <div className="space-y-6">
            {/* Section 1 */}
            <section className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center mb-3">
                <Database className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">1. Information We Collect</h3>
              </div>
              <div className="text-gray-600 space-y-3">
                <p>
                  We collect information you provide directly to us, such as when you create an account, place an order, or contact us for support.
                </p>
                <div>
                  <p className="font-medium text-gray-800 mb-2">Personal Information:</p>
                  <ul className="list-disc list-inside space-y-1 pl-4">
                    <li>Name and contact information (email, phone number)</li>
                    <li>Account credentials (username, password)</li>
                    <li>Payment information (processed securely by third parties)</li>
                    <li>Order history and preferences</li>
                    <li>Communication records with customer support</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-gray-800 mb-2">Usage Information:</p>
                  <ul className="list-disc list-inside space-y-1 pl-4">
                    <li>Device information and identifiers</li>
                    <li>App usage patterns and preferences</li>
                    <li>Location data (only when using QR table service)</li>
                    <li>Performance and crash reports</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center mb-3">
                <Eye className="w-5 h-5 text-purple-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">2. How We Use Your Information</h3>
              </div>
              <div className="text-gray-600 space-y-3">
                <p>
                  We use the information we collect to provide, maintain, and improve our services. Specifically:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-4">
                  <li>Process and fulfill your orders</li>
                  <li>Send order confirmations and delivery updates</li>
                  <li>Provide customer support and respond to inquiries</li>
                  <li>Personalize your experience and recommendations</li>
                  <li>Improve our app functionality and user experience</li>
                  <li>Send promotional offers (with your consent)</li>
                  <li>Comply with legal obligations</li>
                  <li>Detect and prevent fraud or abuse</li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center mb-3">
                <Lock className="w-5 h-5 text-red-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">3. Information Sharing</h3>
              </div>
              <div className="text-gray-600 space-y-3">
                <p>
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following cases:
                </p>
                <div>
                  <p className="font-medium text-gray-800 mb-2">Service Providers:</p>
                  <ul className="list-disc list-inside space-y-1 pl-4">
                    <li>Payment processors for secure transaction handling</li>
                    <li>Cloud storage providers for data hosting</li>
                    <li>Analytics services to improve our app</li>
                    <li>Customer support platforms</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-gray-800 mb-2">Legal Requirements:</p>
                  <ul className="list-disc list-inside space-y-1 pl-4">
                    <li>When required by law or legal process</li>
                    <li>To protect our rights, property, or safety</li>
                    <li>To prevent fraud or abuse</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">4. Data Security</h3>
              <div className="text-gray-600 space-y-3">
                <p>
                  We implement appropriate security measures to protect your personal information:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Secure servers and databases</li>
                  <li>Regular security audits and updates</li>
                  <li>Limited access to personal information</li>
                  <li>Employee training on data protection</li>
                </ul>
                <p>
                  However, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">5. Your Privacy Rights</h3>
              <div className="text-gray-600 space-y-3">
                <p>
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-4">
                  <li><strong>Access:</strong> Request a copy of your personal data</li>
                  <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                  <li><strong>Portability:</strong> Receive your data in a machine-readable format</li>
                  <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                  <li><strong>Restriction:</strong> Limit how we process your data</li>
                </ul>
                <p>
                  To exercise these rights, please contact us using the information provided below.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">6. Data Retention</h3>
              <div className="text-gray-600 space-y-3">
                <p>
                  We retain your personal information for as long as necessary to provide our services and comply with legal obligations:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-4">
                  <li>Account information: Until you delete your account</li>
                  <li>Order history: 7 years for tax and accounting purposes</li>
                  <li>Support communications: 3 years</li>
                  <li>Marketing consent: Until you withdraw consent</li>
                  <li>Usage analytics: 2 years in aggregated form</li>
                </ul>
              </div>
            </section>

            {/* Section 7 */}
            <section className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">7. QR Code Table Service</h3>
              <div className="text-gray-600 space-y-3">
                <p>
                  When you use our QR code table ordering service:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-4">
                  <li>We temporarily store your table location for order delivery</li>
                  <li>Location data is not shared with third parties</li>
                  <li>Table information is deleted after order completion</li>
                  <li>No GPS tracking is performed beyond table identification</li>
                </ul>
              </div>
            </section>

            {/* Section 8 */}
            <section className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">8. Children's Privacy</h3>
              <div className="text-gray-600 space-y-3">
                <p>
                  Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
                </p>
                <p>
                  If you are a parent or guardian and believe your child has provided us with personal information, please contact us so we can delete such information.
                </p>
              </div>
            </section>

            {/* Section 9 */}
            <section className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">9. Changes to Privacy Policy</h3>
              <div className="text-gray-600 space-y-3">
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-4">
                  <li>Posting the new Privacy Policy on this page</li>
                  <li>Sending you an email notification</li>
                  <li>Displaying an in-app notification</li>
                </ul>
                <p>
                  Changes become effective when posted. Your continued use of our service after changes are posted constitutes acceptance of the updated policy.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Contact Us</h3>
              <div className="text-blue-700 space-y-2">
                <p>
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                </p>
                <div className="space-y-1">
                  <p><strong>Email:</strong> privacy@coffeeshop.com</p>
                  <p><strong>Phone:</strong> +62 21 1234 5678</p>
                  <p><strong>Address:</strong> 123 Main Street, Jakarta, Indonesia 12345</p>
                </div>
                <p className="text-sm mt-3">
                  <strong>Data Protection Officer:</strong> dpo@coffeeshop.com
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Powered By Footer */}
      <div className="bg-[#000000] p-4">
        <div className="flex flex-row items-center justify-center gap-[5px]">
          <div className="font-['Poppins:Medium',_sans-serif] font-medium leading-[0] not-italic text-[#ffffff] text-[12px] text-right tracking-[-0.06px]">
            <p className="block leading-[1.35]">Powered By </p>
          </div>
          <div
            className="aspect-[960/320] bg-center bg-cover bg-no-repeat h-4 shrink-0"
            style={{ backgroundImage: `url('${LogoWhite}')` }}
          />
        </div>
      </div>
    </div>
  );
}