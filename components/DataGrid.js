import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './datagrid.module.css';

const DataGrid = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, [page, pageSize]);

  const fetchData = async () => {
    const response = await axios.get(
      `https://reqres.in/api/users?page=${page}&per_page=${pageSize}`
    );
    setData(response.data.data);
    setTotalCount(response.data.total);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <>
      <div className={styles['data-grid-wrapper']}>
        <table className={styles['data-grid-table']}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Avatar</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>
                  <img
                    src={user.avatar}
                    alt={`${user.first_name} ${user.last_name}`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles['data-grid-footer']}>
          <div className={styles['data-grid-pagination']}>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
            >
              Previous
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => handlePageChange(page + 1)}
            >
              Next
            </button>
          </div>
          <div className={styles['data-grid-page-size']}>
            <span>Page Size: </span>
            <select
              value={pageSize}
              onChange={(e) => handlePageSizeChange(e.target.value)}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataGrid;
