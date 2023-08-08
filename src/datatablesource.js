export const userColumns = [
  {
    field: "society",
    headerName: "Society",
    // width: 230,
    flex: 1,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={`http://localhost:8080/${params.row.imageUrl}`}
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
    // width: 200,
    flex: 1,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={`http://localhost:8080/${params.row.imageUrl}`}
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
    // width: 200,
    flex: 1,
  },
  {
    field: "phoneno",
    headerName: "Phone No.",
    // width: 150,
    flex: 1,
  },
  {
    field: "department",
    headerName: "Department",
    // width: 150,
    flex: 1,
  },
  {
    field: "position",
    headerName: "Position",
    // width: 150,
    flex: 1,
  },
];