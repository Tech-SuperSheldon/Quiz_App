"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const sections = [
  {
    id: 1,
    title: "Who We Are",
    body: (
      <>
        <p>
          LevelUp is a free learning and quiz app published by{" "}
          <span className="font-semibold text-orange-600">
            Super Sheldon / Sheldon Labs Pvt. Ltd.
          </span>{" "}
          (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;). We build tools
          to help students practice, track progress, and enjoy learning through
          gamified quizzes.
        </p>
        <p>
          If you have any questions about this policy, you can contact:
        </p>
        <div className="mt-4 rounded-2xl border border-orange-200 bg-orange-50/60 p-5">
          <p>
            <span className="font-semibold text-orange-700">Data Controller:</span>{" "}
            Super Sheldon LLP
          </p>
          <p className="mt-2">
            <span className="font-semibold text-orange-700">Office:</span> Om
            Chambers 648/A 4th Flr, Binnamangala 1st Stage, Indiranagar
            (Bangalore), Indiranagar police station, Bangalore North, Bangalore-
            560038, Karnataka, India
          </p>
          <p className="mt-2">
            <span className="font-semibold text-orange-700">Privacy email:</span>{" "}
            <a
              href="mailto:admin@supersheldon.com"
              className="text-orange-600 hover:underline"
            >
              admin@supersheldon.com
            </a>
          </p>
        </div>
      </>
    ),
  },
  {
    id: 2,
    title: "What Information We Collect",
    body: (
      <>
        <p>
          We deliberately collect as little personal data as possible to run the
          app. Depending on how you use LevelUp, we may collect:
        </p>
        <ul className="mt-4 space-y-3">
          <li className="flex gap-3">
            <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-orange-500" />
            <span>
              <span className="font-semibold text-gray-900">Email address</span>{" "}
              &mdash; to create your account, let you sign in, and send important
              account messages (for example, password resets or security alerts).
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-orange-500" />
            <span>
              <span className="font-semibold text-gray-900">Phone number</span>{" "}
              &mdash; to verify that it is really you using one-time passwords
              (OTPs) and to help recover your account if you lose access.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-orange-500" />
            <span>
              <span className="font-semibold text-gray-900">
                Learning activity
              </span>{" "}
              &mdash; quiz attempts, scores, XP, streaks, levels, and where you
              stopped in your practice so that we can show your progress and
              keep your learning history.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-orange-500" />
            <span>
              <span className="font-semibold text-gray-900">
                Basic technical information
              </span>{" "}
              &mdash; such as device model, app version, and crash reports to
              fix bugs and keep the app working reliably.
            </span>
          </li>
        </ul>
        <p className="mt-4">
          We <span className="font-semibold text-orange-600">do not</span>{" "}
          collect payment details, precise GPS location, contacts, SMS messages,
          photos, microphone audio, advertising IDs, browsing history, or school
          records beyond what is needed to show your practice progress.
        </p>
      </>
    ),
  },
  {
    id: 3,
    title: "How We Use Your Information",
    body: (
      <>
        <p>
          We use your email, phone number, and in&#8209;app activity only for
          these purposes:
        </p>
        <ul className="mt-4 space-y-2 list-disc list-inside marker:text-orange-500">
          <li>To create, maintain, and secure your account.</li>
          <li>
            To let you sign in and verify your identity using OTP or similar
            methods.
          </li>
          <li>
            To save your learning progress and display XP, streaks, and levels
            to you.
          </li>
          <li>
            To send essential service messages, such as password resets,
            security alerts, or important changes to this Privacy Policy or the
            Terms of Service.
          </li>
          <li>
            To improve app stability and performance using anonymous diagnostics
            and crash reports.
          </li>
          <li>
            To comply with the laws and regulations that apply to us, including
            Indian data protection laws.
          </li>
        </ul>
        <p className="mt-4">
          We do not use your data for advertising, behavioural tracking, or any
          third&#8209;party marketing.
        </p>
      </>
    ),
  },
  {
    id: 4,
    title: "When We Share Your Data",
    body: (
      <>
        <p>
          We do not sell, rent, or trade your personal data. We share a limited
          amount of information only when strictly necessary:
        </p>
        <ul className="mt-4 space-y-3">
          <li className="flex gap-3">
            <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-orange-500" />
            <span>
              <span className="font-semibold text-gray-900">
                Hosting and authentication provider (Google Firebase / Google
                Cloud):
              </span>{" "}
              stores your account and runs the backend services under our
              instructions and contracts; they are not allowed to use your data
              for their own purposes.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-orange-500" />
            <span>
              <span className="font-semibold text-gray-900">
                Legal requirements:
              </span>{" "}
              if we are required to do so by law, a valid court order, or a
              request from authorities.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-orange-500" />
            <span>
              <span className="font-semibold text-gray-900">
                Business transfer:
              </span>{" "}
              if our company or assets are ever acquired or merged, your data
              may be transferred as part of that transaction, and the new owner
              must respect this Privacy Policy.
            </span>
          </li>
        </ul>
        <p className="mt-4">
          There are no advertising networks, data brokers, or analytics partners
          profiling you.
        </p>
      </>
    ),
  },
  {
    id: 5,
    title: "Children’s Privacy",
    body: (
      <>
        <p>
          LevelUp is an educational app and some users are children. We treat
          children&rsquo;s privacy with special care:
        </p>
        <ul className="mt-4 space-y-2 list-disc list-inside marker:text-orange-500">
          <li>
            If a user is considered a child under the laws of their country (for
            example, under 13 in the US, under 16 in the EEA, under 18 in
            India), we require a parent or guardian to provide consent before
            the child uses the app, where legally required.
          </li>
          <li>We do not show advertising to children.</li>
          <li>We do not build marketing profiles about children.</li>
          <li>
            We do not share children&rsquo;s data with third parties except as
            necessary to run the app (for example, hosting and authentication).
          </li>
          <li>
            A parent or guardian can contact us at{" "}
            <a
              href="mailto:support@supersheldon.com"
              className="text-orange-600 font-semibold hover:underline"
            >
              support@supersheldon.com
            </a>{" "}
            at any time to review, correct, or delete their child&rsquo;s
            information, or to withdraw consent.
          </li>
        </ul>
        <p className="mt-4">
          We do not knowingly collect personal data from children without
          appropriate consent where the law requires it.
        </p>
      </>
    ),
  },
  {
    id: 6,
    title: "How We Protect Your Data",
    body: (
      <>
        <p>
          We use technical and organisational safeguards to protect your
          information:
        </p>
        <ul className="mt-4 space-y-2 list-disc list-inside marker:text-orange-500">
          <li>
            All traffic between the app and our servers is encrypted using TLS
            (HTTPS).
          </li>
          <li>
            Data is stored with encryption at rest on secure Google Cloud
            servers.
          </li>
          <li>
            Passwords (if used) are stored using one&#8209;way hashing, not in
            plain text.
          </li>
          <li>
            Only authorised staff with a business need can access account data,
            following least&#8209;privilege principles.
          </li>
          <li>
            We keep our software updated and monitor for suspicious activity.
          </li>
        </ul>
        <p className="mt-4">
          No system can ever be 100% secure, but we work hard to protect your
          data. If we become aware of a data breach that is likely to affect
          you, we will notify you and, where required, the relevant authority
          without undue delay.
        </p>
      </>
    ),
  },
  {
    id: 7,
    title: "How Long We Keep Your Data",
    body: (
      <>
        <p>
          We keep your data only for as long as needed to run the service or as
          required by law:
        </p>
        <ul className="mt-4 space-y-2 list-disc list-inside marker:text-orange-500">
          <li>
            <span className="font-semibold text-gray-900">Account data</span>{" "}
            (email, phone, learning progress): kept while your account is
            active.
          </li>
          <li>
            <span className="font-semibold text-gray-900">
              After you delete your account:
            </span>{" "}
            removed from our active systems within about 30 days; remaining
            copies in encrypted backups are deleted through normal backup
            rotation.
          </li>
          <li>
            <span className="font-semibold text-gray-900">
              Crash and diagnostic logs:
            </span>{" "}
            kept for around 90 days to help us debug issues.
          </li>
        </ul>
        <p className="mt-4">
          When we no longer need data, we either delete it or irreversibly
          anonymise it.
        </p>
      </>
    ),
  },
  {
    id: 8,
    title: "Your Rights",
    body: (
      <>
        <p>
          Depending on where you live, you (or your parent/guardian for a child
          account) may have the right to:
        </p>
        <ul className="mt-4 space-y-2 list-disc list-inside marker:text-orange-500">
          <li>Access the personal data we hold about you.</li>
          <li>Correct information that is inaccurate or incomplete.</li>
          <li>
            Delete your account and associated personal data, subject to legal
            retention obligations.
          </li>
          <li>
            Withdraw consent for certain processing, such as notifications or
            other optional features.
          </li>
          <li>
            Complain to a data protection authority (for example, the Data
            Protection Board of India, or the relevant authority in your
            country).
          </li>
        </ul>
        <p className="mt-4">
          To exercise any of these rights, please email us at{" "}
          <a
            href="mailto:support@supersheldon.com"
            className="text-orange-600 font-semibold hover:underline"
          >
            support@supersheldon.com
          </a>
          . We aim to respond within 30 days.
        </p>
      </>
    ),
  },
  {
    id: 9,
    title: "Cookies, Storage, and Permissions",
    body: (
      <>
        <ul className="space-y-2 list-disc list-inside marker:text-orange-500">
          <li>
            The mobile app may store authentication tokens and a device
            identifier in secure storage to keep you signed in and sync your
            progress.
          </li>
          <li>
            We do not use advertising cookies or cross&#8209;site tracking
            cookies.
          </li>
          <li>
            The app typically needs the Internet permission to load quizzes and
            sync your data and may request Notifications permission to send
            reminders and updates; you can turn notifications off in your device
            settings.
          </li>
          <li>
            We do not request access to your location, contacts, SMS, camera,
            microphone, or photo gallery for LevelUp.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 10,
    title: "Where Your Data Is Stored",
    body: (
      <p>
        Your data is hosted on Google Cloud servers, primarily in regions
        selected to provide reliable service (for example, Asia&#8209;South1
        &mdash; Mumbai, or other supported regions as needed). For technical
        reasons, some data may be processed in other regions (for example, for
        authentication or push notifications), using lawful transfer mechanisms
        where required.
      </p>
    ),
  },
  {
    id: 11,
    title: "Laws We Follow",
    body: (
      <>
        <p>We aim to comply with applicable data protection laws, including:</p>
        <ul className="mt-4 space-y-2 list-disc list-inside marker:text-orange-500">
          <li>
            The Digital Personal Data Protection Act, 2023 (India) and the
            Information Technology Act, 2000
          </li>
          <li>COPPA for users under 13 in the United States</li>
          <li>
            GDPR&#8209;style requirements in regions such as the UK and EEA,
            where applicable
          </li>
          <li>
            Google Play and similar app store user data policies for apps used
            by children and families
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 12,
    title: "Changes to This Policy",
    body: (
      <>
        <p>
          We may update this Privacy Policy from time to time. If we make
          material changes, we will update the &ldquo;Last Updated&rdquo; date
          at the top and notify active users in the app or by email before the
          changes take effect.
        </p>
        <p className="mt-4">
          If you continue using the app after the new version becomes effective,
          it means you accept the updated Privacy Policy.
        </p>
      </>
    ),
  },
  {
    id: 13,
    title: "Contact Us",
    body: (
      <>
        <p>
          If you have questions, concerns, or requests about your data or this
          Privacy Policy, you can contact us at:
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-orange-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
              Phone Number
            </p>
            <p className="mt-2 text-gray-900 font-medium">+91 9555070825</p>
          </div>
          <div className="rounded-2xl border border-orange-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
              Support
            </p>
            <a
              href="mailto:support@supersheldon.com"
              className="mt-2 inline-block text-gray-900 font-medium hover:text-orange-600"
            >
              support@supersheldon.com
            </a>
          </div>
          <div className="sm:col-span-2 rounded-2xl border border-orange-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
              Postal Address
            </p>
            <p className="mt-2 text-gray-900">
              Om Chambers 648/A 4th Flr, Binnamangala 1st Stage, Indiranagar
              (Bangalore), Indiranagar police station, Bangalore North,
              Bangalore- 560038, Karnataka, India
            </p>
          </div>
        </div>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-500 via-orange-400 to-orange-300 pt-20 pb-28 px-6">
        {/* decorative grid */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-8 transition"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold tracking-widest uppercase border border-white/30">
            LevelUp Legal
          </span>

          <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-md">
            Privacy Policy
          </h1>
          <p className="mt-4 text-white/90 text-base md:text-lg max-w-2xl mx-auto">
            What we collect, how we use it, how we keep it safe, and the choices
            you have when using LevelUp.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center text-sm">
            <span className="px-5 py-2 bg-white text-orange-600 rounded-full font-semibold shadow-md">
              Effective Date: 21 May 2026
            </span>
            <span className="px-5 py-2 bg-black/30 backdrop-blur-md text-white rounded-full font-semibold border border-white/30">
              Last Updated: 21 May 2026
            </span>
          </div>
        </div>

        {/* curved white separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            className="w-full h-16 md:h-20"
          >
            <path
              d="M0,80 C360,0 1080,0 1440,80 L1440,80 L0,80 Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-4xl mx-auto px-6 -mt-12 relative z-10 pb-24">
        {/* Intro card */}
        <div className="rounded-3xl bg-white border border-orange-100 shadow-xl shadow-orange-100/40 p-6 md:p-10 mb-12">
          <p className="text-gray-700 leading-relaxed text-base md:text-lg">
            This Privacy Policy explains what personal information we collect
            when you use the{" "}
            <span className="font-semibold text-orange-600">LevelUp</span> app,
            how we use it, how we keep it safe, and what choices you have.{" "}
            <span className="font-semibold text-gray-900">
              By using the app, you agree to the practices described here.
            </span>
          </p>
        </div>

        {/* Table of Contents */}
        <div className="rounded-3xl border border-orange-100 bg-orange-50/40 p-6 md:p-8 mb-12">
          <h2 className="text-orange-600 font-bold text-lg mb-4 uppercase tracking-wide">
            On this page
          </h2>
          <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-gray-700">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#section-${s.id}`}
                  className="hover:text-orange-600 transition font-medium"
                >
                  <span className="text-orange-500 font-bold mr-2">
                    {s.id}.
                  </span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((s) => (
            <article
              id={`section-${s.id}`}
              key={s.id}
              className="rounded-3xl bg-white border border-orange-100 shadow-md shadow-orange-100/30 p-6 md:p-10 scroll-mt-24"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-400 text-white font-extrabold text-lg shadow-md">
                  {s.id}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {s.title}
                </h2>
              </div>
              <div className="text-gray-700 leading-relaxed space-y-3 text-base md:text-[1.05rem]">
                {s.body}
              </div>
            </article>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-14 rounded-3xl bg-gradient-to-r from-orange-500 to-orange-400 p-8 md:p-12 text-center shadow-2xl shadow-orange-200">
          <h3 className="text-2xl md:text-3xl font-extrabold text-white">
            Questions about your privacy?
          </h3>
          <p className="text-white/90 mt-3 max-w-xl mx-auto">
            We&rsquo;re happy to help. Reach out to our privacy team and we
            aim to reply within 30 days.
          </p>
          <a
            href="mailto:support@supersheldon.com"
            className="inline-block mt-6 px-8 py-3 bg-white text-orange-600 font-bold rounded-full shadow-lg hover:scale-105 active:scale-95 transition"
          >
            Email support@supersheldon.com
          </a>
        </div>

        {/* Back to top */}
        <div className="mt-10 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
