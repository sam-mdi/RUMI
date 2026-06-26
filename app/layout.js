import './globals.css';

export const metadata = {
  title: 'Rumi — Persian Cuisine',
  description: 'Experience the rich tapestry of Persian culinary tradition at Rumi Restaurant.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
