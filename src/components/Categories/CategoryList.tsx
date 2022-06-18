import { useState } from "react";
import { Title, useGetList } from "react-admin";
import {
  Card,
  Button,
  Toolbar,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";

export const CategoryList: React.FC = () => {
  const [filter, setFilter] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const perPage = 10;
  const categories = useGetList("categories", {
    filter: {
      q: filter,
    },
    pagination: { page, perPage },
    sort: { field: "id", order: "ASC" },
  });

  if (categories.isLoading) {
    return <div>Loading...</div>;
  }

  const searchCategories = (searchValue: string) => {
    setFilter(searchValue);
  };

  return (
    <div>
      <Title title="Lista de Categorias" />

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap={1}
      >
        <TextField
          label="Encontre por uma categoria"
          value={filter}
          onChange={(e) => searchCategories(e.target.value)}
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
              <TableCell>Nome</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.data?.map((category) => (
              <TableRow
                key={category.id}
                resource={`/categories/${category.id}`}
              >
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <Link to={`/parts/${category.id}`}>Editar</Link>
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
        {page < (categories.total ? categories.total : 0) / perPage && (
          <Button onClick={() => setPage(page + 1)}>Próxima Página</Button>
        )}
      </Toolbar>
    </div>
  );
};
