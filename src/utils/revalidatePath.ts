"use server";

import { revalidatePath as revalidate } from "next/cache";

async function revalidatePath(path: string) {
  revalidate(path, "layout");
}

export default revalidatePath;
