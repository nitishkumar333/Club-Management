import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource.js";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext.js";
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
      width: 150,
      renderCell: (params) => {
        return <div className="cellAction">{params.row.members.length}</div>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
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
        sx={{
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
            outline: "none !important",
          },
          "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within": {
            outline: "none",
          },
        }}
        rows={userRows}
        columns={userColumns.concat(actionColumn)}
        pageSizeOptions={[8]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
