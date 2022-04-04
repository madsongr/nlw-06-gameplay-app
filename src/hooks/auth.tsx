import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import * as AuthSession from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "../services/api";
import { APPOINTMENTS_COLLECTION, USER_COLLECTION } from "../configs/database";

const { REDIRECT_URL } = process.env;
const { SCOPE } = process.env;
const { RESPONSE_TYPE } = process.env;
const { CLIENT_ID } = process.env;
const { CDN_IMAGE } = process.env;

type User = {
    id: string;
    username: string;
    firstName: string;
    avatar: string;
    email: string;
    token: string;
}

type AuthContextData = {
    user: User;
    loading: boolean;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
}

type AuthProviderProps = {
    children: ReactNode;
}

type AuthResponse = AuthSession.AuthSessionResult & {
    type: string;
    params: {
        access_token?: string; // caso o usuário cancele a autenticação (opcional)
        error?: string; // pra não quebrar a aplicação com erro caso usuario cancele
    }
}

export const AuthContext = createContext({} as AuthContextData); // começa como objeto vazio mas o tipo dele é AuthContextData

function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<User>({} as User);
    const [loading, setLoading] = useState(false);
    const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

    async function signIn() {
        try {
            setLoading(true);

            const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthResponse;

            if (type === 'success' && !params.error) {

                api.defaults.headers.authorization = `Bearer ${params.access_token}`;

                const userInfo = await api.get('/users/@me');

                const firstName = userInfo.data.username.split(' ')[0];
                userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`;

                const userData = {
                    ...userInfo.data,
                    firstName,
                    token: params.access_token
                }

                await AsyncStorage.setItem(USER_COLLECTION, JSON.stringify(userData));

                setUser(userData);
            }
        } catch (error) {
            throw new Error("Não foi possível autenticar");
        } finally {
            setLoading(false);
        }

    }

    async function signOut() {

        setUser({} as User);
        // await AsyncStorage.removeItem(USER_COLLECTION);
        // await AsyncStorage.removeItem(APPOINTMENTS_COLLECTION);
    }

    async function loadUserStorageData() {

        const storage = await AsyncStorage.getItem(USER_COLLECTION);

        if (storage) {

            const userLogged = JSON.parse(storage) as User;
            api.defaults.headers.authorization = `Bearer ${userLogged.token}`;

            setUser(userLogged);
            console.log(userLogged);
        }
    }

    useEffect(() => {
        loadUserStorageData();
    }, []);

    return (
        <AuthContext.Provider value={{
            user, loading, signIn, signOut
        }}>
            {children}
        </AuthContext.Provider>
    );

}

function useAuth() {
    const context = useContext(AuthContext);
    return context;
}

export {
    AuthProvider,
    useAuth
}