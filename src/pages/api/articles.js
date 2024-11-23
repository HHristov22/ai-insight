import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function handler(req, res) {
  const dirPath = path.join(process.cwd(), 'news');
  
  if (!fs.existsSync(dirPath)) {
    return res.status(404).json({ error: 'News directory not found' });
  }

  const filenames = fs.readdirSync(dirPath);

  const articles = filenames.map((filename) => {
    const filePath = path.join(dirPath, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    // Конвертираме Date обекта в ISO string
    const date = data.date ? new Date(data.date).toISOString() : null;

    return {
      slug: filename.replace('.md', ''),
      ...data,
      date, // използваме конвертирания ISO string
      content,
      formattedDate: date 
        ? new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) 
        : 'Unknown Date'
    };
  });

  // Сортираме използвайки ISO string датите
  const sortedArticles = articles.sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  res.status(200).json(sortedArticles);
}