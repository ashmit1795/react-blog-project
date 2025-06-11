import { useCallback, useEffect } from "react";
import {Input, Button, RTE, SelectBtn} from "../index";
import { useSelector } from "react-redux";
import dbService from "../../appwrite/db";
import storageService from "../../appwrite/storage";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";


function PostForm({post}){

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    
    const {register, handleSubmit, watch, setValue, getValues, control} = useForm({
        defaultValues:{
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || `- By ${userData.name} `,
            status: post?.status || "draft"
        }
    });

    const submit = async (data) => {
        if(post){
            const file = data?.image[0] ? await storageService.uploadFile(data?.image[0]) : null;

            if(file){
                await storageService.deleteFile(post.featuredImage);
            }

            const dbPost = await dbService.updatePost(post.$id, 
                {
                    ...data,
                    featuredImage: file ? file.$id : undefined
                }
            );

            if(dbPost) navigate(`/post/${dbPost.$id}`);
        } else {
            const file = data.image[0] ? await storageService.uploadFile(data.image[0]) : null;
            const dbPost = await dbService.createPost({
                ...data,
                featuredImage: file?.$id,
                userId: userData?.$id
            });

            if(dbPost) navigate(`/post/${dbPost.$id}`)
        }
    }

    const slugTransform = useCallback((value) => {
        if(value && typeof value === "string")
            return value.trim()
                        .toLowerCase()
                        .replace(/[^a-zA-Z\d\s]+/g, "-")
                        .replace(/\s/g, "-");
    }, [setValue, watch]);

    useEffect(() => {
        watch((value, {name}) => {
            if(name === "title"){
                setValue("slug", slugTransform(value.title), {
                    shouldValidate: true
                });
            }
        })
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-full md:w-2/3 px-2">
                <Input 
                    label="Title: "
                    placeholder="Enter a title"
                    className="mb-2"
                    {...register("title", {
                        required: true
                    })}
                />
                <Input 
                    label="Slug: "
                    placeholder="Slug will appear here"
                    disabled={true}
                    className="mb-2 cursor-not-allowed"
                    {...register("slug", {
                        required: true
                    })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), {
                            shouldValidate:true
                        })
                    }}
                />
                <RTE 
                    label="Content: "
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>

            <div className="w-full md:w-1/3 px-2 flex flex-col gap-4">
                <Input 
                    label="Feature Image: "
                    type="file"
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    accept="image/png, image/jpg, image/jpeg"
                    {...register("image", {
                        required: !post
                    })}
                />
                {post && (
                    <div className="mt-3 rounded-md border border-gray-300 p-1 bg-gray-50">
                        <img 
                            src={storageService.getFilePreview(post.featuredImage)} 
                            alt={post.title} 
                            className="h-32 w-full object-cover rounded-md"
                        />
                    </div>
                )}
            </div>
            
            <SelectBtn 
                options={["published", "draft"]}
                label="Status: "
                className="mb-2"
                {...register("status", {
                    required:true
                })}
            />

            <div className="w-full px-2">
                <Button 
                    text={ post ? "Update" : "Submit" }
                    type="submit"
                    bgColor={ post ? "bg-green-500 hover:bg-green-600" : "bg-indigo-500 hover:bg-indigo-600" }
                    className="w-full text-lg py-3"
                />
            </div>
        </form>
    )

}

export default PostForm;