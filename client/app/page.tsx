import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const languages = [
  {
    name: "Python",
    description: "Popular general-purpose programming language",
    image: "/python.svg",
    link: "/learn/python",
  },
  {
    name: "JavaScript",
    description: "The language of the web",
    image: "/javascript.svg",
    link: "/learn/javascript",
  },
  {
    name: "Java",
    description: "Versatile, object-oriented programming",
    image: "/java.svg",
    link: "/learn/java",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4">
      <div className="mb-8 flex items-center gap-4">
        <Image
          src="/mascot.svg"
          alt="CodeLingo Mascot"
          width={80}
          height={80}
          className="h-20 w-20"
        />
        <h1 className="text-4xl font-bold text-slate-900">Welcome to CodeLingo</h1>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {languages.map((language) => (
          <Card key={language.name} className="overflow-hidden">
            <div className="p-6">
              <div className="mb-4 flex items-center gap-4">
                <Image
                  src={language.image}
                  alt={language.name}
                  width={40}
                  height={40}
                  className="h-10 w-10"
                />
                <h2 className="text-xl font-semibold text-slate-900">{language.name}</h2>
              </div>
              <p className="mb-4 text-slate-600">{language.description}</p>
              <Link href={language.link} className="block w-full">
                <Button className="w-full bg-[#58cc02] hover:bg-[#45a100] text-white">
                  Start Learning
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
