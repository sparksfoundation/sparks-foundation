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
                $SPARK
                <br />
             <span className="">a crypto social media experiment</span>
              </Heading>
            )}
            <Text className="text-center md:text-justify mb-8">
              Communities and their engagement are the key to the success of crypto projects. 
              Each post, comment, like or other form of content has a value. By tracking your content and ranking it against all other members
              we make sure that YOUR engagement is being recognized. Using our ranking system we can exactly know who our big and small influencers
              are and reward them accordingly. For now the engagement tracker will be solely available to the $SPARK community - making it the first of its kind.
            </Text>

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
              SPARKS
            </Heading>
            <Text>
            Sparks is taking community engagement to the next level!
            </Text>
          </div>
          <div className="w-full md:max-w-5/12 flex justify-end">
          <Button className="mt-14 md:mt-0 mx-auto" href="https://t.me/sparks_official" target="_blank" light>
              <ArrowUpRightIcon className="h-4 ml-2 inline-block " />
              Join our telegram!
            </Button>

            
          </div>
        </div>
        <div className="pb-20">
          <div className="flex justify-between mb-14 mt-20 flex-wrap">
            <Card className="w-full max-w-full md:max-w-[calc(50%_-_1rem)] mb-14 md:mb-0 text-justify" logo solid >
              <Subtitle className="mb-2">
                Mission
              </Subtitle>
              <Text small >
                The greatest asset of crypto communities are their members - including YOU. We want to make sure that you get the visibility you deserve when
                making contributions on social media. We don't enforce community engagement, we encourage it!
              </Text>
            </Card>
            <Card className="w-full max-w-full md:max-w-[calc(50%_-_1rem)] text-justify" logo solid>
              <Subtitle className="mb-2">
                Vision
              </Subtitle>
              <Text small>
              The success of many crypto projects lies in the engagement of their community. Each spark member has the power to make the community grow
              by letting the world know about it. Sparks is the first project to track each members engagement on social media and making their engagement visible to the community.              </Text>
            </Card>
            </div>
            <div className="flex justify-between flex-wrap">

            <Card className="w-full max-w-full md:max-w-[calc(50%_-_1rem)]  mb-14 md:mb-0 text-justify" logo solid>
              <Subtitle className="mb-2">
                Team
              </Subtitle>
              <Text small>
              Sparks core team is anonymous and consists out of seasoned senior software engineers. Sparks treasury is locked until 2026.
               </Text>
            </Card>
            <Card className="w-full max-w-full md:max-w-[calc(50%_-_1rem)] text-justify" logo solid>
              <Subtitle className="mb-2">
                Future Plans
              </Subtitle>
              <Text small>
                We just delivered the first version of our engagement tracker and will be launching soon an airdrop campaign to drive community engagement and further testing.
                $SPARK tracking will be as of now solely available for the $SPARK community. Currently we track only Twitter but will be adding many more features and channels soon.
              </Text>
            </Card>
          </div>

        </div>
      </Section>



      <Section id="governance">
        <div className="w-full max-w-5xl flex flex-col items-center box-border pt-20 break-normal">
          <Heading className="mb-6 text-center sm:text-left">
            Governance
          </Heading>

          <Card className="text-center p-6 sm:px-10 sm:py-12 box-border">
            <Subtitle>SPARKS TOKEN</Subtitle>
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

          </Card>
          <div className="text-center relative py-32 mt-10">
            <Triangle className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 md:w-96 md:h-96" />

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
              Sparks Foundation ©2024. All rights reserved.
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
