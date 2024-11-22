import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function getStaticPaths() {
  const dirPath = path.join(process.cwd(), 'news');
  const filenames = fs.readdirSync(dirPath);

  const paths = filenames.map((filename) => ({
    params: { slug: filename.replace('.md', '') },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'news', `${params.slug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  return {
    props: {
      title: data.title,
      date: data.date,
      content,
    },
  };
}

export default function NewsPage({ title, date, content }) {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>{title}</h1>
      <p>{date}</p>
      <article>{content}</article>
    </div>
  );
}
