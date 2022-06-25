import fs from "fs";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import LinkRenderer from "components/Markdown/LinkRenderer";

const WikiContentPage = ({ ...props }) => {
  return (
    <>
      <h1>{props.title}</h1>
      <main>
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
          a: LinkRenderer
        }}>
          {props.markdownBody}
        </ReactMarkdown>
      </main>
    </>
  );
};

export const getStaticProps = async ({ ...context }) => {
  const { slug } = context.params;
  const fileContents = await import(`/data/wiki/${slug}.md`);
  const { data, content } = matter(fileContents.default);

  if (!data || !content) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      title: data.title,
      markdownBody: content,
    },
  };
};

export const getStaticPaths = async () => {
  const wikiFiles = fs.readdirSync("data/wiki");
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
