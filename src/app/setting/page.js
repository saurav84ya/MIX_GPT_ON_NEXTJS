import Link from 'next/link';
import { Wrench } from 'lucide-react';

export default function Page() {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 px-4">
      <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <Wrench className="h-12 w-12 text-yellow-500 animate-pulse" />
          <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200">
            Settings Under Construction 🛠️
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            We&lsquo;re working hard to bring you a personalized settings experience.
            Please check back later.
          </p>
          <Link href="/">
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition">
              Go to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
