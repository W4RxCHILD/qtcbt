import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals }) => {
  const { total } = (await request.json()) as { total: number };

  if (typeof total !== 'number') {
    return new Response('Invalid payload', { status: 400 });
  }

  await locals.env.DONATION_TOTAL.put('raised', total.toString());

  return new Response('Donation updated', { status: 200 });
};
