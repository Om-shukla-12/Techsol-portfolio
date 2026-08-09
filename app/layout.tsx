import type { Metadata } from 'next';
import '../styles.css';
import './theme.css';

export const metadata: Metadata = {
  title: 'TechSol — Digital products with a point of view.',
  description: 'TechSol designs digital products, growth systems, and brands for ambitious businesses.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
