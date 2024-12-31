'use client'

import {Box, Breadcrumbs, Grid2, Typography, useTheme} from "@mui/material";
import {CircleRounded, MenuBookRounded} from "@mui/icons-material";
import Link from "next/link";
import PropTypes from "prop-types";
import {HexToRGBA} from "utils/theme";

const Breadcrumb = (props) => {
    const { children, items, subtitle, title } = props;
    const theme = useTheme();

    return (
        <Grid2
            container
            sx={{
                backgroundColor: HexToRGBA(theme.palette.primary.light, 0.5),
                borderRadius: 1.5,
                p: "30px 25px 20px",
                marginBottom: "30px",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <Grid2 item xs={12} sm={6} lg={8} mb={1}>
                <Typography variant="h4" fontWeight={600}>{title}</Typography>
                <Typography
                    color="textSecondary"
                    variant="subtitle2"
                    fontWeight={400}
                    mt={0.8}
                    mb={0}
                >
                    {subtitle}
                </Typography>
                <Breadcrumbs
                    separator={<CircleRounded sx={{ fontSize: 5 }}/>}
                    sx={{
                        alignItems: "center",
                        mt: items ? "10px" : "",
                    }}
                    aria-label="breadcrumb"
                >
                    {items
                        ? items.map((item) => (
                            <div key={item.title}>
                                {item.to ? (
                                    <Link href={item.to} passHref>
                                        <Typography variant="subtitle2">{item.title}</Typography>
                                    </Link>
                                ) : (
                                    <Typography variant="subtitle2">{item.title}</Typography>
                                )}
                            </div>
                        ))
                        : ""}
                </Breadcrumbs>
            </Grid2>
            <Grid2 item xs={12} sm={6} lg={4} display="flex" alignItems="flex-end">
                <Box
                    sx={{
                        display: { xs: "none", md: "block", lg: "flex" },
                        alignItems: "center",
                        justifyContent: "flex-end",
                        width: "100%",
                    }}
                >
                    {children ? (
                        <Box sx={{ top: "0px", position: "absolute" }}>{children}</Box>
                    ) : (
                        <MenuBookRounded
                            sx={{
                                position: 'absolute',
                                top: -10,
                                right: 0,
                                fontSize: 180,
                                color: theme.palette.primary.main,
                                opacity: 0.2
                            }}
                        />
                    )}
                </Box>
            </Grid2>
        </Grid2>
    )
};

Breadcrumb.propTypes = {
    items: PropTypes.array,
    subtitle: PropTypes.string,
    title: PropTypes.string
};

export default Breadcrumb;
