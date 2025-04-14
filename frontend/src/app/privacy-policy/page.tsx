import JobSection from "@/components/JobSection";

const PrivacyPage = () => {
  return (
    <div className="flex-grow mx-6 md:mx-20">
      <JobSection
        title="Privacy Policy"
        value="Welcome to growasengineer.in, your trusted platform for exploring job opportunities. We value your trust and are committed to ensuring the privacy and security of your information when you visit our website. This Privacy Policy outlines our practices regarding any information you may interact with on our site. We strive to create a safe and secure environment for our users, where you can explore job listings and career-related content with confidence."
      />
      <JobSection
        title="Our Commitment to Privacy"
        value="We design our platform to be user-friendly and accessible, ensuring you can navigate through our content without any concerns about privacy. We provide a wide range of job listings, career advice, and other resources to help you on your career journey. Our goal is to make your experience on growasengineer.in enjoyable and informative."
      />
      <JobSection
        title="Advertisements and Third-Party Content"
        value="growasengineer.in may display advertisements from third-party providers. These ads are tailored to match the general content of our site and do not rely on personal information. We partner with reputable advertising networks that adhere to privacy standards. We encourage you to review the privacy policies of any third-party websites or services linked through our site, as we are not responsible for their practices."
      />
      <JobSection
        title="Changes to the Privacy Policy"
        value="We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this page periodically for the latest information on our privacy practices."
      />
      <JobSection
        title="Contact Us"
        value="If you have any questions or concerns about this Privacy Policy, please do not hesitate to contact us. We are here to ensure that your experience on growasengineer.in is as smooth and worry-free as possible. You can reach us at info.growasengineer@gmail.com."
      />
    </div>
  );
};

export default PrivacyPage;
