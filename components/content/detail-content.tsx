import FeedbackPanel from "@/components/feedback/feedback";
import Header from "@/components/header/header";
import Image from "next/image";
import Link from "next/link";
import Markdown from "@/components/sections/markdown";
import Content from "@/interfaces/content";
import DateFormatter from "../layout/date-formatter";
import StickyNavBar from "../layout/sticky-nav-bar";
import VotingButton from "@/components/buttons/voting-button";
import FixedOverlay from "../layout/fixed-overlay";
import {
  InformationCircleIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import {
  checkUsersVote,
  updateViewCount,
  updateVoteCount,
} from "@/lib/cookie-helpers";

export enum Vote {
  Upvote,
  Downvote,
  None,
}

type Props = {
  type: string;
  data: Content;
};

export default function DetailContent({ type, data }: Props) {
  const [showAttribution, setShowAttribution] = useState(false);
  const [userVote, setUserVote] = useState<Vote>(Vote.None);

  useEffect(() => {
    updateViewCount(data.type, data.slug);
    setUserVote(checkUsersVote(data));
  }, []);

  function toggleAttribution() {
    setShowAttribution(!showAttribution);
  }

  function handleVoteChange(vote: Vote) {
    setUserVote(userVote === vote ? Vote.None : vote);
    updateVoteCount(vote, data.type, data.slug);
  }

  return (
    <div className="max-w-6xl mx-auto min-h-screen">
      <StickyNavBar>
        <Header titlePrimary={type} subheader>
          <FeedbackPanel
            views={data.views?.length ?? 0}
            currentVote={userVote}
            onVote={handleVoteChange}
          />
        </Header>
      </StickyNavBar>

      <div className="grid grid-cols-1 mt-5 sm:mt-16 gap-5">
        <div className="flex flex-col">
          <h2 className="text-lg font-bold text-gray-400 dark:text-gray-500">
            <DateFormatter dateString={data.createdAt} />
          </h2>

          {data.updatedAt && (
            <h2 className="text-lg font-bold text-gray-500 dark:text-[#A59DB9]">
              Last Updated: <DateFormatter dateString={data.updatedAt} />
            </h2>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <h1 className="font-bold dark:text-white text-5xl md:text-7xl">
            {data.title}
          </h1>
          <p className="dark:text-gray-500 text-xl md:text-2xl">
            {data.excerpt}
          </p>
        </div>

        <div className="flex py-5 items-start justify-between flex-col md:flex-row">
          <div className="flex flex-col gap-2">
            {data.authors.length > 1 && (
              <h4 className="dark:text-white text-lg font-bold ml-5">
                Collaborators
              </h4>
            )}

            <div
              className={`flex flex-row w-full gap-2 rounded-full p-1`}
              style={{ backgroundColor: data.color }}
            >
              {data.authors.map((author, index) => (
                <a href={author.url} key={index}>
                  <div className="flex flex-row items-center gap-2 rounded-full pl-2 py-2 pr-4 backdrop-blur-md bg-gray-400/30 dark:bg-black/20">
                    <Image
                      src={author.picture}
                      alt={"Author Profile Image"}
                      width={30}
                      height={30}
                      className="rounded-full aspect-square"
                    />
                    <h4 className="font-bold dark:text-white text-sm md:text-md">
                      {author.name}
                    </h4>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="flex w-auto">
          {data.externalLink && (
            <Link href={data.externalLink}>
              <div
                className="font-bold p-3 rounded-lg flex flex-row gap-2 items-center transition duration-500 hover:scale-105"
                style={{ backgroundColor: data.color }}
              >
                <GlobeAltIcon height={20} width={20} />
                Visit Page
              </div>
            </Link>
          )}
          {data.githubLink && (
            <Link href={data.githubLink}>
              <div
                className="font-bold p-3 rounded-lg flex flex-row gap-2 items-center transition duration-500 hover:scale-105"
                style={{ backgroundColor: data.color }}
              >
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                  height={20}
                  width={20}
                  alt="Github Logo"
                />
                GitHub
              </div>
            </Link>
          )}
        </div>

        <div className="relative">
          <Image
            src={data.coverImage.url}
            alt={"Post image"}
            width={1920}
            height={1080}
            className="rounded-xl aspect-video object-cover"
          />
          {data.coverImage.copyrightLink && (
            <button
              onClick={toggleAttribution}
              className="absolute top-5 right-5 h-8 w-8 text-gray-500 z-50 rounded-full transition duration-500 hover:scale-105"
            >
              <InformationCircleIcon />
            </button>
          )}
        </div>
        <Markdown content={data.content} />
        <div className="mt-14 mb-24 flex flex-col items-center mx-auto gap-3">
          <h2 className="text-lg font-bold text-gray-500 dark:text-[#A59DB9]">
            How was this article?
          </h2>
          <div className="flex flex-row gap-3">
            <VotingButton
              onClick={() => handleVoteChange(Vote.Upvote)}
              selected={userVote === Vote.Upvote}
              upvote
            />
            <VotingButton
              onClick={() => handleVoteChange(Vote.Downvote)}
              selected={userVote === Vote.Downvote}
            />
          </div>

          <p className="text-gray-400 dark:text-gray-500 w-1/2 text-center">
            If you want to send me specific feedback, please do so on the{" "}
            <Link href="/contact" className="font-bold underline">
              Contact Page
            </Link>
            . Thank you!
          </p>
        </div>
      </div>
      {showAttribution && (
        <FixedOverlay>
          <h1 className="font-bold text-2xl dark:text-white">Attribution ❤️</h1>
          <ul className="flex flex-col gap-2 dark:text-white">
            <li>
              <a href={data.coverImage.copyrightLink}>
                <span className="font-bold underline">Image Source</span> ©{" "}
                {data.coverImage.copyrightOwner}
              </a>
            </li>
          </ul>
          <button
            className="rounded-full bg-black px-3 py-2 text-white font-bold dark:bg-[#8143FC]"
            onClick={toggleAttribution}
          >
            Dismiss
          </button>
        </FixedOverlay>
      )}
    </div>
  );
}
