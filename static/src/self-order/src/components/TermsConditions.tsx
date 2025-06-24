import { ArrowLeft, FileText, Calendar, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import LogoWhite from "../assets/LogoWhite.png";

interface TermsConditionsProps {
  onBack: () => void;
}

export default function TermsConditions({ onBack }: TermsConditionsProps) {
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
            <h1 className="text-xl font-bold text-white">Terms & Conditions</h1>
          </div>
          
          <div className="w-10"></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Header Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Terms of Service</h3>
                <p className="text-blue-700 mb-3">
                  Please read these terms and conditions carefully before using our coffee ordering service.
                </p>
                <div className="flex items-center text-sm text-blue-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Last updated: {lastUpdated}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Terms Content */}
          <div className="space-y-6">
            {/* Section 1 */}
            <section className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h3>
              <div className="text-gray-600 space-y-3">
                <p>
                  By accessing and using our coffee ordering application, you accept and agree to be bound by the terms and provision of this agreement.
                </p>
                <p>
                  If you do not agree to abide by the above, please do not use this service.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Service Description</h3>
              <div className="text-gray-600 space-y-3">
                <p>
                  Our application provides a platform for customers to order coffee and related products from our coffee shop. Services include:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-4">
                  <li>Menu browsing and item selection</li>
                  <li>Order customization and placement</li>
                  <li>Payment processing</li>
                  <li>Order tracking and notifications</li>
                  <li>Table-based QR code ordering</li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">3. User Accounts</h3>
              <div className="text-gray-600 space-y-3">
                <p>
                  To use certain features of our service, you may be required to create an account. You are responsible for:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-4">
                  <li>Maintaining the confidentiality of your account information</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized use</li>
                  <li>Providing accurate and complete information</li>
                </ul>
              </div>
            </section>

            {/* Section 4 */}
            <section className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">4. Orders and Payment</h3>
              <div className="text-gray-600 space-y-3">
                <p>
                  When you place an order through our application:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-4">
                  <li>All orders are subject to availability</li>
                  <li>Prices are subject to change without notice</li>
                  <li>Payment must be completed before order preparation</li>
                  <li>We reserve the right to refuse or cancel orders</li>
                  <li>Refunds are processed according to our refund policy</li>
                </ul>
              </div>
            </section>

            {/* Section 5 */}
            <section className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">5. QR Code Table Ordering</h3>
              <div className="text-gray-600 space-y-3">
                <p>
                  Our QR code table service allows you to order directly to your table:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-4">
                  <li>Scan the QR code at your table to start ordering</li>
                  <li>Orders will be delivered to the scanned table location</li>
                  <li>You are responsible for remaining at the designated table</li>
                  <li>Table numbers cannot be changed after payment</li>
                </ul>
              </div>
            </section>

            {/* Section 6 */}
            <section className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">6. Privacy and Data</h3>
              <div className="text-gray-600 space-y-3">
                <p>
                  Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.
                </p>
                <p>
                  By using our service, you consent to the collection and use of information in accordance with our Privacy Policy.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">7. Prohibited Uses</h3>
              <div className="text-gray-600 space-y-3">
                <p>
                  You may not use our service:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-4">
                  <li>For any unlawful purpose or to solicit others to unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations or laws</li>
                  <li>To transmit or procure the sending of any advertising or promotional material</li>
                  <li>To impersonate or attempt to impersonate another person</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, or discriminate</li>
                </ul>
              </div>
            </section>

            {/* Section 8 */}
            <section className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">8. Limitation of Liability</h3>
              <div className="text-gray-600 space-y-3">
                <p>
                  In no event shall Coffee Shop or its suppliers be liable for any damages arising out of the use or inability to use the materials on our application.
                </p>
                <p>
                  This includes but is not limited to damages for loss of data or profit, or due to business interruption.
                </p>
              </div>
            </section>

            {/* Section 9 */}
            <section className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">9. Changes to Terms</h3>
              <div className="text-gray-600 space-y-3">
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time.
                </p>
                <p>
                  If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-900 mb-2">Questions?</h3>
                  <p className="text-yellow-700 mb-3">
                    If you have any questions about these Terms and Conditions, please contact us at:
                  </p>
                  <div className="text-yellow-700">
                    <p>Email: legal@coffeeshop.com</p>
                    <p>Phone: +62 21 1234 5678</p>
                    <p>Address: 123 Main Street, Jakarta, Indonesia</p>
                  </div>
                </div>
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