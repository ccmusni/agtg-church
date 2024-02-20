import Link from "next/link";
import Image from "next/image";
import AGTG from "../../public/images/agtg.jpg";

export default function Logo() {
  return (
    <Link href="/" className="block" aria-label="AGTG Church">
      <Image
        className="md:max-w-none mx-auto rounded"
        src={AGTG}
        width={25}
        height={25}
        alt="Church Image"
      />
    </Link>
  );
}
