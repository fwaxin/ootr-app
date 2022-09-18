import fs from 'fs';

import { formatInTimeZone } from 'date-fns-tz';
import matter from 'gray-matter';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import LinkRenderer from 'components/markdown/LinkRenderer';

const WikiContentPage = ({ ...props }) => {
  const pageTitle = props.title;
  return (
    <>
      <Head>
        <title>OoTR Ladder - {pageTitle}</title>
      </Head>
      <div className="prose mx-auto prose-h1:my-4">
        <h1>
          {props.title}
          <p className="uppercase text-slate-400 text-xs">
            Last update: {formatInTimeZone(new Date(props.lastModifiedDate), 'UTC', "MM/dd/yyyy - H'h'mm 'UTC'")}
          </p>
        </h1>

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
      </div>
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
  const wikiFiles = await fs.readdirSync('data/wiki');
  const filePaths = wikiFiles.map((fileName) => ({
    params: {
      slug: fileName.replace(/\.md$/, ''),
    },
  }));

  return {
    paths: filePaths,
    fallback: false,
  };
};

export default WikiContentPage;
