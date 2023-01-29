import MaterialTable from "material-table";
import tableIcons from "./IconProvider";

const Table = ({ data, deletePet }) => {

  // define columns of the table
  const columns = [{ title: 'Id', field: 'id' },
  { title: 'Name', field: 'name' },
  { title: 'Category', field: 'category.name' },
  {
    title: 'Tags', field: 'tags',
    render: (rowData) => rowData.tags?.map(tag =>
      <span>{tag.name},</span>
    )
  },
  {
    title: 'Image URLs', field: 'photoUrls[0]',
    render: (rowData) => rowData.photoUrls?.map(img =>
      <img
        src={img}
        style={{ width: 80 }}
      >
      </img>
    )
  },
  { title: 'Status', field: 'status' }]

  return (
    <>
      {data ? <MaterialTable
        columns={columns}
        data={data}
        options={{
          selection: true,
          headerStyle: {
            backgroundColor: "#f50057",
            color: "#FFF",
            fontSize: "17px",
          },
          rowStyle: {
            backgroundColor: "#efcbd8",
          }

        }}
        icons={tableIcons}
        actions={
          [{
            icon: tableIcons.Delete,
            tooltip: 'Delete user',
            onClick: (event, rowData) => {
              deletePet(rowData[0].id)
              alert('deleted')
            }
          }
          ]
        } /> : <></>}
    </>
  )
}
export default Table;