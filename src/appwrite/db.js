import { ID, Databases, Client, Query } from "appwrite";
import config from "../config/config";
import debug from "debug";

const dbDebug = debug("appwrite:db");

export class DBService{
    client = new Client();
    databases;

    constructor(){
        this.client.setEndpoint(config.appwriteURL).setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    async createPost({title, slug, content, featuredImage, userId}){
        try {
            const result = await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    userId
                }
    
            );

            if(result) return result;
            else return false;

        } catch (error) {
            dbDebug("AppWrite Service :: createPost :: error", error);
            throw error;
        }
    }

    async updatePost(slug, {title, content, status, featuredImage}){
        try {
            const result =  await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    status,
                    featuredImage
                }
            );

            if(result) return result;
            else return false;

        } catch (error) {
            dbDebug("AppWrite Service :: updatePost :: error", error);
            throw error;
        }
    }

    async deletePost(slug){
        try {
            const result = await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            );

            if(result) return result;
            else return false; 

        } catch (error) {
            dbDebug("AppWrite Service :: deletePost :: error", error);
            throw error;
        }
    }

    async getPost(slug){
        try {
            const result = this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            );

            if(result) return result;
            else return false;

        } catch (error) {
            dbDebug("AppWrite Service :: getPost :: error", error);
            throw error;
        }
    }

    async getPosts(){
        try {
            const queries = [
                Query.equal("status", "published")
            ];
    
            const result = await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            );
    
            if(result) return result;
            else return false;
            
        } catch (error) {
            dbDebug("AppWrite Service :: getPosts :: error", error);
            throw error;
        }
    }

}

const dbService = new DBService();

export default dbService;