import React, { useState } from "react";
import AddProduct from "../shopping-page/AddProduct";
import ListProduct from "../shopping-page/ListProduct";
import AddUser from "../User/AddUser";
import ListUser from "../User/ListUser";

const Sidebar =() => {

  const [tab, setTab] = useState(null);
return (
    <div className="App">
      <div>
      <div className="bg-blue-600 ">
        <span
          className="absolute text-white text-4xl top-5 left-4 cursor-pointer"
          onClick={() => {
            document
              .querySelector(".sidebar")
              .classList.toggle("left-[-300px]");
          }}
        >
          <i className="bi bi-filter-left px-2 bg-gray-900 rounded-md"></i>
        </span>
        <div
          className="sidebar fixed top-0 bottom-0 lg:left-0 left-[-300px] duration-1000
    p-2 w-[300px] overflow-y-auto text-center bg-gray-900 shadow h-screen"
        >
          <div className="text-gray-100 text-xl">
            <div className="p-2.5 mt-1 flex items-center rounded-md ">
              <i className="bi bi-eyeglasses px-2 py-1 bg-blue-600 rounded-md"></i>
              <h1 className="text-[15px]  ml-3 text-xl text-gray-200 font-bold">
                Opticals
              </h1>
              <i
                className="bi bi-x ml-20 cursor-pointer lg:hidden"
                onClick={() => {
                  document
                    .querySelector(".sidebar")
                    .classList.toggle("left-[-300px]");
                }}
              ></i>
            </div>
            <hr className="my-2 text-gray-600" />

            <div>
              <div
                className="p-2.5 mt-3 flex items-center rounded-md 
        px-4 duration-300 cursor-pointer  bg-gray-700"
              >
                <i className="bi bi-search text-sm"></i>
                <input
                  className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
                  placeholder="Serach"
                />
              </div>

              <div className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600">
                <i className="bi bi-house-door-fill"></i>
                <span className="text-[15px] ml-4 text-gray-200">Home</span>
              </div>
              <div className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600">
                <i className="bi bi-bookmark-fill"></i>
                <span className="text-[15px] ml-4 text-gray-200">Bookmark</span>
              </div>
              <hr className="my-4 text-gray-600" />
              <div className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600" onClick={() => setTab("AddProduct")}>
                <i className="bi bi-cart-plus-fill"></i>
                <span className="text-[15px] ml-4 text-gray-200">Add Product</span>
              </div>
              <div className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600" onClick={() => setTab("ListProduct")}>
                <i className="bi bi-cart-fill"></i>
                <span className="text-[15px] ml-4 text-gray-200">List Product</span>
              </div>

              <div className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600" onClick={() => setTab("AddUser")}>
                <i className="bi bi-person-plus-fill"></i>
                <span className="text-[15px] ml-4 text-gray-200">Add User</span>
              </div>
              <div className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600" onClick={() => setTab("ListUser")}>
                <i className="bi bi-person-fill"></i>
                <span className="text-[15px] ml-4 text-gray-200">List User</span>
              </div>

              <div className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600"
              
              onClick={() => {
                document
                  .querySelector("#submenu")
                  .classList.toggle("hidden");
                document
                  .querySelector("#arrow")
                  .classList.toggle("rotate-0");
              }}>
                <i className="bi bi-chat-left-text-fill"></i>
                <div
                  className="flex justify-between w-full items-center"
                >
                  <span className="text-[15px] ml-4 text-gray-200">Chatbox</span>
                  <span className="text-sm rotate-180" id="arrow">
                    <i className="bi bi-chevron-down"></i>
                  </span>
                </div>
              </div>
              <div
                className=" leading-7 text-left text-sm font-thin mt-2 w-4/5 mx-auto"
                id="submenu"
              >
                <h1 className="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1">
                  Social
                </h1>
                <h1 className="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1">
                  Personal
                </h1>
                <h1 className="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1">
                  Friends
                </h1>
              </div>
              <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600">
                <i className="bi bi-box-arrow-in-right"></i>
                <span className="text-[15px] ml-4 text-gray-200">Logout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className="flex-1 lg:ml-64">
        {tab === "AddProduct" && <AddProduct />}
        {tab === "ListProduct" && <ListProduct />}
        {tab === "AddUser" && <AddUser />}
        {tab === "ListUser" && <ListUser />}
      </div>
    </div>
) 
}
export default Sidebar;