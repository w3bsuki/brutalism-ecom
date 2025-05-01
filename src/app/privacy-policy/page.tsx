import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | ХУЛИГАНКА Hat Store",
  description: "Our privacy policy detailing how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
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
        <span className="text-sm font-medium text-gray-500">Privacy Policy</span>
      </div>
      
      <h1 className="text-3xl sm:text-4xl font-bold border-b-2 border-black pb-4 mb-8">Privacy Policy</h1>
      
      <div className="prose prose-lg max-w-none">
        <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
        <p>
          Thank you for choosing ХУЛИГАНКА Hat Store. We are committed to protecting your personal information and your right to privacy. 
          This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
          including any other media form, media channel, mobile website, or mobile application related or connected to it.
        </p>
        <p>
          Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">2. Information We Collect</h2>
        
        <h3 className="text-xl font-bold mt-6 mb-3">Personal Information You Disclose to Us</h3>
        <p>
          We collect personal information that you voluntarily provide to us when you:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Register on the Site</li>
          <li>Place an order</li>
          <li>Sign up for our newsletter</li>
          <li>Participate in contests, surveys, or promotions</li>
          <li>Send us an email or contact us</li>
        </ul>
        
        <p>
          The personal information we collect may include:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Name</li>
          <li>Email address</li>
          <li>Postal address</li>
          <li>Phone number</li>
          <li>Billing information</li>
          <li>Account login credentials</li>
          <li>Other information you choose to provide</li>
        </ul>
        
        <h3 className="text-xl font-bold mt-6 mb-3">Information Automatically Collected</h3>
        <p>
          When you visit our Site, we automatically collect certain information about your device, including:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>IP address</li>
          <li>Browser type</li>
          <li>Operating system</li>
          <li>Pages visited</li>
          <li>Time and date of your visit</li>
          <li>Time spent on those pages</li>
          <li>Referring website addresses</li>
          <li>Other diagnostic data</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">3. How We Use Your Information</h2>
        <p>
          We use the information we collect or receive:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>To facilitate account creation and login process</li>
          <li>To process and fulfill orders</li>
          <li>To send you order confirmations and updates</li>
          <li>To send administrative information</li>
          <li>To respond to customer service requests</li>
          <li>To send marketing and promotional communications (with your consent)</li>
          <li>To improve our Site and present its contents to you</li>
          <li>To request feedback and contact you about your use of the Site</li>
          <li>To monitor and analyze usage and trends</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">4. Disclosure of Your Information</h2>
        <p>
          We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
        </p>
        
        <h3 className="text-xl font-bold mt-6 mb-3">Business Transfers</h3>
        <p>
          If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.
        </p>
        
        <h3 className="text-xl font-bold mt-6 mb-3">Third-Party Service Providers</h3>
        <p>
          We may share your information with third-party service providers to:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Facilitate our Site</li>
          <li>Provide the Site on our behalf</li>
          <li>Perform Site-related services</li>
          <li>Assist us in analyzing how our Site is used</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">5. Your Privacy Rights</h2>
        <p>
          Depending on your location, you may have certain rights regarding your personal information. Please contact us if you wish to exercise any of these rights.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">6. Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">7. Contact Us</h2>
        <p>
          If you have questions or comments about this Privacy Policy, please contact us at:
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