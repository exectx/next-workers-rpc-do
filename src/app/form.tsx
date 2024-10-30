"use client";

import { useState } from "react";

export function MyForm(props: {
  action: (formData: FormData) => Promise<any>;
}) {
  const [name, setName] = useState("");
  const [result, setResult] = useState("");
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const form = e.currentTarget
  //   form.append('name', name);
  //   await props.action(form);
  // }
  return (
    <>
      <form
        action={async (formData) => {
          const r = await props.action(formData);
          setResult(r);
        }}
      >
        <input
          type="text"
          name="name"
          className="border"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <div>result: {result}</div>
    </>
  );
}
