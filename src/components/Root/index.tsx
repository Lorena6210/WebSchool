import React, { JSX, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useRecoilState, useSetRecoilState } from 'recoil';
import log from 'loglevel';
import { GridLoader } from 'react-spinners';
import { UserProps } from '@/types/user';
import { loggedUserInfos, userProfile } from '@/lib/atoms';

type ComponentTypes = {
    userData?: UserProps[];
    children?: JSX.Element[] | JSX.Element;
};

export default function Root({
    userData,
    children
}: ComponentTypes): JSX.Element {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useRecoilState(loggedUserInfos);
    const setProfile = useSetRecoilState(userProfile);

    useEffect(() => {
        if (userData && userData.length > 0) {
            const currentUser = userData[0];
            setUser(currentUser);
            setProfile(currentUser);
            log.info('User data loaded:', currentUser);
        } else {
            log.warn('No user data provided');
        }
        setLoading(false);
    }, [userData, setUser, setProfile]);

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    height: "100vh",
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    position: "relative",
                }}
            >
                {loading && (
                    <>
                        <Box
                            sx={{
                                position: "fixed",
                                top: "0",
                                left: "0",
                                height: "100vh",
                                width: "100%",
                                zIndex: 9998,
                                backdropFilter: "blur(8px)",
                            }}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                position: "fixed",
                                bottom: { xs: "0", md: "10" },
                                right: { xs: "0", md: "20" },
                                margin: 4,
                                zIndex: 9999,
                            }}
                        >
                            <GridLoader color="#3b82f6" size={50} />
                        </Box>
                    </>
                )}
                {user && children}  // Corrigido: Verifica se user existe (não é null/undefined)
            </Box>
        );
    }

    return <Box>{children}</Box>;
}