import React, { useEffect } from "react";
import "react-bootstrap";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import transaction from "../data/transaction.json";
import { useQuery } from "react-query";
import { API } from '../config/api';
function Transaction() {
  let { data: transaction } = useQuery("transactionCache", async () => {
    const response = await API.get(`/transactions`);
    return response.data.data;
    
  });
  console.log("transact:", transaction);

    // useEffect(() => {
    //     console.log(transaction);
    //   }, []);
    return(
        <>
        <div style={{ background: "black", height: "100vh" }}>
      <div className="container">
        <h3 className="text-white py-4">Incoming Transaction</h3>
        <Table striped hover>
          <thead>
            <tr style={{  background: "#1F1F1F", color: "red" }}>
              <th>No</th>
              <th>Users</th>
              <th>Start date</th>
              <th>Eun date</th>
              <th>Status Payment</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {transaction?.slice(0, 10).map((data) => {
              return (
                <tr style={{ background: "#2B2B2B" }}>
                  {/* <td style={{height:"70px"}} className="text-white">{item.id}</td> */}
                  <td className="text-white">{data.user_id}</td>
                  <td className="text-white">{data.user.name}</td>
                  <td className="text-white">{data.startdate}</td>
                  <td className="text-white">{data.enddate}</td>
                  <td style={{ color: "green" }}>{data.status}</td>
                  <td className="text-white">{data.price}</td>
                  <td style={{ color: "green" }}>Approve</td>
                  <td>
                    <Dropdown className="m-1">
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <bsFillCaretDownFill style={{ color: "#42cef5" }} />
                      </Dropdown.Toggle>

                      <Dropdown.Menu style={{ background: "#2B2B2B" }}>
                        <Dropdown.Item style={{ color: "green" }}>
                          Approve
                        </Dropdown.Item>
                        <Dropdown.Item style={{ color: "red" }}>
                          Cancel
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              );
            })}
              
              </tbody>
        </Table>
      </div>
    </div>
  
    </>
    )
}
export default Transaction