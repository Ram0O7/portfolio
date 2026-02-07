import Link from "next/link";
import { isoToLongDateString } from "@/lib/DateFromatted";
import Image from "next/image";
import readingTime from "reading-time";

export default async function ShowBlogs({ blogs }) {
  return (
    <div className="blogs flex flex-col gap-10 sm:gap-12 py-12 max-w-3xl mx-auto">
      {blogs.map((blog) => {
        const stats = readingTime(blog.content || blog.description);
        return (
          <Link
            href={"/blogs/" + blog.slug}
            passHref
            key={blog._id}
            className="flex flex-col sm:grid grid-cols-6 justify-between items-center gap-6"
          >
            <div className="relative w-full h-60 sm:h-48 col-span-2">
              <Image
                src={`${blog.image}`}
                alt={`${blog.alt}`}
                fill={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                placeholder="blur"
                blurDataURL="/images/backgroundEffect.jpg"
                className="object-cover rounded-sm"
              />
            </div>
            <div className="flex flex-col gap-2 sm:gap-4 col-span-4">
              <span className="text-xs text-text-primary">
                {isoToLongDateString(blog._createdAt)} • {stats.minutes} min read
              </span>
              <h1 className="text-xl font-bold sm:text-2xl">{blog.title}</h1>
              <p className="text-xs">{blog.description}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
