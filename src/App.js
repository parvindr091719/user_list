import { React, useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [data, setData] = useState([]);
  const [searchApiData, setSearchApiData] = useState([]);
  const [filterVal, setFilterVal] = useState("");

  useEffect(() => {
    const fetchData = () => {
      fetch(
        "https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json"
      )
        .then((response) => response.json())
        .then((json) => {
          setData(json);
          setSearchApiData(json);
        });
    };
    fetchData();
  }, []);

  const handleFilter = (e) => {
    if (e.target.value === "") {
      setData(searchApiData);
    } else {
      const filterResult = searchApiData.filter(
        (item) =>
          item.first_name
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          item.last_name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      if (filterResult.length > 0) {
        setData(filterResult);
      } else {
        setData([{ first_name: "No Recode Found" }]);
      }
    }
    setFilterVal(e.target.value);
  };
  return (
    <div className="App">
      <h1>User</h1>
      <div className="p-input-icon-right">
        <input
          type="search"
          placeholder="Search by first or last name"
          value={filterVal}
          onInput={(e) => handleFilter(e)}
        />
      </div>
      <table>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Age</th>
        <th>Email</th>
        <th>Website</th>
        {data.map((item) => {
          return (
            <tr>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>{item.age}</td>
              <td>{item.email}</td>
              <td>{item.web}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
