import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site-chrome";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Sanidhya School of Coding" },
      {
        name: "description",
        content:
          "Learn how YK UNIVERSE collects, uses, stores, shares, and protects personal information across Sanidhya School of Coding and associated platforms.",
      },
    ],
  }),
  component: PrivacyPolicy,
});

const sections = [
  {
    title: "1. Introduction",
    paragraphs: [
      "Welcome to Sanidhya School of Coding.",
      "This Privacy Policy explains how YK UNIVERSE, including its platforms, brands, projects, and associated services, collects, uses, stores, shares, and protects personal information when you visit or use our websites, educational platforms, and digital services.",
      "Our platforms may include Sanidhya School of Coding, STUDY WITH YASHVANTH, and other existing or future platforms operated by YK UNIVERSE.",
      "We respect your privacy and aim to collect only the information reasonably necessary to operate, improve, and provide our services.",
      "By using our platforms, you acknowledge this Privacy Policy. Where consent is legally required, we will obtain it separately.",
    ],
  },
  {
    title: "2. About Us",
    paragraphs: [
      "Organization / Platform Owner: YK UNIVERSE",
      "Platform: Sanidhya School of Coding",
      "Other associated platforms: STUDY WITH YASHVANTH and other current or future platforms owned or operated by YK UNIVERSE.",
      "YK UNIVERSE operates digital platforms intended to provide educational content, learning resources, technology-related information, and other digital services.",
      "For privacy-related questions or requests, contact us using the official contact information published on the relevant platform.",
    ],
  },
  {
    title: "3. Information We Collect",
    paragraphs: ["Depending on how you use our platforms and which features you choose to access, we may collect the following information."],
    subsections: [
      {
        title: "3.1 Personal Information",
        items: ["Name or display name.", "Email address, including a Gmail address.", "Interests and preferred learning topics.", "Basic information you voluntarily provide through forms, account registration, surveys, or other interactions."],
      },
      {
        title: "3.2 Account and Platform Information",
        paragraphs: ["If account functionality is provided, we may process information necessary to create and manage your account, authenticate you, maintain your preferences, and provide access to relevant features.", "We do not request your email password. If a supported third-party sign-in service is used, authentication will be handled according to that service's applicable procedures."],
      },
      {
        title: "3.3 Technical Information",
        paragraphs: ["Depending on the website configuration, hosting provider, and services enabled, technical information such as browser type, device information, IP address, approximate location derived from technical data, access times, and diagnostic logs may be processed.", "We do not promise that every category of technical information is collected. The information processed depends on the features and services actually enabled."],
      },
      {
        title: "3.4 Information You Choose to Provide",
        paragraphs: ["You may voluntarily submit messages, feedback, questions, learning preferences, or other information when contacting us or interacting with our platforms.", "Please avoid submitting sensitive personal information unless it is specifically required for a legitimate feature."],
      },
    ],
  },
  {
    title: "4. How We Use Your Information",
    paragraphs: ["We may use collected information for the following purposes:"],
    items: ["Creating and managing user accounts.", "Providing educational content, courses, projects, notes, and learning resources.", "Understanding your interests and improving the relevance of available content.", "Responding to enquiries, feedback, and support requests.", "Maintaining website security and preventing abuse.", "Troubleshooting technical issues and improving performance.", "Understanding general usage patterns where appropriate analytics are enabled.", "Communicating important service-related information.", "Improving existing platforms and developing new services within YK UNIVERSE.", "Complying with applicable legal obligations."],
    after: ["We will not use personal information for purposes that are incompatible with the purposes explained in this Policy without providing any additional notice or obtaining consent where required by law."],
  },
  {
    title: "5. Sharing Information Across YK UNIVERSE Platforms",
    paragraphs: ["YK UNIVERSE may operate multiple websites, educational platforms, brands, and digital services, including Sanidhya School of Coding and STUDY WITH YASHVANTH.", "Where reasonably necessary for the purposes described in this Policy, and subject to applicable law and required consent, information may be shared between platforms owned or operated by YK UNIVERSE.", "For example, your name, email address, learning interests, and basic preferences may be used across associated platforms to:"],
    items: ["Provide a more consistent user experience.", "Remember relevant preferences where supported.", "Improve educational content and services.", "Manage user requests and support.", "Develop and improve related educational platforms."],
    after: ["This does not mean that every platform automatically receives all information. Sharing will depend on the purpose, functionality, technical arrangements, and applicable legal requirements.", "We do not treat this provision as permission to sell personal information. We do not sell your personal information to third parties.", "Where a future platform is operated by an independent organization rather than YK UNIVERSE, its information-sharing practices will be explained separately where required."],
  },
  {
    title: "6. Sharing With Service Providers and Other Parties",
    paragraphs: ["We may use third-party service providers to operate our platforms, such as website hosting providers, database providers, file-storage services, security services, authentication providers, and analytics tools where enabled.", "These providers may process information on our behalf to perform the services they provide.", "We aim to use appropriate providers and reasonable safeguards to protect information. We may also disclose information when required by applicable law, a valid legal process, or to protect the rights, security, and integrity of our platforms and users.", "We do not authorize service providers to use personal information for unrelated purposes where restricted by our applicable agreements or law."],
  },
  {
    title: "7. Cookies and Similar Technologies",
    paragraphs: ["Our platforms or their service providers may use cookies, local storage, session technologies, or similar mechanisms to support features such as:"],
    items: ["Maintaining login sessions.", "Remembering preferences.", "Improving security.", "Understanding website performance, if analytics are enabled."],
    after: ["The technologies used will depend on the actual implementation.", "You can manage cookies through your browser settings. Disabling certain cookies may affect features such as login or saved preferences.", "If advertising or non-essential analytics technologies are introduced in the future, we will provide additional notices or consent controls where required by law."],
  },
  {
    title: "8. Data Storage and Security",
    paragraphs: ["We use reasonable technical and organizational measures appropriate to the nature of the information we process.", "Depending on the platform, these measures may include access controls, secure authentication, protected server configurations, and restricted access to stored information.", "Information may be stored or processed by hosting and infrastructure providers in locations that differ from your own.", "No website, electronic transmission, or storage system can be guaranteed to be completely secure. We therefore cannot guarantee absolute security, but we aim to take reasonable steps to protect personal information against unauthorized access, loss, misuse, or disclosure."],
  },
  {
    title: "9. Data Retention",
    paragraphs: ["We retain personal information only for as long as reasonably necessary for the purposes described in this Policy, including providing services, maintaining accounts, resolving disputes, ensuring security, and complying with legal obligations.", "When information is no longer needed, we will take reasonable steps to delete it, anonymize it, or otherwise handle it appropriately, subject to applicable legal requirements and legitimate retention needs.", "Backups and technical logs may remain for a limited period according to the relevant system's retention procedures."],
  },
  {
    title: "10. Your Privacy Rights and Choices",
    paragraphs: ["Subject to applicable law, you may have the right to:"],
    items: ["Request information about personal data we hold about you.", "Request correction of inaccurate information.", "Request deletion of personal information where applicable.", "Withdraw consent where processing is based on consent.", "Object to or restrict certain processing where legally available.", "Raise a concern or submit a privacy-related complaint."],
    after: ["You can submit a request using the official contact details published on our platform. We may need to verify your identity before acting on certain requests.", "Withdrawing consent does not necessarily affect processing that was lawful before the withdrawal, or processing that may continue on another valid legal basis."],
  },
  {
    title: "11. Children's Privacy",
    paragraphs: ["Our educational content may be useful to students of different ages. We do not knowingly seek to collect personal information from children in violation of applicable law.", "Where consent from a parent or lawful guardian is required, we will seek to comply with the applicable requirements before collecting or processing the relevant information.", "If you believe a child has provided personal information in circumstances that violate applicable law, please contact us so that we can review the matter and take appropriate action."],
  },
  {
    title: "12. External Links and Embedded Content",
    paragraphs: ["Our platforms may link to or embed content from third-party services, including YouTube, GitHub, educational websites, and other external platforms.", "When you visit an external website or interact with embedded content, that service may collect information according to its own privacy policy and settings.", "We do not control the independent privacy practices of third-party services. We encourage you to review their policies before sharing information with them."],
  },
  {
    title: "13. Educational Content and User Submissions",
    paragraphs: ["If our platforms allow comments, feedback, uploads, or other public submissions, information you choose to publish may be visible to other users.", "Do not include private information in publicly visible submissions.", "We may moderate or remove submissions where reasonably necessary to maintain safety, protect our platforms, or enforce applicable rules.", "Any additional account, submission, or community features introduced in the future may be accompanied by feature-specific notices or terms."],
  },
  {
    title: "14. Changes to This Privacy Policy",
    paragraphs: ["We may update this Privacy Policy as our platforms, services, technologies, or legal obligations change.", "The revised version will be published on the relevant platform with an updated ‘Last Updated’ date.", "Where required by law, we will provide additional notice or obtain consent before implementing material changes.", "We encourage you to review this page periodically."],
  },
  {
    title: "15. Contact Us",
    paragraphs: ["If you have questions, concerns, or requests regarding this Privacy Policy or the handling of your personal information, contact YK UNIVERSE through the official contact information published on the relevant website.", "Platform: Sanidhya School of Coding", "Organization: YK UNIVERSE", "Related platform: STUDY WITH YASHVANTH", "Privacy contact email: sanidhyaschoolofcoding@gmail.com", "We will review privacy-related requests and respond in accordance with applicable law."],
  },
];

function PrivacyPolicy() {
  return (
    <>
      <PageHeader
        eyebrow="Privacy"
        title="Privacy Policy"
        intro="Effective Date: 27 October 2026 · Last Updated: 27 October 2026"
      />
      <article className="mx-auto max-w-4xl px-5 py-12 md:py-16">
        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.title} className="space-y-4">
              <h2 className="text-2xl font-bold">{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="leading-7 text-muted-foreground">{paragraph}</p>
              ))}
              {section.items && (
                <ul className="list-disc space-y-2 pl-6 leading-7 text-muted-foreground">
                  {section.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              )}
              {section.after?.map((paragraph) => (
                <p key={paragraph} className="leading-7 text-muted-foreground">{paragraph}</p>
              ))}
              {section.subsections?.map((subsection) => (
                <div key={subsection.title} className="space-y-3 pl-4">
                  <h3 className="text-lg font-semibold">{subsection.title}</h3>
                  {subsection.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className="leading-7 text-muted-foreground">{paragraph}</p>
                  ))}
                  {subsection.items && (
                    <ul className="list-disc space-y-2 pl-6 leading-7 text-muted-foreground">
                      {subsection.items.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          ))}
        </div>
      </article>
    </>
  );
}
