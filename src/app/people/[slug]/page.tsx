import { notFound } from "next/navigation";
import { getPerson, people } from "@/lib/data";
import { ProfileContent } from "@/components/profile-content";

export function generateStaticParams() {
  const params = people.map((person) => ({ slug: person.slug }));
  params.push({ slug: "prakash" });
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const person = getPerson(slug);
  return {
    title: person ? `${person.name} | Manufacturing Technology IIST` : "Profile",
  };
}

export default async function ProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const person = getPerson(slug);

  if (!person) {
    notFound();
  }

  return <ProfileContent initialPerson={person} />;
}
