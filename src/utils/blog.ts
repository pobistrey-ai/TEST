import { getCollection } from 'astro:content';

export type Post = {
  id: string;
  slug: string;
  data: {
    title: string;
    pubDate: Date;
    description?: string;
    coverImage?: string;
    draft: boolean;
    updatedDate?: Date;
    type: 'post' | 'news'; // 🔥 Явное поле типа контента
  };
};

// 🔹 Получить записи только конкретного типа (посты ИЛИ новости)
export async function getPostsByType(type: 'post' | 'news'): Promise<Post[]> {
  const items = await getCollection('posts', ({ data }) => !data.draft && data.type === type);
  return items
    .map((item) => ({ ...item, slug: item.id }))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

// 🔹 Получить смешанную ленту для главной (посты + новости по дате)
export async function getMixedFeed(limit?: number): Promise<Post[]> {
  const items = await getCollection('posts', ({ data }) => !data.draft);
  const sorted = items
    .map((item) => ({ ...item, slug: item.id }))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return limit ? sorted.slice(0, limit) : sorted;
}

// 🔸 Пагинация (без изменений, работает с любым массивом Post[])
export function paginate(posts: Post[], pageSize: number) {
  const totalPages = Math.ceil(posts.length / pageSize);
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    const start = (i - 1) * pageSize;
    const end = start + pageSize;
    pages.push({
      page: i,
      totalPages,
      posts: posts.slice(start, end),
      hasPrev: i > 1,
      hasNext: i < totalPages,
    });
  }

  return pages;
}