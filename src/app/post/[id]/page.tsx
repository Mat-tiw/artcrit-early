"use client";
import { Posts } from "@/app/components/ui/posts";
import { useEffect, useState } from "react";
import axios from "axios";
import { MiniProfile } from "@/app/components/ui/miniprofile";
import { Sidebar } from "@/app/components/ui/sidebar";
import { defaultBackend } from "@/api/api.js";
interface Images {
  id_image: number;
  image_path: string;
}

interface Post {
  id_post: number;
  post_title: string;
  post_badge: string;
  created_at: string;
  user_id: number;
  ac_images: Images[];
  ac_user: User;
  comments:Comment[];
}

interface User {
  user_name: string;
  user_email: string;
  user_avatar: string;
  id_user: number;
}

interface Comment {
  comment_content?:string;
  created_at?:string;
  id_comment?:number;
  vote_points?:number;
  ac_images:Images[];
  ac_user:User;
  commentChild:Comment[]
}

export default function Pages({params,}: Readonly<{ params: { id: number } }>) {
  const [post, setPost] = useState<Post | null>(null);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.post(`${defaultBackend}post/comment/${params.id}`)
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [params.id]);
  return (
    <div className="bg-primaryBg flex flex-row min-h-screen">
      <div className="text-white basis-[20%] flex flex-col">
        <MiniProfile />
        <Sidebar variant="default" />
      </div>
      <div className="text-white basis-[60%]">
        {post ? (
          <Posts
            showComment={true}
            title={post.post_title}
            badge={post.post_badge}
            userName={post.ac_user.user_name}
            date={post.created_at}
            images={post.ac_images}
            userPic={post.ac_user.user_avatar}
            userId={post.ac_user.id_user}
            post_id={post.id_post}
            isInProfile={false}
            comment={post.comments}
          />
        ) : (
          <div className="animate-pulse p-2">
            <Posts
              showComment={false}
              title="loading..."
              badge="loading..."
              userName="loading..."
              images={[]}
              userPic=""
              isInProfile={true}
            />
          </div>
        )}
      </div>
      <div className="text-white basis-[20%] ">
        <h1>{""}</h1>
      </div>
    </div>
  );
}
