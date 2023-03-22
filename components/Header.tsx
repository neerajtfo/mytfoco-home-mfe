import Image from 'next/image';

export default function Header() {
  return (
    <nav className="p-10">
      <Image src="/logo.svg" alt="tfo" width={124} height={55} />
    </nav>
  );
}
