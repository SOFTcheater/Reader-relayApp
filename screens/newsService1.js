
import { getDatabase, ref, push, set } from 'firebase/database';
const db = getDatabase(app);
const NYT_API_KEY = 'xNNGJRy7DDlGq1EPPyYCGSxAFaXuVwgU7';
const NYT_BOOKS_ENDPOINT = 'https://api.nytimes.com/svc/books/v3/lists.json';

const fetchAndStoreNews =  async () => { 
  try {
  
    const apiUrl = `${NYT_BOOKS_ENDPOINT}?list=hardcover-fiction&api-key=${NYT_API_KEY}`;
    
    const response = await fetch(apiUrl);
    const data = await response.json();

    const formattedNews = data.results.map(item => ({
      title: item.book_details[0]?.title || 'No Title',
      content: item.book_details[0]?.description || 'No description available',
      author: item.book_details[0]?.author || 'Unknown Author',
      category: 'Books',
      imageUrl: item.book_image || 'https://via.placeholder.com/150',
      published: item.published_date,
    }));

   
    const newsRef = ref(db, 'news');
    formattedNews.forEach(article => {
      const newArticleRef = push(newsRef);
      set(newArticleRef, article);
    });

    return true;
  } catch (error) {
    console.error('News processing failed:', error);
    return false;
  }
};
export default fetchAndStoreNews;

export const getNewsFromFirebase = async () => {
  try {
    const snapshot = await get(ref(db, 'news'));
    return snapshot.exists() 
      ? Object.entries(snapshot.val()).map(([id, data]) => ({ id, ...data }))
      : [];
  } catch (error) {
    console.error('Firebase read failed:', error);
    return [];
  }
};