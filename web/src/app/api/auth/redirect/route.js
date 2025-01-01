export async function GET(req) {
    const params = new URL(req.url).searchParams;
    const token = params.get('token')

    localStorage.setItem('x-token', token)

    return Response.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/app`, 200);
}
