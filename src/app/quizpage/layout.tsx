import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Test Your Knowledge',
  description: 'Online exam platform for UPSC Physics preparation with detailed analytics and explanations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
