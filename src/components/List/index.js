function List({ data }) {
  if (!data) {
    return <div>No data</div>;
  }
  const hasChildren = data.children;
  return (
    <div>
      <li>{data.name}</li>
      <ul>
        {data.children &&
          data.children.map((page) => {
            return (
              <>
                <List data={page} />
              </>
            );
          })}
      </ul>
    </div>
  );
}

export default List;
