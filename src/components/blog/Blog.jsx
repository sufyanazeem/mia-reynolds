import SectionHeader from "../SectionHeader";
import PostList from './PostList';

const getPosts = async () => {
  const res = await fetch("http://localhost:4000/posts");
  return res.json();
};

const Blog = async () => {
  const posts = await getPosts();
  // console.log(posts)
  return (
    <section id='blog' className="mt-7">
      <div className='container mx-auto'>
        <SectionHeader pretitle='Our Blog' title='Latest News' />
        {/* posts list */}
        <PostList posts={posts} />
      </div>
    </section>
  );
}

export default Blog;
