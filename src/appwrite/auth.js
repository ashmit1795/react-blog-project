import config from "../config/config.js"
import { Client, Account, ID } from "appwrite";
import {createLogger} from "../utils/logger.js";

const authDebug = createLogger("appwrite:auth");

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client.setEndpoint(config.appwriteURL).setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, name, password}){
        try {
            const userAccount = await this.account.create(
                ID.unique(), 
                email, 
                password, 
                name
            );

            // call another method to directly login the user
            if(userAccount) return this.login({email, password});
            else return userAccount;

        } catch (error) {
            authDebug.error("createAccount :: error", error);
            throw error;
        }
    }

    async login({email, password}){
        try {
            const result = await this.account.createEmailPasswordSession(email, password);

            if(result) return result;
            else return null;
        } catch (error) {
            authDebug.error("login :: error", error);
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            const result = await this.account.get();

            if(result) return result;
            else return null;
        } catch (error) {
            authDebug.error("getCurrentUser :: error", error);
            throw error;
        }
    }

    async logout(){
        try{
            const result = this.account.deleteSessions();

            if(result) return result;
            else return null;
        }catch(error){
            authDebug.error("logout :: error", error);
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;