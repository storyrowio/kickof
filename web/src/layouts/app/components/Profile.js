import {useState} from "react";
import {Avatar, Box, Button, Divider, IconButton, Menu, Stack, Typography} from "@mui/material";
import {MailRounded, PeopleRounded} from "@mui/icons-material";
import Link from "next/link";
import {useSelector} from "store";
import AuthService from "services/AuthService";
import {useRouter} from "next/navigation";

const Menus = [
    { title: 'My Profile', subtitle: 'Account profile', href: '/app/profile', icon: PeopleRounded },
];

const Profile = () => {
    const router = useRouter();
    const { email, name, role, image } = useSelector(state => state.profile);

    const [anchorEl2, setAnchorEl2] = useState(null);
    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };
    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    const logout = () => {
        AuthService.Logout();
        router.push('/');
    };

    return (
        <Box>
            <IconButton
                size="small"
                sx={{
                    ...(typeof anchorEl2 === 'object' && {
                        color: 'primary.main',
                    }),
                }}
                onClick={handleClick2}
            >
                <Avatar alt={email} src="/images/avatar.svg" />
            </IconButton>
            <Menu
                id="msgs-menu"
                anchorEl={anchorEl2}
                keepMounted
                open={Boolean(anchorEl2)}
                onClose={handleClose2}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                sx={{
                    '& .MuiMenu-paper': {
                        width: '360px',
                        p: 4,
                    },
                }}
            >
                <Typography variant="h5">User Profile</Typography>
                <Stack direction="row" py={3} spacing={2} alignItems="center">
                    <Avatar src={"/images/profile/user-1.jpg"} alt={"ProfileImg"} sx={{ width: 95, height: 95 }} />
                    <Box>
                        <Typography variant="subtitle2" color="textPrimary" fontWeight={600}>
                            Mathew Anderson
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                            Designer
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            color="textSecondary"
                            display="flex"
                            alignItems="center"
                            gap={1}
                        >
                            <MailRounded width={15} height={15} />
                            info@modernize.com
                        </Typography>
                    </Box>
                </Stack>
                <Divider />
                {Menus.map(({icon: Component, ...profile}) => (
                    <Box key={profile.title}>
                        <Box sx={{ py: 2, px: 0 }} className="hover-text-primary">
                            <Link href={profile.href}>
                                <Stack direction="row" spacing={2}>
                                    <Box
                                        width="45px"
                                        height="45px"
                                        bgcolor="primary.light"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Component
                                            sx={{
                                                width: 24,
                                                height: 24,
                                                borderRadius: 0,
                                            }}
                                        />
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="subtitle2"
                                            fontWeight={600}
                                            color="textPrimary"
                                            className="text-hover"
                                            noWrap
                                            sx={{
                                                width: '240px',
                                            }}
                                        >
                                            {profile.title}
                                        </Typography>
                                        <Typography
                                            color="textSecondary"
                                            variant="subtitle2"
                                            sx={{
                                                width: '240px',
                                            }}
                                            noWrap
                                        >
                                            {profile.subtitle}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Link>
                        </Box>
                    </Box>
                ))}
                <Box mt={2}>
                    <Button onClick={logout} variant="outlined" color="primary" fullWidth>
                        Logout
                    </Button>
                </Box>
            </Menu>
        </Box>
    );
};

export default Profile;
