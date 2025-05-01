import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy | ХУЛИГАНКА Hat Store",
  description: "Our cookie policy explains how we use cookies and similar technologies on our website.",
};

export default function CookiePolicyPage() {
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
        <span className="text-sm font-medium text-gray-500">Cookie Policy</span>
      </div>
      
      <h1 className="text-3xl sm:text-4xl font-bold border-b-2 border-black pb-4 mb-8">Cookie Policy</h1>
      
      <div className="prose prose-lg max-w-none">
        <h2 className="text-2xl font-bold mt-8 mb-4">Introduction</h2>
        <p>
          This Cookie Policy explains how ХУЛИГАНКА Hat Store ("we", "us", and "our") uses cookies and similar technologies 
          to recognize you when you visit our website ("Website"). It explains what these technologies are and why we use them, 
          as well as your rights to control our use of them.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">What are cookies?</h2>
        <p>
          Cookies are small data files that are placed on your computer or mobile device when you visit a website. 
          Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, 
          as well as to provide reporting information.
        </p>
        <p>
          Cookies set by the website owner (in this case, ХУЛИГАНКА Hat Store) are called "first-party cookies". 
          Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies 
          enable third-party features or functionality to be provided on or through the website (e.g., advertising, 
          interactive content, and analytics).
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Types of cookies we use</h2>
        
        <h3 className="text-xl font-bold mt-6 mb-3">Essential Cookies</h3>
        <p>
          These cookies are strictly necessary to provide you with services available through our Website and to use 
          some of its features, such as access to secure areas. Because these cookies are strictly necessary to deliver 
          the Website, you cannot refuse them without impacting how our Website functions.
        </p>
        
        <h3 className="text-xl font-bold mt-6 mb-3">Performance and Functionality Cookies</h3>
        <p>
          These cookies are used to enhance the performance and functionality of our Website but are non-essential to 
          their use. However, without these cookies, certain functionality may become unavailable.
        </p>
        
        <h3 className="text-xl font-bold mt-6 mb-3">Analytics and Customization Cookies</h3>
        <p>
          These cookies collect information that is used either in aggregate form to help us understand how our Website 
          is being used or how effective our marketing campaigns are, or to help us customize our Website for you in 
          order to enhance your experience.
        </p>
        
        <h3 className="text-xl font-bold mt-6 mb-3">Advertising Cookies</h3>
        <p>
          These cookies are used to make advertising messages more relevant to you and your interests. They also perform 
          functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, 
          and in some cases selecting advertisements that are based on your interests.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">How can you control cookies?</h2>
        <p>
          You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by 
          clicking on the appropriate opt-out links provided in the cookie banner on our Website.
        </p>
        <p>
          You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, 
          you may still use our Website though your access to some functionality and areas of our Website may be restricted.
        </p>
        <p>
          Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, 
          including how to see what cookies have been set, visit <a href="https://www.allaboutcookies.org" className="text-black font-medium underline hover:text-yellow-600" target="_blank" rel="noopener noreferrer">www.allaboutcookies.org</a>.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Updates to this Cookie Policy</h2>
        <p>
          We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or 
          for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay 
          informed about our use of cookies and related technologies.
        </p>
        <p>
          The date at the top of this Cookie Policy indicates when it was last updated.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
        <p>
          If you have any questions about our use of cookies or other technologies, please contact us at:
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