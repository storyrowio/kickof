export async function GET(req) {
    const params = new URL(req.url).searchParams;
    const errorStatus = params.get('error')
    if (errorStatus) {
        return Response.redirect(`${process.env.APP_URL}/?error=${errorStatus}`, 307);
    }
}