const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NOTION_API_KEY });

async function syncHighlights() {
  const highlights = require('./sync.json'); // Asumiendo que 'sync.json' tiene los datos que necesitas
  const MAX_CHILDREN = 100;

  for (let i = 0; i < highlights.length; i += MAX_CHILDREN) {
    const chunk = highlights.slice(i, i + MAX_CHILDREN);

    try {
      await notion.pages.create({
        parent: { database_id: process.env.BOOK_DB_ID },
        children: chunk,
      });
    } catch (error) {
      console.error('Error syncing to Notion:', error);
    }
  }
}

syncHighlights().catch(console.error);
