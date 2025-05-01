import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | ХУЛИГАНКА Hat Store",
  description: "Our terms of service outline the rules, guidelines, and agreements for using our website and services.",
};

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-6 flex items-center">
        <Link 
          href="/" 
          className="text-sm font-medium hover:underline"
        >
          Home
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-sm font-medium text-gray-500">Terms of Service</span>
      </div>
      
      <h1 className="text-3xl sm:text-4xl font-bold border-b-2 border-black pb-4 mb-8">Terms of Service</h1>
      
      <div className="prose prose-lg max-w-none">
        <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
        <p>
          By accessing or using the ХУЛИГАНКА Hat Store website, you agree to be bound by these Terms of Service and all applicable laws and regulations. 
          If you do not agree with any of these terms, you are prohibited from using or accessing this site.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">2. Use License</h2>
        <p>
          Permission is granted to temporarily download one copy of the materials on ХУЛИГАНКА Hat Store's website for personal, 
          non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Modify or copy the materials</li>
          <li>Use the materials for any commercial purpose</li>
          <li>Attempt to reverse engineer any software contained on ХУЛИГАНКА Hat Store's website</li>
          <li>Remove any copyright or other proprietary notations from the materials</li>
          <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
        </ul>
        <p>
          This license shall automatically terminate if you violate any of these restrictions and may be terminated by ХУЛИГАНКА Hat Store at any time.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">3. Products</h2>
        
        <h3 className="text-xl font-bold mt-6 mb-3">3.1 Product Descriptions</h3>
        <p>
          We strive to display as accurately as possible the colors and features of our products that appear on the Site. 
          However, we cannot guarantee that your device's display of any color will be accurate.
        </p>
        
        <h3 className="text-xl font-bold mt-6 mb-3">3.2 Product Availability</h3>
        <p>
          All products are subject to availability, and we reserve the right to impose quantity limits on any order, 
          to reject all or part of an order, and to discontinue products without notice.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">4. Pricing and Payment</h2>
        
        <h3 className="text-xl font-bold mt-6 mb-3">4.1 Pricing</h3>
        <p>
          All prices posted on this Site are subject to change without notice. The price charged for a product will be the price 
          in effect at the time the order is placed and will be set out in your order confirmation email.
        </p>
        
        <h3 className="text-xl font-bold mt-6 mb-3">4.2 Payment Methods</h3>
        <p>
          We accept the following payment methods:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Credit cards (Visa, MasterCard, American Express)</li>
          <li>PayPal</li>
          <li>Other payment methods as indicated at checkout</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">5. Shipping and Delivery</h2>
        
        <h3 className="text-xl font-bold mt-6 mb-3">5.1 Shipping Methods</h3>
        <p>
          We offer the following shipping methods:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Standard Shipping (5-7 business days)</li>
          <li>Express Shipping (2-3 business days)</li>
          <li>Next Day Shipping (1 business day, where available)</li>
        </ul>
        
        <h3 className="text-xl font-bold mt-6 mb-3">5.2 Shipping Costs</h3>
        <p>
          Shipping costs are calculated during checkout based on weight, dimensions, and destination. 
          Payment for shipping will be collected at the time of purchase.
        </p>
        
        <h3 className="text-xl font-bold mt-6 mb-3">5.3 Delivery Times</h3>
        <p>
          Delivery times are estimates and commence from the date of shipping, rather than the date of order. 
          Delivery times are not guaranteed and may vary depending on circumstances outside our control.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">6. Returns and Refunds</h2>
        
        <h3 className="text-xl font-bold mt-6 mb-3">6.1 Return Policy</h3>
        <p>
          We offer a 30-day return policy for most items. To be eligible for a return, your item must be unused and 
          in the same condition that you received it. It must also be in the original packaging.
        </p>
        
        <h3 className="text-xl font-bold mt-6 mb-3">6.2 Return Process</h3>
        <p>
          To initiate a return, please email us at contact@example.com with your order number and return reason. 
          We will provide you with return instructions and a return shipping address.
        </p>
        
        <h3 className="text-xl font-bold mt-6 mb-3">6.3 Refunds</h3>
        <p>
          Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. 
          We will also notify you of the approval or rejection of your refund.
        </p>
        <p>
          If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment 
          within 10 business days.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">7. Intellectual Property</h2>
        <p>
          All content included on this Site, such as text, graphics, logos, button icons, images, audio clips, digital downloads, 
          data compilations, and software, is the property of ХУЛИГАНКА Hat Store or its content suppliers and protected by international 
          copyright laws. The compilation of all content on this Site is the exclusive property of ХУЛИГАНКА Hat Store and protected by 
          international copyright laws.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">8. Limitation of Liability</h2>
        <p>
          In no event shall ХУЛИГАНКА Hat Store, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for 
          any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, 
          goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Site.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">9. Changes to Terms</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use 
          our Site after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, 
          you are no longer authorized to use the Site.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">10. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at:
        </p>
        <p className="font-bold mt-2">
          ХУЛИГАНКА Hat Store<br />
          Email: contact@example.com<br />
          Phone: +1 (123) 456-7890
        </p>
      </div>
    </div>
  );
} 