import React, { useEffect, useState } from "react";
import InsertProduct from "./InsertProduct";
import Layout from "../Layout/Layout";
import axios from "axios";
import UpdateProduct from "./UpdateProduct";
import { allMessage } from "../../component/Helper/LogicServer";
import { ToastContainer } from "react-toastify";

export default function Store() {
  axios.defaults.withCredentials = true;
  const [openInsertModal, setOpenInsertModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [dataProduct, setDataProduct] = useState([]);
  const [getId, setGetId] = useState(0);
  const [getImage, setGetImage] = useState("");
  const { toastMessage, message } = allMessage();
  const getLocalStorage = JSON.parse(localStorage.getItem("dataUser"));

  const handleProduct = async (productId) => {
    await axios
      .get(`https://project-ii-server.vercel.app/get-product/${productId}`)
      .then((res) => {
        setGetId(res.data[0].id);
        setGetImage(res.data[0].images);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDelete = async (id) => {
    await axios
      .put(
        `https://project-ii-server.vercel.app/delete-product/${id}`,
        getImage
      )
      .then((res) => {
        toastMessage("success", res.data.message);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fecthDataProductSeller = () => {
    axios
      .get(
        `https://project-ii-server.vercel.app/product-seller/${getLocalStorage.dataUser.id}`
      )
      .then((res) => {
        setDataProduct(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fecthDataProductSeller();
  }, [dataProduct]);

  return (
    <>
      <Layout>
        <span
          className="material-symbols-outlined"
          onClick={() => {
            setOpenInsertModal(true);
          }}
        >
          add
        </span>

        <InsertProduct
          onOpen={openInsertModal}
          onClose={() => {
            setOpenInsertModal(false);
          }}
        />
        <UpdateProduct
          onOpen={openUpdateModal}
          onClose={() => {
            setOpenUpdateModal(false);
          }}
          productId={getId}
        />

        <div className="store-gallery">
          {dataProduct.map(
            (
              {
                id,
                name,
                description,
                price,
                stock,
                images,
                category_id,
                date_available,
              },
              index
            ) => (
              <div className="gallery-card" key={index}>
                <img
                  className="gallery-images"
                  src={`https://crijtkbvmmpjdbxqqkpi.supabase.co/storage/v1/object/public/Images/${images}?t=2023-12-24T02%3A30%3A45.365Z`}
                  alt={`product-${name}`}
                />
                <div className="gallery-details">
                  <p>{name}</p>
                  <p>{description}</p>
                  <p>{price}</p>
                  <p>{stock}</p>
                  <p>{category_id}</p>
                  <p>{date_available}</p>
                  <div className="edit">
                    <div
                      className="bagde-icon"
                      onClick={() => {
                        setOpenUpdateModal(true);
                        handleProduct(id);
                      }}
                    >
                      <span className="material-symbols-outlined">edit</span>
                    </div>
                  </div>
                  <div className="delete">
                    <div
                      className="bagde-icon"
                      onClick={() => handleDelete(id)}
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        {message && <ToastContainer />}
      </Layout>
    </>
  );
}

// const [currentPage, setCurrentPage] = useState(1);
// const recordsPerPage = 8;

// const lastIndex = currentPage * recordsPerPage;
// const firstIndex = lastIndex - recordsPerPage;
// const currentRecords = dataProduct.map(firstIndex, lastIndex);
// const paginate = (pageNumber) => setCurrentPage(pageNumber);

{
  /* <ul className="pagination">
          <li className="page-item">
            <Link
              to="#"
              onClick={() => {
                if (currentPage !== firstIndex) {
                  setCurrentPage(currentPage - 1);
                }
              }}
              className="page-link"
            >
              Prev
            </Link>
          </li>
          {Array.from(
            { length: Math.ceil(dataProduct.length / recordsPerPage) },
            (_, i) => (
              <>
                <li
                  key={i}
                  className={`page-item ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  <Link
                    to="#"
                    onClick={() => paginate(i + 1)}
                    className="page-link"
                  >
                    {i + 1}
                  </Link>
                </li>
              </>
            )
          )}
          <li className="page-item">
            <Link
              to="#"
              onClick={() => {
                if (currentPage !== lastIndex) {
                  setCurrentPage(currentPage + 1);
                }
              }}
              className="page-link"
            >
              Next
            </Link>
          </li>
        </ul> */
}
