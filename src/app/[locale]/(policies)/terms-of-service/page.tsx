import Link from "next/link";

const TermsOfServicePage = () => {
  return (
    <div className="page-main app-layout">
      <div className="policy-container">
        <h1 className="policy-title">Terms of Service</h1>
        <p className="text-sm">Last updated: February 10 2026</p>
        <p className="mt-4">
          Welcome to <b>WorkoutTracker</b> (“WorkoutTracker”, “we”, “us”, or
          “our”). These Terms and Conditions (“Terms”) govern your access to and
          use of the WorkoutTracker website, mobile app, and related services
          (collectively, the “Service”). By accessing or using the Service, you
          agree to these Terms. If you do not agree, do not use the Service.
        </p>
        <h2 className="policy-subtitle">Description of the Service</h2>
        <p className="mt-4">
          WorkoutTracker is a fitness tracking platform that lets users log
          workouts and training information, including exercises, sets,
          repetitions, and weight (kg), and view progress over time. We may
          update, change, or improve the Service from time to time. We may also
          add new features or functionality to the Service, and we reserve the
          right to remove or disable access to any feature or functionality at
          our discretion.
        </p>
        <p className="mt-2">
          WorkoutTracker was created primarily as a personal project for
          learning and personal fitness tracking. The Service is provided as-is
          and may change over time. We do not guarantee continuous availability,
          long-term support, or that any specific feature will remain available.
        </p>
        <h2 className="policy-subtitle">Health and Medical Disclaimer</h2>
        <p className="mt-4">
          The Service provides fitness tracking tools for informational purposes
          only and does not provide medical advice, diagnosis, or treatment.
          Always consult a qualified healthcare professional before starting or
          changing any exercise program. Stop exercising and seek medical advice
          if you experience pain, dizziness, shortness of breath, or any other
          concerning symptoms. You use the Service at your own risk.
        </p>
        <h2 className="policy-subtitle">The services</h2>
        <p className="mt-4">
          <b>Account Registration.</b> To access certain features of the
          Service, you may be required to create an account. You are responsible
          for maintaining the security of your account and for all activities
          that occur under your account. You must provide accurate and complete
          information when creating an account and update it as necessary. You
          may not use another person’s account without permission. We reserve
          the right to suspend or terminate your account if we believe you have
          violated these Terms.
        </p>
        <p className="mt-4">
          <b>Workout Logs.</b> The Service allows you to log workouts and
          training information, including exercises, sets, repetitions, and
          weight (kg). You are solely responsible for the accuracy and
          completeness of the information you log. We do not guarantee the
          accuracy of any workout data or progress tracking provided by the
          Service. You acknowledge that data loss may occur due to technical
          issues, and you are responsible for maintaining your own backup of
          important information.
        </p>
        <p className="mt-4">
          <b>User Content.</b> By submitting User Content, you grant
          WorkoutTracker a non-exclusive, worldwide, royalty-free license to
          host, store, reproduce, and display your User Content only as needed
          to operate, maintain, and improve the Service. This license ends when
          you delete your User Content or your account, except where we must
          keep copies for legal, security, or backup reasons for a limited time.
          You are solely responsible for your User Content and the consequences
          of posting or publishing it. You affirm that you have the necessary
          licenses, rights, consents, and permissions to publish User Content
          you submit; and you agree to pay all royalties, fees, and any other
          costs arising from your User Content.
        </p>
        <h2 className="policy-subtitle">Eligibility</h2>
        <p className="mt-4">
          You must be at least <b>13 years old</b> to use the Service. If you
          are under the age of majority where you live, you represent that you
          have permission from a parent or legal guardian to use the Service.
        </p>
        <h2 className="policy-subtitle">Acceptable Use</h2>
        <p className="mt-4">
          You agree not to misuse the Service. This includes not attempting to
          hack, disrupt, overload, or reverse engineer the Service; not using
          automated scraping tools; not uploading malicious code; and not using
          the Service in a way that violates laws or the rights of others. We
          may remove content or suspend accounts that violate these Terms.
        </p>
        <h2 className="policy-subtitle">Intellectual Property</h2>
        <p className="mt-4">
          All content and materials available on the Service, including but not
          limited to text, graphics, website name, code, images, and logos are
          the intellectual property of WorkoutTracker and are protected by
          applicable copyright and trademark law. Any unauthorized use of the
          content may violate copyright, trademark, and other laws.
        </p>
        <h2 className="policy-subtitle">Third-Party Services and Links</h2>
        <p className="mt-4">
          The Service may include links to third-party websites or services. We
          are not responsible for third-party content, policies, or practices.
          Your use of third-party services is at your own risk.
        </p>
        <h2 className="policy-subtitle">Service Availability and Changes</h2>
        <p className="mt-4">
          We may modify, suspend, or discontinue the Service (in whole or in
          part) at any time. We do not guarantee that the Service will be
          uninterrupted, error-free, or always available.
        </p>
        <h2 className="policy-subtitle">Privacy Policy</h2>
        <p className="mt-4">
          Our collection and use of personal information in connection with your
          access to and use of the Services is described in our Privacy Policy
          described in our Privacy Policy available at:{" "}
          <Link href="/privacy-policy" className="underline font-semibold">
            workoutracker.martonruzsik.sk/privacy-policy
          </Link>
          .
        </p>
        <h2 className="policy-subtitle">Disclaimers</h2>
        <p className="mt-4">
          The Service is provided “AS IS” and “AS AVAILABLE”. To the maximum
          extent permitted by law, we disclaim all warranties of any kind,
          whether express or implied, including fitness for a particular
          purpose, merchantability, and non-infringement.
        </p>
        <h2 className="policy-subtitle">Limitation of Liability</h2>
        <p className="mt-4">
          To the maximum extent permitted by law, WorkoutTracker will not be
          liable for any indirect, incidental, special, consequential, or
          punitive damages, or for loss of profits, data, or goodwill, arising
          out of or related to your use of (or inability to use) the Service. In
          all cases, WorkoutTracker’s total liability will not exceed the amount
          you paid us (if any) in the past 12 months.
        </p>
        <h2 className="policy-subtitle">Indemnification</h2>
        <p className="mt-4">
          You agree to indemnify and hold harmless WorkoutTracker and its
          affiliates, officers, employees, and partners from any claims,
          damages, liabilities, and expenses (including reasonable legal fees)
          arising from your use of the Service, your User Content, or your
          violation of these Terms.
        </p>
        <h2 className="policy-subtitle">Termination</h2>
        <p className="mt-4">
          We may terminate or suspend your access to the Service at any time,
          with or without cause or notice. Upon termination, we may delete your
          account and associated data in accordance with our Privacy Policy.
          Upon termination, your right to use the Service will immediately
          cease.
        </p>
        <h2 className="policy-subtitle">Governing Law</h2>
        <p className="mt-4">
          These Terms are governed by the laws of Slovakia, without regard to
          conflict of law principles.
        </p>
        <h2 className="policy-subtitle">Changes to these Terms</h2>
        <p className="mt-4">
          We may update these Terms from time to time. If we make changes, we
          will update the “Last Updated” date and may notify you within the app
          or on the website. Continued use of the Service after changes means
          you accept the updated Terms.
        </p>
        <h2 className="policy-subtitle">Contact Us</h2>
        <p className="mt-4">
          If you have any questions about these Terms, please contact us{" "}
          <Link href="/contact" className="underline font-semibold">
            here
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
