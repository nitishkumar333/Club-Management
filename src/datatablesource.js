export const userColumns = [
  {
    field: "society",
    headerName: "Society",
    width: 230,
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
    width: 150,
  }
];
export const membersColumns = [
  {
    field: "member",
    headerName: "Member",
    width: 200,
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
    width: 200,
  },
  {
    field: "phoneno",
    headerName: "Phone No.",
    width: 150,
  },
  {
    field: "department",
    headerName: "Department",
    width: 150,
  },
  {
    field: "position",
    headerName: "Position",
    width: 150,
  },
];