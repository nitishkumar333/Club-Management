import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { membersColumns } from "../../datatablesource.js";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext.js";
const MembersTable = ({ userRows, setUserRows }) => {
  const params = useParams();
  const { token } = useAuth();
  const handleDelete = (memId) => {
    console.log("memId---->" + memId);
    fetch(`http://localhost:8080/societies/${params.societyId}/${memId}`, {
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
        setUserRows(userRows.filter((item) => item.id !== memId));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`${params.id}`} style={{ textDecoration: "none" }}>
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
        Add New User
        <Link to="new" style={{ textDecoration: "none" }} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={userRows}
        columns={membersColumns.concat(actionColumn)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 9 },
          },
        }}
        pageSizeOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default MembersTable;
