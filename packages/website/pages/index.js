import Break from "@/components/Break"
import Card from "@/components/Card"
import { Button } from "@/components/Controls"
import Logo from "@/components/Logo"
import Navigation from "@/components/Navigation"
import Section from "@/components/Section"
import Triangle from "@/components/Triangle"
import { Heading, Subtitle, Text } from "@/components/Typography"
import React, { useEffect, useState } from "react"
import { ArrowUpRightIcon } from "@heroicons/react/24/outline"
import Head from "next/head"
import { Spark } from "sparks-sdk"
import { Blake3 } from "sparks-sdk/hashers/Blake3"
import { Ed25519 } from "sparks-sdk/signers/Ed25519"
import { Basic } from "sparks-sdk/controllers/Basic"
import { X25519SalsaPoly } from "sparks-sdk/ciphers/X25519SalsaPoly"
import { PostMessage } from "sparks-sdk/channels/PostMessage"

let identity;
if (typeof window !== 'undefined') {
  identity = new Spark({
    cipher: X25519SalsaPoly,
    controller: Basic,
    hasher: Blake3,
    signer: Ed25519,
  });
  identity.incept();
}

const useUser = () => {
  const [handle, setHandle] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [holder, setHolder] = useState(null);
  const [connection, setConnection] = useState(null);

  const accept = process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : 'https://id.sparks.foundation';
  let connecting = false;

  const setEventHandlers = (channel) => {
    channel.on(channel.eventTypes.ANY_ERROR, error => {
      console.log('error event:', error);
      connecting = false;
      setHandle(null);
      setAvatar(null);
      setHolder(null);
    });

    channel.on(channel.eventTypes.MESSAGE_REQUEST, async event => {
      console.log('message event:', event);
      const data = await channel.getEventData(event);
      if (!data) return;
      setHandle(data.message['handle'] || null);
      setAvatar(data.message['avatar'] || null);
      if (data.message['credentials.ethereum.holdings.0x5f5c86a9f8aaf63ce27b82fab3b33df73cbc3d12']?.length) {
        setHolder(true);
      }
    });

    channel.on([
      channel.eventTypes.CLOSE_REQUEST,
      channel.eventTypes.CLOSE_CONFIRM,
    ], event => {
      console.log('close event:', event);
      connecting = false;
      setHandle(null);
      setAvatar(null);
      setHolder(null);
      setConnection(null);
    });
  }

  // you can passively accept connections as an app
  const acceptConnection = async ({ } = {}) => {
    PostMessage.receive(async ({ event, confirmOpen }) => {
      const channel = await confirmOpen();
      console.log(channel);
      setConnection(channel);
      setEventHandlers(channel);
    }, { spark: identity });
  }

  // or you can give the user ability to sign-in 
  const login = async () => {
    const url = new URL(`${accept}/connect`);
    url.search = new URLSearchParams({
      website: 'Sparks Foundation',
      channel: 'PostMessage',
      banner: `${window.location.origin}/images/login-banner.png`,
      url: window.location.href,
      origin: window.location.origin,
      description: 'Sparks Foundation is a non-profit foundation building ethical, human-centered identity tooling. Connect to see a demo of customized content experience.',
      query: JSON.stringify({
        data: [
          'handle',
          'avatar',
          'credentials.ethereum.holdings.0x5f5c86a9f8aaf63ce27b82fab3b33df73cbc3d12',
        ]
      }),
    });
    window.open(url, '_blank');
  }

  const logout = async () => {
    if (!connection || !connection.open) {
      return;
    }
    await connection.close();
  }

  useEffect(() => {
    if (!connecting) {
      connecting = true
      acceptConnection()
    }
  }, [])

  return { handle, holder, avatar, login, logout }
}

export default function Index() {
  const { handle, holder, avatar, login, logout } = useUser()

  return (
    <>
      <Head>
        <title>SPARKS Foundation</title>
        <meta name="description" content="SPARKS Foundation" />
      </Head>
      <Navigation />
      <Section id="" triangleTop="hidden lg:block left-1/4" triangleBot="left-3/4">
        <div className=" md:flex justify-center items-center flex-wrap box-border pt-10 md:min-h-[calc(100vh_-_7rem)]">
          <div className="text-center md:text-left w-full md:max-w-1/2 pr-0 md:pr-2 flex-shrink-0">
            {handle ? (
              <Heading small className="mt-10 md:mt-0 text-center md:text-left mb-8 whitespace-nowrap">
                Welcome back <span className="text-sparks-purple-500">{handle}!</span>
                <br />
                {holder ? 
                  <>Thank you for your <span className="text-sparks-purple-500">support!</span></> :
                  <>Let's reclaim your <span className="text-sparks-purple-500">identity</span></> 
                }
              </Heading>
            ) : (
              <Heading className="mt-10 md:mt-0 text-center md:text-left mb-8 whitespace-nowrap">
                User controlled
                <br />
                digital <span className="text-sparks-purple-500">identity</span>
              </Heading>
            )}
            <Text className="text-center md:text-justify mb-8">
              Decentralized identity is set to transform the world. However, If we allow centralized and profit-motivated organizations to build these solutions, we risk bias and mis-alignment. To ensure equitable outcomes, we're building inclusive and ethical identity tools, together.
            </Text>
            <Button className="mb-4 md:mb-0 mx-auto" href="https://discord.sparks.foundation" target="_blank">
              Join discord
              <ArrowUpRightIcon className="h-4 ml-2 inline-block" />
            </Button>
          </div>
          <div className="w-full max-w-lg mx-auto md:max-w-1/2 pl-0 md:pl-2 object-contain flex-shrink">
            <img className="w-full h-auto" src="/images/identity-app-1.png" />
          </div>
        </div>
      </Section>

      <Section id="about" solid>
        <div className="w-full md:flex justify-center items-center flex-wrap box-border pt-10">
          <div className="w-full md:max-w-7/12">
            <Subtitle className="mb-10 flex items-center">
              <Logo className="h-6 w-6 mr-1 opacity-40" />
              About
            </Subtitle>
            <Heading className="mb-6">
              SPARKS ecosystem
            </Heading>
            <Text>
              The SPARKS Foundation provides purpose, constitution, and grants to drive ethical, human-first identity products and services.
            </Text>
          </div>
          <div className="w-full md:max-w-5/12 flex justify-end">
            <Button className="mt-14 md:mt-0 mx-auto" target="_blank" href="https://sparks-dao.notion.site/SPARKS-DAO-073cfcc8fe814afaab7073ebd7e6513e" light>
              Read the docs
              <ArrowUpRightIcon className="h-4 ml-2 inline-block" />
            </Button>
          </div>
        </div>
        <div className="pb-20">
          <div className="flex justify-between mb-14 mt-20 flex-wrap">
            <Card className="w-full max-w-full md:max-w-[calc(50%_-_1rem)] mb-14 md:mb-0" logo solid>
              <Subtitle className="mb-2">
                Mission
              </Subtitle>
              <Text small>
                Build free, responsible, user driven open-source tools for self-sovereign identity and leverage them to develop common good services and equitable revenue-generating digital business models.
              </Text>
            </Card>
            <Card className="w-full max-w-full md:max-w-[calc(50%_-_1rem)]" logo solid>
              <Subtitle className="mb-2">
                Vision
              </Subtitle>
              <Text small>
                To drive a more equitable, human-centered digital economy, where individuals have control over their digital identities and organizations are incentivized to innovate and drive value generation at the software and business layer, rather than through personal data.
              </Text>
            </Card>
          </div>
          <div className="flex justify-between flex-wrap">
            <Card className="w-full max-w-full md:max-w-[calc(50%_-_1rem)] mb-14 md:mb-0" logo solid>
              <Subtitle className="mb-2">
                Structure
              </Subtitle>
              <Text small>
                The SPARKS Foundation is a founder-less, member-less, non-profit foundation. The foundation provides grants and sets the purpose, by-laws, mission and governance mechanism for the SPARKS ecosystem. All decisions are governed by the SPARKS DAO.
              </Text>
            </Card>
            <Card className="w-full max-w-full md:max-w-[calc(50%_-_1rem)]" logo solid>
              <Subtitle className="mb-2">
                SPARKS token
              </Subtitle>
              <Text small>
                The SPARKS token enables members to participate in democratic decisions. It is used to issue grants for ecosystem contributions and to create distributed system economies that can solve challenges of trust, safety, and data governance.
              </Text>
            </Card>
          </div>
        </div>
      </Section>

      <Section id="initiatives" triangleTop="left-1/2">
        <div className="w-full md:flex justify-between items-center py-20 flex-wrap box-border">
          <div className="w-full lg:max-w-1/2 pl-0 lg:pl-2 object-contain flex-shrink">
            <Heading className="mb-6">
              Initiatives
            </Heading>
            <Text className="mb-16">
              SPARKS Foundation provides grants for initiatives that support the development of ethical, human-centered identity tooling.
            </Text>
            <Card className="mb-10">
              <Subtitle className="mb-2">
                Identity core
              </Subtitle>
              <Text small>
                Identity’s source of truth belongs with you, under your control. It should be open-source, unsiloed, fee-less and prioritize data minimization. Our identity core is being built alongside the community to form the basis for ecosystem functionality.
              </Text>
            </Card>
            <Card className="mb-10" solid>
              <Subtitle className="mb-2">
                Products and services
              </Subtitle>
              <Text small>
                Leveraging the identity core, community product guilds conceptualize, prototype, and launch common good services for the good of humanity, and revenue-generating services to ensure the long-term sustainability of the Foundation and DAO.
              </Text>
              <a href="https://www.notion.so/49a9e067911e4086b4a493ae0d746bb5?v=b59f72a9c7d24d12bed51c1e2381626f" target="_blank">
                <Text className="font-semibold block mt-4" small>
                  All Initiatives
                  <ArrowUpRightIcon className="h-4 ml-2 inline-block" />
                </Text>
              </a>
            </Card>
          </div>
          <div className="w-full max-w-lg md:max-w-1/2 pl-0 md:pl-14 box-border object-contain flex-shrink hidden lg:block">
            <img className="w-full h-auto" src="/images/identity-app-2.png" />
          </div>
        </div>
      </Section>

      <Break
        id="articles"
        phrase="This is just the beginning."
        button={{ label: 'Learn More', href: 'https://sparks-dao.notion.site/SPARKS-DAO-073cfcc8fe814afaab7073ebd7e6513e' }}
      />

      <Section id="governance">
        <div className="w-full max-w-5xl flex flex-col items-center box-border pt-20 break-normal">
          <Heading className="mb-6 text-center sm:text-left">
            Governance
          </Heading>
          <Text className="max-w-5xl mb-20">
            The SPARKS Foundation provides purpose, constitution, and grants to drive ethical, human-first identity products and services. SPARKS DAO governs the ecosystem via snapshot.org using SPARKS, a non-financial token, to represent voting rights.
          </Text>
          <Card className="text-center p-6 sm:px-10 sm:py-12 box-border">
            <Subtitle>GOVERNANCE TOKEN</Subtitle>
            <div className="text-sm text-left flex flex-wrap w-full mt-8 mb-10">
              {[
                ['Name', 'SPARKS'],
                ['Symbol', 'SPARK'],
                ['Total Supply', '100,000,000'],
                ['Max Supply', '100,000,000'],
                ['Circulating Supply', '75,000,000'],
                ['Treasury', '25,000,000'],
                ['Network', 'Ethereum'],
                ['Specification', 'ERC-20'],
                ['Burnable', 'Yes'],
                ['Mintable', 'No'],
                ['Contract', '0x5F5C86A9F8aAF63Ce27b82FaB3B33DF73CbC3d12', 'https://etherscan.io/token/0x5f5c86a9f8aaf63ce27b82fab3b33df73cbc3d12'],
                ['Distribution', '75m Liquidity / 25m Treasury'],
              ].map(([key, val, link], index) => (
                <React.Fragment key={`governance-${index}`}>
                  <div className="py-2 sm:py-4 font-semibold border-b border-slate-300 border-opacity-50 text-slate-300 w-1/2 break-all">
                    {key}
                  </div>
                  {link ? (
                    <a href={link} target="_blank" className="underline py-2 sm:py-4 border-b border-slate-300 border-opacity-50 text-slate-300 w-1/2 break-all">
                      {val}
                    </a>
                  ) : (
                    <div className="py-2 sm:py-4 border-b border-slate-300 border-opacity-50 text-slate-300 w-1/2 break-all">
                      {val}
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
            <Button href="https://sparks-dao.notion.site/SPARKS-DAO-073cfcc8fe814afaab7073ebd7e6513e" target="_blank">
              Read more
              <ArrowUpRightIcon className="h-4 ml-2 inline-block" />
            </Button>
          </Card>
          <div className="text-center relative py-32 mt-10">
            <Triangle className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 md:w-96 md:h-96" />
            <Subtitle className="mb-6 relative" lg>
              Join our discord <span className="text-sparks-purple-500">community</span>
            </Subtitle>
            <Text className="mb-10 max-w-2xl relative">
              The SPARKS Foundation provides a purpose, constitution and treasury but is governed by the SPARKS DAO.
            </Text>
            <Button href="https://discord.sparks.foundation" target="_blank" className="text-slate-950 relative" light>
              Join discord
              <ArrowUpRightIcon className="h-4 ml-2 inline-block" />
            </Button>
          </div>
        </div>
      </Section>

      <Section id="links" className="pt-0 pb-4" fullWidth>
        <footer className="border-t border-t-slate-50 border-opacity-10 flex justify-center">
          <div className="flex flex-wrap justify-center 800:justify-between pb-6 pt-8 px-6 max-w-4xl">
            <div className="flex items-center 800:mb-0">
              <Logo className="h-16 w-16 mr-1 flex-shrink-0" />
              <h2 className="text-slate-50 font-bold text-4xl">
                SPARKS
              </h2>
            </div>
            <div className="flex w-full 800:w-auto justify-center flex-wrap">
              <div className="mt-6 mx-10 text-center 800:text-left">
                <h3 className="text-slate-50 opacity-60 text-xl font-semibold mb-2">Socials</h3>
                {[
                  ['Twitter', 'https://twitter.sparks.foundation'],
                  ['Telegram', 'https://telegram.sparks.foundation'],
                  ['Discord', 'https://discord.sparks.foundation'],
                  ['GitHub', 'https://github.sparks.foundation'],
                ].map(([label, link], index) => (
                  <a key={`socials-${index}`} className="block my-3 text-slate-50 text-sm font-semibold" href={link} target="_blank">{label}</a>
                ))}
              </div>
              <div className="mt-6 mx-10 text-center 800:text-left">
                <h3 className="text-slate-50 opacity-60 text-xl font-semibold mb-2">Community</h3>
                {[
                  ['Etherscan', 'https://etherscan.sparks.foundation'],
                  ['Uniswap', 'https://uniswap.sparks.foundation'],
                  ['Dextools', 'https://dextools.sparks.foundation'],
                ].map(([label, link], index) => (
                  <a key={`commm-${index}`} className="block my-3 text-slate-50 text-sm font-semibold" href={link} target="_blank">{label}</a>
                ))}
              </div>
              <div className="mt-6 mx-10 text-center 800:text-left">
                <h3 className="text-slate-50 opacity-60 text-xl font-semibold mb-2">About</h3>
                {[
                  ['Notion', 'https://sparks-dao.notion.site/SPARKS-DAO-073cfcc8fe814afaab7073ebd7e6513e'],
                  ['Terms', 'terms'],
                  ['Email', 'mailto:operations@sparks.foundation'],
                ].map(([label, link], index) => (
                  <a key={`commm-${index}`} className="block my-3 text-slate-50 text-sm font-semibold" href={link} target="_blank">{label}</a>
                ))}
              </div>
            </div>

            <Text className="w-full text-sm md:text-sm text-center text-slate-300 opacity-70 mt-6">
              SPARKS token is strictly for governance and utility, conferring no financial or ownership rights. The content on our site is not financial or investment advice. By using our site, you accept these terms. See our <a className="underline" target="_blank" href="/terms">full terms</a> for details.
            </Text>
            <p className="text-slate-300 opacity-70 font-semibold text-sm w-full shrink-0 text-center mt-6">
              Sparks Foundation ©2023. All rights reserved.
            </p>
          </div>
        </footer>
      </Section>

      {avatar ? (
        <button className="fixed h-12 w-12 bottom-4 right-4" onClick={() => logout()}>
          <div className="h-10 w-10 rounded-full absolute top-1 left-1 bg-slate-100 blur-sm opacity-30"></div>
          <img src={avatar} className="p-1 h-12 w-12 rounded-full flex justify-center items-center absolute top-0 left-0 z-100" />
        </button>
      ) : (
        <button className="fixed h-12 w-12 bottom-4 right-4" onClick={() => login()}>
          <div className="h-10 w-10 rounded-full absolute top-1 left-1 bg-slate-100 blur-sm opacity-50 animate-pulse"></div>
          <Logo className="bg-gray-950 p-2 h-12 w-12 rounded-full flex justify-center items-center absolute top-0 left-0" />
        </button>
      )}
    </>
  )
}
