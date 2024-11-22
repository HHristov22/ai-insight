import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function handler(req, res) {
  // Път до директорията с новините
  const dirPath = path.join(process.cwd(), 'news');
  
  // Проверка дали директорията съществува
  if (!fs.existsSync(dirPath)) {
    return res.status(404).json({ error: 'News directory not found' });
  }

  // Четене на файловете в директорията
  const filenames = fs.readdirSync(dirPath);

  // Парсиране на съдържанието на файловете
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

  // Връщане на новините като JSON
  res.status(200).json(articles);
}
