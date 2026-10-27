import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site-chrome";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms and Conditions — Sanidhya School of Coding" },
      {
        name: "description",
        content:
          "Terms and Conditions governing use of Sanidhya School of Coding and its educational content and services.",
      },
    ],
  }),
  component: TermsAndConditions,
});

const sections = [
  {
    title: "1. Introduction",
    paragraphs: [
      "Welcome to Sanidhya School of Coding.",
      "These Terms and Conditions (“Terms”) govern your access to and use of Sanidhya School of Coding, its website, educational content, learning resources, courses, projects, tutorials, and associated digital services.",
      "The platform is owned and operated by YK UNIVERSE, which may also operate other platforms, including STUDY WITH YASHVANTH and other current or future digital platforms.",
      "Throughout these Terms, “we,” “us,” and “our” refer to YK UNIVERSE and the relevant platform it operates. “You” and “your” refer to any visitor or user accessing our platforms.",
      "By accessing or using our platforms, you agree to these Terms. If you do not agree, please discontinue use of the relevant services.",
    ],
  },
  {
    title: "2. About Our Platform",
    paragraphs: [
      "Sanidhya School of Coding is a technology learning platform intended to help learners understand technology through educational content, practical examples, programming tutorials, projects, learning paths, technical articles, notes, and other resources.",
      "Our content may cover programming, web development, databases, artificial intelligence, cybersecurity, cloud computing, software engineering, and related technology topics.",
      "The availability of specific content or features may change over time. We may introduce, update, suspend, or discontinue features as our platform develops.",
    ],
  },
  {
    title: "3. Eligibility and Acceptable Use",
    paragraphs: ["You may use our platforms only in accordance with applicable law and these Terms.", "You agree to use our services responsibly and not to:"],
    items: [
      "Violate applicable laws or regulations.",
      "Attempt unauthorized access to our websites, servers, databases, accounts, or administrative systems.",
      "Interfere with the security, performance, or availability of our services.",
      "Upload malicious software or attempt to exploit vulnerabilities.",
      "Use automated tools to scrape, copy, or extract content in a manner that violates applicable law or our rights.",
      "Impersonate another person or misrepresent your identity.",
      "Use our platforms to distribute unlawful, harmful, deceptive, or infringing material.",
      "Circumvent access restrictions or abuse platform functionality.",
    ],
    after: ["We may restrict access when reasonably necessary to protect users, our services, or our legal rights, subject to applicable law."],
  },
  {
    title: "4. Educational Content and No Guarantee of Results",
    paragraphs: [
      "Our educational materials are provided to support learning and skill development.",
      "We aim to make our content useful and accurate, but technology changes frequently. Examples, tutorials, code, documentation, and recommendations may become outdated or contain errors.",
      "We do not guarantee that using our content will result in employment, internships, academic success, certifications, income, business success, or any particular technical skill level.",
      "Your results depend on factors such as your prior knowledge, effort, practice, individual circumstances, and changes in technology.",
      "You are responsible for evaluating whether a resource is suitable for your learning goals and verifying important technical information before relying on it in real-world applications.",
    ],
  },
  {
    title: "5. Accounts and Account Security",
    paragraphs: [
      "Certain features may require you to create an account or provide information such as your name and email address.",
      "You agree to provide accurate information and take reasonable steps to protect your account credentials.",
      "You must not share access in a way that compromises account security or use another person's account without authorization.",
      "You should notify us through the official contact information published on our platform if you believe your account has been compromised.",
      "We may suspend or restrict accounts where reasonably necessary to address security risks, suspected abuse, violations of these Terms, or legal obligations.",
      "We do not promise that account registration or account-based features will be available on every platform or at all times.",
    ],
  },
  {
    title: "6. Intellectual Property",
    paragraphs: [
      "Unless otherwise stated, the website's original branding, logos, visual designs, written content, original graphics, and other original materials created by YK UNIVERSE or the relevant platform are owned by, or used with permission by, their respective rights holders.",
      "These materials are protected by applicable intellectual property laws.",
      "You may access and use our content for personal learning and other lawful purposes permitted by these Terms and applicable law.",
      "Unless expressly permitted by us or by the applicable licence, you must not:",
    ],
    items: [
      "Reproduce or republish substantial portions of our original content as your own.",
      "Sell, commercially redistribute, or repackage our original resources without authorization.",
      "Remove copyright notices or misrepresent ownership.",
      "Copy our branding or create a confusingly similar platform.",
      "Use our original materials in a way that infringes intellectual property rights.",
    ],
    after: ["Nothing in these Terms removes rights you may have under applicable law."],
  },
  {
    title: "7. Code Examples, Projects, and Open-Source Materials",
    paragraphs: [
      "Our platform may provide source code, programming examples, project demonstrations, repositories, and links to open-source software.",
      "Unless a specific licence or notice states otherwise, code and materials created by us remain subject to the applicable rights and permissions of their owners.",
      "Where a project or repository includes an open-source licence, that licence governs the permitted use of the relevant material.",
      "You are responsible for reviewing applicable licences before copying, modifying, distributing, or commercially using third-party code.",
      "You must also test code and review security implications before using it in production systems. Educational code examples are not necessarily production-ready.",
    ],
  },
  {
    title: "8. User-Submitted Content",
    paragraphs: [
      "If our platforms allow you to submit comments, feedback, suggestions, files, or other material, you remain responsible for the content you submit.",
      "You must have the necessary rights and permissions to submit that material.",
      "You must not submit content that is unlawful, defamatory, deceptive, malicious, privacy-invasive, or infringing.",
      "By submitting content, you grant us permission to use, display, store, and process it as reasonably necessary to operate the relevant feature, subject to applicable law and our Privacy Policy.",
      "This permission does not automatically transfer ownership of your content to us.",
      "If we intend to use a submission for a separate purpose, such as promotional publication beyond the original feature, we will obtain permission where required.",
      "We may remove or restrict submitted content when reasonably necessary to enforce these Terms, address safety concerns, or comply with applicable law.",
    ],
  },
  {
    title: "9. Third-Party Links and Services",
    paragraphs: [
      "Our platforms may link to third-party websites, tools, videos, repositories, documentation, and services.",
      "These links are provided for convenience, reference, or educational purposes.",
      "We do not control third-party services and are not responsible for their content, availability, security, policies, or practices.",
      "Your use of third-party services is subject to their own terms and policies.",
      "A link to an external product or service does not necessarily imply endorsement, sponsorship, or affiliation.",
    ],
  },
  {
    title: "10. Availability and Changes to Services",
    paragraphs: [
      "We aim to keep our platforms available and functional, but uninterrupted access cannot be guaranteed.",
      "Services may occasionally be unavailable because of maintenance, technical failures, hosting limitations, security incidents, or circumstances beyond our reasonable control.",
      "We may modify, update, suspend, or discontinue any part of our services when reasonably necessary.",
      "Where appropriate and practicable, we will take reasonable steps to minimize disruption and protect user information.",
    ],
  },
  {
    title: "11. Privacy and Personal Information",
    paragraphs: [
      "Your use of our platforms is also subject to our Privacy Policy, which explains how personal information may be collected, used, stored, and shared.",
      "The Privacy Policy should be read together with these Terms.",
      "Where consent is required for a particular form of processing, these Terms do not replace that consent.",
    ],
  },
  {
    title: "12. Security and Responsible Technology Use",
    paragraphs: [
      "Our educational content may discuss cybersecurity, penetration testing, networking, software vulnerabilities, and related topics.",
      "You must use this information responsibly and lawfully.",
      "You must not use our platforms or educational materials to gain unauthorized access to systems, steal information, deploy malware, disrupt services, or violate the rights of others.",
      "You are responsible for obtaining appropriate authorization before testing or modifying any system that you do not own or control.",
    ],
  },
  {
    title: "13. Disclaimers",
    paragraphs: [
      "Our platforms and content are provided on an “as available” basis, subject to applicable law.",
      "To the extent permitted by law, we do not warrant that every page, resource, code sample, external link, or service will always be accurate, complete, uninterrupted, secure, or free from errors.",
      "We make reasonable efforts to maintain useful educational resources, but we cannot guarantee that all information is suitable for every purpose.",
      "Additional disclaimers may apply to specific content or services.",
    ],
  },
  {
    title: "14. Limitation of Liability",
    paragraphs: [
      "To the extent permitted by applicable law, YK UNIVERSE and the relevant platform operators will not be liable for indirect or consequential losses arising from the use of our platforms, including losses resulting from reliance on educational content, code examples, third-party services, or temporary service interruptions.",
      "Nothing in these Terms excludes or limits liability where such exclusion or limitation is prohibited by applicable law, including any applicable rights or remedies that cannot legally be waived.",
      "You remain responsible for your decisions, implementations, and use of information obtained through our platforms.",
    ],
  },
  {
    title: "15. Indemnity",
    paragraphs: [
      "To the extent permitted by applicable law, you may be responsible for losses or reasonable costs arising directly from your unlawful use of our platforms, your infringement of another person's rights, or your material violation of these Terms.",
      "This section does not apply to the extent a claim arises from our own conduct for which applicable law does not permit responsibility to be excluded or transferred.",
    ],
  },
  {
    title: "16. Suspension and Termination",
    paragraphs: [
      "We may suspend or terminate access to an account or feature when reasonably necessary because of a serious or repeated violation of these Terms, suspected security abuse, unlawful activity, or a legal requirement.",
      "Where appropriate and legally permitted, we may provide notice and an opportunity to resolve the issue.",
      "You may stop using our platforms at any time. If account deletion is available, you may use the relevant account controls or contact us through our official contact details.",
      "Any information retained after account closure will be handled according to our Privacy Policy and applicable legal requirements.",
    ],
  },
  {
    title: "17. Changes to These Terms",
    paragraphs: [
      "We may revise these Terms to reflect changes to our services, platform features, business operations, or applicable legal requirements.",
      "The updated Terms will be published on the relevant website with a revised “Last Updated” date.",
      "Where required by law, we will provide additional notice or obtain consent before applying material changes.",
      "Your continued use of the relevant platform after updated Terms become effective will be subject to the requirements of applicable law.",
    ],
  },
  {
    title: "18. Governing Law and Disputes",
    paragraphs: [
      "These Terms are subject to the applicable laws of India.",
      "Any dispute relating to these Terms will be handled by the competent courts or other appropriate dispute-resolution mechanisms under applicable law.",
      "Nothing in this section removes any mandatory consumer protection, privacy, or other legal rights available to you.",
    ],
  },
  {
    title: "19. Contact Information",
    paragraphs: [
      "For questions about these Terms, intellectual property concerns, or other legal enquiries, contact us through the official contact information published on the relevant platform.",
      "Platform: Sanidhya School of Coding",
      "Organization: YK UNIVERSE",
      "Related platform: STUDY WITH YASHVANTH",
    ],
  },
  {
    title: "20. Final Agreement",
    paragraphs: [
      "These Terms, together with the applicable Privacy Policy and any additional terms presented for specific services, govern your use of our platforms.",
      "If any provision is found to be unenforceable, the remaining provisions will continue to apply to the extent permitted by law.",
      "Thank you for being part of Sanidhya School of Coding.",
      "Learn. Build. Create.",
    ],
  },
];

function TermsAndConditions() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms and Conditions"
        intro="Effective Date: 27 October 2026 · Last Updated: 27 October 2026"
      />
      <article className="mx-auto max-w-4xl px-5 py-12 md:py-16">
        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.title} className="space-y-4">
              <h2 className="text-2xl font-bold">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="leading-7 text-muted-foreground">
                  {paragraph}
                </p>
              ))}
              {section.title === "11. Privacy and Personal Information" && (
                <p className="leading-7 text-muted-foreground">
                  <strong>Privacy Policy:</strong>{" "}
                  <Link to="/privacy-policy" className="text-primary underline underline-offset-4">
                    Read our Privacy Policy
                  </Link>
                  .
                </p>
              )}
              {section.title === "19. Contact Information" && (
                <p className="leading-7 text-muted-foreground">
                  <strong>Contact email:</strong>{" "}
                  <a className="text-primary underline underline-offset-4" href="mailto:sanidhyaschoolofcoding@gmail.com">
                    sanidhyaschoolofcoding@gmail.com
                  </a>
                  .
                </p>
              )}
              {"items" in section && section.items && (
                <ul className="list-disc space-y-2 pl-6 leading-7 text-muted-foreground">
                  {section.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              )}
              {"after" in section && section.after?.map((paragraph) => (
                <p key={paragraph} className="leading-7 text-muted-foreground">{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
      </article>
    </>
  );
}
