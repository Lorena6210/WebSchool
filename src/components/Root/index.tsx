import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { loggedUserInfos, userProfile } from '../../lib/atoms';
import { UserProps } from '../types/user';
import log from 'loglevel';
import { GridLoader } from 'react-spinners';

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
                    display: "flex",  // Corrigido: ':' em vez de '='
                    height: "100vh",  // Corrigido: typo 'heigth' → 'height'
                    width: "100%",
                    flexDirection: "column",  // Corrigido: typo 'diretion' → 'flexDirection'
                    alignItems: "center",
                    justifyContent: "flex-start",  // Corrigido: typo 'justyContent' → 'justifyContent'
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
                                height: "100vh",  // Corrigido: typo 'heigth' → 'height'
                                width: "100%",  // Corrigido: '100vh' → '100%' (provavelmente largura total)
                                zIndex: 9998,
                                backdropFilter: "blur(8px)",  // Corrigido: ':' e aspas fechadas
                            }}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                position: "fixed",
                                bottom: { xs: "0", md: "10" },  // Corrigido: array para responsividade
                                right: { xs: "0", md: "20" },  // Corrigido: typo 'rigth' → 'right'
                                margin: 4,
                                zIndex: 9999,
                            }}
                        >
                            <GridLoader color="#3b82f6" size={50} />
                        </Box>
                    </>
                )}
                {user && children}  // Corrigido: 'user.length !== 0' → 'user' (pois user é UserProps | null, não array)
            </Box>
        );
    }

    return <Box>{children}</Box>;  // Descomentado: Sempre retorne JSX
}