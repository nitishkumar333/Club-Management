import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Stack } from "@mui/material";
import { membersColumns } from "../../datatablesource.js";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext.js";
import { useState } from "react";
import SingleEditForm from "../../pages/single/SingleEditForm.jsx";
import { deleteHandlerPrivate } from "../../apiFetch.js";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const MembersTable = ({ userRows, setUserRows, name }) => {
  const [viewIsActive, setViewIsActive] = useState(false);
  const [memData, setMemData] = useState();
  const params = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const handleDelete = (memId) => {
    const api = `${BACKEND_URL}/societies/${params.societyId}/${memId}`;
    deleteHandlerPrivate(
      api,
      () => {
        setUserRows(userRows.filter((item) => item.id !== memId));
      },
      token
    );
  };
  const viewHandler = (memData) => {
    setMemData(memData);
    setViewIsActive(true);
  };
  const submitHandler = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    fetch(`${BACKEND_URL}/members/${memData.id}`, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((result) => {
        if (result.status === 500 || result.status === 402)
          throw new Error("Failed to fetch!");
        return navigate(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="viewButton" onClick={() => viewHandler(params.row)}>
              View
            </div>
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
        {name} Members
        <Link to="new" className="button">
          Add Member
        </Link>
      </div>
      <DataGrid
        components={{
          NoRowsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              No Society Found !!
            </Stack>
          ),
        }}
        rows={userRows}
        getRowClassName={(params) => `fade-in-row`}
        columns={membersColumns.concat(actionColumn)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 6 },
          },
        }}
        sx={{
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
            outline: "none !important",
          },
          "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within": {
            outline: "none",
          },
        }}
        showCellVerticalBorder
        showColumnVerticalBorder
        autoHeight
        disableSelectionOnClick
        isRowSelectable={() => false}
        pageSizeOptions={[6]}
      />
      {viewIsActive && (
        <SingleEditForm
          data={memData}
          setViewIsActive={setViewIsActive}
          submitHandler={submitHandler}
        />
      )}
    </div>
  );
};

export default MembersTable;
