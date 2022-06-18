import * as React from "react";
import { Edit, NumberInput, SimpleForm, TextInput } from "react-admin";

export const PartEdit: React.FC = () => (
  <Edit title="Editar Peça">
      <SimpleForm>
        <TextInput disabled source="part_ID" label="ID" />
        <TextInput disabled source="partName" label="Descrição" />
        <TextInput disabled source="status" label="Status" />
        <NumberInput source="amount" label="Quantidade" />
      </SimpleForm>
  </Edit>
);