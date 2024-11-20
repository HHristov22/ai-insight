import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function handler(req, res) {
  const dirPath = path.join(process.cwd(), '_news');
  const filenames = fs.readdirSync(dirPath);

  const articles = filenames.map((filename) => {
    const filePath = path.join(dirPath, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    return {
      slug: filename.replace('.md', ''),
      ...data,
      content,
    };
  });

  res.status(200).json(articles);
}
