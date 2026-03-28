import logo from "@/public/images/logo.webp";

export const LogoSidebar = () => {
    return (
        <div className="flex items-center gap-3 mb-10">
            <img
                src={logo}
                alt="logo"
                className="h-12 w-auto object-contain"
            />
        </div>
    )
}
