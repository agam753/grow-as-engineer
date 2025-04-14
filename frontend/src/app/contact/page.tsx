import JobSection from "@/components/JobSection";

const ContactPage = () => {
  return (
    <div className="flex-grow mx-6 md:mx-20 min-h-[58vh]">
      <JobSection
        title="Contact Us"
        value="If you have any questions or concerns about this Privacy Policy, please do not hesitate to contact us. We are here to ensure that your experience on growasengineer.in is as smooth and worry-free as possible. You can reach us at info.growasengineer@gmail.com."
      />
      <JobSection
        title="Get in Touch"
        value="You can contact us via email at info.growasengineer@gmail.com. We will do our best to respond to your inquiry as soon as possible."
      />
      <JobSection
        title="Share Your Feedback"
        value="We welcome your feedback and suggestions. Help us improve by sharing your thoughts with us on X (formerly Twitter)."
      />
    </div>
  );
};

export default ContactPage;
