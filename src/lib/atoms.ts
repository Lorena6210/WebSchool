// lib/atoms.ts - Arquivo corrigido e expandido para incluir os átomos Recoil necessários
import { atom } from 'recoil';
import { UserProps } from '../types/user';

// Átomo para informações do usuário logado (corrigido para um único usuário, não array, baseado no uso no componente)
export const loggedUserInfos = atom<UserProps | null>({
    key: 'loggedUserInfos',
    default: null,  // Default como null, pois o componente define um único usuário
});

// Átomo para dados do perfil do usuário (adicionado com base na referência no componente Root)
export const userProfile = atom<UserProps | null>({
    key: 'userProfile',
    default: null,  // Default como null; pode ser usado para armazenar dados específicos do perfil
});