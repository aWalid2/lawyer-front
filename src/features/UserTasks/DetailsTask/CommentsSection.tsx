// components/tasks/CommentsSection.tsx
interface Comment {
    date: string;
    text: string;
}

interface CommentsSectionProps {
    description: string;
    comments: Comment[];
}

export default function CommentsSection({ description, comments }: CommentsSectionProps) {
    const sectionClasses = "w-full border border-[#D9D9D9] rounded-2xl mt-8 p-6";
    
    return (
        <>
            {/* وصف المهمة */}
            <div className={sectionClasses}>
                <h1 className="font-bold text-lg mb-6">وصف المهمة</h1>
                <p className="text-[#2F2F2F] max-sm:text-[10px]">{description}</p>
            </div>

            {/* مستندات المهمة */}
            <div className={sectionClasses}>
                <h1 className="font-bold text-lg mb-6">مستندات المهمة</h1>
                <div className="h-[99px] w-full bg-[#FBFBFB] rounded-2xl border-2 border-dashed border-[#DBDBDBB2]">
                    <p className="flex h-full items-center justify-center max-sm:text-[10px] text-[#B5B5B5] shrink-0">
                        انقر هنا لتحميل الملفات أو سحبها وإفلاتها
                    </p>
                </div>
            </div>

            {/* الملاحظات والتحديثات */}
            <div className={sectionClasses}>
                <h1 className="font-bold text-lg mb-6">الملاحظات والتحديثات</h1>
                {comments.map((comment, index) => (
                    <div 
                        key={index}
                        className={`h-[84px] flex flex-col p-4 gap-2 w-full bg-[#FBFBFB] rounded-2xl border border-[#DBDBDBB2] ${
                            index !== comments.length - 1 ? 'mb-4' : ''
                        }`}
                    >
                        <p className="max-sm:text-[10px] text-[#2F2F2F]">{comment.date}</p>
                        <p className="max-sm:text-[10px] text-[#2F2F2F]">{comment.text}</p>
                    </div>
                ))}
            </div>
        </>
    );
}