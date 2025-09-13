import { Logo } from "@/components/icons";

export function MainHeader() {
  return (
    <header className="p-4 md:px-8 border-b border-white/10">
      <div className="flex items-center gap-3">
        <Logo className="h-7 w-7 text-primary" />
        <h1 className="text-2xl font-headline font-bold text-slate-100">
          Tab Integrator
        </h1>
      </div>
    </header>
  );
}
