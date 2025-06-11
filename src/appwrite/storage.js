import { ID, Client, Storage } from "appwrite";
import config from "../config/config";
import {createLogger} from "../utils/logger.js";

const storageDebug = createLogger("appwrite:storage");

export class StorageService{
    client = new Client();
    storage;

    constructor(){
        this.client.setEndpoint(config.appwriteURL).setProject(config.appwriteProjectId);
        this.storage = new Storage(this.client);
    }

    async uploadFile(file){
        try {
            const result = await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
            
            if (result) return result;
            else return null;
        } catch (error) {
            storageDebug.error("uploadFile :: error", error);
            throw error;
        }
    }

    async deleteFile(fileId){
        try {
            const result = await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            
            if (result) return result;
            else return null;
            
        } catch (error) {
            storageDebug.error("deleteFile :: error", error);
            throw error;
        }
    }

    getFilePreview(fileId){
        try {
            const result = this.storage.getFileView(
                config.appwriteBucketId,
                fileId
            );
            if (result) return result;
            else return null;
            
        } catch (error) {
            storageDebug.error("getFilePreview :: error", error);
            throw error;
        }
    }
}

const storageService = new StorageService();

export default storageService;
