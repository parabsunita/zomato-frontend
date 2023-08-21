// src/components/Restaurant.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTable } from "react-table";
import { Navigate, useNavigate } from "react-router-dom";

const Restaurant = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const fetchRestaurantData = async () => {
    await axios
      .get(
        process.env.REACT_APP_API_BASE_URL + "/restaurant/restaurant/details"
      )
      .then((response) => {
        setData(response.data.resturants);
      })
      .catch((error) => {
        console.error("Error fetching restaurant data:", error);
      });
  };
  useEffect(() => {
    fetchRestaurantData();
  }, []);
  const handleAddRestaurant = () => {
    navigate("/addresturant");
  };
  const resturantsDetails = (e) => {
    if (e.target.innerText == "Edit") {
      navigate(`/editrestaurant/${e.target.parentElement.parentElement.id}`);
    } else {
      navigate(`/restaurantdetails/${e.target.parentElement.id}`);
    }
  };
  // Define table columns and data
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name", // Assuming the API returns an object with a 'name' property
      },
      {
        Header: "Email",
        accessor: "email", // Assuming the API returns an object with an 'address' property
      },
      {
        Header: "Address",
        accessor: "address", // Assuming the API returns an object with an 'address' property
      },
      {
        Header: "Edit",
        accessor: "_id", // Assuming the API returns a unique identifier for each restaurant, like "_id"
        Cell: ({ value }) => (
          <button
            onClick={resturantsDetails}
            className="btn btn-primary btn-sm"
          >
            Edit
          </button>
        ),
      },
      // Add more columns as needed
    ],
    []
  );

  // Create a table instance
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="w-75 ">
      <h2>Restaurant Details</h2>
      <div className="w-100">
        {" "}
        <button
          onClick={handleAddRestaurant}
          className=" float-right rounded m-3"
        >
          Add Restaurant
        </button>
      </div>
      <div className="">
        <table
          className="mx-5"
          {...getTableProps()}
          style={{ border: "1px solid black", width: "100%" }}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    style={{
                      borderBottom: "solid 3px red",
                      background: "aliceblue",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="scrollable-tbody">
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} id={row.original._id}>
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "10px",
                        border: "solid 1px gray",
                        background: "papayawhip",
                      }}
                      onClick={resturantsDetails}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Restaurant;
