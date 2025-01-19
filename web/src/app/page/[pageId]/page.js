'use client'

import {Box, Card, CardContent, Container, styled, Typography} from "@mui/material";
import useSWR from "swr";
import PageService from "services/PageService";
import {DefaultSort} from "constants/constants";
import {useParams} from "next/navigation";
import {useEffect, useRef} from "react";

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
    marginBottom: '2rem',
    fontWeight: 700,
    color: theme.palette.text.primary
}))

export default function Page() {
    const params = useParams();

    const { data: resPage, isLoading: loading, mutate } = useSWR(
        params?.pageId ? '/api/page' : null,
        () => PageService.getPageBySlug(params?.pageId)
    );

    const containerRef = useRef();
    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            const elements = container.querySelectorAll("h2");
            elements.forEach(el => {
                el.style.minHeight = "33px";
            });

            const elementParagraph = container.querySelectorAll("p");
            elementParagraph.forEach(el => {
                el.style.minHeight = "22px";
            })
        }
    }, [resPage]);

    return (
        <>
            <Container sx={{ paddingTop: 20 }}>
                <Title variant="h1">{resPage?.data?.title}</Title>

                <ContentWrapper>
                    <CardContent>
                        <div ref={containerRef} dangerouslySetInnerHTML={{__html: resPage?.data?.content}}/>
                    </CardContent>
                </ContentWrapper>
            </Container>
        </>
    )
}
