import * as React from "react";
import { Edit, NumberField, NumberInput, SimpleForm, TextField, TextInput } from "react-admin";

export const CategoryEdit: React.FC = () => (
  <Edit title="Editar Peça">
      <SimpleForm>
          <TextInput disabled source="id" label="ID" />
          <TextInput source="name" label="Descrição" />
      </SimpleForm>
  </Edit>
);