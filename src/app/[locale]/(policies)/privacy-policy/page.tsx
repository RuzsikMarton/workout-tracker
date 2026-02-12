import Link from "next/link";
import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <main className="page-main app-layout">
      <div className="policy-container">
        <h1 className="policy-title">Privacy Policy</h1>
        <p className="text-sm">Last updated: February 10 2026</p>
        <p className="mt-4">
          Welcome to <b>WorkoutTracker</b>. Your privacy is important to us.
          This Privacy Policy explains how we collect, use, disclose, and
          safeguard your information when you use our mobile application.
        </p>
        <p>
          By using WorkoutTracker, you agree to the collection and use of
          information in accordance with this policy.
        </p>
        <h2 className="policy-subtitle">Information you provide to us</h2>
        <p>
          <b>Basic Information.</b> We collect information you provide when
          creating an account or using the Service, such as your name or display
          name, email address, password (stored securely), fitness goals, and
          optional details like height, weight, and age. We also collect workout
          and fitness data you choose to log, including exercises, sets,
          repetitions, weights, workout history, and progress.
        </p>
        <h2 className="policy-subtitle">
          Information we collect automatically
        </h2>
        <p>
          <b>Cookies.</b> We may use cookies and similar tracking technologies
          to operate and improve the Service. Cookies are small data files
          stored on your device that help us remember preferences, understand
          usage patterns, and enhance functionality. You can control or disable
          cookies through your device or browser settings, but some features of
          the Service may not function properly if cookies are disabled.We may
          collect certain information automatically when you use the Service.
          This includes:
        </p>
        <br />
        <ul className="list-disc list-inside">
          <li>
            <b>Device Information.</b> We may collect information about the
            device you use to access the Service, such as device type, operating
            system, and unique device identifiers.
          </li>
          <li>
            <b>Usage Data.</b> We may collect information about how you interact
            with the Service, including app usage data, workout logging
            activity, and feature usage.
          </li>
          <li>
            <b>Performance Data.</b> We may collect crash reports and
            performance data to help us improve the reliability and performance
            of the Service.
          </li>
        </ul>
        <h2 className="policy-subtitle">How we use your information</h2>
        <p>
          Your information is used to provide and maintain the Service, create
          and manage your account, personalize your experience, track workouts
          and progress, improve features, communicate important updates, and
          protect against fraud or misuse. We do not sell your personal
          information to third parties.
        </p>
        <h2 className="policy-subtitle">Sharing your information</h2>
        <p>
          We do not sell your personal data. We may share limited information
          with trusted service providers such as cloud hosting, analytics, and
          crash-reporting services, or when required by law. These providers are
          required to protect your information and use it only to perform
          services on our behalf. We may also share aggregated, non-identifiable
          data for research or analytics purposes. We do not share your workout
          data with third parties without your explicit consent.
        </p>
        <h2 className="policy-subtitle">Your rights and choices</h2>
        <p>
          You have the right to access, correct, or delete your personal
          information at any time through your account settings or by contacting
          us. You can manage your account settings, including workout data,
          through the app.
        </p>
        <h2 className="policy-subtitle">Data security</h2>
        <p>
          Your data is stored on secure servers and protected using
          industry-standard security measures. While we take reasonable steps to
          safeguard your information, no system is completely secure, and we
          cannot guarantee absolute security.
        </p>
        <h2 className="policy-subtitle">Children's privacy</h2>
        <p>
          WorkoutTracker is not intended for children under 13. We do not
          knowingly collect personal information from children under 13. If we
          become aware that we have collected personal information from a child
          under 13, we will take steps to delete that information.
        </p>
        <h2 className="policy-subtitle">Changes to this Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be posted within the app and reflected by an updated “Last Updated”
          date.
        </p>
        <h2 className="policy-subtitle">Contact us</h2>
        <p>
          If you have any questions about this <b>Privacy Policy</b>, please
          contact us{" "}
          <Link href="/contact" className="underline font-semibold">
            here
          </Link>
          .
        </p>
      </div>
    </main>
  );
};

export default PrivacyPolicyPage;
