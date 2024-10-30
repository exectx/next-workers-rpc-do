import Image from "next/image";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { MyForm } from "./form";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

async function sayHello(form: FormData) {
  "use server";
  const name = form.get("name");
  console.log("\n\n\n\n name", name);
  const cf = await getCloudflareContext();
  const cc = await cf.env.WORKER.inc();
  revalidatePath("/");
  return cc;
}

export default async function Home() {
  // const cf = await getCloudflareContext();
  // const cc = cf.env.WORKER.sayHello();
  // const re = await cc.increment();
  // const action = async (f: FormData) => {
  //   const r = await sayHello(f);
  // }
  // const d = await getCloudflareContext().then((cf) => cf.env.WORKER.get());
  const cf = await getCloudflareContext();
  const d = await cf.env.WORKER.getstore();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div>do: {d}</div>
      <MyForm action={sayHello} />
      {/* rpc: {re} */}
    </main>
  );
}
