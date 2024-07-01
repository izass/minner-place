import Image from "next/image";
import { ReactNode } from "react";

export function LayoutComponent({ children }: { children: ReactNode }) {
  return (
    <main className="h-full bg-[#111827]">
      <div className="m-auto h-auto min-h-full max-w-[1336px]">
        <div className="px-[24px]">
          <div className="flex justify-center pt-8 pb-10">
            <Image
              src="/minerplace.svg"
              alt="MinerPlace Logo"
              width={200}
              height={50}
              priority
            />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
