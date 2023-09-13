const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const userColumns = [
  {
    field: "society",
    headerName: "Society",
    // width: 230,
    flex: 2,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={`${BACKEND_URL}/${params.row.imageUrl}`}
            alt="avatar"
          />
          {params.row.society}
        </div>
      );
    },
  },
  {
    field: "department",
    headerName: "Department",
    // width: 150,
    flex: 1,
  }
];
export const membersColumns = [
  {
    field: "member",
    headerName: "Member",
    flex: 1.5,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={`${BACKEND_URL}/${params.row.imageUrl}`}
            alt="avatar"
          />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1.5,
  },
  {
    field: "phoneno",
    headerName: "Phone No.",
    flex: 1,
  },
  {
    field: "department",
    headerName: "Department",
    flex: 1,
  },
  {
    field: "position",
    headerName: "Position",
    flex: 1,
  },
];