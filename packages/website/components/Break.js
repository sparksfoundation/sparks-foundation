import { ArrowUpRightIcon } from "@heroicons/react/24/outline"
import { twMerge } from "tailwind-merge"
import { Button } from "./Controls"

const Phrase = ({ className, children, many, keyTag = '' }) => (
  <>
    {Array(many).fill().map((val, index) => (
      <p key={`phrase-${keyTag}-${index}`} className={twMerge(`text-sparks-purple-400 text-3xl md:text-2xl lg:text-3xl xl:text-4xl font-black whitespace-nowrap tracking-wider ${className}`)}>{children}</p>
    ))}
  </>
)

export default function Break({ id, phrase, button }) {
  return (
    <>
      <div className="bg-sparks-purple-500 justify-center overflow-hidden hidden md:flex relative">
        <div  id={id} className="anchor absolute -top-20"></div>
        <div className="relative max-w-full md:max-w-1/2 px-2 -my-4">
          <Phrase keyTag="left" many={5}>{phrase}</Phrase>
          <div className="absolute top-0 left-0 h-full w-full flex flex-col justify-center items-center">
            <p className="text-3xl md:text-2xl lg:text-3xl xl:text-4xl font-black whitespace-nowrap tracking-wider text-slate-50">{phrase}</p>
          </div>
        </div>
        <div className="relative max-w-1/2 px-2 -my-4 md:block">
          <Phrase keyTag="right" many={5}>{phrase}</Phrase>
          <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center">
            <Button className="lg:px-24" href={button.href} target="_blank" light>
              {button.label}
              {button.href ? (
                <ArrowUpRightIcon className="h-4 ml-2 inline-block" />
              ) : <></>}
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-sparks-purple-500 items-center overflow-hidden flex md:hidden flex-col relative">
        <div>
          <Phrase keyTag="mid" many={7} className="text-xl sm:text-2xl">{phrase}</Phrase>
          <div className="absolute top-0 left-0 text-center w-full">
            <p className="text-xl sm:text-2xl translate-y-[calc(300%_-_1.8rem)] sm:translate-y-[calc(300%_-_2rem)] mx-auto font-black whitespace-nowrap tracking-wider text-slate-50">{phrase}</p>
            <Button className="mx-auto translate-y-[calc(200%_-_1rem)]" href={button.href} target="_blank" light>
              {button.label}
              {button.href ? (
                <ArrowUpRightIcon className="h-4 ml-2 inline-block" />
              ) : <></>}
            </Button>
          </div>
        </div>
      </div>
    </>
  )

}