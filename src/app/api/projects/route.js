import { getProjects } from '@/app/blogs/fetchBolgs';

export const revalidate = 3600; // Cache for 1 hour

export async function GET(request) {
  try {
    // Fetch fresh projects from Sanity using server-side token
    const projects = await getProjects(true); // true = isFresh, uses token
    
    return Response.json({
      success: true,
      data: projects,
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Failed to fetch projects from API:', error);
    return Response.json(
      {
        success: false,
        error: 'Failed to fetch projects',
        message: error.message,
      },
      { status: 500 }
    );
  }
}
