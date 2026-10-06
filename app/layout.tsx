import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Sharon | AI Product Designer",
    description:
        "Portfolio of Sharon, an AI Product Designer and Computer Science student passionate about AI, product design, UI/UX, and meaningful digital experiences.",
    keywords: [
        "AI Product Designer",
        "Product Designer",
        "UI UX Designer",
        "AI",
        "UI/UX",
        "Portfolio",
        "Sharon"
    ]
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}