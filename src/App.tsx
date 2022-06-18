import * as React from "react";
import { Admin, EditGuesser, ListGuesser, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { PartEdit } from "./components/Parts/PartEdit";
import { CategoryList } from "./components/Categories/CategoryList";
import { CategoryEdit } from "./components/Categories/CategoryEdit";
import { PartList } from "./components/Parts/PartList";
import { Environment } from "./environment";

const dataProvider = jsonServerProvider(Environment.BASE_URL);

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="parts"
      options={{ label: "Peças" }}
      list={PartList}
      edit={PartEdit}
    />
    <Resource
      name="categories"
      options={{ label: "Categorias" }}
      list={CategoryList}
      edit={CategoryEdit}
    />
  </Admin>
);

export default App;
