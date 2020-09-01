import { Category, Ring, Technology } from 'types';

import Airtable from 'airtable';
import remark from 'remark';
import remarkHtml from 'remark-html';

const TABLE_NAME = 'technologies';
const RING_MAP: { [Key in Ring]: number } = { Adopt: 0, Trial: 1, Assess: 2, Hold: 3 };

interface Row extends Airtable.FieldSet {
  ID: number;
  Name: string;
  Category: Category;
  Ring: Ring;
  Notes?: string;
  Documentation?: string;
}

export async function getTechnologies(): Promise<Technology[]> {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);
  const table = base(TABLE_NAME) as Airtable.Table<Row>;
  const data = await table.select().all();

  const technologies = await Promise.all(
    data.map<Promise<Technology>>(async (item) => {
      const html = item.fields.Notes ? (await remark().use(remarkHtml).process(item.fields.Notes)).toString() : null;

      return {
        id: item.fields.ID,
        name: item.fields.Name,
        category: item.fields.Category,
        ring: item.fields.Ring,
        notes: item.fields.Notes || null,
        documentation: item.fields.Documentation || null,
        html,
      };
    }),
  );

  return technologies.sort((a, b) => RING_MAP[a.ring] - RING_MAP[b.ring]);
}
