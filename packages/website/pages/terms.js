import Head from "next/head"
import Section from "@/components/Section"
import Logo from "@/components/Logo"
import { Text } from "@/components/Typography"

export default function Home() {
  return (
    <>
      <Head>
        <title>SPARKS Foundation - Terms</title>
        <meta name="description" content="SPARKS Foundation - Terms" />
      </Head>
      <Section triangleTop="left-1/4" triangleBot="left-3/4">
        <div className="flex justify-center flex-col max-w-4xl">
          <div className="flex-shrink-0 flex items-center mx-auto">
            <Logo className="h-12 w-12 mr-1" />
            <h2 className="text-slate-50 font-bold text-3xl">
              SPARKS - Terms of Use
            </h2>
          </div>
          <h6 className="text-slate-50 text-sm opacity-60 mx-auto mb-10">
            Last updated: April 11th, 2023
          </h6>
          <Text className="mb-10 text-justify" small>
            Please read these Terms of Use ("Terms") carefully as they govern your use of the websites and services provided by Sparks Foundation and Sparks DAO ("Services"). These Terms represent a binding agreement between you and Sparks Foundation and Sparks DAO. By accessing, using, or participating in the Services, you acknowledge that you have read, understood, and agree to be bound by these Terms.
          </Text>
          <Text className="mb-10 text-justify" small>
            Acceptance of Terms. You accept these Terms when you access or use the Services or any portion of the Services. If you do not agree to these Terms, do not use the Services.
          </Text>
          <Text className="mb-10 text-justify" small>
            Compliance with Regulations. By using the Services, you covenant, represent, and warrant that you comply with all related regulatory conditions, including but not limited to sanctions compliance and anti-money laundering (AML) procedures, and adhere to any such related covenants as provided from time to time by Sparks Foundation and Sparks DAO, which shall in any case be no less stringent than the ones in place on the date of the Foundation’s formation and of the ratification of these Bylaws.
          </Text>
          <Text className="mb-10 text-justify" small>
            Intellectual Property. The Services contain proprietary information and content that is protected by intellectual property laws and treaties. All trademarks, service marks, and trade names are proprietary to Sparks Foundation and Sparks DAO.
          </Text>
          <Text className="mb-10 text-justify" small>
            Limitations of Liability. Sparks Foundation and Sparks DAO shall not be liable for any damages, including but not limited to direct, indirect, incidental, consequential, or punitive damages arising out of or in connection with the Services. This limitation of liability applies to all causes of action, whether based on contract, tort, or any other legal theories.
          </Text>
          <Text className="mb-10 text-justify" small>
            Governance Token. SPARKS (SPARK) governance token is solely intended to be used as a governance token within our DAO ecosystem, and it does not confer any ownership or other financial rights to the holder. The information on our website is for general information purposes only and is not financial or investment advice. Our governance token is not intended to be a security or investment in any jurisdiction, and we make no warranties or representations to that effect.
          </Text>
          <Text className="mb-10 text-justify" small>
            Termination. Sparks Foundation and Sparks DAO may, in their sole discretion, terminate or suspend your access to all or part of the Services, with or without notice, for any reason, including breach of these Terms.
          </Text>
          <Text className="mb-10 text-justify" small>
            Governing Law. These Terms shall be governed by and construed in accordance with the laws of Cayman Islands. Any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Cayman Islands.
          </Text>
          <Text className="mb-10 text-justify" small>
            Changes to the Terms. Sparks Foundation and Sparks DAO reserve the right, in their sole discretion, to modify or update these Terms at any time. If Sparks Foundation and Sparks DAO make material changes to these Terms, they will notify you by email or by posting a notice on the Services.
          </Text>
          <Text className="mb-10 text-justify" small>
            Contact Information. If you have any questions or concerns about these Terms, please contact Sparks Foundation and Sparks DAO at operations@sparks.foundation.
          </Text>
        </div>
      </Section>
    </>
  )
}