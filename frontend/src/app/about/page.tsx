import JobSection from "@/components/JobSection";

const AboutPage = () => {
  return (
    <div className="flex-grow mx-6 md:mx-20">
      <JobSection
        title="About Us"
        value="Welcome to growasengineer.in, your dedicated portal for finding the right job. Our mission is to simplify the job search process and connect job seekers with career opportunities. Whether you are a fresh graduate or an experienced professional. growasengineer.in is here to assist you every step of the way."
      />
      <JobSection
        title="Our Vision"
        value="At growasengineer.in, we envision a job market where opportunities and talent seamlessly connect. We aim to create a user-friendly platform that makes job searching efficient and accessible for everyone. Our goal is to provide a transparent and hassle-free experience for both job seekers and employers."
      />
      <h2 className="text-xl md:text-2xl mt-10 font-bold">
        Why Grow As Engineer?
      </h2>
      <JobSection
        title="Extensive Job Listings"
        value="At growasengineer.in, we offer an extensive database of job opportunities across various sectors and experience levels. Our goal is to provide a comprehensive selection of job listings that cater to the diverse needs of job seekers. Whether you are looking for entry-level positions, mid-career opportunities, or executive roles, our platform has something for everyone."
      />
      <JobSection
        title="Customizable Filters"
        value="One of the key features of growasengineer.in is our customizable filtering system. We allow you to tailor your job search with filters based on experience, salary expectations, and other preferences. This helps you find job listings that match your specific criteria, saving you time and effort."
      />
      <JobSection
        title="Join Our Community"
        value="Be a part of our growing community and stay updated with the latest job opportunities and career advice. Join us on social media and subscribe to our newsletter to stay informed."
      />
    </div>
  );
};

export default AboutPage;
