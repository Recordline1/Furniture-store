// Interface definition for the slice entities/post-card

export interface Post {
 id:number | string;
 title:string;
 image_url:string;
 slug:string;
 content:string;
 read_time:string;
 created_at:string | number;
 categories:string;
}
