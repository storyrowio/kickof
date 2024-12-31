export async function GET(req) {
    const params = new URL(req.url).searchParams;
    const token = params.get('token')
    console.log(token);
    localStorage.setItem('x-token', res.data?.data?.token)

    return Response.redirect(`${process.env.APP_URL}/app`, 200);
}