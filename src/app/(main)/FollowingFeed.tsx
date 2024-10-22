"use client"

import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import DeletePostDialog from "@/components/posts/DeletePostDialog";
import Post from "@/components/posts/Post";
import PostsLoadingSkeleton from "@/components/posts/PostsLoadingSkeleton";
import kyInstance from "@/lib/ky";
import { PostsPage } from "@/lib/types"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react";

export default function FollowingFeed() {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ["post-feed", "following"],
        queryFn: ({pageParam}) => kyInstance.get(
            "/api/posts/following", 
            pageParam ? {searchParams: {cursor: pageParam}} : {}
        ).json<PostsPage>(),
        initialPageParam: null as string | null,
        getNextPageParam: (lastPage) => lastPage.nextCursor
    })

    const posts = data?.pages.flatMap(page => page.posts) || [];

    if(status === "pending") {
        return <PostsLoadingSkeleton/>
    }

    if(status === "success" && !posts.length && !hasNextPage) {
        return <p className="text-center text-muted-foreground">
            Գրառումներ չեն գտնվել: Սկսեք հետևել մարդկանց՝ նրանց գրառումներն այստեղ տեսնելու համար:        </p>
    }

    if(status === "error") {
        return <p className="text-center text-destructive">
            An error occurred while loading posts.
        </p>
    }

    return (
    <InfiniteScrollContainer className="space-y-5"
    onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
    {posts.map(post => (
        <Post key={post.id} post={post} />
    ))}
    {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
    </InfiniteScrollContainer>
    )
}