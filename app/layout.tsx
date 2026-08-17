import type { Metadata } from 'next';
import './theme.css';

export const metadata: Metadata = {
  title: 'TechSol | Quiet systems, warm delivery',
  description: 'TechSol makes practical websites, apps, and automations for real businesses.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
