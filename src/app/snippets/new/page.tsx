import { db } from "@/db";
import { redirect } from "next/navigation";
import React from "react";

const SnippetCreatePage = () => {
  async function createSnippet(formData: FormData) {
    // this needs to be a server actions
    "use server";

    // Checkthe user input to be valid
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;

    // Create a new record in database
    const snippet = await db.snippet.create({
      data: {
        title,
        code,
      },
    });

    // redirect user back to  route

    redirect("/");
  }

  return (
    <form action={createSnippet}>
      <h3 className="font-bold m-3">Create a Snippet</h3>

      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Title
          </label>

          <input
            name="title"
            className="border rounded p-2 w-full"
            id="title"
          />
        </div>
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Code
          </label>

          <textarea
            name="code"
            className="border rounded p-2 w-full"
            id="code"
          />
        </div>
        <button type="submit" className="rounded p-2 bg-blue-200">
          Create
        </button>
      </div>
    </form>
  );
};

export default SnippetCreatePage;
