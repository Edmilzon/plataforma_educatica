import { Geist } from "next/font/google"

export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>){
    return (
        <html>
            <body>
                {children}
            </body>
        </html>
    )
}