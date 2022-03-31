import React from "react";

import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { TinaMarkdownContent, Components } from "tinacms/dist/rich-text";

import { Container } from "./container";
import { Section } from "./section";

const components: Components<{
    DateTime: {
      format?: string;
    };
  }> = {
    DateTime: (props) => {
      const dt = React.useMemo(() => {
        return new Date();
      }, []);
  
      switch (props.format) {
        case "iso":
          return <span>{dt.toISOString()}</span>;
        case "utc":
          return <span>{dt.toUTCString()}</span>;
        case "local":
          return <span>{dt.toLocaleDateString()}</span>;
        default:
          return <span>{dt.toLocaleDateString()}</span>;
      }
    },
  };

  


export const Post = ({ data }) => {
  
    const date = new Date(data.date);
    let formattedDate = "";
    if (!isNaN(date.getTime())) {
      formattedDate = format(date, "MMM dd, yyyy");
    }
  
    return (
      <Section className="flex-1">
        <Container className={`flex-1 max-w-4xl pb-2`} size="large">
          <h2
            data-tinafield="title"
            className={`w-full relative	mb-8 text-6xl font-extrabold tracking-normal text-center title-font`}
          >
            <span>{data.title}</span>
          </h2>
          <div
            data-tinafield="author"
            className="flex items-center justify-center mb-16"
          >
            {data.author && (
              <>
                <div className="flex-shrink-0 mr-4">
                  <img
                    className="h-14 w-14 object-cover rounded-full shadow-sm"
                    src={data.author.data.avatar}
                    alt={data.author.data.name}
                  />
                </div>
                <p className="text-base font-medium text-gray-600 group-hover:text-gray-800 dark:text-gray-200 dark:group-hover:text-white">
                  {data.author.data.name}
                </p>
                <span className="font-bold text-gray-200 dark:text-gray-500 mx-2">
                  —
                </span>
              </>
            )}
            <p
              data-tinafield="date"
              className="text-base text-gray-400 group-hover:text-gray-500 dark:text-gray-300 dark:group-hover:text-gray-150"
            >
              {formattedDate}
            </p>
          </div>
        </Container>
        {data.heroImg && (
          <div data-tinafield="heroImg" className="">
            <img
              src={data.heroImg}
              className="mb-14 block h-auto max-w-4xl lg:max-w-6xl mx-auto"
            />
          </div>
        )}
        <Container className={`flex-1 max-w-4xl pt-4`} size="large">
          <div className="prose dark:prose-dark  w-full max-w-none">
            <TinaMarkdown components={components} content={data._body} />
            {/* <pre>{JSON.stringify(data._body, null, 2)}</pre> */}
          </div>
        </Container>
      </Section>
    );
  };
  