import {Stack} from "@mui/material";
import Image from "next/image";

export default function Logo(props) {
    const { width, height, style } = props;

    return (
        <Stack justifyContent="center" alignItems="center">
            <Image
                src="/images/logos/logo.svg"
                alt="logo"
                width={width || 140}
                height={height || 50}
                priority
                style={style}/>
        </Stack>
    )
}
