'use client'

import {Box, Card, CardContent, Container, styled, Typography} from "@mui/material";
import useSWR from "swr";
import PageService from "services/PageService";
import {DefaultSort} from "constants/constants";
import {useParams} from "next/navigation";

const ContentWrapper = styled(Card)(({ theme }) => ({
    padding: '1rem',

    '& ol': {
        paddingLeft: '2rem'
    },
    '& li': {
        paddingLeft: 5,
        fontFamily: theme.typography.fontFamily
    }
}));

const Title = styled(Typography)(({ theme }) => ({
    marginBottom: '3rem',
    fontWeight: 700,
    color: theme.palette.text.primary
}))

export default function Page() {
    const params = useParams();

    const { data: resPage, isLoading: loading, mutate } = useSWR(
        params?.pageId ? '/api/page' : null,
        () => PageService.getPageBySlug(params?.pageId)
    );

    return (
        <>
            <Container sx={{ paddingTop: 20 }}>
                <Title variant="h1">{resPage?.data?.title}</Title>

                <ContentWrapper>
                    <CardContent>
                        <div dangerouslySetInnerHTML={{__html: resPage?.data?.content}}/>
                    </CardContent>
                </ContentWrapper>
            </Container>
        </>
    )
}
