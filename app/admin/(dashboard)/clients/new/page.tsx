import Link from "next/link";
import { CreateClientForm } from "@/components/admin/clients/client-form";

export default function NewClientPage() {
  return (
    <div>
      <Link href="/admin/clients" className="text-sm text-zinc-500 hover:text-white">
        ← Clients
      </Link>
      <h1 className="mt-4 font-serif text-2xl font-semibold text-white">New client</h1>
      <div className="mt-8 max-w-xl">
        <CreateClientForm />
      </div>
    </div>
  );
}
