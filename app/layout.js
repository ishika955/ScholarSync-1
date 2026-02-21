import './globals.css';

export const metadata = {
  title: 'ScholarSync — Smart Scholarship Discovery',
  description: 'AI-powered scholarship matching platform for students.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
