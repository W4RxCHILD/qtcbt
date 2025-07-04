import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ locals }) => {
  const value = await locals.env.DONATION_TOTAL.get('raised');
  const total = value ? parseFloat(value) : 0;

  return Response.json({ total });
};
