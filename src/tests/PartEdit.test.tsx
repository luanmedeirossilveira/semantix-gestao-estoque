import { render, screen } from "@testing-library/react";
import { AdminContext, GetOneParams, GetOneResult, testDataProvider } from "react-admin";

import { PartEdit } from "../components/Parts/PartEdit";

test('<PartEdit />', async () => {
  render(
      <AdminContext dataProvider={testDataProvider({
          update: async (resource: any, { id }: GetOneParams): Promise<GetOneResult> => ({ data : { id: 1,
          partName: "Teste1",
          status: true,
          amount: 10,
          category: 1 } }),
      })}>
          <PartEdit />
      </AdminContext>
  );
  const items = await screen.findAllByText(/Item #[0-9]: /)
  expect(items).toHaveLength(10)
})
