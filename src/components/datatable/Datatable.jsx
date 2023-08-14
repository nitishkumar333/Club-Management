import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource.js";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext.js";
import { Stack } from "@mui/material";
const Datatable = ({ userRows, setUserRows }) => {
  const { token } = useAuth();
  const handleDelete = (id) => {
    fetch(`http://localhost:8080/home/society/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Deleting a post failed!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        setUserRows(userRows.filter((item) => item.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const actionColumn = [
    {
      field: "members",
      headerName: "Members",
      flex: 1,
      align:'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return <div className="cellAction">{params.row.members.length}</div>;
      },
    },
    {
      field: "events",
      headerName: "Events",
      flex: 1,
      align:'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return <div className="cellAction">{params.row.events.length}</div>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      align:'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/societies/${params.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Societies
        <Link
          to="/societies/new"
          style={{ textDecoration: "none" }}
          className="link"
        >
          Add New
        </Link>
      </div>
      <DataGrid
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 },
        },
      }}
      components={{
        NoRowsOverlay: () => (
          <Stack height="100%" alignItems="center" justifyContent="center">
            No Members Found !!
          </Stack>
        )
      }}
        sx={{
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
            outline: "none !important",
          },
          "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within": {
            outline: "none",
          },
        }}
        autoHeight
        rows={userRows}
        columns={userColumns.concat(actionColumn)}
        pageSizeOptions={[10]}
        disableSelectionOnClick
        isRowSelectable={() => false}
      />
    </div>
  );
};

export default Datatable;
