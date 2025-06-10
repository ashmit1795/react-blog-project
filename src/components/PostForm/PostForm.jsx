import { useCallback, useEffect } from "react";
import {Input, Button, RTE, SelectBtn} from "../index";
import { useSelector } from "react-redux";
import dbService from "../../appwrite/db";
import storageService from "../../appwrite/storage";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";


function PostForm({post}){

    const {register, handleSubmit, watch, setValue, getValues} = useForm({
        defaultValues:{
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "draft"
        }
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

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
            const userData = useSelector(state => state.auth.userData);
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
            <div className="w-2/3 px-2">
                <Input 
                    label="Title: "
                    placeholder="Enter a title"
                    className="mb-4"
                    {...register("title", {
                        required: true
                    })}
                />
                <Input 
                    label="Slug: "
                    placeholder="Slug will appear here"
                    className="mb-4"
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

            <div className="w-1/3 px-2">
                <Input 
                    label="Feature Image"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg"
                    {...register("image", {
                        required: !post
                    })}
                />
            </div>
            {post && (
                <div className="w-full mb-4">
                    <img 
                        src={storageService.getFilePreview(post.featuredImage)} 
                        alt={post.title} 
                        className="rounded-lg"
                    />
                </div>
            )}
            <SelectBtn 
                options={["published", "draft"]}
                label="Status: "
                className="mb-4"
                {...register("status", {
                    required:true
                })}
            />

            <Button 
                text={ post ? "Update" : "Submit" }
                type="submit"
                bgColor={ post ? "bg-green-500" : undefined }
                className="w-full"
            />
        </form>
    )

}

export default PostForm;