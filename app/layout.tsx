import type { Metadata } from 'next'
import '#/styles/global.scss'
import { Lexend_Giga } from 'next/font/google'
import clsx from 'clsx'

const lexand = Lexend_Giga({
    subsets: ['latin'],
    variable: "--font-lexand"
})

export const metadata: Metadata = {
    title: 'SafeStub',
    description: 'Empowering fans. One ticket at a time.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html
            lang="en"
            className={clsx("group/html overscroll-y-none dark", lexand.variable)}
            suppressHydrationWarning
        >
            <body>{children}</body>
        </html>
    )
}
