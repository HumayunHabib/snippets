"use server"; // Indicates that the module will run on the server.

import { db } from "@/db"; // Import the database instance.
import { revalidatePath } from "next/cache"; // Import the revalidatePath function for cache invalidation.
import { redirect } from "next/navigation"; // Import the redirect function for navigation.

export async function editSnippet(id: number, code: string) {
  // Update the snippet record with the given id in the database.
  await db.snippet.update({
    where: { id }, // Specify the record to update based on the id.
    data: { code }, // Update the code field with the provided value.
  });

  // Revalidate the cache for the snippet's path to reflect the update.
  revalidatePath(`/snippets/${id}`);

  // Redirect the user back to the updated snippet's page.
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  // Delete the snippet record with the given id from the database.
  await db.snippet.delete({
    where: { id }, // Specify the record to delete based on the id.
  });

  // Revalidate the cache for the homepage to reflect the deletion.
  revalidatePath("/");

  // Redirect the user back to the homepage.
  redirect("/");
}

export async function createSnippet(
  formState: { message: string }, // Object to hold the form state and messages.
  formData: FormData // FormData object containing the form's input fields.
) {
  try {
    // Extract and validate the title and code fields from the form data.
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;

    // Validate that the title is a string and is longer than 3 characters.
    if (typeof title !== "string" || title.length < 3) {
      return {
        message: "Title must be longer", // Return an error message if the validation fails.
      };
    }

    // Validate that the code is a string and is longer than 10 characters.
    if (typeof code !== "string" || code.length < 10) {
      return {
        message: "Code must be longer", // Return an error message if the validation fails.
      };
    }

    // Create a new snippet record in the database with the validated data.
    await db.snippet.create({
      data: {
        title, // Set the title field with the provided value.
        code, // Set the code field with the provided value.
      },
    });
  } catch (err: unknown) {
    // Handle any errors that occur during the database operation.
    if (err instanceof Error) {
      return {
        message: err.message, // Return the error message if available.
      };
    } else {
      return {
        message: "Something went wrong...", // Return a generic error message if the error is unknown.
      };
    }
  }

  // Revalidate the cache for the homepage to reflect the new snippet.
  revalidatePath("/");

  // Redirect the user back to the homepage.
  redirect("/");
}
