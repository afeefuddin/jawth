import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-8 p-24">
      <h1 className="text-3xl">Welcome to JAWTH example</h1>
      <h2>Try now!</h2>
      <div className="flex gap-8">
        <Link href='/dashboard'>
        <button className="bg-black text-white py-3 px-4 rounded">
          Dashboard
        </button>
        </Link>
        <Link href='/login'>
        <button className="bg-black text-white py-3 px-4 rounded">
          Login
        </button>
        </Link>
      </div>
    </div>
  );
}
