import { render, screen } from "@testing-library/react";
import {
  AdminContext,
  GetOneParams,
  GetOneResult,
  testDataProvider,
} from "react-admin";

import { CategoryEdit } from "../components/Categories/CategoryEdit";

test("<CategoryEdit />", async () => {
  render(
    <AdminContext
      dataProvider={testDataProvider({
        update: async (
          resource: any,
          { id }: GetOneParams
        ): Promise<GetOneResult> => ({ data: { id, name: "teste1" } }),
      })}
    >
      <CategoryEdit />
    </AdminContext>
  );
  const items = await screen.findAllByText(/Item #[0-9]: /);
  expect(items).toHaveLength(10);
});
