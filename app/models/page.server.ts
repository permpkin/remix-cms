import type { Page } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Page } from "@prisma/client";

export function getPage({
  id
}: Pick<Page, "id">) {
  return prisma.page.findFirst({
    // select: { id: true, body: true, title: true },
    where: { id },
  });
}

export function createPage(data: Page) {
  return prisma.page.create({
    data
  });
}

export function deletePage({
  id
}: Pick<Page, "id">) {
  return prisma.page.deleteMany({
    where: { id },
  });
}
