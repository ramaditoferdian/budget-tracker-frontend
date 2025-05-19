import '@/styles/globals.css';
import AuthGuard from '@/components/guards/AuthGuard';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <div className="grid grid-cols-[auto_1fr] h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="h-full sticky top-0 border-r border-neutral-200 z-10">
          <Sidebar />
        </aside>

        {/* Content */}
        <div className="flex flex-col h-full overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
