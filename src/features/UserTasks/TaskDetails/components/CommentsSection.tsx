interface CommentsSectionProps {
  description: string;
}

export default function CommentsSection({ description }: CommentsSectionProps) {
  const sectionClasses = "w-full border border-[#D9D9D9] rounded-2xl mt-8 p-6";

  return (
    <>
      <div className={sectionClasses}>
        <h1 className="mb-6 text-lg font-bold">وصف المهمة</h1>
        <p className="text-[#2F2F2F] max-sm:text-[10px]">{description}</p>
      </div>
    </>
  );
}
