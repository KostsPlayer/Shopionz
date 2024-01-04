import React from "react";
import Layout from "../Layout/Layout";

export default function Sales() {
  return (
    <>
      <Layout>
        {/* <table className="table-sales">
          <thead>
            <tr>
              <th>No</th>
              <th>Product</th>
              <th>Client</th>
              <th>Amount</th>
              <th>Activate</th>
              <th>Date Available</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataSales.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{no++}</td>
                  <td>{data.name}</td>
                  <td>{data.icon}</td>
                  <td>{data.is_active}</td>
                  <td>{data.date_available}</td>
                  <td>
                    <div className="edit">
                      <div
                        className="bagde-icon"
                        onClick={() => {
                          setOpenUpdateModal(true);
                          handleSales(data.id);
                        }}
                      >
                        <span className="material-symbols-outlined">edit</span>
                      </div>
                    </div>
                    <div className="delete">
                      <div
                        className="bagde-icon"
                        onClick={() => handleDelete(data.id)}
                      >
                        <span className="material-symbols-outlined">
                          delete
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table> */}
      </Layout>
    </>
  );
}
