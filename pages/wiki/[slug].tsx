import Head from "next/head";
import fs from "fs";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import LinkRenderer from "components/Markdown/LinkRenderer";
import { formatInTimeZone } from "date-fns-tz";
import { Container, Typography } from "@mui/material";

const WikiContentPage = ({ ...props }) => {
  return (
    <>
      <Head>
        <title>OoTR Ladder - {props.title}</title>
      </Head>
      <Container maxWidth="md">
        <Typography variant="h2" component="h1" lineHeight={1}>
          {props.title}
        </Typography>
        <Typography variant="overline">
          Last update:{" "}
          {formatInTimeZone(
            new Date(props.lastModifiedDate),
            "UTC",
            "MM/dd/yyyy - H'h'mm 'UTC'"
          )}
        </Typography>
        <main>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: LinkRenderer,
            }}
          >
            {props.markdownBody}
          </ReactMarkdown>
        </main>
      </Container>
    </>
  );
};

export const getStaticProps = async ({ ...context }) => {
  const { slug } = context.params;
  const fullFilePath = `${process.cwd()}/data/wiki/${slug}.md`;
  const fileContents = await import(`/data/wiki/${slug}.md`);
  const { data, content } = matter(fileContents.default);

  if (!data || !content) {
    return {
      notFound: true,
    };
  }

  const fileStats = await fs.statSync(fullFilePath);

  return {
    props: {
      title: data.title,
      markdownBody: content,
      lastModifiedDate: fileStats.ctime.toString(),
    },
  };
};

export const getStaticPaths = async () => {
  const wikiFiles = await fs.readdirSync("data/wiki");
  const filePaths = wikiFiles.map((fileName) => ({
    params: {
      slug: fileName.replace(/\.md$/, ""),
    },
  }));

  return {
    paths: filePaths,
    fallback: false,
  };
};

export default WikiContentPage;
