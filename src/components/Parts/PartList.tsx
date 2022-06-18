import { useState } from "react";
import { EditButton, Title, useGetList } from "react-admin";
import {
  Card,
  TextField,
  Button,
  Toolbar,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

export const PartList = () => {
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;
  const parts = useGetList("parts", {
    filter: { q: filter },
    pagination: { page, perPage },
    sort: { field: "id", order: "ASC" },
  });
  const categories = useGetList("categories");

  if (parts.isLoading) {
    return <div>Loading...</div>;
  }

  const isPartStatus = (status: boolean, amount: number) => {
    if (status && amount > 0) {
      return "Disponível";
    } else {
      return "Indisponível";
    }
  };

  const searchPart = (searchValue: string) => {
    setFilter(searchValue);
  };

  return (
    <div>
      <Title title="Lista de Peças" />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap={1}
      >
        <TextField
          label="Encontre por uma categoria"
          value={filter}
          onChange={(e) => searchPart(e.target.value)}
          variant="filled"
          size="medium"
          margin="dense"
          fullWidth
        />
      </Box>
      <Card>
        <Table sx={{ padding: 2 }} size="medium">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Quantidade</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parts.data?.map((part) => (
              <TableRow key={part.id} resource={`/parts/${part.id}`}>
                <TableCell>{part.id}</TableCell>
                <TableCell>{part.partName}</TableCell>
                <TableCell>{isPartStatus(part.status, part.amount)}</TableCell>
                <TableCell>{part.amount}</TableCell>
                <TableCell>
                  {categories.data?.map((cat) =>
                    cat.id === part.category ? cat.name : null
                  )}
                </TableCell>
                <TableCell>
                  <Link to={`/parts/${part.id}`}>Editar</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <Toolbar>
        {page > 1 && (
          <Button onClick={() => setPage(page - 1)}>Página Anterior</Button>
        )}
        {page < (parts.total ? parts.total : 0) / perPage && (
          <Button onClick={() => setPage(page + 1)}>Próxima Página</Button>
        )}
      </Toolbar>
    </div>
  );
};
