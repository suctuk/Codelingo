export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="border-b border-slate-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <a href="/" className="text-lg font-semibold text-slate-900">
            CodeLingo
          </a>
        </div>
      </nav>
      {children}
    </div>
  );
}
