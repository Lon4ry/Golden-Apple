import { ReactNode } from "react";

export default function SectionTittle({ children }: { children: ReactNode }) {
    return (
        <div className="my-4 w-full">
            <h2 className="mb-4 inline-flex w-full items-center text-4xl font-bold before:mr-3 before:h-0.5 before:w-full before:rounded-xl before:bg-gray-400 before:content-[''] after:ml-3 after:h-0.5 after:w-full after:rounded-xl after:bg-gray-400 after:content-['']">
                {children}
            </h2>
        </div>
    );
}
